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

// Supabase JWT Payload interface for local verification
export interface SupabaseJwtPayload {
  aud: string;
  exp: number;
  sub: string; // This is the User UUID
  email: string;
  phone: string;
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
  role: string;
  aal: string;
  amr: { method: string; timestamp: number }[];
  session_id: string;
}

export interface OnboardUserRequest {
  fullName: string;
  primaryRole: UserRoleCode;
  businessName: string;
  businessUrl?: string | null;
  phone: string;
  cityId: string;
}

/**
 * Response returned after successful onboarding.
 */
export interface OnboardUserResponse {
  success: boolean;
  message: string;
  userId: string;
}
