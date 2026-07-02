import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const PUBLIC_PDF_FILES = new Set([
  "Certificate of Internship.pdf",
  "IIIT-Certificate.pdf",
  "Software-Conceptual-Design.pdf",
  "Software-Testing.pdf",
  "Arshil Anwar.jpeg",
]);

const DEFAULT_AVATAR_FILE = "Arshil Anwar.jpeg";

/** Exact title → PDF filename (normalized keys). */
const CERT_FILES_BY_TITLE: Record<string, string> = {
  "certificate of internship": "Certificate of Internship.pdf",
  "software conceptual design": "Software-Conceptual-Design.pdf",
  "software testing": "Software-Testing.pdf",
  "android application development": "IIIT-Certificate.pdf",
};

const CERT_TITLE_MATCHERS: { test: (title: string) => boolean; file: string; type: string }[] = [
  {
    test: (t) => /internship/i.test(t),
    file: "Certificate of Internship.pdf",
    type: "application/pdf",
  },
  {
    test: (t) => /conceptual.*design/i.test(t),
    file: "Software-Conceptual-Design.pdf",
    type: "application/pdf",
  },
  {
    test: (t) => /software.*testing/i.test(t),
    file: "Software-Testing.pdf",
    type: "application/pdf",
  },
  {
    test: (t) => /iiit|android/i.test(t),
    file: "IIIT-Certificate.pdf",
    type: "application/pdf",
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function toPublicPdfPath(filename: string): string {
  return `/pdf/${encodeURIComponent(filename)}`;
}

function normalizeCertTitle(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, " ");
}

function matchCertificationFile(title: string): { path: string; type: string } | null {
  const normalized = normalizeCertTitle(title);
  const exactFile = CERT_FILES_BY_TITLE[normalized];
  if (exactFile) {
    return { path: toPublicPdfPath(exactFile), type: "application/pdf" };
  }

  const match = CERT_TITLE_MATCHERS.find(({ test }) => test(normalized));
  return match ? { path: toPublicPdfPath(match.file), type: match.type } : null;
}

/** Normalize legacy or external asset URLs to /pdf/ public paths. */
export function resolvePublicAssetUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  let resolved = url;
  if (url.startsWith("/pdf/")) {
    resolved = url;
  } else if (url.startsWith("/Pdf/")) {
    resolved = `/pdf/${url.slice(5)}`;
  } else {
    try {
      const rawPath = url.startsWith("http") ? new URL(url).pathname : url;
      const filename = decodeURIComponent(rawPath.split("/").pop() ?? "");
      if (PUBLIC_PDF_FILES.has(filename)) resolved = `/pdf/${filename}`;
    } catch {
      // keep original url
    }
  }

  if (resolved.startsWith("/pdf/")) {
    const filename = decodeURIComponent(resolved.slice(5));
    return toPublicPdfPath(filename);
  }

  return resolved;
}

/** Profile photo with static fallback from public/pdf/. */
export function resolveAvatarUrl(url: string | null | undefined): string {
  return resolvePublicAssetUrl(url) ?? toPublicPdfPath(DEFAULT_AVATAR_FILE);
}

export type ResolvedCertAssets = {
  linkUrl: string | null;
  previewUrl: string | null;
  fileType: string | null;
};

/** Certification file/preview URLs with title-based fallbacks when DB fields are empty. */
export function resolveCertificationAssets(cert: {
  title: string;
  file_url?: string | null;
  image_url?: string | null;
  file_type?: string | null;
}): ResolvedCertAssets {
  const titleMatch = matchCertificationFile(cert.title);
  const imageUrl = resolvePublicAssetUrl(cert.image_url ?? null);

  // Known portfolio certs always open their matching static PDF.
  if (titleMatch) {
    return {
      linkUrl: titleMatch.path,
      previewUrl: imageUrl,
      fileType: titleMatch.type,
    };
  }

  let fileUrl = resolvePublicAssetUrl(cert.file_url ?? null);
  const fileType = cert.file_type ?? null;
  const isImage = !fileType || fileType.startsWith("image/");
  const previewUrl = imageUrl ?? (isImage ? fileUrl : null);
  const linkUrl = fileUrl ?? imageUrl;

  return { linkUrl, previewUrl, fileType };
}
