// api/src/modules/advertiser/advertiser.routes.ts
import { Elysia, t } from "elysia";
import {
  authPlugin,
  authorizeBusinessOperation,
} from "@/src/plugins/auth.plugin";
import {
  BillboardService,
  NotFoundError,
} from "@/src/modules/billboard/billboard.service";

/**
 * Advertiser discovery endpoints — authenticated, advertiser-role only.
 *
 * Visibility rules are enforced server-side by BillboardService:
 * only billboards with lifecycleStatus = active and deletedAt = null
 * are returned. Draft, pending_review, inactive, suspended and
 * archived inventory is never exposed here.
 *
 * GET /api/v1/advertiser/billboards
 * GET /api/v1/advertiser/billboards/:idOrSlug (uuid or slug)
 */
export const advertiserRoutes = new Elysia({ prefix: "/advertiser" })
  .use(authPlugin)
  .get(
    "/billboards",
    async ({ authUser, token, query, set }) => {
      const authorization = await authorizeBusinessOperation(
        authUser,
        token,
        "advertiser",
      );
      if (!authorization.allowed) {
        set.status = authorization.status;
        return { success: false, error: authorization.error };
      }

      return await BillboardService.listBillboards(query);
    },
    {
      query: t.Object({
        page: t.Optional(
          t.RegExp(/^[1-9]\d*$/, { error: "page must be a positive integer" }),
        ),
        limit: t.Optional(
          t.RegExp(/^[1-9]\d*$/, { error: "limit must be a positive integer" }),
        ),
        cityId: t.Optional(t.String({ format: "uuid" })),
        quickStatus: t.Optional(
          t.Union([
            t.Literal("available"),
            t.Literal("booked"),
            t.Literal("maintenance"),
          ]),
        ),
        search: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
      }),
    },
  )
  .get(
    "/billboards/:idOrSlug",
    async ({ authUser, token, params, set }) => {
      const authorization = await authorizeBusinessOperation(
        authUser,
        token,
        "advertiser",
      );
      if (!authorization.allowed) {
        set.status = authorization.status;
        return { success: false, error: authorization.error };
      }

      try {
        return await BillboardService.getBillboard(params.idOrSlug);
      } catch (error) {
        if (error instanceof NotFoundError) {
          set.status = 404;
          return { success: false, error: error.message };
        }
        throw error;
      }
    },
    {
      params: t.Object({
        idOrSlug: t.String({ minLength: 1, maxLength: 120 }),
      }),
    },
  );
