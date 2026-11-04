// api/src/lib/storage.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "billboard-media";

const PHOTO_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const DOC_MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const ALLOWED_DOC_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

/**
 * Creates a Supabase client authenticated with the user's JWT.
 * Used for storage uploads that require an authenticated session.
 */
function createAuthedClient(token: string): SupabaseClient {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    },
  );
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
}

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "application/pdf": "pdf",
  };
  return map[mime] ?? "bin";
}

/**
 * Uploads billboard photos to Supabase Storage.
 * Path: billboard-media/{billboardId}/photos/{uuid}-{sanitized-filename}
 * Returns the public URL of the uploaded file.
 */
export async function uploadBillboardPhoto(
  token: string,
  billboardId: string,
  file: File,
): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(
      `Invalid photo type "${file.type}". Accepted: JPEG, PNG, WebP.`,
    );
  }
  if (file.size > PHOTO_MAX_BYTES) {
    throw new Error(
      `Photo "${file.name}" exceeds 5 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).`,
    );
  }

  const ext = extFromMime(file.type);
  const filename = sanitizeFilename(file.name.replace(/\.[^.]+$/, ""));
  const path = `${billboardId}/photos/${crypto.randomUUID()}-${filename}.${ext}`;

  const sb = createAuthedClient(token);
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error(`Photo upload failed: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = sb.storage.from(BUCKET).getPublicUrl(path);

  return publicUrl;
}

/**
 * Uploads a verification document to Supabase Storage.
 * Path: billboard-media/{ownerId}/docs/{docType}-{uuid}-{sanitized-filename}
 * Returns the public URL of the uploaded file.
 */
export async function uploadVerificationDoc(
  token: string,
  ownerId: string,
  docType: string,
  file: File,
): Promise<string> {
  if (!ALLOWED_DOC_TYPES.has(file.type)) {
    throw new Error(
      `Invalid document type "${file.type}". Accepted: PDF, JPEG, PNG.`,
    );
  }
  if (file.size > DOC_MAX_BYTES) {
    throw new Error(
      `Document "${file.name}" exceeds 10 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).`,
    );
  }

  const ext = extFromMime(file.type);
  const filename = sanitizeFilename(file.name.replace(/\.[^.]+$/, ""));
  const path = `${ownerId}/docs/${docType}-${crypto.randomUUID()}-${filename}.${ext}`;

  const sb = createAuthedClient(token);
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error(`Document upload failed: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = sb.storage.from(BUCKET).getPublicUrl(path);

  return publicUrl;
}

/**
 * Best-effort cleanup: deletes files from storage.
 * Used when a DB transaction fails after files were already uploaded.
 */
export async function deleteStorageFiles(
  token: string,
  paths: string[],
): Promise<void> {
  if (paths.length === 0) return;
  const sb = createAuthedClient(token);
  const { error } = await sb.storage.from(BUCKET).remove(paths);
  if (error) {
    console.error("[Storage Cleanup] Failed to delete files:", error.message);
  }
}
