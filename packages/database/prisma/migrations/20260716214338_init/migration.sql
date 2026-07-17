-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'pending_verification', 'suspended', 'deactivated');

-- CreateEnum
CREATE TYPE "user_role_code" AS ENUM ('advertiser', 'owner', 'admin', 'tenant_admin', 'support');

-- CreateEnum
CREATE TYPE "billboard_lifecycle_status" AS ENUM ('draft', 'pending_review', 'active', 'inactive', 'suspended', 'archived');

-- CreateEnum
CREATE TYPE "billboard_quick_status" AS ENUM ('available', 'booked', 'maintenance');

-- CreateEnum
CREATE TYPE "media_file_type" AS ENUM ('image', 'video');

-- CreateEnum
CREATE TYPE "rate_type" AS ENUM ('daily', 'weekly', 'monthly', 'custom_range');

-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('pending_payment', 'confirmed', 'partially_cancelled', 'cancelled', 'completed');

-- CreateEnum
CREATE TYPE "booking_status" AS ENUM ('pending_payment', 'pending_owner_approval', 'confirmed', 'live', 'completed', 'cancelled', 'rejected', 'disputed');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded', 'cancelled');

-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('charge', 'refund', 'payout');

-- CreateEnum
CREATE TYPE "contract_status" AS ENUM ('draft', 'active', 'superseded', 'void');

-- CreateEnum
CREATE TYPE "document_status" AS ENUM ('pending', 'approved', 'rejected', 'expired');

-- CreateEnum
CREATE TYPE "payout_status" AS ENUM ('scheduled', 'processing', 'paid', 'failed', 'on_hold');

-- CreateEnum
CREATE TYPE "fee_type" AS ENUM ('flat', 'percentage');

-- create postgis extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- create citext extension
CREATE EXTENSION IF NOT EXISTS citext;

-- CreateTable
CREATE TABLE "artwork_uploads" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "uploaded_by" UUID NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_type" "media_file_type" NOT NULL,
    "mime_type" TEXT NOT NULL,
    "file_size_bytes" BIGINT NOT NULL,
    "width_px" INTEGER,
    "height_px" INTEGER,
    "duration_seconds" DECIMAL(6,2),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artwork_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID,
    "advertiser_id" UUID NOT NULL,
    "status" "order_status" NOT NULL DEFAULT 'pending_payment',
    "currency_code" CHAR(3) NOT NULL,
    "subtotal_amount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "tax_percentage" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "tax_amount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "service_fee_amount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "total_amount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "cancellable_until" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "billboard_id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "date_range" daterange,
    "rate_type" "rate_type" NOT NULL,
    "currency_code" CHAR(3) NOT NULL,
    "unit_price" DECIMAL(12,2) NOT NULL,
    "line_subtotal" DECIMAL(12,2) NOT NULL,
    "artwork_upload_id" UUID,
    "status" "booking_status" NOT NULL DEFAULT 'pending_payment',
    "cancelled_at" TIMESTAMPTZ,
    "cancellation_reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billboard_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "billboard_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billboard_types" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_badge" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "billboard_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billboards" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID,
    "owner_id" UUID NOT NULL,
    "billboard_type_id" UUID NOT NULL,
    "address_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "width_ft" DECIMAL(6,2),
    "height_ft" DECIMAL(6,2),
    "size_display" text,
    "visibility_label" TEXT,
    "daily_reach" INTEGER,
    "lifecycle_status" "billboard_lifecycle_status" NOT NULL DEFAULT 'draft',
    "quick_status" "billboard_quick_status" NOT NULL DEFAULT 'available',
    "rating_avg" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "rating_count" INTEGER NOT NULL DEFAULT 0,
    "attributes" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "billboards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billboard_tags" (
    "billboard_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "billboard_tags_pkey" PRIMARY KEY ("billboard_id","tag_id")
);

-- CreateTable
CREATE TABLE "billboard_media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "billboard_id" UUID NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_type" "media_file_type" NOT NULL DEFAULT 'image',
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "billboard_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billboard_design_guidelines" (
    "billboard_id" UUID NOT NULL,
    "resolution" TEXT,
    "aspect_ratio" TEXT,
    "max_file_size_mb" INTEGER NOT NULL DEFAULT 50,
    "allowed_file_types" TEXT[] DEFAULT ARRAY['jpg', 'png', 'mp4']::TEXT[],
    "notes" TEXT,

    CONSTRAINT "billboard_design_guidelines_pkey" PRIMARY KEY ("billboard_id")
);

-- CreateTable
CREATE TABLE "contract_templates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" "contract_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contract_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_contract_acceptances" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "contract_template_id" UUID NOT NULL,
    "accepted_by" UUID NOT NULL,
    "ip_address" INET,
    "user_agent" TEXT,
    "accepted_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_contract_acceptances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "state_region" TEXT,
    "country_code" CHAR(2) NOT NULL,
    "timezone" TEXT NOT NULL,
    "centroid" geography(Point, 4326),

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "neighborhood" TEXT,
    "city_id" UUID NOT NULL,
    "postal_code" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "geo" geography(Point, 4326),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "actor_user_id" UUID,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" UUID NOT NULL,
    "before_state" JSONB,
    "after_state" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "method_type" TEXT NOT NULL,
    "last4" TEXT,
    "brand" TEXT,
    "provider_customer_id" TEXT,
    "provider_payment_method_id" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "payment_method_id" UUID,
    "type" "transaction_type" NOT NULL,
    "status" "payment_status" NOT NULL DEFAULT 'pending',
    "amount" DECIMAL(12,2) NOT NULL,
    "currency_code" CHAR(3) NOT NULL,
    "provider_transaction_id" TEXT,
    "provider_response" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payouts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_id" UUID NOT NULL,
    "currency_code" CHAR(3) NOT NULL,
    "gross_amount" DECIMAL(12,2) NOT NULL,
    "platform_fee_amount" DECIMAL(12,2) NOT NULL,
    "net_amount" DECIMAL(12,2) NOT NULL,
    "status" "payout_status" NOT NULL DEFAULT 'scheduled',
    "provider_reference" TEXT,
    "scheduled_at" TIMESTAMPTZ,
    "paid_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payout_items" (
    "payout_id" UUID NOT NULL,
    "booking_item_id" UUID NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "payout_items_pkey" PRIMARY KEY ("payout_id","booking_item_id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "code" CHAR(3) NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimal_places" SMALLINT NOT NULL DEFAULT 2,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "billboard_pricing" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "billboard_id" UUID NOT NULL,
    "currency_code" CHAR(3) NOT NULL,
    "price_per_day" DECIMAL(12,2),
    "price_per_week" DECIMAL(12,2) NOT NULL,
    "price_per_month" DECIMAL(12,2) NOT NULL,
    "effective_from" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMPTZ,

    CONSTRAINT "billboard_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_fee_rules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID,
    "name" TEXT NOT NULL,
    "fee_type" "fee_type" NOT NULL,
    "value" DECIMAL(8,4) NOT NULL,
    "applies_to_type_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMPTZ,

    CONSTRAINT "platform_fee_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "billboard_id" UUID NOT NULL,
    "reviewer_id" UUID NOT NULL,
    "booking_item_id" UUID NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'standard',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID,
    "email" CITEXT NOT NULL,
    "phone" TEXT,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "primary_role" "user_role_code" NOT NULL DEFAULT 'advertiser',
    "status" "user_status" NOT NULL DEFAULT 'pending_verification',
    "default_city_id" UUID,
    "default_lat" DOUBLE PRECISION,
    "default_lng" DOUBLE PRECISION,
    "preferred_currency" CHAR(3) NOT NULL DEFAULT 'USD',
    "email_verified_at" TIMESTAMPTZ,
    "phone_verified_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID,
    "code" "user_role_code" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "tenant_id" UUID,
    "granted_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "verification_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_id" UUID,
    "billboard_id" UUID,
    "document_type" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "status" "document_status" NOT NULL DEFAULT 'pending',
    "reviewed_by" UUID,
    "reviewed_at" TIMESTAMPTZ,
    "rejection_reason" TEXT,
    "expires_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "orders_advertiser_id_created_at_idx" ON "orders"("advertiser_id", "created_at");

-- CreateIndex
CREATE INDEX "booking_items_billboard_id_idx" ON "booking_items"("billboard_id");

-- CreateIndex
CREATE INDEX "booking_items_owner_id_status_idx" ON "booking_items"("owner_id", "status");

-- CreateIndex
CREATE INDEX "booking_items_order_id_idx" ON "booking_items"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "billboard_categories_code_key" ON "billboard_categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "billboard_types_code_key" ON "billboard_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "billboards_slug_key" ON "billboards"("slug");

-- CreateIndex
CREATE INDEX "billboards_owner_id_idx" ON "billboards"("owner_id");

-- CreateIndex
CREATE INDEX "billboards_billboard_type_id_idx" ON "billboards"("billboard_type_id");

-- CreateIndex
CREATE INDEX "billboards_lifecycle_status_quick_status_idx" ON "billboards"("lifecycle_status", "quick_status");

-- CreateIndex
CREATE INDEX "billboards_address_id_idx" ON "billboards"("address_id");

-- CreateIndex
CREATE INDEX "billboards_created_at_id_idx" ON "billboards"("created_at", "id");

-- CreateIndex
CREATE INDEX "billboard_media_billboard_id_idx" ON "billboard_media"("billboard_id");

-- CreateIndex
CREATE UNIQUE INDEX "contract_templates_tenant_id_type_version_key" ON "contract_templates"("tenant_id", "type", "version");

-- CreateIndex
CREATE UNIQUE INDEX "order_contract_acceptances_order_id_contract_template_id_key" ON "order_contract_acceptances"("order_id", "contract_template_id");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_state_region_country_code_key" ON "cities"("name", "state_region", "country_code");

-- CreateIndex
CREATE INDEX "addresses_city_id_idx" ON "addresses"("city_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_is_read_created_at_idx" ON "notifications"("user_id", "is_read", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "payment_methods_user_id_idx" ON "payment_methods"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_provider_transaction_id_key" ON "transactions"("provider_transaction_id");

-- CreateIndex
CREATE INDEX "transactions_order_id_idx" ON "transactions"("order_id");

-- CreateIndex
CREATE INDEX "payouts_owner_id_status_idx" ON "payouts"("owner_id", "status");

-- CreateIndex
CREATE INDEX "billboard_pricing_billboard_id_currency_code_effective_from_idx" ON "billboard_pricing"("billboard_id", "currency_code", "effective_from");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_booking_item_id_key" ON "reviews"("booking_item_id");

-- CreateIndex
CREATE INDEX "reviews_billboard_id_idx" ON "reviews"("billboard_id");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE INDEX "users_tenant_id_idx" ON "users"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenant_id_email_key" ON "users"("tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_tenant_id_code_key" ON "roles"("tenant_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- CreateIndex
CREATE INDEX "verification_documents_owner_id_idx" ON "verification_documents"("owner_id");

-- CreateIndex
CREATE INDEX "verification_documents_billboard_id_idx" ON "verification_documents"("billboard_id");

-- AddForeignKey
ALTER TABLE "artwork_uploads" ADD CONSTRAINT "artwork_uploads_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_advertiser_id_fkey" FOREIGN KEY ("advertiser_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "currencies"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_items" ADD CONSTRAINT "booking_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_items" ADD CONSTRAINT "booking_items_billboard_id_fkey" FOREIGN KEY ("billboard_id") REFERENCES "billboards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_items" ADD CONSTRAINT "booking_items_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_items" ADD CONSTRAINT "booking_items_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "currencies"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_items" ADD CONSTRAINT "booking_items_artwork_upload_id_fkey" FOREIGN KEY ("artwork_upload_id") REFERENCES "artwork_uploads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboard_types" ADD CONSTRAINT "billboard_types_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "billboard_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboards" ADD CONSTRAINT "billboards_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboards" ADD CONSTRAINT "billboards_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboards" ADD CONSTRAINT "billboards_billboard_type_id_fkey" FOREIGN KEY ("billboard_type_id") REFERENCES "billboard_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboards" ADD CONSTRAINT "billboards_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboard_tags" ADD CONSTRAINT "billboard_tags_billboard_id_fkey" FOREIGN KEY ("billboard_id") REFERENCES "billboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboard_tags" ADD CONSTRAINT "billboard_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboard_media" ADD CONSTRAINT "billboard_media_billboard_id_fkey" FOREIGN KEY ("billboard_id") REFERENCES "billboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboard_design_guidelines" ADD CONSTRAINT "billboard_design_guidelines_billboard_id_fkey" FOREIGN KEY ("billboard_id") REFERENCES "billboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_templates" ADD CONSTRAINT "contract_templates_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_contract_acceptances" ADD CONSTRAINT "order_contract_acceptances_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_contract_acceptances" ADD CONSTRAINT "order_contract_acceptances_contract_template_id_fkey" FOREIGN KEY ("contract_template_id") REFERENCES "contract_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_contract_acceptances" ADD CONSTRAINT "order_contract_acceptances_accepted_by_fkey" FOREIGN KEY ("accepted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "currencies"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "currencies"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payout_items" ADD CONSTRAINT "payout_items_payout_id_fkey" FOREIGN KEY ("payout_id") REFERENCES "payouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payout_items" ADD CONSTRAINT "payout_items_booking_item_id_fkey" FOREIGN KEY ("booking_item_id") REFERENCES "booking_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboard_pricing" ADD CONSTRAINT "billboard_pricing_billboard_id_fkey" FOREIGN KEY ("billboard_id") REFERENCES "billboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billboard_pricing" ADD CONSTRAINT "billboard_pricing_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "currencies"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_fee_rules" ADD CONSTRAINT "platform_fee_rules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_fee_rules" ADD CONSTRAINT "platform_fee_rules_applies_to_type_id_fkey" FOREIGN KEY ("applies_to_type_id") REFERENCES "billboard_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_billboard_id_fkey" FOREIGN KEY ("billboard_id") REFERENCES "billboards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_item_id_fkey" FOREIGN KEY ("booking_item_id") REFERENCES "booking_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_default_city_id_fkey" FOREIGN KEY ("default_city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_documents" ADD CONSTRAINT "verification_documents_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_documents" ADD CONSTRAINT "verification_documents_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_documents" ADD CONSTRAINT "verification_documents_billboard_id_fkey" FOREIGN KEY ("billboard_id") REFERENCES "billboards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
