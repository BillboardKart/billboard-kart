import { type LucideIcon } from "lucide-react";

export type RentalTab =
  "all" | "active" | "scheduled" | "completed" | "cancelled";

export interface Rental {
  id: string;
  name: string;
  city: string;
  type: "Digital" | "Static" | "LED";
  size: string;
  status: "Live" | "Ends soon" | "Pending";
  ends: string;
  spend: string;
  reach: string;
  artwork: "Approved" | "Needs update" | "In review";
  image: string;
}

export interface StatCardProps {
  label: string;
  value: string;
  pill: { text: string; tone: "success" | "warning" };
  footer: React.ReactNode;
  progress: number;
  progressTone: "foreground" | "success";
}

export interface MiniStatProps {
  label: string;
  value: string;
}

export interface QuickActionProps {
  icon: LucideIcon;
  title: string;
  sub: string;
}
