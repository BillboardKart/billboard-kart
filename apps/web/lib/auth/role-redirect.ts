import type { UserRole } from "@/lib/types";

export const ROLE_HOME_PATH: Record<UserRole, string> = {
  advertiser: "/browse",
  owner: "/account",
};

/**
 * Returns the post-authentication landing page for a backend-provided role.
 * Unknown or missing roles fail closed to onboarding instead of granting a
 * role-specific workspace.
 */
export function getRoleHomePath(role: string | null | undefined): string {
  if (typeof role !== "string") return "/onboarding";

  const normalized = role.trim().toLowerCase();

  if (normalized === "owner") return ROLE_HOME_PATH.owner;
  if (normalized === "advertiser") return ROLE_HOME_PATH.advertiser;

  return "/onboarding";
}
