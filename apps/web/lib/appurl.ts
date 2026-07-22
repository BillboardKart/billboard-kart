/**
 * Returns the canonical base URL of the app (e.g. https://billboardkart.vercel.app).
 * Uses NEXT_PUBLIC_APP_URL from env; falls back to window.location.origin on client.
 * Set NEXT_PUBLIC_APP_URL in Vercel for production to avoid redirect issues.
 */
export function getAppBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

export function getAuthCallbackUrl(): string {
  return `${getAppBaseUrl()}/api/auth/callback`;
}

export function getResetPasswordUrl(): string {
  return `${getAppBaseUrl()}/reset-password`;
}
