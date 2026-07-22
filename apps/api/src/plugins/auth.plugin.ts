// api/src/plugin/auth.plugin.ts
import { createClient } from "@supabase/supabase-js";
import { Elysia } from "elysia";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHABLE_KEY!,
);

// Export as a factory function to preserve strict TS type inference across files
export const authPlugin = (app: Elysia) =>
  app.derive(async ({ request }) => {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return { authUser: null };
    }

    const token = authorization.slice(7);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return { authUser: null };
    }

    return { authUser: data.user };
  });
