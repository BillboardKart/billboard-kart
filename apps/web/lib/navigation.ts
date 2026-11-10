import { ComputerIcon, FileText, MapPin, Upload, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { UserRole } from "@/lib/types";

type NavigationItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  ownerOnly?: boolean;
  advertiserOnly?: boolean;
};

export const navigationItems: NavigationItem[] = [
  { to: "/browse", label: "Browse", icon: MapPin },
  {
    to: "/rentals",
    label: "My Rentals",
    icon: FileText,
    advertiserOnly: true,
  },
  {
    to: "/owner/my-inventory",
    label: "My Inventory",
    icon: ComputerIcon,
    ownerOnly: true,
  },
  { to: "/upload", label: "Upload", icon: Upload, ownerOnly: true },
  { to: "/account", label: "Account", icon: User },
];

export function getNavigationItems(role: UserRole | null) {
  return navigationItems.filter(
    (item) =>
      (!item.ownerOnly || role === "owner") &&
      (!item.advertiserOnly || role === "advertiser"),
  );
}
