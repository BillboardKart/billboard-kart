// api/src/modules/city/city.routes.ts
import { CityService } from "@/src/modules/city/city.service";
import { Elysia, t } from "elysia";

export const cityRoutes = new Elysia({ prefix: "/cities" })
  // GET /api/v1/city return all the cities
  .get(
    "/",
    async ({ query }) => {
      // WARNING: Add pagination & user should also type and search for a city
      return query.scope === "billboard"
        ? await CityService.getBillboardCities()
        : await CityService.getCities();
    },
    { query: t.Object({ scope: t.Optional(t.Literal("billboard")) }) },
  );
