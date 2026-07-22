import { type LucideIcon } from "lucide-react";

export type City = {
  id: string;
  name: string;
  stateRegion: string | null;
  countryCode: string;
};

export type RentalTab =
  "all" | "active" | "scheduled" | "completed" | "cancelled";

export type UserStatus =
  "active" | "pending_verification" | "suspended" | "deactivated";

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

export type UserRole = "advertiser" | "owner";

export interface RoleOption {
  readonly id: UserRole;
  readonly title: string;
  readonly description: string;
  readonly badge: string | null;
}

export type CurrentUserResponse =
  | {
      authenticated: false;
    }
  | {
      authenticated: true;
      isOnboarded: false;
      auth: {
        id: string;
        email: string;
        fullName: string | null;
        avatarUrl: string | null;
      };
    }
  | {
      authenticated: true;
      isOnboarded: true;
      user: {
        id: string;
        tenantId: string | null;
        email: string;
        fullName: string;
        avatarUrl: string | null;
        primaryRole: "advertiser" | "owner";
        status: UserStatus;
      };
    };

export type UserState = {
  authenticated: boolean;
  isOnboarded: boolean;

  // Identity
  id: string | null;
  tenantId: string | null;

  // Profile
  email: string | null;
  phone: string | null;
  fullName: string | null;
  avatarUrl: string | null;

  // Roles
  primaryRole: UserRole | null;

  status: UserStatus | null;

  // Preferences
  defaultCityId: string | null;
  defaultLat: number | null;
  defaultLng: number | null;
  preferredCurrency: string | null;

  // Verification
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;

  // Business (coming soon)
  companyName: string | null;
  companyUrl: string | null;

  // Audit
  createdAt: string | null;
  updatedAt: string | null;
};

export const emptyUser: UserState = {
  authenticated: false,
  isOnboarded: false,

  id: null,
  tenantId: null,

  email: null,
  phone: null,
  fullName: null,
  avatarUrl: null,

  primaryRole: null,
  status: null,

  defaultCityId: null,
  defaultLat: null,
  defaultLng: null,
  preferredCurrency: null,

  emailVerifiedAt: null,
  phoneVerifiedAt: null,

  companyName: null,
  companyUrl: null,

  createdAt: null,
  updatedAt: null,
};
