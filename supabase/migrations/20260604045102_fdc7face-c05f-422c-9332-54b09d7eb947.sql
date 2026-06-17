
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'Major';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS github_url text NOT NULL DEFAULT 'https://github.com/arshilanwar';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS linkedin_url text NOT NULL DEFAULT 'https://linkedin.com/in/arshilanwar';
ALTER TABLE public.certifications ADD COLUMN IF NOT EXISTS file_url text;
ALTER TABLE public.certifications ADD COLUMN IF NOT EXISTS file_type text;
