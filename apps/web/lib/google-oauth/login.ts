// lib/google-oauth/login.ts
import { createClient } from "@/lib/supabase/client";
import { getAuthCallbackUrl } from "@/lib/appurl";

export async function handleGoogleLogin() {
  const supabase = createClient();
  const redirectTo = getAuthCallbackUrl();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: false,
    },
  });

  // signInWithOAuth does NOT throw — it returns { data, error }
  if (error) {
    console.error("[GoogleAuth] OAuth error:", error.message);
    throw new Error(error.message);
  }
}

export async function handleSignOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[Auth] Sign-out error:", error.message);
  }
}
