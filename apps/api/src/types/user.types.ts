// api/src/types/user.type.ts
import type { UserRoleCode } from "@repo/database";

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
        primaryRole: string;
        status: string;
      };
    };

export interface OnboardUserRequest {
  fullName: string;
  primaryRole: UserRoleCode;
  businessName: string;
  businessUrl?: string | null;
  phone: string;
  cityId: string;
}
