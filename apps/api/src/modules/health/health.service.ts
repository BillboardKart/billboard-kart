// api/src/modules/health/health.service.ts
import { prisma } from "@repo/database";

type DbStatus = "up" | "down";

export interface HealthCheckResult {
  success: boolean;
  status: "ok" | "unhealthy";
  db: DbStatus;
  uptime: number;
  timestamp: string;
}

export class HealthService {
  static async check(): Promise<HealthCheckResult> {
    const db = await this.checkDatabase();

    return {
      success: db === "up",
      status: db === "up" ? "ok" : "unhealthy",
      db,
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  private static async checkDatabase(): Promise<DbStatus> {
    try {
      await this.withTimeout(prisma.$queryRaw`SELECT 1`, 2000);
      return "up";
    } catch (error) {
      console.error("[HealthCheck] Database check failed:", error);
      return "down";
    }
  }

  private static withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Database check timed out after ${ms}ms`)), ms),
      ),
    ]);
  }
}
