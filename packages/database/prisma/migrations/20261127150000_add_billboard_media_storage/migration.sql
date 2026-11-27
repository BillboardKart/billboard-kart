-- Create the Supabase Storage bucket used for billboard photos and
-- verification documents. The bucket is public because billboard photos
-- must be viewable by advertisers via public URLs.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'billboard-media',
  'billboard-media',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Authenticated users may upload files to the bucket.
DROP POLICY IF EXISTS "bbk_media_insert" ON storage.objects;
CREATE POLICY "bbk_media_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'billboard-media');

-- Authenticated users may read objects (public URLs also work for the
-- public bucket).
DROP POLICY IF EXISTS "bbk_media_select" ON storage.objects;
CREATE POLICY "bbk_media_select" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'billboard-media');

-- Authenticated users may delete objects (used for upload rollback
-- cleanup when a DB transaction fails).
DROP POLICY IF EXISTS "bbk_media_delete" ON storage.objects;
CREATE POLICY "bbk_media_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'billboard-media');
