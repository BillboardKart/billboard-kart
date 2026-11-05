// lib/billboard-api.ts
import { cache } from "react";
import { getBillboard } from "@/lib/billboards";
import type { Billboard, BillboardStatus } from "@/lib/billboards";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/$/,
  "",
);

const PAGE_SIZE = 6;
const FETCH_TIMEOUT_MS = 8000;

export interface BillboardApiListResponse {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sizeDisplay: string | null;
  widthFt: unknown;
  heightFt: unknown;
  lifecycleStatus: string;
  quickStatus: string;
  illumination: boolean;
  dailyReach: number | null;
  ratingAvg: unknown;
  ratingCount: number;
  minBookingDuration: string;
  billboardType: {
    id: string;
    name: string;
    code: string;
    category: { name: string };
  };
  address: {
    neighborhood: string | null;
    landmark: string | null;
    lat: number;
    lng: number;
    city: { id: string; name: string };
  };
  media: Array<{
    id: string;
    fileUrl: string;
    isPrimary: boolean;
    sortOrder: number;
  }>;
  pricing: Array<{ pricePerMonth: unknown; currencyCode: string }>;
  tags: Array<{ slug: string; label: string }>;
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BillboardsApiResponse {
  success: boolean;
  data?: BillboardApiListResponse[];
  pagination?: PaginationMeta;
}

export interface BillboardsPageResult {
  billboards: Billboard[];
  pagination: PaginationMeta;
}

const VALID_STATUSES: BillboardStatus[] = [
  "available",
  "booked",
  "maintenance",
];

function toStatus(value: string): BillboardStatus {
  if (VALID_STATUSES.includes(value as BillboardStatus)) {
    return value as BillboardStatus;
  }
  return "available";
}

function cleanSize(sizeDisplay: string | null): string {
  if (!sizeDisplay) return "";
  return sizeDisplay.replace(/\.0/g, "").trim();
}

export function apiBillboardToBillboard(
  item: BillboardApiListResponse,
): Billboard {
  const primaryMedia =
    item.media.find((m) => m.isPrimary) ?? item.media[0] ?? null;
  const monthlyPrice = Number(item.pricing[0]?.pricePerMonth ?? 0) || 0;
  const weeklyPrice = Math.round((monthlyPrice * 12) / 52);
  const address = item.address?.landmark?.trim();
  const tags = item.tags?.map((t) => t.label) ?? [];

  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    address: address ?? item.address?.neighborhood ?? "",
    city: item.address?.city?.name ?? "",
    neighborhood: item.address?.neighborhood ?? "",
    category: item.billboardType?.category?.name ?? "",
    status: toStatus(item.quickStatus),
    size: cleanSize(item.sizeDisplay),
    type: item.billboardType?.name ?? "",
    monthlyPrice,
    weeklyPrice,
    visibility: tags[0] ?? item.billboardType?.category?.name ?? "",
    rating: Number(item.ratingAvg ?? 0),
    reviews: item.ratingCount ?? 0,
    dailyReach: item.dailyReach ?? 0,
    image: primaryMedia?.fileUrl ?? "",
    lat: item.address?.lat ?? 0,
    lng: item.address?.lng ?? 0,
    tags,
  };
}

export async function fetchBillboardsPage(
  page: number,
  signal?: AbortSignal,
): Promise<BillboardsPageResult> {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutController.abort(),
    FETCH_TIMEOUT_MS,
  );
  const combinedSignal = signal
    ? AbortSignal.any([signal, timeoutController.signal])
    : timeoutController.signal;

  let response: Response;
  try {
    response = await fetch(
      `${API_BASE_URL}/api/v1/billboards?page=${page}&limit=${PAGE_SIZE}`,
      { signal: combinedSignal },
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`Billboards API responded with ${response.status}`);
  }

  const payload = (await response.json()) as BillboardsApiResponse;

  if (!payload.success || !Array.isArray(payload.data)) {
    throw new Error("Billboards API returned an unexpected payload");
  }

  const pagination = payload.pagination ?? {
    page,
    limit: PAGE_SIZE,
    total: payload.data.length,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  };

  return {
    billboards: payload.data.map(apiBillboardToBillboard),
    pagination,
  };
}

interface SingleBillboardResponse {
  success: boolean;
  data?: BillboardApiListResponse;
}

/** Resolves a billboard via the API by id or slug; undefined when not found. */
export async function fetchBillboard(
  idOrSlug: string,
  signal?: AbortSignal,
): Promise<Billboard | undefined> {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutController.abort(),
    FETCH_TIMEOUT_MS,
  );
  const combinedSignal = signal
    ? AbortSignal.any([signal, timeoutController.signal])
    : timeoutController.signal;

  let response: Response;
  try {
    response = await fetch(
      `${API_BASE_URL}/api/v1/billboards/${encodeURIComponent(idOrSlug)}`,
      { signal: combinedSignal },
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error(`Billboard API responded with ${response.status}`);
  }

  const payload = (await response.json()) as SingleBillboardResponse;

  if (!payload.success || !payload.data) {
    throw new Error("Billboard API returned an unexpected payload");
  }
  return apiBillboardToBillboard(payload.data);
}

/**
 * Live API first, static dummy data as fallback, undefined when neither has it.
 * cache() dedupes per request so page + generateMetadata share one fetch.
 */
export const resolveBillboard = cache(
  async (idOrSlug: string): Promise<Billboard | undefined> => {
    try {
      const live = await fetchBillboard(idOrSlug);
      if (live) return live;
    } catch {
      // API unreachable or malformed payload — fall through to dummy data
    }
    return getBillboard(idOrSlug);
  },
);
