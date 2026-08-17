import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export type Status =
  | "Live"
  | "Pending review"
  | "Needs documents"
  | "Draft"
  | "Unavailable";

export type Listing = {
  id: string;
  title: string;
  city: string;
  price: string;
  image: string;
  status: Status;
};

export const statusStyles: Record<Status, string> = {
  Live: "bg-[#dcfce7] text-[#008236]",
  "Pending review": "bg-[#fef3c6] text-[#bb4d00]",
  "Needs documents": "bg-[#ffedd4] text-[#ca3500]",
  Draft: "bg-[#e5e5e5] text-[#404040]",
  Unavailable: "bg-[#ffe2e2] text-[#c10007]",
};
