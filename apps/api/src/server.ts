// api/src/index.ts
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { userRoutes } from "@/src/modules/auth/user.routes";
import { cityRoutes } from "@/src/modules/city/city.routes";

const required = [
  "PORT",
  "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY",
  "DATABASE_URL",
  "TENANT_ID",
  "INITIAL_USER_PASSWORD",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const app = new Elysia({ prefix: "/api/v1" })

  // Global error handler
  .onError(({ code, error, set }) => {
    console.error(`[API Error] ${code}:`, error);

    set.status = code === "NOT_FOUND" ? 404 : 500;

    // Safely extract the message by verifying it is a standard Error object
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    return {
      success: false,
      error: errorMessage,
    };
  })

  .use(cors({ origin: "http://localhost:3000" })) // replace with the deployed url
  // Mount Domain Modules
  .use(userRoutes)
  .use(cityRoutes)

  .listen(process.env.PORT ?? 3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
