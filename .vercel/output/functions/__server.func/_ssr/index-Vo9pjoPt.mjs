import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-BZRAl7nF.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const NAV = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" }
];
function SiteHeader({ available }) {
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);
  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose flex h-14 md:h-16 items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "display text-lg md:text-xl tracking-tight", children: [
        "Arshil",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-7 text-[12px] tracking-[0.18em] uppercase font-mono text-muted-foreground", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scrollTo(n.id), className: "hover:text-foreground transition-colors", children: n.label }, n.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        available && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-warm animate-pulse" }),
          " Available"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen((v) => !v),
            "aria-label": "Toggle menu",
            className: "md:hidden text-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 6l12 12M6 18L18 6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 7h16M4 12h16M4 17h16" }) })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md mobile-nav-enter", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose py-5 grid gap-1 text-[13px] tracking-[0.18em] uppercase font-mono", children: NAV.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => scrollTo(n.id),
        style: { animationDelay: `${60 + i * 50}ms` },
        className: "mobile-nav-item group flex items-center justify-between text-left text-muted-foreground hover:text-warm active:text-warm py-2.5 px-2 -mx-2 rounded transition-colors border-l-2 border-transparent hover:border-warm hover:pl-3 active:pl-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/60 group-hover:text-warm", children: String(i + 1).padStart(2, "0") }),
            n.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-warm", children: "→" })
        ]
      },
      n.id
    )) }) })
  ] });
}
function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
  id
}) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  const delayCls = delay ? ` reveal-delay-${delay}` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      ref,
      id,
      className: `reveal${delayCls}${visible ? " is-visible" : ""} ${className}`.trim(),
      children
    }
  );
}
function Portfolio() {
  const [content, setContent] = reactExports.useState(null);
  const [projects, setProjects] = reactExports.useState([]);
  const [skills, setSkills] = reactExports.useState([]);
  const [journey, setJourney] = reactExports.useState([]);
  const [certs, setCerts] = reactExports.useState([]);
  const [highlights, setHighlights] = reactExports.useState([]);
  reactExports.useEffect(() => {
    (async () => {
      const [c, p, s, j, ce, h] = await Promise.all([
        supabase.from("site_content").select("*").eq("id", "main").maybeSingle(),
        supabase.from("projects").select("*").order("position"),
        supabase.from("skills").select("*").order("position"),
        supabase.from("journey").select("*").order("position"),
        supabase.from("certifications").select("*").order("position"),
        supabase.from("highlights").select("*").order("position")
      ]);
      if (c.data) setContent(c.data);
      if (p.data) setProjects(p.data);
      if (s.data) setSkills(s.data);
      if (j.data) setJourney(j.data);
      if (ce.data) setCerts(ce.data);
      if (h.data) setHighlights(h.data);
    })();
  }, []);
  const majorProjects = reactExports.useMemo(() => projects.filter((p) => (p.category ?? "Major") === "Major"), [projects]);
  const minorProjects = reactExports.useMemo(() => projects.filter((p) => p.category === "Minor"), [projects]);
  if (!content) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center text-muted-foreground text-sm", children: "Loading…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "top", className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, { available: content.available }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose pt-16 md:pt-28 pb-20 md:pb-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: content.portfolio_label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95]", children: [
        content.hero_first_name,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent italicize", children: content.hero_last_name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "display italicize text-[clamp(1.15rem,3vw,2.5rem)] mt-4 md:mt-6 text-muted-foreground max-w-5xl", children: [
        "— ",
        content.hero_tagline
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 md:mt-16 grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] md:text-[17px] leading-relaxed text-muted-foreground max-w-2xl", children: content.hero_intro }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }),
              className: "px-5 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase font-mono hover:bg-warm transition-colors active:scale-[0.97] active:transition-transform",
              children: "See selected work →"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
              className: "px-5 py-3 border border-border text-[12px] tracking-[0.18em] uppercase font-mono hover:border-warm hover:text-warm transition-colors active:scale-[0.97] active:transition-transform",
              children: "Get in touch"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 md:mt-20 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { label: "Role", value: content.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { label: "Based in", value: content.based_in }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { label: "Studying", value: content.studying }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { label: "Status", value: content.status })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "about", className: "container-prose py-20 md:py-28 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { eyebrow: "About" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]", children: content.about_heading }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid md:grid-cols-2 gap-10 md:gap-16 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] md:text-[17px] leading-relaxed text-muted-foreground", children: content.about_body }),
        content.avatar_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm mx-auto md:mx-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: content.avatar_url,
              alt: `${content.hero_first_name} ${content.hero_last_name}`,
              className: "w-full aspect-[4/5] object-cover rounded-sm border border-border transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-3 -right-3 w-24 h-24 border border-warm/40 rounded-sm -z-10" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid grid-cols-3 gap-4 md:gap-8 border-t border-border pt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: content.stats_projects, label: "Projects shipped" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: content.stats_certs, label: "Certifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: content.stats_hackathons, label: "Hackathons" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "work", className: "container-prose py-20 md:py-28 border-t border-border relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -left-20 w-72 h-72 rounded-full bg-warm/[0.04] blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { eyebrow: "Selected work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]", children: [
          "Things I've built ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent italicize", children: "and what I learned." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow mt-4", children: [
          String(projects.length).padStart(2, "0"),
          " projects · 2023 — present"
        ] })
      ] }),
      majorProjects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectGroup, { heading: "Major projects", items: majorProjects }) }),
      minorProjects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectGroup, { heading: "Minor projects", items: minorProjects }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "skills", className: "container-prose py-20 md:py-28 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { eyebrow: "Toolkit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]", children: [
        "What I reach for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent italicize", children: "when I'm building." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border", children: skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 3, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-6 md:p-8 h-full transition-colors hover:bg-surface/60 active:bg-surface/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-xl", children: s.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: String(i + 1).padStart(2, "0") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 grid gap-2 text-sm text-muted-foreground", children: s.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-3 bg-warm/60" }),
          it
        ] }, it)) })
      ] }) }, s.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "journey", className: "container-prose py-20 md:py-28 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { eyebrow: "Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]", children: [
        "Education ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent italicize", children: "& experience." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-px bg-border", children: journey.map((j, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: idx % 3, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-background grid md:grid-cols-[200px_1fr] gap-2 md:gap-10 py-6 md:py-8 px-4 md:px-6 group transition-all duration-300 hover:bg-surface/70 hover:pl-6 md:hover:pl-8 active:bg-surface/80 active:border-warm active:pl-6 md:active:pl-8 cursor-default border-l-2 border-transparent hover:border-warm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.18em] text-warm self-start md:self-center", children: j.period }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-xl md:text-2xl group-hover:text-warm group-active:text-warm transition-colors", children: j.title }),
              j.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground leading-relaxed", children: j.subtitle })
            ] })
          ]
        }
      ) }, j.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { as: "div", className: "mt-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { eyebrow: "Credentials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-[clamp(1.5rem,3.5vw,2.5rem)] mt-3", children: "Certifications." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: certs.map((c, idx) => {
          const target = c.file_url ?? c.image_url ?? null;
          const isImage = !c.file_type || c.file_type.startsWith("image/");
          const preview = c.image_url ?? (isImage ? c.file_url : null);
          const Wrap = target ? "a" : "div";
          const wrapProps = target ? { href: target, target: "_blank", rel: "noreferrer" } : {};
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: idx % 3, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Wrap,
            {
              ...wrapProps,
              className: "group block border border-border bg-surface/40 p-4 transition-all duration-300 hover:border-warm hover:bg-surface/70 hover:-translate-y-1 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] active:border-warm active:bg-surface/70 active:-translate-y-0.5 active:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)] cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 aspect-[4/3] overflow-hidden border border-border bg-gradient-to-br from-surface/60 to-background flex items-center justify-center relative", children: [
                  preview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: c.title, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-3 flex flex-col items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl transition-transform duration-300 group-hover:scale-110 group-active:scale-105", children: iconForFileType(c.file_type) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.18em] text-warm", children: labelForFileType(c.file_type) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-warm/0 group-hover:bg-warm/5 group-active:bg-warm/10 transition-colors" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "display text-[15px] leading-tight group-hover:text-warm group-active:text-warm transition-colors", children: c.title }),
                c.issuer && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground", children: c.issuer }),
                target && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-warm opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity", children: "View →" })
              ]
            }
          ) }, c.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose py-20 md:py-28 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { eyebrow: "Highlights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05]", children: [
          "Notable ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent italicize", children: "moments." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch", children: highlights.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 3, className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative overflow-hidden border border-border bg-gradient-to-br from-surface/40 to-background p-5 pr-10 group transition-all duration-300 hover:border-warm hover:-translate-y-2 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] active:border-warm active:-translate-y-1 active:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.6)] cursor-default h-full flex flex-col",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 w-28 h-28 rounded-full bg-warm/0 group-hover:bg-warm/10 group-active:bg-warm/15 blur-2xl transition-all duration-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 font-mono text-[10px] text-muted-foreground group-hover:text-warm group-active:text-warm transition-colors", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-lg leading-tight group-hover:text-warm group-active:text-warm transition-colors relative", children: h.title }),
            h.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed relative", children: h.subtitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mt-auto pt-4 h-px w-6 bg-warm group-hover:w-16 group-active:w-12 transition-all duration-500" })
          ]
        }
      ) }, h.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "container-prose py-20 md:py-28 border-t border-border relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-warm/[0.04] blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-72 h-72 rounded-full bg-warm/[0.03] blur-[100px] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { eyebrow: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-[clamp(1.875rem,5vw,3.75rem)] max-w-4xl mt-4 leading-[1.05] relative", children: [
          "Let's make ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "accent italicize relative inline-block", children: [
            "something",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-warm via-warm/60 to-transparent" })
          ] }),
          " worth shipping."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-[14px] md:text-[16px] leading-relaxed text-muted-foreground max-w-2xl relative", children: content.contact_body })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 1, className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 mx-auto md:mx-0 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border max-w-3xl border border-border rounded-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContactTile,
          {
            label: "Email",
            value: content.contact_email,
            href: `mailto:${content.contact_email}`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EmailIcon, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContactTile,
          {
            label: "Phone",
            value: content.contact_phone,
            href: `tel:${content.contact_phone.replace(/\s+/g, "")}`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIcon, {})
          }
        ),
        content.github_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContactTile,
          {
            label: "GitHub",
            value: content.github_url.replace(/^https?:\/\//, ""),
            href: content.github_url,
            external: true,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitHubIcon, {})
          }
        ),
        content.linkedin_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContactTile,
          {
            label: "LinkedIn",
            value: content.linkedin_url.replace(/^https?:\/\//, ""),
            href: content.linkedin_url,
            external: true,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LinkedInIcon, {})
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "container-prose py-10 border-t border-border flex flex-col md:flex-row gap-3 items-start md:items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        content.hero_first_name,
        " ",
        content.hero_last_name,
        ". Crafted with care."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin", className: "text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-warm", children: "Admin" })
    ] })
  ] });
}
function ProjectGroup({ heading, items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-6 bg-warm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow text-warm", children: heading })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px bg-border", children: items.map((p, i) => {
      const Wrap = p.url ? "a" : "article";
      const wrapProps = p.url ? { href: p.url, target: "_blank", rel: "noreferrer" } : {};
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Wrap,
        {
          ...wrapProps,
          className: "bg-background grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr_auto] gap-x-4 gap-y-3 md:gap-10 py-6 md:py-10 px-4 md:px-6 group transition-all duration-300 hover:bg-gradient-to-r hover:from-surface/70 hover:to-surface/30 hover:pl-5 md:hover:pl-8 active:bg-surface/60 active:pl-5 md:active:pl-8 cursor-pointer border-l-2 border-transparent hover:border-warm active:border-warm relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-warm/0 group-hover:bg-warm/[0.08] blur-3xl transition-all duration-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "pointer-events-none absolute right-4 md:right-10 bottom-0 display text-[6rem] md:text-[9rem] leading-none text-warm/0 group-hover:text-warm/[0.06] transition-colors duration-500 select-none", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground group-hover:text-warm group-active:text-warm transition-colors pt-1 relative", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 max-w-2xl relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-xl md:text-3xl group-hover:text-warm group-active:text-warm transition-colors break-words", children: p.title }),
                p.status && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: p.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[13px] md:text-[15px] leading-relaxed text-muted-foreground break-words", children: p.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-1.5 md:gap-2", children: p.tech.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] md:text-[11px] font-mono uppercase tracking-wider px-2 py-1 border border-border text-muted-foreground group-hover:border-warm/40 group-hover:text-foreground group-active:border-warm/40 transition-colors", children: t }, t)) }),
              p.url && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-4 inline-flex md:hidden text-[11px] tracking-[0.18em] uppercase font-mono text-warm", children: "Visit →" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex md:self-center col-start-3 relative", children: p.url ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12px] tracking-[0.18em] uppercase font-mono text-warm group-hover:translate-x-1 group-active:translate-x-1 transition-transform inline-flex items-center gap-1", children: [
              "Visit ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block", children: "→" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] tracking-[0.18em] uppercase font-mono text-muted-foreground/60", children: "—" }) })
          ]
        },
        p.id
      );
    }) })
  ] });
}
function ContactTile({ label, value, href, external, icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href,
      ...external ? { target: "_blank", rel: "noreferrer" } : {},
      className: "bg-background p-4 md:p-5 group hover:bg-surface/70 active:bg-surface/80 transition-all duration-300 flex items-center gap-3 md:gap-4 relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-0 bottom-0 w-[2px] bg-warm scale-y-0 group-hover:scale-y-100 group-active:scale-y-100 origin-top transition-transform duration-300" }),
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg bg-surface/60 border border-border flex items-center justify-center text-muted-foreground group-hover:text-warm group-active:text-warm group-hover:border-warm/50 group-active:border-warm/50 group-hover:bg-warm/5 group-active:bg-warm/5 group-hover:scale-110 group-active:scale-110 transition-all duration-300", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-warm group-active:text-warm transition-colors", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 display text-sm md:text-[15px] group-hover:text-warm group-active:text-warm transition-colors break-all sm:break-words leading-snug flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block shrink-0 transition-transform group-hover:translate-x-1 group-active:translate-x-1", children: "→" })
          ] })
        ] })
      ]
    }
  );
}
function Meta({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm md:text-base", children: value })
  ] });
}
function Stat({ n, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display text-3xl md:text-5xl accent", children: n }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs md:text-sm text-muted-foreground", children: label })
  ] });
}
function iconForFileType(t) {
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
function labelForFileType(t) {
  if (!t) return "Document";
  if (t === "application/pdf") return "PDF";
  if (t.startsWith("image/")) return "Image";
  const sub = t.split("/")[1] ?? "file";
  return sub.length > 12 ? "Document" : sub.toUpperCase();
}
function SectionLabel({ eyebrow }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: eyebrow })
  ] });
}
function EmailIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
  ] });
}
function PhoneIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" }) });
}
function GitHubIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }) });
}
function LinkedInIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) });
}
const SplitComponent = Portfolio;
export {
  SplitComponent as component
};
