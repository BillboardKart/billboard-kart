// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/lib/types";

function getRedirectBase(request: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return new URL(request.url).origin;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/browse";
  const base = getRedirectBase(request);

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Session exchange failed: ", error.message);
        return NextResponse.redirect(`${base}`);
      }

      const accessToken = data.session?.access_token;
      if (!accessToken) {
        return NextResponse.redirect(`${base}`);
        // return NextResponse.redirect(`${base}/login?error=missing_access_token`,);
      }

      // console.log("Syncing profile with Elysia backend...");
      const backendUrl = process.env.NEXT_PUBLIC_API_URL!;

      const apiResponse = await fetch(`${backendUrl}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!apiResponse.ok) {
        console.error("backend error status: ", apiResponse.status);
        return NextResponse.redirect(`${base}`);
        // return NextResponse.redirect(`${base}/login?error=backend_sync_failed`);
      }

      const res = await apiResponse.json();

      if (!res.authenticated) {
        return NextResponse.redirect(`${base}`);
        // return NextResponse.redirect(`${base}/login?error=unauthenticated`);
      }

      if (!res.isOnboarded) {
        // console.log("User DB record. Redirecting to Onboarding.");
        return NextResponse.redirect(`${base}/onboarding`);
      }

      const userRole = res.user?.primaryRole?.toLowerCase() || "user"; // Normalize role string to lowercase to prevent casing mismatches
      // console.log(`Active user role: ${userRole}. Processing redirect...`);

      const roleRoutingMap: Record<UserRole, string> = {
        owner: "/account",
        advertiser: "/browse",
      };

      // Find matched route or drop back to the default fallback page
      const targetDestination =
        userRole in roleRoutingMap
          ? roleRoutingMap[userRole as UserRole]
          : next;

      // console.log(`Routing '${userRole}' directly to: ${targetDestination}`);
      return NextResponse.redirect(`${base}${targetDestination}`);
    } catch (err) {
      console.error("<< AuthCallback >> Critical processing failure:", err);
      return NextResponse.redirect(`${base}`);
      // return NextResponse.redirect(`${base}/login?error=callback_exception`);
    }
  }

  return NextResponse.redirect(`${base}`);
  // return NextResponse.redirect(`${base}/login?error=auth_callback_failed`);
}
