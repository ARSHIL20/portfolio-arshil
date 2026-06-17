export type SiteContent = {
  id: string;
  available: boolean;
  portfolio_label: string;
  hero_first_name: string;
  hero_last_name: string;
  hero_tagline: string;
  hero_intro: string;
  role: string;
  based_in: string;
  studying: string;
  status: string;
  about_heading: string;
  about_body: string;
  stats_projects: string;
  stats_certs: string;
  stats_hackathons: string;
  contact_heading: string;
  contact_body: string;
  contact_email: string;
  contact_phone: string;
  avatar_url: string | null;
  github_url: string;
  linkedin_url: string;
};

export type Project = {
  id: string;
  position: number;
  title: string;
  status: string | null;
  description: string;
  tech: string[];
  url: string | null;
  category: string; // "Major" | "Minor"
};

export type Skill = { id: string; position: number; category: string; items: string[] };
export type JourneyEntry = { id: string; position: number; period: string; title: string; subtitle: string | null };
export type Certification = {
  id: string;
  position: number;
  title: string;
  issuer: string | null;
  image_url: string | null;
  file_url: string | null;
  file_type: string | null;
};
export type Highlight = { id: string; position: number; title: string; subtitle: string | null };
export type GalleryItem = { id: string; position: number; caption: string | null; image_url: string };
