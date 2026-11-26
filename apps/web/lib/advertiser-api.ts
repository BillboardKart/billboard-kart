// lib/advertiser-api.ts
import { createClient } from "@/lib/supabase/client";
import {
  apiBillboardToBillboard,
  type BillboardsApiResponse,
  type BillboardsPageResult,
  type PaginationMeta,
  type SingleBillboardResponse,
} from "@/lib/billboard-api";
import type { Billboard } from "@/lib/billboards";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/$/,
  "",
);

const PAGE_SIZE = 6;
const FETCH_TIMEOUT_MS = 8000;

export class AdvertiserApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "AdvertiserApiError";
  }
}

async function getAccessToken(): Promise<string> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) {
    throw new AdvertiserApiError("Authentication required", 401);
  }
  return token;
}

async function advertiserFetch(
  path: string,
  signal?: AbortSignal,
): Promise<Response> {
  const token = await getAccessToken();

  const timeoutController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutController.abort(),
    FETCH_TIMEOUT_MS,
  );
  const combinedSignal = signal
    ? AbortSignal.any([signal, timeoutController.signal])
    : timeoutController.signal;

  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: combinedSignal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetches a page of published billboards from the advertiser-only API.
 * Only billboards with lifecycleStatus = active are returned by the backend.
 */
export async function fetchAdvertiserBillboardsPage(
  page: number,
  signal?: AbortSignal,
): Promise<BillboardsPageResult> {
  const response = await advertiserFetch(
    `/api/v1/advertiser/billboards?page=${page}&limit=${PAGE_SIZE}`,
    signal,
  );

  if (!response.ok) {
    throw new AdvertiserApiError(
      `Advertiser billboards API responded with ${response.status}`,
      response.status,
    );
  }

  const payload = (await response.json()) as BillboardsApiResponse;

  if (!payload.success || !Array.isArray(payload.data)) {
    throw new AdvertiserApiError(
      "Advertiser billboards API returned an unexpected payload",
      response.status,
    );
  }

  const pagination: PaginationMeta = payload.pagination ?? {
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

/**
 * Fetches a single published billboard via the advertiser-only API.
 * Returns undefined when the billboard does not exist or is not public.
 */
export async function fetchAdvertiserBillboard(
  idOrSlug: string,
  signal?: AbortSignal,
): Promise<Billboard | undefined> {
  const response = await advertiserFetch(
    `/api/v1/advertiser/billboards/${encodeURIComponent(idOrSlug)}`,
    signal,
  );

  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new AdvertiserApiError(
      `Advertiser billboard API responded with ${response.status}`,
      response.status,
    );
  }

  const payload = (await response.json()) as SingleBillboardResponse;

  if (!payload.success || !payload.data) {
    throw new AdvertiserApiError(
      "Advertiser billboard API returned an unexpected payload",
      response.status,
    );
  }
  return apiBillboardToBillboard(payload.data);
}
