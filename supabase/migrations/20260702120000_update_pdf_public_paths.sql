-- Point certification and avatar assets at static files in public/pdf/

-- Normalize legacy /Pdf/ prefix (case mismatch)
UPDATE public.certifications
SET file_url = '/pdf/' || substring(file_url from 6)
WHERE file_url LIKE '/Pdf/%';

UPDATE public.certifications
SET image_url = '/pdf/' || substring(image_url from 6)
WHERE image_url LIKE '/Pdf/%';

UPDATE public.site_content
SET avatar_url = '/pdf/' || substring(avatar_url from 6)
WHERE avatar_url LIKE '/Pdf/%';

-- Map certifications by title (works even when file_url is NULL)
UPDATE public.certifications
SET file_url = '/pdf/Certificate of Internship.pdf',
    file_type = 'application/pdf'
WHERE title ILIKE '%internship%'
  AND (file_url IS NULL OR file_url IS DISTINCT FROM '/pdf/Certificate of Internship.pdf');

UPDATE public.certifications
SET file_url = '/pdf/IIIT-Certificate.pdf',
    file_type = 'application/pdf'
WHERE (title ILIKE '%IIIT%' OR title ILIKE '%android%')
  AND (file_url IS NULL OR file_url IS DISTINCT FROM '/pdf/IIIT-Certificate.pdf');

UPDATE public.certifications
SET file_url = '/pdf/Software-Conceptual-Design.pdf',
    file_type = 'application/pdf'
WHERE title ILIKE '%conceptual%design%'
  AND (file_url IS NULL OR file_url IS DISTINCT FROM '/pdf/Software-Conceptual-Design.pdf');

UPDATE public.certifications
SET file_url = '/pdf/Software-Testing.pdf',
    file_type = 'application/pdf'
WHERE title ILIKE '%software%testing%'
  AND (file_url IS NULL OR file_url IS DISTINCT FROM '/pdf/Software-Testing.pdf');

-- Profile photo lives alongside the PDFs
UPDATE public.site_content
SET avatar_url = '/pdf/Arshil Anwar.jpeg'
WHERE id = 'main'
  AND (avatar_url IS NULL OR avatar_url ILIKE '%Arshil Anwar%' OR avatar_url LIKE '/Pdf/%' OR avatar_url LIKE '/pdf/%');
