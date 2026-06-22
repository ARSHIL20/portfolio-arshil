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
const TABS = [
  { id: "content", label: "Site content" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "certifications", label: "Certifications" },
  { id: "highlights", label: "Notable moments" },
  { id: "gallery", label: "Gallery" }
];
function AdminDashboard({ email, onSignOut }) {
  const [tab, setTab] = reactExports.useState("content");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border sticky top-0 bg-background/85 backdrop-blur z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose flex h-14 items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "display text-lg", children: [
            "Arshil",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow hidden sm:inline", children: "Admin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline font-mono truncate max-w-[200px]", children: email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onSignOut, className: "px-3 py-1.5 border border-border font-mono text-[11px] uppercase tracking-[0.18em] hover:border-warm hover:text-warm", children: "Sign out" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-1 -mb-px", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setTab(t.id),
          className: `px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] border-b-2 whitespace-nowrap ${tab === t.id ? "border-warm text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
          children: t.label
        },
        t.id
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-prose py-10", children: [
      tab === "content" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContentEditor, {}),
      tab === "projects" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsEditor, {}),
      tab === "skills" && /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsEditor, {}),
      tab === "journey" && /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyEditor, {}),
      tab === "certifications" && /* @__PURE__ */ jsxRuntimeExports.jsx(CertificationsEditor, {}),
      tab === "highlights" && /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightsEditor, {}),
      tab === "gallery" && /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryEditor, {})
    ] })
  ] });
}
function Input(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...props, className: `w-full bg-input/30 border border-border px-3 py-2 text-sm focus:outline-none focus:border-warm ${props.className ?? ""}` });
}
function Textarea(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ...props, className: `w-full bg-input/30 border border-border px-3 py-2 text-sm focus:outline-none focus:border-warm ${props.className ?? ""}` });
}
function Label({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow block mb-2", children });
}
function Btn({ children, ...p }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ...p, className: `px-4 py-2 bg-foreground text-background font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-warm disabled:opacity-50 ${p.className ?? ""}`, children });
}
function BtnGhost({ children, ...p }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ...p, className: `px-3 py-1.5 border border-border font-mono text-[11px] uppercase tracking-[0.18em] hover:border-warm hover:text-warm ${p.className ?? ""}`, children });
}
function Card({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-surface/40 p-5", children });
}
function useToast() {
  const [msg, setMsg] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (msg) {
      const t = setTimeout(() => setMsg(null), 2500);
      return () => clearTimeout(t);
    }
  }, [msg]);
  const node = msg ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-6 right-6 bg-foreground text-background px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] z-50", children: msg }) : null;
  return { toast: setMsg, node };
}
async function uploadFile(file) {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false, contentType: file.type || void 0 });
  if (error) {
    alert(error.message);
    return null;
  }
  const { data } = await supabase.storage.from("media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  return data?.signedUrl ? { url: data.signedUrl, type: file.type || "application/octet-stream" } : null;
}
function ContentEditor() {
  const [c, setC] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const { toast, node } = useToast();
  reactExports.useEffect(() => {
    supabase.from("site_content").select("*").eq("id", "main").maybeSingle().then(({ data }) => setC(data));
  }, []);
  if (!c) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" });
  const set = (k, v) => setC({ ...c, [k]: v });
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("site_content").update(c).eq("id", "main");
    setSaving(false);
    toast(error ? error.message : "Saved");
  };
  const onAvatar = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const res = await uploadFile(f);
    if (res) {
      set("avatar_url", res.url);
      toast("Uploaded — remember to save");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "grid gap-6 max-w-3xl", children: [
    node,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Admin photo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        c.avatar_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.avatar_url, alt: "", className: "w-20 h-20 object-cover border border-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: onAvatar, className: "text-sm" }),
        c.avatar_url && /* @__PURE__ */ jsxRuntimeExports.jsx(BtnGhost, { type: "button", onClick: () => set("avatar_url", null), children: "Remove" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "First name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.hero_first_name, onChange: (e) => set("hero_first_name", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Last name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.hero_last_name, onChange: (e) => set("hero_last_name", e.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hero tagline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.hero_tagline, onChange: (e) => set("hero_tagline", e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Portfolio label" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.portfolio_label, onChange: (e) => set("portfolio_label", e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hero intro" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: c.hero_intro, onChange: (e) => set("hero_intro", e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.role, onChange: (e) => set("role", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Based in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.based_in, onChange: (e) => set("based_in", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Studying" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.studying, onChange: (e) => set("studying", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.status, onChange: (e) => set("status", e.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: c.available, onChange: (e) => set("available", e.target.checked) }),
      ' Show "Available" badge'
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "About heading" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.about_heading, onChange: (e) => set("about_heading", e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "About body" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: c.about_body, onChange: (e) => set("about_body", e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Projects stat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.stats_projects, onChange: (e) => set("stats_projects", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Certs stat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.stats_certs, onChange: (e) => set("stats_certs", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hackathons stat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.stats_hackathons, onChange: (e) => set("stats_hackathons", e.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contact heading" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.contact_heading, onChange: (e) => set("contact_heading", e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contact body" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: c.contact_body, onChange: (e) => set("contact_body", e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.contact_email, onChange: (e) => set("contact_email", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.contact_phone, onChange: (e) => set("contact_phone", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "GitHub URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.github_url, onChange: (e) => set("github_url", e.target.value), placeholder: "https://github.com/…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "LinkedIn URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.linkedin_url, onChange: (e) => set("linkedin_url", e.target.value), placeholder: "https://linkedin.com/in/…" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { type: "submit", disabled: saving, children: saving ? "Saving…" : "Save changes" }) })
  ] });
}
function useCollection(table) {
  const [items, setItems] = reactExports.useState([]);
  const sb = supabase;
  const reload = () => sb.from(table).select("*").order("position").then(({ data }) => setItems(data ?? []));
  reactExports.useEffect(() => {
    reload();
  }, []);
  const remove = async (id) => {
    if (!confirm("Delete this entry?")) return;
    await sb.from(table).delete().eq("id", id);
    reload();
  };
  const save = async (row) => {
    if (row.id) await sb.from(table).update(row).eq("id", row.id);
    else await sb.from(table).insert(row);
    reload();
  };
  return { items, save, remove, reload };
}
function ProjectsEditor() {
  const { items, save, remove } = useCollection("projects");
  const { toast, node } = useToast();
  const empty = { position: 0, title: "", description: "", tech: [], status: "", url: "", category: "Major" };
  const [draft, setDraft] = reactExports.useState(empty);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    node,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-lg mb-4", children: "Add project" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onSubmit: async (e) => {
        e.preventDefault();
        await save(draft);
        setDraft(empty);
        toast("Added");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: draft.position ?? 0, onChange: (e) => setDraft({ ...draft, position: +e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: draft.category ?? "Major", onChange: (e) => setDraft({ ...draft, category: e.target.value }), className: "w-full bg-input/30 border border-border px-3 py-2 text-sm focus:outline-none focus:border-warm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Major", children: "Major" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Minor", children: "Minor" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.status ?? "", onChange: (e) => setDraft({ ...draft, status: e.target.value }), placeholder: "Shipped / In development" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: draft.title ?? "", onChange: (e) => setDraft({ ...draft, title: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.url ?? "", onChange: (e) => setDraft({ ...draft, url: e.target.value }), placeholder: "https://…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { required: true, rows: 3, value: draft.description ?? "", onChange: (e) => setDraft({ ...draft, description: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tech (comma-separated)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: (draft.tech ?? []).join(", "), onChange: (e) => setDraft({ ...draft, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { type: "submit", children: "Add project" }) })
      ] })
    ] }),
    items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectRow, { row: p, onSave: async (r) => {
      await save(r);
      toast("Saved");
    }, onDelete: () => remove(p.id) }, p.id))
  ] });
}
function ProjectRow({ row, onSave, onDelete }) {
  const [r, setR] = reactExports.useState(row);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: r.position, onChange: (e) => setR({ ...r, position: +e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: r.category ?? "Major", onChange: (e) => setR({ ...r, category: e.target.value }), className: "w-full bg-input/30 border border-border px-3 py-2 text-sm focus:outline-none focus:border-warm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Major", children: "Major" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Minor", children: "Minor" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.status ?? "", onChange: (e) => setR({ ...r, status: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.title, onChange: (e) => setR({ ...r, title: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.url ?? "", onChange: (e) => setR({ ...r, url: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: r.description, onChange: (e) => setR({ ...r, description: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tech" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.tech.join(", "), onChange: (e) => setR({ ...r, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActions, { onSave: () => onSave(r), onDelete })
  ] });
}
function SkillsEditor() {
  const { items, save, remove } = useCollection("skills");
  const { toast, node } = useToast();
  const [d, setD] = reactExports.useState({ position: 0, category: "", items: [] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    node,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-lg mb-4", children: "Add skill group" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onSubmit: async (e) => {
        e.preventDefault();
        await save(d);
        setD({ position: 0, category: "", items: [] });
        toast("Added");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: d.position ?? 0, onChange: (e) => setD({ ...d, position: +e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: d.category ?? "", onChange: (e) => setD({ ...d, category: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Items (comma-separated)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: (d.items ?? []).join(", "), onChange: (e) => setD({ ...d, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { type: "submit", children: "Add" }) })
      ] })
    ] }),
    items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillRow, { row: s, onSave: async (r) => {
      await save(r);
      toast("Saved");
    }, onDelete: () => remove(s.id) }, s.id))
  ] });
}
function SkillRow({ row, onSave, onDelete }) {
  const [r, setR] = reactExports.useState(row);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: r.position, onChange: (e) => setR({ ...r, position: +e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.category, onChange: (e) => setR({ ...r, category: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.items.join(", "), onChange: (e) => setR({ ...r, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActions, { onSave: () => onSave(r), onDelete })
  ] });
}
function JourneyEditor() {
  const { items, save, remove } = useCollection("journey");
  const { toast, node } = useToast();
  const [d, setD] = reactExports.useState({ position: 0, period: "", title: "", subtitle: "" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    node,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-lg mb-4", children: "Add entry" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onSubmit: async (e) => {
        e.preventDefault();
        await save(d);
        setD({ position: 0, period: "", title: "", subtitle: "" });
        toast("Added");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: d.position ?? 0, onChange: (e) => setD({ ...d, position: +e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Period" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: d.period ?? "", onChange: (e) => setD({ ...d, period: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: d.title ?? "", onChange: (e) => setD({ ...d, title: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Subtitle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: d.subtitle ?? "", onChange: (e) => setD({ ...d, subtitle: e.target.value }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { type: "submit", children: "Add" }) })
      ] })
    ] }),
    items.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyRow, { row: j, onSave: async (r) => {
      await save(r);
      toast("Saved");
    }, onDelete: () => remove(j.id) }, j.id))
  ] });
}
function JourneyRow({ row, onSave, onDelete }) {
  const [r, setR] = reactExports.useState(row);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: r.position, onChange: (e) => setR({ ...r, position: +e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Period" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.period, onChange: (e) => setR({ ...r, period: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.title, onChange: (e) => setR({ ...r, title: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Subtitle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.subtitle ?? "", onChange: (e) => setR({ ...r, subtitle: e.target.value }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActions, { onSave: () => onSave(r), onDelete })
  ] });
}
function CertificationsEditor() {
  const { items, save, remove } = useCollection("certifications");
  const { toast, node } = useToast();
  const empty = { position: 0, title: "", issuer: "", image_url: null, file_url: null, file_type: null };
  const [d, setD] = reactExports.useState(empty);
  const uploadCert = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const res = await uploadFile(f);
    if (res) {
      const isImage = res.type.startsWith("image/");
      setD({ ...d, file_url: res.url, file_type: res.type, image_url: isImage ? res.url : d.image_url ?? null });
    }
  };
  const uploadThumb = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const res = await uploadFile(f);
    if (res) setD({ ...d, image_url: res.url });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    node,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-lg mb-4", children: "Add certification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onSubmit: async (e) => {
        e.preventDefault();
        await save(d);
        setD(empty);
        toast("Added");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: d.position ?? 0, onChange: (e) => setD({ ...d, position: +e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: d.title ?? "", onChange: (e) => setD({ ...d, title: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Issuer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: d.issuer ?? "", onChange: (e) => setD({ ...d, issuer: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Certificate file (PDF / doc / image)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*,application/pdf,.doc,.docx,.ppt,.pptx", onChange: uploadCert, className: "text-sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Thumbnail image (optional, for non-image files)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: uploadThumb, className: "text-sm" })
          ] }),
          d.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image_url, alt: "", className: "h-24 object-cover border border-border" }) }),
          d.file_url && !d.file_type?.startsWith("image/") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] font-mono uppercase tracking-wider text-warm", children: [
            "File uploaded: ",
            d.file_type
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { type: "submit", children: "Add" }) })
      ] })
    ] }),
    items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CertRow, { row: c, onSave: async (r) => {
      await save(r);
      toast("Saved");
    }, onDelete: () => remove(c.id) }, c.id))
  ] });
}
function CertRow({ row, onSave, onDelete }) {
  const [r, setR] = reactExports.useState(row);
  const uploadCert = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const res = await uploadFile(f);
    if (res) {
      const isImage = res.type.startsWith("image/");
      setR({ ...r, file_url: res.url, file_type: res.type, image_url: isImage ? res.url : r.image_url });
    }
  };
  const uploadThumb = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const res = await uploadFile(f);
    if (res) setR({ ...r, image_url: res.url });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: r.position, onChange: (e) => setR({ ...r, position: +e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.title, onChange: (e) => setR({ ...r, title: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Issuer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.issuer ?? "", onChange: (e) => setR({ ...r, issuer: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Replace file" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*,application/pdf,.doc,.docx,.ppt,.pptx", onChange: uploadCert, className: "text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Replace thumbnail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: uploadThumb, className: "text-sm" })
      ] }),
      r.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.image_url, alt: "", className: "h-24 object-cover border border-border" }) }),
      r.file_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground break-all", children: [
        "File: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: r.file_url, target: "_blank", rel: "noreferrer", className: "text-warm hover:underline", children: [
          "open (",
          r.file_type ?? "file",
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActions, { onSave: () => onSave(r), onDelete })
  ] });
}
function HighlightsEditor() {
  const { items, save, remove } = useCollection("highlights");
  const { toast, node } = useToast();
  const [d, setD] = reactExports.useState({ position: 0, title: "", subtitle: "" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    node,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-lg mb-4", children: "Add moment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onSubmit: async (e) => {
        e.preventDefault();
        await save(d);
        setD({ position: 0, title: "", subtitle: "" });
        toast("Added");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: d.position ?? 0, onChange: (e) => setD({ ...d, position: +e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: d.title ?? "", onChange: (e) => setD({ ...d, title: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Subtitle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: d.subtitle ?? "", onChange: (e) => setD({ ...d, subtitle: e.target.value }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { type: "submit", children: "Add" }) })
      ] })
    ] }),
    items.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightRow, { row: h, onSave: async (r) => {
      await save(r);
      toast("Saved");
    }, onDelete: () => remove(h.id) }, h.id))
  ] });
}
function HighlightRow({ row, onSave, onDelete }) {
  const [r, setR] = reactExports.useState(row);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: r.position, onChange: (e) => setR({ ...r, position: +e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.title, onChange: (e) => setR({ ...r, title: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Subtitle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.subtitle ?? "", onChange: (e) => setR({ ...r, subtitle: e.target.value }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActions, { onSave: () => onSave(r), onDelete })
  ] });
}
function GalleryEditor() {
  const { items, save, remove } = useCollection("gallery");
  const { toast, node } = useToast();
  const [d, setD] = reactExports.useState({ position: 0, caption: "", image_url: "" });
  const upload = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const res = await uploadFile(f);
    if (res) setD({ ...d, image_url: res.url });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    node,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-lg mb-4", children: "Add photo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onSubmit: async (e) => {
        e.preventDefault();
        if (!d.image_url) {
          alert("Upload an image first");
          return;
        }
        await save(d);
        setD({ position: 0, caption: "", image_url: "" });
        toast("Added");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: d.position ?? 0, onChange: (e) => setD({ ...d, position: +e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Caption" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: d.caption ?? "", onChange: (e) => setD({ ...d, caption: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: upload, className: "text-sm" })
          ] }),
          d.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image_url, alt: "", className: "h-32 object-cover border border-border" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { type: "submit", children: "Add" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: items.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryCard, { row: g, onSave: async (r) => {
      await save(r);
      toast("Saved");
    }, onDelete: () => remove(g.id) }, g.id)) })
  ] });
}
function GalleryCard({ row, onSave, onDelete }) {
  const [r, setR] = reactExports.useState(row);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.image_url, alt: "", className: "w-full aspect-square object-cover border border-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: r.position, onChange: (e) => setR({ ...r, position: +e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Caption" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.caption ?? "", onChange: (e) => setR({ ...r, caption: e.target.value }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActions, { onSave: () => onSave(r), onDelete })
  ] });
}
function Grid({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children });
}
function Form({ children, onSubmit }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit, children });
}
function RowActions({ onSave, onDelete }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-3 justify-end", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BtnGhost, { type: "button", onClick: onDelete, children: "Delete" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { type: "button", onClick: onSave, children: "Save" })
  ] });
}
function AdminApp() {
  const [loading, setLoading] = reactExports.useState(true);
  const [email, setEmail] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [emailInput, setEmailInput] = reactExports.useState("");
  const [passwordInput, setPasswordInput] = reactExports.useState("");
  reactExports.useEffect(() => {
    const check = async (em) => {
      setEmail(em);
      setLoading(false);
    };
    supabase.auth.getSession().then(({ data }) => {
      check(data.session?.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setLoading(true);
      check(s?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const onEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const normalized = emailInput.trim().toLowerCase();
    setBusy(true);
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email: normalized,
        password: passwordInput
      });
      console.log("Signin response:", { data, err });
      if (err) setError(err.message + " (check console for details)");
    } catch (e2) {
      console.error("Unexpected error:", e2);
      setError(e2 instanceof Error ? e2.message : "Unexpected error");
    } finally {
      setBusy(false);
    }
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    setEmail(null);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center text-muted-foreground text-sm", children: "Loading…" });
  }
  if (!email) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Shell, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display text-3xl md:text-4xl", children: "Admin access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-md", children: "Sign in with your admin account." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
        " sign in with email ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onEmailSubmit, className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            required: true,
            placeholder: "admin@email.com",
            value: emailInput,
            onChange: (e) => setEmailInput(e.target.value),
            className: "bg-input/30 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-warm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            required: true,
            minLength: 6,
            placeholder: "Password",
            value: passwordInput,
            onChange: (e) => setPasswordInput(e.target.value),
            className: "bg-input/30 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-warm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: busy,
            className: "px-5 py-3 border border-border font-mono text-[12px] uppercase tracking-[0.18em] hover:border-warm hover:text-warm disabled:opacity-60",
            children: busy ? "Please wait…" : "Sign in"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-destructive", children: error })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { email, onSignOut: signOut });
}
function Shell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "eyebrow hover:text-warm", children: "← Back to site" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children })
  ] }) });
}
const SplitComponent = AdminApp;
export {
  SplitComponent as component
};
