// api/src/modules/city/city.routes.ts
import { CityService } from "@/src/modules/city/city.service";
import { Elysia } from "elysia";

export const cityRoutes = new Elysia({ prefix: "/cities" })
  // GET /api/v1/city return all the cities
  .get("/", async () => {
    // WARNING: Add pagination & user should also type and search for a city
    return await CityService.getCities();
  });
