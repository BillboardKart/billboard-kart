// api/src/plugin/auth.plugin.ts
import { prisma, UserStatus, type UserRoleCode } from "@repo/database";
import { createClient, type User } from "@supabase/supabase-js";
import { Elysia } from "elysia";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) throw new Error("Missing SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing SUPABASE_PUBLISHABLE_KEY");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authPlugin = (app: Elysia) =>
  app.derive(async ({ request }) => {
    const authorization = request.headers.get("authorization");

    if (!authorization) {
      console.warn("[AUTH] Missing Authorization header.");
      return { authUser: null };
    }

    if (!authorization.startsWith("Bearer ")) {
      console.warn("[AUTH] Invalid Authorization header.");
      return { authUser: null };
    }

    const token = authorization.substring(7);
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("[AUTH] Supabase validation failed:", error.message);
      return { authUser: null };
    }

    return { authUser: data.user, token };
  });

export async function authorizeBusinessOperation(
  authUser: User | null,
  token: string | undefined,
  requiredRole: UserRoleCode,
) {
  if (!authUser?.id || !token) {
    return {
      allowed: false,
      status: 401,
      error: "Authentication required",
    } as const;
  }

  const account = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: { status: true, primaryRole: true },
  });

  if (
    account?.status !== UserStatus.active ||
    account.primaryRole !== requiredRole
  ) {
    return { allowed: false, status: 403, error: "Forbidden" } as const;
  }

  return { allowed: true, authUser, token } as const;
}
