import type { CurrentUserResponse, UserRole, UserStatus } from "@/lib/types";

const inFlightRequests = new Map<string, Promise<CurrentUserResponse | null>>();

function isUserRole(value: unknown): value is UserRole {
  return value === "advertiser" || value === "owner";
}

function isUserStatus(value: unknown): value is UserStatus {
  return (
    value === "active" ||
    value === "pending_verification" ||
    value === "suspended" ||
    value === "deactivated"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseCurrentUserResponse(
  value: unknown,
): CurrentUserResponse | null {
  if (!isRecord(value) || typeof value.authenticated !== "boolean") {
    return null;
  }

  if (!value.authenticated) {
    return { authenticated: false };
  }

  if (value.isOnboarded === false && isRecord(value.auth)) {
    const { id, email, fullName, avatarUrl } = value.auth;
    if (
      typeof id === "string" &&
      typeof email === "string" &&
      (typeof fullName === "string" || fullName === null) &&
      (typeof avatarUrl === "string" || avatarUrl === null)
    ) {
      return {
        authenticated: true,
        isOnboarded: false,
        auth: { id, email, fullName, avatarUrl },
      };
    }
    return null;
  }

  if (value.isOnboarded !== true || !isRecord(value.user)) return null;

  const user = value.user;
  if (
    typeof user.id !== "string" ||
    !(typeof user.tenantId === "string" || user.tenantId === null) ||
    typeof user.email !== "string" ||
    typeof user.fullName !== "string" ||
    !(typeof user.avatarUrl === "string" || user.avatarUrl === null) ||
    !isUserRole(user.primaryRole) ||
    !isUserStatus(user.status)
  ) {
    return null;
  }

  return {
    authenticated: true,
    isOnboarded: true,
    user: {
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      primaryRole: user.primaryRole,
      status: user.status,
    },
  };
}

export function fetchCurrentUser(
  accessToken: string,
): Promise<CurrentUserResponse | null> {
  const existingRequest = inFlightRequests.get(accessToken);
  if (existingRequest) return existingRequest;

  const request = (async () => {
    const endpoint = process.env.NEXT_PUBLIC_API_URL;
    if (!endpoint) throw new Error("NEXT_PUBLIC_API_URL is not configured.");

    const response = await fetch(`${endpoint}/api/v1/user/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw new Error("Unable to fetch current user.");
    return parseCurrentUserResponse(await response.json());
  })();

  inFlightRequests.set(accessToken, request);
  void request.then(
    () => inFlightRequests.delete(accessToken),
    () => inFlightRequests.delete(accessToken),
  );
  return request;
}
