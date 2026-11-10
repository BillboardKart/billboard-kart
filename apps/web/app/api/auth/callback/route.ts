// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";

import { parseCurrentUserResponse } from "@/lib/auth/current-user";
import { getRoleHomePath } from "@/lib/auth/role-redirect";
import { createClient } from "@/lib/supabase/server";

function getRedirectBase(request: Request): string {
  if (process.env.NODE_ENV !== "production") {
    return new URL(request.url).origin;
  }

  const fromEnv = process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
}

function redirectTo(base: string, path: string) {
  return NextResponse.redirect(new URL(path, base));
}

function redirectToLogin(
  base: string,
  error: string,
  description?: string | null,
) {
  const params = new URLSearchParams({ error });

  if (description) params.set("error_description", description);

  return redirectTo(base, `/login?${params.toString()}`);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const base = getRedirectBase(request);

  // Supabase redirects here with an error when a confirmation/OAuth link is
  // invalid, expired, or the provider request was denied.
  const callbackError =
    searchParams.get("error_description") ?? searchParams.get("error");

  if (callbackError) {
    return redirectToLogin(base, "auth_callback_failed", callbackError);
  }

  if (!code) {
    return redirectToLogin(
      base,
      "auth_callback_failed",
      "The authentication link is missing a verification code.",
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Session exchange failed:", error.message);
      return redirectToLogin(base, "auth_callback_failed", error.message);
    }

    const accessToken = data.session?.access_token;
    if (!accessToken) {
      return redirectToLogin(
        base,
        "auth_callback_failed",
        "Unable to establish an authenticated session.",
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
      return redirectToLogin(
        base,
        "auth_callback_failed",
        "The user service is not configured.",
      );
    }

    const apiResponse = await fetch(`${backendUrl}/api/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!apiResponse.ok) {
      console.error(
        "User profile sync failed with status:",
        apiResponse.status,
      );
      return redirectToLogin(
        base,
        "auth_callback_failed",
        "Unable to load your profile. Please try signing in again.",
      );
    }

    const user = parseCurrentUserResponse(await apiResponse.json());

    if (!user) {
      return redirectToLogin(
        base,
        "auth_callback_failed",
        "Unable to load a valid user profile. Please try signing in again.",
      );
    }

    if (!user.authenticated) {
      return redirectToLogin(
        base,
        "auth_callback_failed",
        "Authentication could not be verified.",
      );
    }

    if (!user.isOnboarded) {
      return redirectTo(base, "/onboarding");
    }

    // Always prefer the backend-provided primary role over the requested
    // `next` path so users land in the correct workspace.
    return redirectTo(base, getRoleHomePath(user.user.primaryRole));
  } catch (err) {
    console.error(
      "Auth callback processing failed:",
      err instanceof Error ? err.message : "Unknown error",
    );
    return redirectToLogin(
      base,
      "auth_callback_failed",
      "Something went wrong while completing authentication.",
    );
  }
}
