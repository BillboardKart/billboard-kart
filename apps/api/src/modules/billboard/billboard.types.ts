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

/** Query params accepted by the public listing endpoint. */
export interface ListBillboardsQuery {
  page?: string;
  limit?: string;
  cityId?: string;
  quickStatus?: string;
  search?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/** Shape of a single billboard item in the listing response. */
export type BillboardListItem = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sizeDisplay: string | null;
  widthFt: unknown;
  heightFt: unknown;
  lifecycleStatus: string;
  quickStatus: string;
  illumination: boolean;
  dailyReach: number | null;
  ratingAvg: unknown;
  ratingCount: number;
  minBookingDuration: string;
  billboardType: { id: string; name: string; code: string; category: { name: string } };
  address: {
    neighborhood: string | null;
    landmark: string | null;
    lat: number;
    lng: number;
    city: { id: string; name: string };
  };
  media: Array<{
    id: string;
    fileUrl: string;
    isPrimary: boolean;
    sortOrder: number;
  }>;
  pricing: Array<{ pricePerMonth: unknown; currencyCode: string }>;
  tags: Array<{ slug: string; label: string }>;
  createdAt: string;
};

/** Shape of a billboard item in the listing response. */
export interface BillboardListResponse {
  success: true;
  data: BillboardListItem[];
  pagination: PaginationMeta;
}

export interface GetBillboardResponse {
  success: true;
  data: BillboardListItem;
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
