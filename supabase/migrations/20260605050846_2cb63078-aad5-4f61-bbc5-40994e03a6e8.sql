
-- Harden is_admin(): bind to auth.uid() and require a confirmed email
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users u
    JOIN public.admin_emails a
      ON lower(a.email) = lower(u.email)
    WHERE u.id = auth.uid()
      AND u.email_confirmed_at IS NOT NULL
  );
$$;

-- Restrict who can EXECUTE the function; policies run with definer rights
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- Fix mutable search_path on legacy stub function
CREATE OR REPLACE FUNCTION public.create_collection_table(_table text)
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN END; $$;
