// tests/connection.test.ts
import "dotenv/config";

import { afterAll, describe, expect, test } from "bun:test";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString)
  throw new Error("DATABASE_URL environment variable is missing.");

const pool = new Pool({ connectionString, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter: adapter });

afterAll(async () => {
  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
});

describe("Database Connection", () => {
  test("connects successfully to Supabase PostgreSQL", async () => {
    const result = await prisma.$queryRaw<
      { now: Date }[]
    >`SELECT NOW() AS now;`;

    expect(result).toHaveLength(1);
    expect(result[0]?.now).toBeInstanceOf(Date);
  });

  test("can query seeded tables", async () => {
    const count = await prisma.user.count();

    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("prisma client is operational", async () => {
    const users = await prisma.user.findMany({
      take: 1,
      select: { id: true, email: true },
    });

    expect(Array.isArray(users)).toBe(true);
  });
});
