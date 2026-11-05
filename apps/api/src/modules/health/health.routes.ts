// api/src/modules/health/health.routes.ts
import { HealthService } from "@/src/modules/health/health.service";
import { Elysia } from "elysia";

export const healthRoutes = new Elysia({ prefix: "/health" })
  // GET /api/v1/health returns liveness & readiness status
  .get("/", async ({ set }) => {
    const result = await HealthService.check();

    set.status = result.success ? 200 : 503;

    return result;
  });
