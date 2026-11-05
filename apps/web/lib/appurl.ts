// lib/appurl.ts
/**
 * Returns the canonical base URL of the app.
 * On the client this is always the actual browser origin, so dev never redirects to prod.
 * On the server it uses NEXT_PUBLIC_APP_URL (set in Vercel for production).
 */
export function getAppBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
}

export function getAuthCallbackUrl(): string {
  return `${getAppBaseUrl()}/api/auth/callback`;
}

export function getResetPasswordUrl(): string {
  return `${getAppBaseUrl()}/reset-password`;
}
