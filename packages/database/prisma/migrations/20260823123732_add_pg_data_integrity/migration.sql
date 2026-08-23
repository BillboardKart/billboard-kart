-- CreateTable (Prisma-generated: schema indexes and constraints)

-- GIN index on billboards.attributes for JSONB containment queries
CREATE INDEX "billboards_attributes_idx" ON "billboards" USING gin ("attributes");

-- Partial unique index: one primary image per billboard
CREATE UNIQUE INDEX "billboard_media_billboard_id_is_primary_key" ON "billboard_media" ("billboard_id", "is_primary") WHERE "is_primary" = true;

-- Partial unique index: one active price per billboard+currency
CREATE UNIQUE INDEX "billboard_pricing_billboard_id_currency_code_key" ON "billboard_pricing" ("billboard_id", "currency_code") WHERE "effective_to" IS NULL;

-- ============================================================
-- Postgres-only constructs (Prisma schema cannot express these)
-- ============================================================

-- btree_gist: required for UUID operator class in GiST exclusion constraints
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- 1. Generated column: size_display on billboards
-- Existing column is always NULL; replace with a generated STORED column
ALTER TABLE "billboards" DROP COLUMN "size_display";
ALTER TABLE "billboards" ADD COLUMN "size_display" TEXT
  GENERATED ALWAYS AS (
    COALESCE("width_ft"::TEXT, '?') || E'\u00d7' || COALESCE("height_ft"::TEXT, '?') || ' ft'
  ) STORED;

-- 2. Generated column: date_range on booking_items
-- Existing column is always NULL; replace with a generated STORED column
ALTER TABLE "booking_items" DROP COLUMN "date_range";
ALTER TABLE "booking_items" ADD COLUMN "date_range" DATERANGE
  GENERATED ALWAYS AS (daterange("start_date", "end_date", '[]')) STORED;

-- 3. Generated column: geo on addresses
-- Existing column is always NULL; replace with a generated STORED column
ALTER TABLE "addresses" DROP COLUMN "geo";
ALTER TABLE "addresses" ADD COLUMN "geo" GEOGRAPHY(Point, 4326)
  GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint("lng", "lat"), 4326)::GEOGRAPHY) STORED;

-- 4. EXCLUDE constraint: double-booking prevention (must come AFTER date_range)
-- Only enforced for active booking statuses
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'booking_no_overlap'
  ) THEN
    ALTER TABLE "booking_items"
      ADD CONSTRAINT "booking_no_overlap"
      EXCLUDE USING gist (
        "billboard_id" WITH =,
        "date_range" WITH &&
      ) WHERE (
        "status" IN (
          'pending_payment'::"booking_status",
          'pending_owner_approval'::"booking_status",
          'confirmed'::"booking_status",
          'live'::"booking_status"
        )
      );
  END IF;
END $$;

-- 5. CHECK constraint: 50MB upload cap on artwork_uploads
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'artwork_max_50mb'
  ) THEN
    ALTER TABLE "artwork_uploads"
      ADD CONSTRAINT "artwork_max_50mb"
      CHECK ("file_size_bytes" <= 52428800);
  END IF;
END $$;
