// api/src/plugin/auth.plugin.ts
import { createClient } from "@supabase/supabase-js";
import { Elysia } from "elysia";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) throw new Error("Missing SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing SUPABASE_PUBLISHABLE_KEY");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authPlugin = (app: Elysia) =>
  app.derive(async ({ request }) => {
    console.log("\n========== AUTH ==========");

    const authorization = request.headers.get("authorization");

    console.log("Authorization Header:");
    console.log(authorization);

    if (!authorization) {
      console.warn("[AUTH] Missing Authorization header.");
      return { authUser: null };
    }

    if (!authorization.startsWith("Bearer ")) {
      console.warn("[AUTH] Invalid Authorization header.");
      return { authUser: null };
    }

    const token = authorization.substring(7);
    console.log("[AUTH] Token length:", token.length);
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("[AUTH] Supabase validation failed.");
      console.error(error);
      return { authUser: null };
    }

    console.log("[AUTH] User authenticated:", data.user.id);
    return { authUser: data.user };
  });
