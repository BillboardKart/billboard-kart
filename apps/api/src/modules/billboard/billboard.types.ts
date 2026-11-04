// api/src/modules/billboard/billboard.types.ts

/**
 * All fields arrive as strings from multipart/form-data.
 * Files are handled separately by Elysia's multipart parser.
 */
export interface CreateBillboardRequest {
  // Step 1 — Billboard Details
  billboardName: string;
  billboardTypeCode: string;
  cityId: string;
  area: string;
  landmark: string;
  mapsLink?: string;
  latitude?: string;
  longitude?: string;
  widthFt: string;
  heightFt: string;
  illumination?: string;
  trafficSide?: string;
  facingDirection?: string;
  roadType?: string;
  dailyReach?: string;
  peakHours?: string;
  vehiclePedestrianMix?: string;
  visibilityNotes?: string;
  monthlyRate: string;
  minBookingDuration?: string;
  printingCost?: string;
  isAvailable?: string;

  // Step 2 — Media Specs
  formatType?: string;
  mediaSpecs?: string; // JSON string

  // Step 3 — Document Verification
  propertyOwnerDetails?: string;
  licenseNumber?: string;
  licenseExpiryDate?: string;
  structuralCertificateExpiry?: string;
  gstNumber?: string;
  businessAddress?: string;
  contactPersonName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface MediaSpecsData {
  formatType?: "static" | "digital";

  // Static fields
  acceptedArtworkFormats?: string[];
  safeMarginBleed?: string;
  minimumResolutionDpi?: string;
  printMaterial?: string;
  otherMaterial?: string;

  // Digital fields
  pixelWidth?: string;
  pixelHeight?: string;
  aspectRatio?: string;
  loopDuration?: string;
  slotDuration?: string;
  playsPerHour?: string;
  playsPerDay?: string;
  supportsAnimation?: boolean;
  supportsVideo?: boolean;
  supportsAudio?: boolean;
  acceptedCreativeFormats?: string[];
  maxFileSizeMb?: string;
  connectivityType?: string;
  operatingHours?: string;
  schedulingType?: string;
  weatherContextTriggers?: boolean;
  colourDepth?: string;
  ppiDpi?: string;
  contentRefreshRate?: string;
  remoteContentManagement?: boolean;

  // Generic fallback for any additional fields
  [key: string]: unknown;
}

export interface CreateBillboardResponse {
  success: true;
  billboard: {
    id: string;
    name: string;
    slug: string;
    lifecycleStatus: string;
    quickStatus: string;
    widthFt: unknown;
    heightFt: unknown;
    illumination: boolean;
    trafficSide: string | null;
    facingDirection: string | null;
    roadType: string | null;
    minBookingDuration: string;
    printingCost: unknown;
    address: {
      id: string;
      neighborhood: string | null;
      landmark: string | null;
      lat: number;
      lng: number;
      city: { id: string; name: string };
    };
    billboardType: { id: string; name: string; code: string };
    media: Array<{
      id: string;
      fileUrl: string;
      isPrimary: boolean;
      sortOrder: number;
    }>;
    pricing: Array<{
      id: string;
      pricePerMonth: unknown;
      currencyCode: string;
    }>;
    verificationDocuments: Array<{
      id: string;
      documentType: string;
      documentNumber: string | null;
      status: string;
    }>;
  };
}
