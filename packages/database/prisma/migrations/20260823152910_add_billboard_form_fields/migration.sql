-- DropIndex
DROP INDEX "billboards_attributes_idx";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "landmark" TEXT,
ADD COLUMN     "maps_link" TEXT;

-- AlterTable
ALTER TABLE "billboards" ADD COLUMN     "facing_direction" TEXT,
ADD COLUMN     "illumination" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "min_booking_duration" TEXT NOT NULL DEFAULT '1 month',
ADD COLUMN     "peak_hours" TEXT,
ADD COLUMN     "printing_cost" DECIMAL(12,2),
ADD COLUMN     "property_owner_details" TEXT,
ADD COLUMN     "road_type" TEXT,
ADD COLUMN     "traffic_side" TEXT,
ADD COLUMN     "vehicle_pedestrian_mix" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "business_address" TEXT,
ADD COLUMN     "gst_number" TEXT;

-- AlterTable
ALTER TABLE "verification_documents" ADD COLUMN     "document_number" TEXT;

-- CreateIndex
CREATE INDEX "billboards_attributes_idx" ON "billboards" USING GIN ("attributes" jsonb_path_ops);
