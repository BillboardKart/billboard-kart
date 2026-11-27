// lib/owner-api.ts
import { createClient } from "@/lib/supabase/client";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/$/,
  "",
);

const FETCH_TIMEOUT_MS = 8000;

export class OwnerApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "OwnerApiError";
  }
}

export interface OwnerBillboardItem {
  id: string;
  name: string;
  slug: string;
  lifecycleStatus: string;
  quickStatus: string;
  sizeDisplay: string | null;
  city: string;
  stateRegion: string | null;
  area: string | null;
  imageUrl: string | null;
  pricePerMonth: string | number | null;
  currencyCode: string;
}

interface OwnerBillboardsResponse {
  success: boolean;
  data?: OwnerBillboardItem[];
  error?: string;
}

async function getAccessToken(): Promise<string> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) {
    throw new OwnerApiError("Authentication required", 401);
  }
  return token;
}

/**
 * Fetches the authenticated owner's full billboard inventory
 * (all lifecycle statuses — not just advertiser-visible ones).
 */
export async function fetchOwnerBillboards(
  signal?: AbortSignal,
): Promise<OwnerBillboardItem[]> {
  const token = await getAccessToken();

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
    response = await fetch(`${API_BASE_URL}/api/v1/billboards/mine`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: combinedSignal,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new OwnerApiError(
      `Owner billboards API responded with ${response.status}`,
      response.status,
    );
  }

  const payload = (await response.json()) as OwnerBillboardsResponse;

  if (!payload.success || !Array.isArray(payload.data)) {
    throw new OwnerApiError(
      "Owner billboards API returned an unexpected payload",
      response.status,
    );
  }

  return payload.data;
}
