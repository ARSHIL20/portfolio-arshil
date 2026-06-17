
-- Admin email allowlist
CREATE TABLE public.admin_emails (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_emails TO authenticated;
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_emails (email) VALUES
  ('arshilanwar5987@gmail.com'),
  ('arshilanwar8799@gmail.com');

-- has_admin() helper
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails
    WHERE lower(email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
  );
$$;

CREATE POLICY "admin can read allowlist" ON public.admin_emails FOR SELECT TO authenticated USING (public.is_admin());

-- updated_at helper
CREATE OR REPLACE FUNCTION public.tg_set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Site content: single row keyed by id='main'
CREATE TABLE public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  available BOOLEAN NOT NULL DEFAULT true,
  portfolio_label TEXT NOT NULL DEFAULT 'Portfolio · 2024 — 2025',
  hero_first_name TEXT NOT NULL DEFAULT 'Arshil',
  hero_last_name TEXT NOT NULL DEFAULT 'Anwar',
  hero_tagline TEXT NOT NULL DEFAULT 'building thoughtful software, one detail at a time.',
  hero_intro TEXT NOT NULL DEFAULT 'BCA student at United Institute of Management (FUGS), Prayagraj. I craft clean, considered web interfaces with React, Node, and Java — with care for the small details that make software feel finished.',
  role TEXT NOT NULL DEFAULT 'Full-Stack Developer',
  based_in TEXT NOT NULL DEFAULT 'Prayagraj, India',
  studying TEXT NOT NULL DEFAULT 'BCA, 2nd year',
  status TEXT NOT NULL DEFAULT 'Open to work',
  about_heading TEXT NOT NULL DEFAULT 'A student who treats every project like it has a user.',
  about_body TEXT NOT NULL DEFAULT 'At United Institute of Management (FUGS) in Prayagraj I''m in my second year of BCA. I represented the college at the Smart India Hackathon, mentor juniors on communication, and explore Android development on the side.',
  stats_projects TEXT NOT NULL DEFAULT '5+',
  stats_certs TEXT NOT NULL DEFAULT '4+',
  stats_hackathons TEXT NOT NULL DEFAULT '2',
  contact_heading TEXT NOT NULL DEFAULT 'Let''s make something worth shipping.',
  contact_body TEXT NOT NULL DEFAULT 'Open to internships, freelance work, and focused collaborations where craft matters. Email is the fastest way to reach me.',
  contact_email TEXT NOT NULL DEFAULT 'arshilanwar8799@gmail.com',
  contact_phone TEXT NOT NULL DEFAULT '+91 8799212928',
  avatar_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "admin updates site content" ON public.site_content FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admin inserts site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
INSERT INTO public.site_content (id) VALUES ('main');

-- Generic helper for collection tables
CREATE OR REPLACE FUNCTION public.create_collection_table(_table TEXT) RETURNS VOID
LANGUAGE plpgsql AS $$ BEGIN END; $$;

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position INT NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  status TEXT,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "admin write projects" ON public.projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Skills (grouped)
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position INT NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skills TO anon, authenticated;
GRANT ALL ON public.skills TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.skills TO authenticated;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "admin write skills" ON public.skills FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER skills_updated BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Journey
CREATE TABLE public.journey (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position INT NOT NULL DEFAULT 0,
  period TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.journey TO anon, authenticated;
GRANT ALL ON public.journey TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.journey TO authenticated;
ALTER TABLE public.journey ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read journey" ON public.journey FOR SELECT USING (true);
CREATE POLICY "admin write journey" ON public.journey FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER journey_updated BEFORE UPDATE ON public.journey FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Certifications (with optional photo)
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position INT NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  issuer TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certifications TO anon, authenticated;
GRANT ALL ON public.certifications TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.certifications TO authenticated;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "admin write certifications" ON public.certifications FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER certifications_updated BEFORE UPDATE ON public.certifications FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Highlights / notable moments
CREATE TABLE public.highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position INT NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  subtitle TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.highlights TO anon, authenticated;
GRANT ALL ON public.highlights TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.highlights TO authenticated;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read highlights" ON public.highlights FOR SELECT USING (true);
CREATE POLICY "admin write highlights" ON public.highlights FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER highlights_updated BEFORE UPDATE ON public.highlights FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Gallery photos
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position INT NOT NULL DEFAULT 0,
  caption TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery TO anon, authenticated;
GRANT ALL ON public.gallery TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "admin write gallery" ON public.gallery FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER gallery_updated BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
