
-- Lock down SECURITY DEFINER function: only authenticated users execute
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Re-create with explicit search_path already set (already set, but ensure on tg_set_updated_at)
ALTER FUNCTION public.tg_set_updated_at() SET search_path = public;

-- Storage policies for 'media' bucket
CREATE POLICY "Public can read media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admins can update media" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admins can delete media" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
