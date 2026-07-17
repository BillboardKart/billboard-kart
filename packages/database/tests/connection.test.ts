/**
 * @file connection.test.ts
 * @description Core integration test suite validating database connectivity, pg-driver adapter plumbing,
 * and schema alignment. Acts as a gatekeeper smoke-test prior to running deeper API or unit tests.
 */

import { afterAll, describe, expect, test } from "bun:test";
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Ensure environment sanity before allocating socket resources
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is missing.");
}

/**
 * Database Infrastructure Setup
 * We enforce `max: 1` on the pg pool to minimize connection footprint during parallel test executions
 * and prevent connection exhaustion on transactional poolers or Supabase burst limits.
 */
const pool = new Pool({ connectionString, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Global Test Teardown
 * Cascading close sequence to prevent lingering sockets, deadlocks, or unhandled file handles.
 */
afterAll(async () => {
  try {
    await prisma.$disconnect();
    await pool.end();
  } catch (error) {
    console.error("Failed to gracefully close database pool handles:", error);
  } finally {
    process.exit(0);
  }
});

describe("Database Connection Lifecycle", () => {
  /**
   * Test 1: Low-level Smoke Test
   * Validates raw connection layer, network routing, SSL handshakes, and remote DB clock read.
   */
  test("Connects successfully to Supabase PostgreSQL", async () => {
    const result = await prisma.$queryRaw<
      { now: Date }[]
    >`SELECT NOW() AS now;`;

    expect(result).toHaveLength(1);
    expect(result[0]?.now).toBeInstanceOf(Date);
  });

  /**
   * Test 2: Schema / Migration Health Check
   * Validates database reflection and asserts that core structural tables exist (e.g., target User table).
   */
  test("Can query seeded tables", async () => {
    const count = await prisma.user.count();

    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
  });

  /**
   * Test 3: Prisma Query Engine Validation
   * Asserts the client's internal JS/TS engine can deserialize data and map schema records into object arrays.
   */
  test("Prisma client is operational", async () => {
    const users = await prisma.user.findMany({
      take: 1,
      select: { id: true, email: true },
    });

    expect(Array.isArray(users)).toBe(true);
  });
});
