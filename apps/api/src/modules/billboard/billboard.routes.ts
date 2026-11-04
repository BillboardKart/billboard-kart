// api/src/modules/billboard/billboard.routes.ts
import { Elysia } from "elysia";
import { authPlugin } from "@/src/plugins/auth.plugin";
import {
  BillboardService,
  ValidationError,
  NotFoundError,
} from "@/src/modules/billboard/billboard.service";

/**
 * POST /api/v1/billboards
 *
 * Creates a complete billboard listing from the 3-step form.
 * Accepts multipart/form-data with text fields + file uploads.
 *
 * Body is parsed manually from FormData because Elysia's static type
 * system does not natively support File fields in t.Object schemas.
 */
export const billboardRoutes = new Elysia({ prefix: "/billboards" })
  .use(authPlugin)
  .post(
    "/",
    async ({ authUser, token, request, set }) => {
      if (!authUser || !token) {
        set.status = 401;
        return { success: false, error: "Authentication required" };
      }

      // Parse FormData
      const formData = await request.formData();

      // Extract text fields (FormData.get returns string | File | null)
      const field = (key: string): string | undefined => {
        const v = formData.get(key);
        return typeof v === "string" ? v : undefined;
      };

      // Extract file fields
      const file = (key: string): File | undefined => {
        const v = formData.get(key);
        return v instanceof File ? v : undefined;
      };

      // Extract multiple files (photos[])
      const files = (key: string): File[] => {
        const result: File[] = [];
        // FormData.getAll returns all values for a key
        const values = formData.getAll(key);
        for (const v of values) {
          if (v instanceof File) result.push(v);
        }
        return result;
      };

      // Build request body
      const body = {
        billboardName: field("billboardName") ?? "",
        billboardTypeCode: field("billboardTypeCode") ?? "",
        cityId: field("cityId") ?? "",
        area: field("area") ?? "",
        landmark: field("landmark") ?? "",
        mapsLink: field("mapsLink"),
        latitude: field("latitude"),
        longitude: field("longitude"),
        widthFt: field("widthFt") ?? "",
        heightFt: field("heightFt") ?? "",
        illumination: field("illumination"),
        trafficSide: field("trafficSide"),
        facingDirection: field("facingDirection"),
        roadType: field("roadType"),
        dailyReach: field("dailyReach"),
        peakHours: field("peakHours"),
        vehiclePedestrianMix: field("vehiclePedestrianMix"),
        visibilityNotes: field("visibilityNotes"),
        monthlyRate: field("monthlyRate") ?? "",
        minBookingDuration: field("minBookingDuration"),
        printingCost: field("printingCost"),
        isAvailable: field("isAvailable"),
        formatType: field("formatType"),
        mediaSpecs: field("mediaSpecs"),
        propertyOwnerDetails: field("propertyOwnerDetails"),
        licenseNumber: field("licenseNumber"),
        licenseExpiryDate: field("licenseExpiryDate"),
        structuralCertificateExpiry: field("structuralCertificateExpiry"),
        gstNumber: field("gstNumber"),
        businessAddress: field("businessAddress"),
        contactPersonName: field("contactPersonName"),
        contactPhone: field("contactPhone"),
        contactEmail: field("contactEmail"),
      };

      const photos = files("photos");
      if (photos.length < 3) {
        set.status = 400;
        return {
          success: false,
          error: "At least 3 photos are required",
        };
      }

      // Create billboard
      try {
        const result = await BillboardService.createBillboard(
          authUser,
          token,
          body,
          photos,
          {
            municipalLicense: file("municipalLicense"),
            proofOfOwnership: file("proofOfOwnership"),
            nocCertificate: file("nocCertificate"),
            structuralCertificate: file("structuralCertificate"),
            gstCertificate: file("gstCertificate"),
          },
        );

        set.status = 201;
        return result;
      } catch (error) {
        if (error instanceof ValidationError) {
          set.status = 400;
          return {
            success: false,
            error: error.message,
            details: error.details,
          };
        }
        if (error instanceof NotFoundError) {
          set.status = 404;
          return { success: false, error: error.message };
        }
        throw error; // Let global error handler deal with unexpected errors
      }
    },
    // No body schema — we parse FormData manually for file upload support
  );
