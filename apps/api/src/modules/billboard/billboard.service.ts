// api/src/modules/billboard/billboard.service.ts
import {
  prisma,
  Prisma,
  BillboardLifecycleStatus,
  BillboardQuickStatus,
  DocumentStatus,
  MediaFileType,
} from "@repo/database";
import type { User } from "@supabase/supabase-js";
import type {
  CreateBillboardRequest,
  CreateBillboardResponse,
  MediaSpecsData,
} from "@/src/modules/billboard/billboard.types";
import {
  uploadBillboardPhoto,
  uploadVerificationDoc,
  deleteStorageFiles,
} from "@/src/lib/storage";

// Helpers

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateUniqueSuffix(): string {
  return crypto.randomUUID().slice(0, 8);
}

function parseDecimal(value: string | undefined): Prisma.Decimal | undefined {
  if (!value?.trim()) return undefined;
  const cleaned = value.replace(/[₹,\s]/g, "");
  const num = Number.parseFloat(cleaned);
  return Number.isFinite(num) ? new Prisma.Decimal(num) : undefined;
}

function parseIntSafe(value: string | undefined): number | undefined {
  if (!value?.trim()) return undefined;
  const digits = value.replace(/[^0-9]/g, "");
  return digits.length > 0 ? Number.parseInt(digits, 10) : undefined;
}

function parseBool(value: string | undefined, fallback: boolean): boolean {
  if (!value) return fallback;
  return value.toLowerCase() === "true";
}

// Validation

interface ValidationResult {
  valid: true;
  billboardName: string;
  billboardTypeId: string;
  cityId: string;
  area: string;
  landmark: string;
  widthFt: Prisma.Decimal;
  heightFt: Prisma.Decimal;
  monthlyRate: Prisma.Decimal;
  latitude: number;
  longitude: number;
  illumination: boolean;
  isAvailable: boolean;
  minBookingDuration: string;
  printingCost: Prisma.Decimal | undefined;
  dailyReach: number | undefined;
}

function validate(body: CreateBillboardRequest): ValidationResult {
  const errors: Record<string, string> = {};

  if (!body.billboardName?.trim()) errors.billboardName = "Required";
  if (!body.billboardTypeCode?.trim()) errors.billboardTypeCode = "Required";
  if (!body.cityId?.trim()) errors.cityId = "Required";
  if (!body.area?.trim()) errors.area = "Required";
  if (!body.landmark?.trim()) errors.landmark = "Required";

  const width = parseDecimal(body.widthFt);
  const height = parseDecimal(body.heightFt);
  const monthlyRate = parseDecimal(body.monthlyRate);

  if (!width) errors.widthFt = "Required and must be a valid number";
  if (!height) errors.heightFt = "Required and must be a valid number";
  if (!monthlyRate) errors.monthlyRate = "Required and must be a valid number";

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  return {
    valid: true,
    billboardName: body.billboardName.trim(),
    billboardTypeId: "", // resolved later
    cityId: body.cityId.trim(),
    area: body.area.trim(),
    landmark: body.landmark.trim(),
    widthFt: width!,
    heightFt: height!,
    monthlyRate: monthlyRate!,
    latitude: Number.parseFloat(body.latitude || "19.0760") || 19.076,
    longitude: Number.parseFloat(body.longitude || "72.8777") || 72.8777,
    illumination: parseBool(body.illumination, false),
    isAvailable: parseBool(body.isAvailable, true),
    minBookingDuration: body.minBookingDuration?.trim() || "1 month",
    printingCost: parseDecimal(body.printingCost),
    dailyReach: parseIntSafe(body.dailyReach),
  };
}

// Error Classes

export class ValidationError extends Error {
  constructor(public details: Record<string, string>) {
    super("Validation failed");
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

// Service

export class BillboardService {
  /**
   * Creates a complete billboard listing in a single transaction.
   *
   * Strategy for efficiency and safety:
   * 1. Validate and lookup foreign keys BEFORE the transaction (fast-fail)
   * 2. Upload files to Supabase Storage BEFORE the transaction (external I/O)
   * 3. All DB writes in a single prisma.$transaction (atomic)
   * 4. Batch inserts via createMany (single query per table)
   * 5. If any DB step fails, cleanup uploaded files (best-effort)
   */
  static async createBillboard(
    authUser: User,
    token: string,
    body: CreateBillboardRequest,
    photos: File[],
    files: {
      municipalLicense?: File;
      proofOfOwnership?: File;
      nocCertificate?: File;
      structuralCertificate?: File;
      gstCertificate?: File;
    },
  ): Promise<CreateBillboardResponse> {
    //Validate
    const v = validate(body);

    // 2. Look up BillboardType (before transaction — fast fail)
    const billboardType = await prisma.billboardType.findFirst({
      where: {
        code: body.billboardTypeCode.trim(),
        isActive: true,
      },
      select: { id: true, name: true, code: true },
    });

    if (!billboardType) {
      throw new NotFoundError(
        `Billboard type "${body.billboardTypeCode}" not found or inactive.`,
      );
    }

    // Upload photos to storage (before transaction — external I/O)
    const photoUrls: Array<{ url: string; originalName: string }> = [];

    try {
      for (const photo of photos) {
        const url = await uploadBillboardPhoto(token, "pending", photo);
        photoUrls.push({ url, originalName: photo.name });
      }
    } catch (error) {
      // If any photo upload fails, clean up already-uploaded ones
      await deleteStorageFiles(
        token,
        photoUrls.map((p) => p.url),
      );
      throw error;
    }

    // Upload verification documents (before transaction)
    const docUploads: Array<{
      docType: string;
      url: string;
      file: File;
    }> = [];

    const docEntries: Array<[string, File | undefined]> = [
      ["municipal_license", files.municipalLicense],
      ["ownership_proof", files.proofOfOwnership],
      ["noc", files.nocCertificate],
      ["structural_certificate", files.structuralCertificate],
      ["gst_certificate", files.gstCertificate],
    ];

    try {
      for (const [docType, file] of docEntries) {
        if (!file) continue;
        const url = await uploadVerificationDoc(
          token,
          authUser.id,
          docType,
          file,
        );
        docUploads.push({ docType, url, file });
      }
    } catch (error) {
      // Clean up all uploaded files (photos + docs)
      const allPaths = [
        ...photoUrls.map((p) => p.url),
        ...docUploads.map((d) => d.url),
      ];
      await deleteStorageFiles(token, allPaths);
      throw error;
    }

    // Parse media specs
    let mediaSpecs: MediaSpecsData = {};
    if (body.mediaSpecs) {
      try {
        mediaSpecs = JSON.parse(body.mediaSpecs) as MediaSpecsData;
      } catch {
        // Ignore malformed JSON — media specs are optional
      }
    }

    //Single transaction: all DB writes
    try {
      const result = await prisma.$transaction(async (tx) => {
        // 6a. Create Address
        const address = await tx.address.create({
          data: {
            line1: v.area,
            neighborhood: v.area,
            landmark: v.landmark,
            cityId: v.cityId,
            lat: v.latitude,
            lng: v.longitude,
            mapsLink: body.mapsLink?.trim() || null,
          },
        });

        // Create Billboard
        const slug = `${slugify(v.billboardName)}-${generateUniqueSuffix()}`;
        const sizeDisplay = `${v.widthFt.toString()}×${v.heightFt.toString()} ft`;

        const billboard = await tx.billboard.create({
          data: {
            ownerId: authUser.id,
            billboardTypeId: billboardType.id,
            addressId: address.id,
            name: v.billboardName,
            slug,
            description: body.visibilityNotes?.trim() || null,
            widthFt: v.widthFt,
            heightFt: v.heightFt,
            sizeDisplay,
            visibilityLabel: body.visibilityNotes?.trim() || null,
            dailyReach: v.dailyReach,
            lifecycleStatus: BillboardLifecycleStatus.draft,
            quickStatus: v.isAvailable
              ? BillboardQuickStatus.available
              : BillboardQuickStatus.maintenance,
            attributes: mediaSpecs as Prisma.InputJsonValue,
            illumination: v.illumination,
            trafficSide: body.trafficSide?.trim() || null,
            facingDirection: body.facingDirection?.trim() || null,
            roadType: body.roadType?.trim() || null,
            peakHours: body.peakHours?.trim() || null,
            vehiclePedestrianMix: body.vehiclePedestrianMix?.trim() || null,
            minBookingDuration: v.minBookingDuration,
            printingCost: v.printingCost ?? null,
            propertyOwnerDetails: body.propertyOwnerDetails?.trim() || null,
          },
        });

        // Create BillboardMedia (batch — single query)
        if (photoUrls.length > 0) {
          await tx.billboardMedia.createMany({
            data: photoUrls.map((p, i) => ({
              billboardId: billboard.id,
              fileUrl: p.url,
              fileType: MediaFileType.image,
              isPrimary: i === 0,
              sortOrder: i,
            })),
          });
        }

        // Create BillboardDesignGuideline (if media specs provided)
        if (body.formatType || body.mediaSpecs) {
          const formatType =
            mediaSpecs.formatType ?? body.formatType ?? "static";
          const isDigital = formatType === "digital";

          const allowedFileTypes = isDigital
            ? (mediaSpecs.acceptedCreativeFormats ?? ["mp4", "jpeg", "png"])
            : (mediaSpecs.acceptedArtworkFormats ?? [
                "cdr",
                "jpeg",
                "png",
                "pdf",
              ]);

          const resolution = isDigital
            ? mediaSpecs.pixelWidth && mediaSpecs.pixelHeight
              ? `${mediaSpecs.pixelWidth}×${mediaSpecs.pixelHeight}`
              : null
            : mediaSpecs.minimumResolutionDpi
              ? `${mediaSpecs.minimumResolutionDpi} DPI`
              : null;

          const notes = [
            mediaSpecs.safeMarginBleed,
            isDigital
              ? `Connectivity: ${mediaSpecs.connectivityType ?? "N/A"}`
              : `Material: ${mediaSpecs.printMaterial ?? "N/A"}`,
          ]
            .filter(Boolean)
            .join(" | ");

          await tx.billboardDesignGuideline.create({
            data: {
              billboardId: billboard.id,
              resolution,
              aspectRatio: mediaSpecs.aspectRatio ?? null,
              maxFileSizeMb: Number.parseInt(
                mediaSpecs.maxFileSizeMb ?? "50",
                10,
              ),
              allowedFileTypes,
              notes: notes || null,
            },
          });
        }

        // Create VerificationDocuments (batch — single query)
        if (
          docUploads.length > 0 ||
          body.licenseNumber ||
          body.licenseExpiryDate
        ) {
          const docRecords: Prisma.VerificationDocumentCreateManyInput[] = [];

          // Municipal license (uploaded or has metadata)
          if (
            docUploads.find((d) => d.docType === "municipal_license") ||
            body.licenseNumber
          ) {
            const doc = docUploads.find(
              (d) => d.docType === "municipal_license",
            );
            docRecords.push({
              ownerId: authUser.id,
              billboardId: billboard.id,
              documentType: "municipal_license",
              documentNumber: body.licenseNumber?.trim() || null,
              fileUrl: doc?.url ?? "",
              status: doc ? DocumentStatus.pending : DocumentStatus.pending,
              expiresAt: body.licenseExpiryDate
                ? new Date(body.licenseExpiryDate)
                : null,
            });
          }

          // Other uploaded documents
          for (const doc of docUploads) {
            if (doc.docType === "municipal_license") continue; // already handled
            docRecords.push({
              ownerId: authUser.id,
              billboardId: billboard.id,
              documentType: doc.docType,
              fileUrl: doc.url,
              status: DocumentStatus.pending,
              expiresAt:
                doc.docType === "structural_certificate" &&
                body.structuralCertificateExpiry
                  ? new Date(body.structuralCertificateExpiry)
                  : null,
            });
          }

          if (docRecords.length > 0) {
            await tx.verificationDocument.createMany({ data: docRecords });
          }
        }

        // Update User with GST / business info (if provided)
        if (body.gstNumber || body.businessAddress) {
          await tx.user.update({
            where: { id: authUser.id },
            data: {
              gstNumber: body.gstNumber?.trim() || undefined,
              businessAddress: body.businessAddress?.trim() || undefined,
            },
          });
        }

        // Fetch the complete billboard with relations (single query)
        const complete = await tx.billboard.findUniqueOrThrow({
          where: { id: billboard.id },
          select: {
            id: true,
            name: true,
            slug: true,
            lifecycleStatus: true,
            quickStatus: true,
            widthFt: true,
            heightFt: true,
            illumination: true,
            trafficSide: true,
            facingDirection: true,
            roadType: true,
            minBookingDuration: true,
            printingCost: true,
            address: {
              select: {
                id: true,
                neighborhood: true,
                landmark: true,
                lat: true,
                lng: true,
                city: { select: { id: true, name: true } },
              },
            },
            billboardType: { select: { id: true, name: true, code: true } },
            media: {
              select: {
                id: true,
                fileUrl: true,
                isPrimary: true,
                sortOrder: true,
              },
              orderBy: { sortOrder: "asc" },
            },
            pricing: {
              select: {
                id: true,
                pricePerMonth: true,
                currencyCode: true,
              },
            },
            verificationDocuments: {
              select: {
                id: true,
                documentType: true,
                documentNumber: true,
                status: true,
              },
            },
          },
        });

        return complete;
      });

      return { success: true, billboard: result };
    } catch (error) {
      // If transaction fails, clean up all uploaded files
      const allPaths = [
        ...photoUrls.map((p) => p.url),
        ...docUploads.map((d) => d.url),
      ];
      await deleteStorageFiles(token, allPaths);
      throw error;
    }
  }
}
