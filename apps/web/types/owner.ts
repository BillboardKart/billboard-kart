// types/owner.ts
import { OptionItem } from "@/types/form";

// types/owner.ts
export interface BillboardFormState {
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
  visibilityNotes: string;
  photos: string[];
  monthlyRate: string;
  isAvailable: boolean;
}

export interface SelectGroupProps {
  label: string;
  icon?: React.ReactNode;
  options: string[] | OptionItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  columns?: number;
}
