import { useEffect, useState } from "react";

const NAV = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function SiteHeader({ available }: { available: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="container-prose flex h-14 md:h-16 items-center justify-between gap-4">
        <a href="#top" className="display text-lg md:text-xl tracking-tight">
          Arshil<span className="accent">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[12px] tracking-[0.18em] uppercase font-mono text-muted-foreground">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="hover:text-foreground transition-colors">
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {available && (
            <span className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-warm animate-pulse" /> Available
            </span>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden text-foreground"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md mobile-nav-enter">
          <div className="container-prose py-5 grid gap-1 text-[13px] tracking-[0.18em] uppercase font-mono">
            {NAV.map((n, i) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                style={{ animationDelay: `${60 + i * 50}ms` }}
                className="mobile-nav-item group flex items-center justify-between text-left text-muted-foreground hover:text-warm active:text-warm py-2.5 px-2 -mx-2 rounded transition-colors border-l-2 border-transparent hover:border-warm hover:pl-3 active:pl-3"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-warm">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </span>
                <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-warm">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
