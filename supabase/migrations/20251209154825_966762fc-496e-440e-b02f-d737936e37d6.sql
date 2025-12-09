-- Allow public read access to public bucket objects
CREATE POLICY "Public read access for public buckets"
ON storage.objects
FOR SELECT
USING (bucket_id IN (SELECT id FROM storage.buckets WHERE public = true));