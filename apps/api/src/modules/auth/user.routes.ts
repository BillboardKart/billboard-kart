// api/src/modules/user/user.routes.ts
import { UsersService } from "@/src/modules/auth/user.service";
import { authPlugin } from "@/src/plugins/auth.plugin";
import { Elysia, t } from "elysia";

export const userRoutes = new Elysia({ prefix: "/user" })
  // Inject the auth context (authUser) from your Supabase plugin
  .use(authPlugin)
  .get("/me", async ({ authUser }) => {
    return await UsersService.getCurrentUser(authUser);
  })

  /**  POST /api/v1/user/onboard */
  .post(
    "/onboard",
    async ({ authUser, body, set }) => {
      const response = await UsersService.onboardUser(authUser, body);
      set.status = 201;
      return response;
    },
    {
      body: t.Object({
        fullName: t.String({ minLength: 2, maxLength: 150 }),
        primaryRole: t.Union([t.Literal("advertiser"), t.Literal("owner")]),
        businessName: t.String({ minLength: 2, maxLength: 200 }),
        businessUrl: t.Optional(t.String({ format: "uri" })),
        phone: t.String({ minLength: 8, maxLength: 20 }),
        cityId: t.String({ format: "uuid" }),
      }),
    },
  );
