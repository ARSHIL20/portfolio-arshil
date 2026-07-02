import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "./SiteHeader";
import { Reveal } from "./Reveal";
import type {
  SiteContent, Project, Skill, JourneyEntry, Certification, Highlight,
} from "@/lib/portfolio-types";
import { resolveAvatarUrl, resolveCertificationAssets } from "@/lib/utils";

export function Portfolio() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [journey, setJourney] = useState<JourneyEntry[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    (async () => {
      const [c, p, s, j, ce, h] = await Promise.all([
        supabase.from("site_content").select("*").eq("id", "main").maybeSingle(),
        supabase.from("projects").select("*").order("position"),
        supabase.from("skills").select("*").order("position"),
        supabase.from("journey").select("*").order("position"),
        supabase.from("certifications").select("*").order("position"),
        supabase.from("highlights").select("*").order("position"),
      ]);
      if (c.data) setContent(c.data as SiteContent);
      if (p.data) setProjects(p.data as Project[]);
      if (s.data) setSkills(s.data as Skill[]);
      if (j.data) setJourney(j.data as JourneyEntry[]);
      if (ce.data) setCerts(ce.data as Certification[]);
      if (h.data) setHighlights(h.data as Highlight[]);
    })();
  }, []);

  const majorProjects = useMemo(() => projects.filter((p) => (p.category ?? "Major") === "Major"), [projects]);
  const minorProjects = useMemo(() => projects.filter((p) => p.category === "Minor"), [projects]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  return (
    <div id="top" className="min-h-screen">
      <SiteHeader available={content.available} />

      {/* HERO */}
      <section className="container-prose pt-16 md:pt-28 pb-20 md:pb-32">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-10 bg-border" />
          <span className="eyebrow">{content.portfolio_label}</span>
        </div>
        <h1 className="display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95]">
          {content.hero_first_name}{" "}
          <span className="accent italicize">{content.hero_last_name}</span>
        </h1>
        <p className="display italicize text-[clamp(1.15rem,3vw,2.5rem)] mt-4 md:mt-6 text-muted-foreground max-w-5xl">
          — {content.hero_tagline}
        </p>

        <div className="mt-12 md:mt-16 grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end">
          <p className="text-[15px] md:text-[17px] leading-relaxed text-muted-foreground max-w-2xl">
            {content.hero_intro}
          </p>
          <div className="flex flex-wrap gap-3">
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase font-mono hover:bg-warm transition-colors active:scale-[0.97] active:transition-transform"
          >
            See selected work →
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-3 border border-border text-[12px] tracking-[0.18em] uppercase font-mono hover:border-warm hover:text-warm transition-colors active:scale-[0.97] active:transition-transform"
          >
            Get in touch
          </button>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <Meta label="Role" value={content.role} />
          <Meta label="Based in" value={content.based_in} />
          <Meta label="Studying" value={content.studying} />
          <Meta label="Status" value={content.status} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container-prose py-20 md:py-28 border-t border-border">
        <SectionLabel eyebrow="About" />
        <h2 className="display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]">
          {content.about_heading}
        </h2>
        <div className="mt-10 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <p className="text-[15px] md:text-[17px] leading-relaxed text-muted-foreground">
            {content.about_body}
          </p>
          <div className="relative max-w-sm mx-auto md:mx-0">
            <img
              src={resolveAvatarUrl(content.avatar_url)}
              alt={`${content.hero_first_name} ${content.hero_last_name}`}
              className="w-full aspect-[4/5] object-cover rounded-sm border border-border transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]"
            />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-warm/40 rounded-sm -z-10" />
          </div>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-4 md:gap-8 border-t border-border pt-10">
          <Stat n={content.stats_projects} label="Projects shipped" />
          <Stat n={content.stats_certs} label="Certifications" />
          <Stat n={content.stats_hackathons} label="Hackathons" />
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="container-prose py-20 md:py-28 border-t border-border relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-warm/[0.04] blur-[120px] pointer-events-none" />
        <Reveal>
          <SectionLabel eyebrow="Selected work" />
          <h2 className="display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]">
            Things I've built <span className="accent italicize">and what I learned.</span>
          </h2>
          <p className="eyebrow mt-4">{String(projects.length).padStart(2, "0")} projects · 2023 — present</p>
        </Reveal>

        {majorProjects.length > 0 && (
          <Reveal delay={1}>
            <ProjectGroup heading="Major projects" items={majorProjects} />
          </Reveal>
        )}
        {minorProjects.length > 0 && (
          <Reveal delay={2}>
            <ProjectGroup heading="Minor projects" items={minorProjects} />
          </Reveal>
        )}
      </section>

      {/* SKILLS */}
      <section id="skills" className="container-prose py-20 md:py-28 border-t border-border">
        <SectionLabel eyebrow="Toolkit" />
        <h2 className="display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]">
          What I reach for <span className="accent italicize">when I'm building.</span>
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {skills.map((s, i) => (
            <Reveal key={s.id} delay={((i % 3) as 0 | 1 | 2)}>
              <div className="bg-background p-6 md:p-8 h-full transition-colors hover:bg-surface/60 active:bg-surface/80">
                <div className="flex items-baseline justify-between">
                  <h3 className="display text-xl">{s.category}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-3">
                      <span className="h-px w-3 bg-warm/60" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="container-prose py-20 md:py-28 border-t border-border">
        <SectionLabel eyebrow="Journey" />
        <h2 className="display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]">
          Education <span className="accent italicize">& experience.</span>
        </h2>
        <div className="mt-12 grid gap-px bg-border">
          {journey.map((j, idx) => (
            <Reveal key={j.id} delay={((idx % 3) as 0 | 1 | 2)}>
              <div
                className="bg-background grid md:grid-cols-[200px_1fr] gap-2 md:gap-10 py-6 md:py-8 px-4 md:px-6 group transition-all duration-300 hover:bg-surface/70 hover:pl-6 md:hover:pl-8 active:bg-surface/80 active:border-warm active:pl-6 md:active:pl-8 cursor-default border-l-2 border-transparent hover:border-warm"
              >
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-warm self-start md:self-center">
                  {j.period}
                </div>
                <div>
                  <h3 className="display text-xl md:text-2xl group-hover:text-warm group-active:text-warm transition-colors">{j.title}</h3>
                  {j.subtitle && <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{j.subtitle}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <Reveal as="div" className="mt-20">
          <SectionLabel eyebrow="Credentials" />
          <h3 className="display text-[clamp(1.5rem,3.5vw,2.5rem)] mt-3">Certifications.</h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certs.map((c, idx) => {
              const { linkUrl: target, previewUrl: preview, fileType } = resolveCertificationAssets(c);
              return (
                <Reveal key={c.id} delay={((idx % 3) as 0 | 1 | 2)}>
                <a
                  href={target ?? undefined}
                  target={target ? "_blank" : undefined}
                  rel={target ? "noopener noreferrer" : undefined}
                  aria-label={target ? `Open ${c.title} certificate` : undefined}
                  className="group block border border-border bg-surface/40 p-4 transition-all duration-300 hover:border-warm hover:bg-surface/70 hover:-translate-y-1 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] active:border-warm active:bg-surface/70 active:-translate-y-0.5 active:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <div className="mb-3 aspect-[4/3] overflow-hidden border border-border bg-gradient-to-br from-surface/60 to-background flex items-center justify-center relative">
                    {preview ? (
                      <img src={preview} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-105" />
                    ) : (
                      <div className="text-center px-3 flex flex-col items-center gap-2">
                        <div className="text-5xl transition-transform duration-300 group-hover:scale-110 group-active:scale-105">
                          {iconForFileType(fileType)}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
                          {labelForFileType(fileType)}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-warm/0 group-hover:bg-warm/5 group-active:bg-warm/10 transition-colors pointer-events-none" />
                  </div>
                  <h4 className="display text-[15px] leading-tight group-hover:text-warm group-active:text-warm transition-colors">{c.title}</h4>
                  {c.issuer && <p className="mt-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{c.issuer}</p>}
                  {target && (
                    <span className="mt-2 inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-warm opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                      View →
                    </span>
                  )}
                </a>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container-prose py-20 md:py-28 border-t border-border">
        <Reveal>
        <SectionLabel eyebrow="Highlights" />
        <h2 className="display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]">
          Notable <span className="accent italicize">moments.</span>
        </h2>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {highlights.map((h, i) => (
            <Reveal key={h.id} delay={((i % 3) as 0 | 1 | 2)} className="h-full">
            <div
              className="relative overflow-hidden border border-border bg-gradient-to-br from-surface/40 to-background p-5 pr-10 group transition-all duration-300 hover:border-warm hover:-translate-y-2 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] active:border-warm active:-translate-y-1 active:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.6)] cursor-default h-full flex flex-col"
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-warm/0 group-hover:bg-warm/10 group-active:bg-warm/15 blur-2xl transition-all duration-500" />
              <span className="absolute top-3 right-3 font-mono text-[10px] text-muted-foreground group-hover:text-warm group-active:text-warm transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display text-lg leading-tight group-hover:text-warm group-active:text-warm transition-colors relative">{h.title}</h3>
              {h.subtitle && <p className="mt-2 text-xs text-muted-foreground leading-relaxed relative">{h.subtitle}</p>}
              <span className="block mt-auto pt-4 h-px w-6 bg-warm group-hover:w-16 group-active:w-12 transition-all duration-500" />
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container-prose py-20 md:py-28 border-t border-border relative overflow-hidden">
        {/* ambient glow behind contact */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-warm/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-warm/[0.03] blur-[100px] pointer-events-none" />

        <Reveal className="relative">
          <SectionLabel eyebrow="Contact" />
          <h2 className="display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05] relative">
            Let's make <span className="accent italicize relative inline-block">
              something
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-warm via-warm/60 to-transparent" />
            </span> worth shipping.
          </h2>
          <p className="mt-5 text-[14px] md:text-[16px] leading-relaxed text-muted-foreground max-w-2xl relative">
            {content.contact_body}
          </p>
        </Reveal>
        <Reveal delay={1} className="relative">
          <div className="mt-10 mx-auto md:mx-0 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border max-w-3xl border border-border rounded-sm overflow-hidden">
            <ContactTile
              label="Email"
              value={content.contact_email}
              href={`mailto:${content.contact_email}`}
              icon={<EmailIcon />}
            />
            <ContactTile
              label="Phone"
              value={content.contact_phone}
              href={`tel:${content.contact_phone.replace(/\s+/g, "")}`}
              icon={<PhoneIcon />}
            />
            {content.github_url && (
              <ContactTile
                label="GitHub"
                value={content.github_url.replace(/^https?:\/\//, "")}
                href={content.github_url}
                external
                icon={<GitHubIcon />}
              />
            )}
            {content.linkedin_url && (
              <ContactTile
                label="LinkedIn"
                value={content.linkedin_url.replace(/^https?:\/\//, "")}
                href={content.linkedin_url}
                external
                icon={<LinkedInIcon />}
              />
            )}
          </div>
        </Reveal>
      </section>

      <footer className="container-prose py-10 border-t border-border flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <p className="text-xs text-muted-foreground font-mono">© {new Date().getFullYear()} {content.hero_first_name} {content.hero_last_name}. Crafted with care.</p>
        <a href="/admin" className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-warm">Admin</a>
      </footer>
    </div>
  );
}

function ProjectGroup({ heading, items }: { heading: string; items: Project[] }) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-6 bg-warm" />
        <span className="eyebrow text-warm">{heading}</span>
      </div>
      <div className="grid gap-px bg-border">
        {items.map((p, i) => {
          const Wrap: any = p.url ? "a" : "article";
          const wrapProps = p.url ? { href: p.url, target: "_blank", rel: "noreferrer" } : {};
          return (
            <Wrap
              key={p.id}
              {...wrapProps}
              className="bg-background grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr_auto] gap-x-4 gap-y-3 md:gap-10 py-6 md:py-10 px-4 md:px-6 group transition-all duration-300 hover:bg-gradient-to-r hover:from-surface/70 hover:to-surface/30 hover:pl-5 md:hover:pl-8 active:bg-surface/60 active:pl-5 md:active:pl-8 cursor-pointer border-l-2 border-transparent hover:border-warm active:border-warm relative overflow-hidden"
            >
              {/* ambient hover glow */}
              <div className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-warm/0 group-hover:bg-warm/[0.08] blur-3xl transition-all duration-500" />
              {/* giant ghost numeral */}
              <span aria-hidden className="pointer-events-none absolute right-4 md:right-10 bottom-0 display text-[6rem] md:text-[9rem] leading-none text-warm/0 group-hover:text-warm/[0.06] transition-colors duration-500 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="font-mono text-xs text-muted-foreground group-hover:text-warm group-active:text-warm transition-colors pt-1 relative">{String(i + 1).padStart(2, "0")}</div>
              <div className="min-w-0 max-w-2xl relative">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="display text-xl md:text-3xl group-hover:text-warm group-active:text-warm transition-colors break-words">{p.title}</h3>
                  {p.status && <span className="eyebrow">{p.status}</span>}
                </div>
                <p className="mt-3 text-[13px] md:text-[15px] leading-relaxed text-muted-foreground break-words">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5 md:gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider px-2 py-1 border border-border text-muted-foreground group-hover:border-warm/40 group-hover:text-foreground group-active:border-warm/40 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Mobile visit link */}
                {p.url && (
                  <span className="mt-4 inline-flex md:hidden text-[11px] tracking-[0.18em] uppercase font-mono text-warm">
                    Visit →
                  </span>
                )}
              </div>
              <div className="hidden md:flex md:self-center col-start-3 relative">
                {p.url ? (
                  <span className="text-[12px] tracking-[0.18em] uppercase font-mono text-warm group-hover:translate-x-1 group-active:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Visit <span className="inline-block">→</span>
                  </span>
                ) : (
                  <span className="text-[12px] tracking-[0.18em] uppercase font-mono text-muted-foreground/60">—</span>
                )}
              </div>
            </Wrap>
          );
        })}
      </div>
    </div>
  );
}

function ContactTile({ label, value, href, external, icon }: { label: string; value: string; href: string; external?: boolean; icon?: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="bg-background p-4 md:p-5 group hover:bg-surface/70 active:bg-surface/80 transition-all duration-300 flex items-center gap-3 md:gap-4 relative overflow-hidden"
    >
      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-warm scale-y-0 group-hover:scale-y-100 group-active:scale-y-100 origin-top transition-transform duration-300" />
      {icon && (
        <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg bg-surface/60 border border-border flex items-center justify-center text-muted-foreground group-hover:text-warm group-active:text-warm group-hover:border-warm/50 group-active:border-warm/50 group-hover:bg-warm/5 group-active:bg-warm/5 group-hover:scale-110 group-active:scale-110 transition-all duration-300">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-warm group-active:text-warm transition-colors">{label}</div>
        <div className="mt-1 display text-sm md:text-[15px] group-hover:text-warm group-active:text-warm transition-colors break-all sm:break-words leading-snug flex items-center gap-1.5">
          <span className="truncate">{value}</span>
          <span className="inline-block shrink-0 transition-transform group-hover:translate-x-1 group-active:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow">{label}</div>
      <div className="mt-2 text-sm md:text-base">{value}</div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="display text-3xl md:text-5xl accent">{n}</div>
      <div className="mt-1 text-xs md:text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function iconForFileType(t?: string | null) {
  if (!t) return "📄";
  if (t.startsWith("image/")) return "🖼️";
  if (t === "application/pdf") return "📕";
  if (t.includes("word") || t.includes("document")) return "📝";
  if (t.includes("sheet") || t.includes("excel")) return "📊";
  if (t.includes("presentation") || t.includes("powerpoint")) return "📽️";
  if (t.startsWith("video/")) return "🎬";
  if (t.startsWith("audio/")) return "🎵";
  return "📄";
}

function labelForFileType(t?: string | null) {
  if (!t) return "Document";
  if (t === "application/pdf") return "PDF";
  if (t.startsWith("image/")) return "Image";
  const sub = t.split("/")[1] ?? "file";
  return sub.length > 12 ? "Document" : sub.toUpperCase();
}

function SectionLabel({ eyebrow }: { eyebrow: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-border" />
      <span className="eyebrow">{eyebrow}</span>
    </div>
  );
}

/* Contact icons */
function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
