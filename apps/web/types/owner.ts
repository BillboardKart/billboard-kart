// types/owner.ts
import { OptionItem } from "@/types/form";

export type Step = "details" | "mediaspecs" | "docverification";

export interface BillboardFormState {
  // Step 1 — Billboard Details
  billboardName: string;
  city: string;
  area: string;
  landmark: string;
  latitude: string;
  longitude: string;
  billboardType: string;
  width: string;
  height: string;
  illumination: "Yes" | "No";
  trafficSide: "Left" | "Right" | "Not Applicable";
  facingDirection: string;
  roadType: string;
  dailyTraffic: string;
  peakHours: string;
  vehiclePedestrianMix: string;
  visibilityNotes: string;
  photos: string[];
  photoFiles: File[];
  monthlyRate: string;
  isAvailable: boolean;
  minBookingDuration: string;
  printingCost: string;
  mapsLink: string;
  cityChip: string;

  // Step 2 — Media Specs
  formatType: "static" | "digital";
  mediaSpecs: Record<string, unknown>;

  // Step 3 — Document Verification
  propertyOwnerDetails: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  structuralCertificateExpiry: string;
  gstNumber: string;
  businessAddress: string;
  contactPersonName: string;
  contactPhone: string;
  contactEmail: string;
  municipalLicense: File | null;
  proofOfOwnership: File | null;
  nocCertificate: File | null;
  structuralCertificate: File | null;
  gstCertificate: File | null;
}

export const emptyBillboardForm: BillboardFormState = {
  billboardName: "",
  city: "",
  area: "",
  landmark: "",
  latitude: "19.0760",
  longitude: "72.8777",
  billboardType: "",
  width: "",
  height: "",
  illumination: "Yes",
  trafficSide: "Left",
  facingDirection: "North",
  roadType: "Highway",
  dailyTraffic: "",
  peakHours: "",
  vehiclePedestrianMix: "",
  visibilityNotes: "",
  photos: [],
  photoFiles: [],
  monthlyRate: "",
  isAvailable: true,
  minBookingDuration: "1 month",
  printingCost: "",
  mapsLink: "",
  cityChip: "",
  formatType: "static",
  mediaSpecs: {},
  propertyOwnerDetails: "",
  licenseNumber: "",
  licenseExpiryDate: "",
  structuralCertificateExpiry: "",
  gstNumber: "",
  businessAddress: "",
  contactPersonName: "",
  contactPhone: "",
  contactEmail: "",
  municipalLicense: null,
  proofOfOwnership: null,
  nocCertificate: null,
  structuralCertificate: null,
  gstCertificate: null,
};

export interface SelectGroupProps {
  label: string;
  icon?: React.ReactNode;
  options: string[] | OptionItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  columns?: number;
}
