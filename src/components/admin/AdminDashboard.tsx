import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import type {
  SiteContent, Project, Skill, JourneyEntry, Certification, Highlight, GalleryItem,
} from "@/lib/portfolio-types";
import { resolveAvatarUrl, resolveCertificationAssets, resolvePublicAssetUrl } from "@/lib/utils";

type Tab = "content" | "projects" | "skills" | "journey" | "certifications" | "highlights" | "gallery";
const TABS: { id: Tab; label: string }[] = [
  { id: "content", label: "Site content" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "certifications", label: "Certifications" },
  { id: "highlights", label: "Notable moments" },
  { id: "gallery", label: "Gallery" },
];

export function AdminDashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("content");
  return (
    <div className="min-h-screen">
      <header className="border-b border-border sticky top-0 bg-background/85 backdrop-blur z-20">
        <div className="container-prose flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="/" className="display text-lg">Arshil<span className="accent">.</span></a>
            <span className="eyebrow hidden sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="hidden sm:inline font-mono truncate max-w-[200px]">{email}</span>
            <button onClick={onSignOut} className="px-3 py-1.5 border border-border font-mono text-[11px] uppercase tracking-[0.18em] hover:border-warm hover:text-warm">Sign out</button>
          </div>
        </div>
        <div className="container-prose overflow-x-auto">
          <nav className="flex gap-1 -mb-px">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] border-b-2 whitespace-nowrap ${tab === t.id ? "border-warm text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container-prose py-10">
        {tab === "content" && <ContentEditor />}
        {tab === "projects" && <ProjectsEditor />}
        {tab === "skills" && <SkillsEditor />}
        {tab === "journey" && <JourneyEditor />}
        {tab === "certifications" && <CertificationsEditor />}
        {tab === "highlights" && <HighlightsEditor />}
        {tab === "gallery" && <GalleryEditor />}
      </main>
    </div>
  );
}

// ---------- Shared UI ----------
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full bg-input/30 border border-border px-3 py-2 text-sm focus:outline-none focus:border-warm ${props.className ?? ""}`} />;
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`w-full bg-input/30 border border-border px-3 py-2 text-sm focus:outline-none focus:border-warm ${props.className ?? ""}`} />;
}
function Label({ children }: { children: React.ReactNode }) {
  return <label className="eyebrow block mb-2">{children}</label>;
}
function Btn({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...p} className={`px-4 py-2 bg-foreground text-background font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-warm disabled:opacity-50 ${p.className ?? ""}`}>{children}</button>;
}
function BtnGhost({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...p} className={`px-3 py-1.5 border border-border font-mono text-[11px] uppercase tracking-[0.18em] hover:border-warm hover:text-warm ${p.className ?? ""}`}>{children}</button>;
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="border border-border bg-surface/40 p-5">{children}</div>;
}
function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => { if (msg) { const t = setTimeout(() => setMsg(null), 2500); return () => clearTimeout(t); } }, [msg]);
  const node = msg ? <div className="fixed bottom-6 right-6 bg-foreground text-background px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] z-50">{msg}</div> : null;
  return { toast: setMsg, node };
}

async function uploadFile(file: File): Promise<{ url: string; type: string } | null> {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false, contentType: file.type || undefined });
  if (error) { alert(error.message); return null; }
  const { data } = await supabase.storage.from("media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  return data?.signedUrl ? { url: data.signedUrl, type: file.type || "application/octet-stream" } : null;
}


// ---------- Site content ----------
function ContentEditor() {
  const [c, setC] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast, node } = useToast();
  useEffect(() => { supabase.from("site_content").select("*").eq("id", "main").maybeSingle().then(({ data }) => setC(data as SiteContent)); }, []);
  if (!c) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const set = (k: keyof SiteContent, v: any) => setC({ ...c, [k]: v });
  const save = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    const { error } = await supabase.from("site_content").update(c).eq("id", "main");
    setSaving(false);
    toast(error ? error.message : "Saved");
  };
  const onAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const res = await uploadFile(f);
    if (res) { set("avatar_url", res.url); toast("Uploaded — remember to save"); }
  };

  return (
    <form onSubmit={save} className="grid gap-6 max-w-3xl">
      {node}
      <Card>
        <Label>Admin photo</Label>
        <div className="flex items-center gap-4">
          <img src={resolveAvatarUrl(c.avatar_url)} alt="" className="w-20 h-20 object-cover border border-border" />
          <input type="file" accept="image/*" onChange={onAvatar} className="text-sm" />
          {c.avatar_url && <BtnGhost type="button" onClick={() => set("avatar_url", null)}>Remove</BtnGhost>}
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>First name</Label><Input value={c.hero_first_name} onChange={(e) => set("hero_first_name", e.target.value)} /></div>
        <div><Label>Last name</Label><Input value={c.hero_last_name} onChange={(e) => set("hero_last_name", e.target.value)} /></div>
      </div>
      <div><Label>Hero tagline</Label><Input value={c.hero_tagline} onChange={(e) => set("hero_tagline", e.target.value)} /></div>
      <div><Label>Portfolio label</Label><Input value={c.portfolio_label} onChange={(e) => set("portfolio_label", e.target.value)} /></div>
      <div><Label>Hero intro</Label><Textarea rows={4} value={c.hero_intro} onChange={(e) => set("hero_intro", e.target.value)} /></div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Role</Label><Input value={c.role} onChange={(e) => set("role", e.target.value)} /></div>
        <div><Label>Based in</Label><Input value={c.based_in} onChange={(e) => set("based_in", e.target.value)} /></div>
        <div><Label>Studying</Label><Input value={c.studying} onChange={(e) => set("studying", e.target.value)} /></div>
        <div><Label>Status</Label><Input value={c.status} onChange={(e) => set("status", e.target.value)} /></div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={c.available} onChange={(e) => set("available", e.target.checked)} /> Show "Available" badge
      </label>

      <div><Label>About heading</Label><Input value={c.about_heading} onChange={(e) => set("about_heading", e.target.value)} /></div>
      <div><Label>About body</Label><Textarea rows={4} value={c.about_body} onChange={(e) => set("about_body", e.target.value)} /></div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div><Label>Projects stat</Label><Input value={c.stats_projects} onChange={(e) => set("stats_projects", e.target.value)} /></div>
        <div><Label>Certs stat</Label><Input value={c.stats_certs} onChange={(e) => set("stats_certs", e.target.value)} /></div>
        <div><Label>Hackathons stat</Label><Input value={c.stats_hackathons} onChange={(e) => set("stats_hackathons", e.target.value)} /></div>
      </div>

      <div><Label>Contact heading</Label><Input value={c.contact_heading} onChange={(e) => set("contact_heading", e.target.value)} /></div>
      <div><Label>Contact body</Label><Textarea rows={3} value={c.contact_body} onChange={(e) => set("contact_body", e.target.value)} /></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Email</Label><Input value={c.contact_email} onChange={(e) => set("contact_email", e.target.value)} /></div>
        <div><Label>Phone</Label><Input value={c.contact_phone} onChange={(e) => set("contact_phone", e.target.value)} /></div>
        <div><Label>GitHub URL</Label><Input value={c.github_url} onChange={(e) => set("github_url", e.target.value)} placeholder="https://github.com/…" /></div>
        <div><Label>LinkedIn URL</Label><Input value={c.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
      </div>


      <div className="flex gap-3"><Btn type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Btn></div>
    </form>
  );
}

// ---------- Generic collection editor ----------
function useCollection<T extends { id: string; position: number }>(table: string) {
  const [items, setItems] = useState<T[]>([]);
  const sb = supabase as any;
  const reload = () => sb.from(table).select("*").order("position").then(({ data }: any) => setItems((data ?? []) as T[]));
  useEffect(() => { reload(); }, []);
  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await sb.from(table).delete().eq("id", id); reload();
  };
  const save = async (row: Partial<T> & { id?: string }) => {
    if (row.id) await sb.from(table).update(row).eq("id", row.id);
    else await sb.from(table).insert(row);
    reload();
  };
  return { items, save, remove, reload };
}

// ---------- Projects ----------
function ProjectsEditor() {
  const { items, save, remove } = useCollection<Project>("projects");
  const { toast, node } = useToast();
  const empty: Partial<Project> = { position: 0, title: "", description: "", tech: [], status: "", url: "", category: "Major" };
  const [draft, setDraft] = useState<Partial<Project>>(empty);
  return (
    <div className="grid gap-6">{node}
      <Card>
        <h3 className="display text-lg mb-4">Add project</h3>
        <Form onSubmit={async (e) => { e.preventDefault(); await save(draft as Project); setDraft(empty); toast("Added"); }}>
          <Grid>
            <div><Label>Position</Label><Input type="number" value={draft.position ?? 0} onChange={(e) => setDraft({ ...draft, position: +e.target.value })} /></div>
            <div><Label>Category</Label>
              <select value={draft.category ?? "Major"} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="w-full bg-input/30 border border-border px-3 py-2 text-sm focus:outline-none focus:border-warm">
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
              </select>
            </div>
            <div><Label>Status</Label><Input value={draft.status ?? ""} onChange={(e) => setDraft({ ...draft, status: e.target.value })} placeholder="Shipped / In development" /></div>
            <div className="sm:col-span-3"><Label>Title</Label><Input required value={draft.title ?? ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
            <div className="sm:col-span-3"><Label>URL</Label><Input value={draft.url ?? ""} onChange={(e) => setDraft({ ...draft, url: e.target.value })} placeholder="https://…" /></div>
            <div className="sm:col-span-3"><Label>Description</Label><Textarea required rows={3} value={draft.description ?? ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></div>
            <div className="sm:col-span-3"><Label>Tech (comma-separated)</Label><Input value={(draft.tech ?? []).join(", ")} onChange={(e) => setDraft({ ...draft, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
          </Grid>
          <div className="mt-4"><Btn type="submit">Add project</Btn></div>
        </Form>
      </Card>
      {items.map((p) => <ProjectRow key={p.id} row={p} onSave={async (r) => { await save(r); toast("Saved"); }} onDelete={() => remove(p.id)} />)}
    </div>
  );
}
function ProjectRow({ row, onSave, onDelete }: { row: Project; onSave: (r: Project) => void; onDelete: () => void }) {
  const [r, setR] = useState(row);
  return (
    <Card>
      <Grid>
        <div><Label>Position</Label><Input type="number" value={r.position} onChange={(e) => setR({ ...r, position: +e.target.value })} /></div>
        <div><Label>Category</Label>
          <select value={r.category ?? "Major"} onChange={(e) => setR({ ...r, category: e.target.value })} className="w-full bg-input/30 border border-border px-3 py-2 text-sm focus:outline-none focus:border-warm">
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
          </select>
        </div>
        <div><Label>Status</Label><Input value={r.status ?? ""} onChange={(e) => setR({ ...r, status: e.target.value })} /></div>
        <div className="sm:col-span-3"><Label>Title</Label><Input value={r.title} onChange={(e) => setR({ ...r, title: e.target.value })} /></div>
        <div className="sm:col-span-3"><Label>URL</Label><Input value={r.url ?? ""} onChange={(e) => setR({ ...r, url: e.target.value })} /></div>
        <div className="sm:col-span-3"><Label>Description</Label><Textarea rows={3} value={r.description} onChange={(e) => setR({ ...r, description: e.target.value })} /></div>
        <div className="sm:col-span-3"><Label>Tech</Label><Input value={r.tech.join(", ")} onChange={(e) => setR({ ...r, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
      </Grid>
      <RowActions onSave={() => onSave(r)} onDelete={onDelete} />
    </Card>
  );
}


// ---------- Skills ----------
function SkillsEditor() {
  const { items, save, remove } = useCollection<Skill>("skills");
  const { toast, node } = useToast();
  const [d, setD] = useState<Partial<Skill>>({ position: 0, category: "", items: [] });
  return (
    <div className="grid gap-6">{node}
      <Card>
        <h3 className="display text-lg mb-4">Add skill group</h3>
        <Form onSubmit={async (e) => { e.preventDefault(); await save(d as Skill); setD({ position: 0, category: "", items: [] }); toast("Added"); }}>
          <Grid>
            <div><Label>Position</Label><Input type="number" value={d.position ?? 0} onChange={(e) => setD({ ...d, position: +e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Category</Label><Input required value={d.category ?? ""} onChange={(e) => setD({ ...d, category: e.target.value })} /></div>
            <div className="sm:col-span-3"><Label>Items (comma-separated)</Label><Input value={(d.items ?? []).join(", ")} onChange={(e) => setD({ ...d, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
          </Grid>
          <div className="mt-4"><Btn type="submit">Add</Btn></div>
        </Form>
      </Card>
      {items.map((s) => <SkillRow key={s.id} row={s} onSave={async (r) => { await save(r); toast("Saved"); }} onDelete={() => remove(s.id)} />)}
    </div>
  );
}
function SkillRow({ row, onSave, onDelete }: { row: Skill; onSave: (r: Skill) => void; onDelete: () => void }) {
  const [r, setR] = useState(row);
  return (
    <Card>
      <Grid>
        <div><Label>Position</Label><Input type="number" value={r.position} onChange={(e) => setR({ ...r, position: +e.target.value })} /></div>
        <div className="sm:col-span-2"><Label>Category</Label><Input value={r.category} onChange={(e) => setR({ ...r, category: e.target.value })} /></div>
        <div className="sm:col-span-3"><Label>Items</Label><Input value={r.items.join(", ")} onChange={(e) => setR({ ...r, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
      </Grid>
      <RowActions onSave={() => onSave(r)} onDelete={onDelete} />
    </Card>
  );
}

// ---------- Journey ----------
function JourneyEditor() {
  const { items, save, remove } = useCollection<JourneyEntry>("journey");
  const { toast, node } = useToast();
  const [d, setD] = useState<Partial<JourneyEntry>>({ position: 0, period: "", title: "", subtitle: "" });
  return (
    <div className="grid gap-6">{node}
      <Card>
        <h3 className="display text-lg mb-4">Add entry</h3>
        <Form onSubmit={async (e) => { e.preventDefault(); await save(d as JourneyEntry); setD({ position: 0, period: "", title: "", subtitle: "" }); toast("Added"); }}>
          <Grid>
            <div><Label>Position</Label><Input type="number" value={d.position ?? 0} onChange={(e) => setD({ ...d, position: +e.target.value })} /></div>
            <div><Label>Period</Label><Input required value={d.period ?? ""} onChange={(e) => setD({ ...d, period: e.target.value })} /></div>
            <div><Label>Title</Label><Input required value={d.title ?? ""} onChange={(e) => setD({ ...d, title: e.target.value })} /></div>
            <div className="sm:col-span-3"><Label>Subtitle</Label><Input value={d.subtitle ?? ""} onChange={(e) => setD({ ...d, subtitle: e.target.value })} /></div>
          </Grid>
          <div className="mt-4"><Btn type="submit">Add</Btn></div>
        </Form>
      </Card>
      {items.map((j) => <JourneyRow key={j.id} row={j} onSave={async (r) => { await save(r); toast("Saved"); }} onDelete={() => remove(j.id)} />)}
    </div>
  );
}
function JourneyRow({ row, onSave, onDelete }: { row: JourneyEntry; onSave: (r: JourneyEntry) => void; onDelete: () => void }) {
  const [r, setR] = useState(row);
  return (
    <Card>
      <Grid>
        <div><Label>Position</Label><Input type="number" value={r.position} onChange={(e) => setR({ ...r, position: +e.target.value })} /></div>
        <div><Label>Period</Label><Input value={r.period} onChange={(e) => setR({ ...r, period: e.target.value })} /></div>
        <div><Label>Title</Label><Input value={r.title} onChange={(e) => setR({ ...r, title: e.target.value })} /></div>
        <div className="sm:col-span-3"><Label>Subtitle</Label><Input value={r.subtitle ?? ""} onChange={(e) => setR({ ...r, subtitle: e.target.value })} /></div>
      </Grid>
      <RowActions onSave={() => onSave(r)} onDelete={onDelete} />
    </Card>
  );
}

// ---------- Certifications ----------
function CertificationsEditor() {
  const { items, save, remove } = useCollection<Certification>("certifications");
  const { toast, node } = useToast();
  const empty: Partial<Certification> = { position: 0, title: "", issuer: "", image_url: null, file_url: null, file_type: null };
  const [d, setD] = useState<Partial<Certification>>(empty);
  const uploadCert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const res = await uploadFile(f);
    if (res) {
      const isImage = res.type.startsWith("image/");
      setD({ ...d, file_url: res.url, file_type: res.type, image_url: isImage ? res.url : d.image_url ?? null });
    }
  };
  const uploadThumb = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const res = await uploadFile(f); if (res) setD({ ...d, image_url: res.url });
  };
  return (
    <div className="grid gap-6">{node}
      <Card>
        <h3 className="display text-lg mb-4">Add certification</h3>
        <Form onSubmit={async (e) => { e.preventDefault(); await save(d as Certification); setD(empty); toast("Added"); }}>
          <Grid>
            <div><Label>Position</Label><Input type="number" value={d.position ?? 0} onChange={(e) => setD({ ...d, position: +e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Title</Label><Input required value={d.title ?? ""} onChange={(e) => setD({ ...d, title: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Issuer</Label><Input value={d.issuer ?? ""} onChange={(e) => setD({ ...d, issuer: e.target.value })} /></div>
            <div><Label>Certificate file (PDF / doc / image)</Label><input type="file" accept="image/*,application/pdf,.doc,.docx,.ppt,.pptx" onChange={uploadCert} className="text-sm" /></div>
            <div className="sm:col-span-2"><Label>Thumbnail image (optional, for non-image files)</Label><input type="file" accept="image/*" onChange={uploadThumb} className="text-sm" /></div>
            {d.image_url && <div><img src={resolvePublicAssetUrl(d.image_url) ?? d.image_url} alt="" className="h-24 object-cover border border-border" /></div>}
            {d.file_url && !d.file_type?.startsWith("image/") && <div className="text-[11px] font-mono uppercase tracking-wider text-warm">File uploaded: {d.file_type}</div>}
          </Grid>
          <div className="mt-4"><Btn type="submit">Add</Btn></div>
        </Form>
      </Card>
      {items.map((c) => <CertRow key={c.id} row={c} onSave={async (r) => { await save(r); toast("Saved"); }} onDelete={() => remove(c.id)} />)}
    </div>
  );
}
function CertRow({ row, onSave, onDelete }: { row: Certification; onSave: (r: Certification) => void; onDelete: () => void }) {
  const [r, setR] = useState(row);
  const assets = resolveCertificationAssets(r);
  const uploadCert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const res = await uploadFile(f);
    if (res) {
      const isImage = res.type.startsWith("image/");
      setR({ ...r, file_url: res.url, file_type: res.type, image_url: isImage ? res.url : r.image_url });
    }
  };
  const uploadThumb = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const res = await uploadFile(f); if (res) setR({ ...r, image_url: res.url });
  };
  return (
    <Card>
      <Grid>
        <div><Label>Position</Label><Input type="number" value={r.position} onChange={(e) => setR({ ...r, position: +e.target.value })} /></div>
        <div className="sm:col-span-2"><Label>Title</Label><Input value={r.title} onChange={(e) => setR({ ...r, title: e.target.value })} /></div>
        <div className="sm:col-span-2"><Label>Issuer</Label><Input value={r.issuer ?? ""} onChange={(e) => setR({ ...r, issuer: e.target.value })} /></div>
        <div><Label>Replace file</Label><input type="file" accept="image/*,application/pdf,.doc,.docx,.ppt,.pptx" onChange={uploadCert} className="text-sm" /></div>
        <div className="sm:col-span-2"><Label>Replace thumbnail</Label><input type="file" accept="image/*" onChange={uploadThumb} className="text-sm" /></div>
        {(assets.previewUrl || r.image_url) && (
          <div>
            <img
              src={assets.previewUrl ?? resolvePublicAssetUrl(r.image_url) ?? r.image_url ?? ""}
              alt=""
              className="h-24 object-cover border border-border"
            />
          </div>
        )}
        {assets.linkUrl && (
          <div className="sm:col-span-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground break-all">
            File:{" "}
            <a href={assets.linkUrl} target="_blank" rel="noreferrer" className="text-warm hover:underline">
              open ({assets.fileType ?? r.file_type ?? "file"})
            </a>
          </div>
        )}
      </Grid>
      <RowActions onSave={() => onSave(r)} onDelete={onDelete} />

    </Card>
  );
}

// ---------- Highlights ----------
function HighlightsEditor() {
  const { items, save, remove } = useCollection<Highlight>("highlights");
  const { toast, node } = useToast();
  const [d, setD] = useState<Partial<Highlight>>({ position: 0, title: "", subtitle: "" });
  return (
    <div className="grid gap-6">{node}
      <Card>
        <h3 className="display text-lg mb-4">Add moment</h3>
        <Form onSubmit={async (e) => { e.preventDefault(); await save(d as Highlight); setD({ position: 0, title: "", subtitle: "" }); toast("Added"); }}>
          <Grid>
            <div><Label>Position</Label><Input type="number" value={d.position ?? 0} onChange={(e) => setD({ ...d, position: +e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Title</Label><Input required value={d.title ?? ""} onChange={(e) => setD({ ...d, title: e.target.value })} /></div>
            <div className="sm:col-span-3"><Label>Subtitle</Label><Input value={d.subtitle ?? ""} onChange={(e) => setD({ ...d, subtitle: e.target.value })} /></div>
          </Grid>
          <div className="mt-4"><Btn type="submit">Add</Btn></div>
        </Form>
      </Card>
      {items.map((h) => <HighlightRow key={h.id} row={h} onSave={async (r) => { await save(r); toast("Saved"); }} onDelete={() => remove(h.id)} />)}
    </div>
  );
}
function HighlightRow({ row, onSave, onDelete }: { row: Highlight; onSave: (r: Highlight) => void; onDelete: () => void }) {
  const [r, setR] = useState(row);
  return (
    <Card>
      <Grid>
        <div><Label>Position</Label><Input type="number" value={r.position} onChange={(e) => setR({ ...r, position: +e.target.value })} /></div>
        <div className="sm:col-span-2"><Label>Title</Label><Input value={r.title} onChange={(e) => setR({ ...r, title: e.target.value })} /></div>
        <div className="sm:col-span-3"><Label>Subtitle</Label><Input value={r.subtitle ?? ""} onChange={(e) => setR({ ...r, subtitle: e.target.value })} /></div>
      </Grid>
      <RowActions onSave={() => onSave(r)} onDelete={onDelete} />
    </Card>
  );
}

// ---------- Gallery ----------
function GalleryEditor() {
  const { items, save, remove } = useCollection<GalleryItem>("gallery");
  const { toast, node } = useToast();
  const [d, setD] = useState<Partial<GalleryItem>>({ position: 0, caption: "", image_url: "" });
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const res = await uploadFile(f); if (res) setD({ ...d, image_url: res.url });
  };

  return (
    <div className="grid gap-6">{node}
      <Card>
        <h3 className="display text-lg mb-4">Add photo</h3>
        <Form onSubmit={async (e) => { e.preventDefault(); if (!d.image_url) { alert("Upload an image first"); return; } await save(d as GalleryItem); setD({ position: 0, caption: "", image_url: "" }); toast("Added"); }}>
          <Grid>
            <div><Label>Position</Label><Input type="number" value={d.position ?? 0} onChange={(e) => setD({ ...d, position: +e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Caption</Label><Input value={d.caption ?? ""} onChange={(e) => setD({ ...d, caption: e.target.value })} /></div>
            <div className="sm:col-span-3"><Label>Image</Label><input type="file" accept="image/*" onChange={upload} className="text-sm" /></div>
            {d.image_url && <div className="sm:col-span-3"><img src={d.image_url} alt="" className="h-32 object-cover border border-border" /></div>}
          </Grid>
          <div className="mt-4"><Btn type="submit">Add</Btn></div>
        </Form>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((g) => <GalleryCard key={g.id} row={g} onSave={async (r) => { await save(r); toast("Saved"); }} onDelete={() => remove(g.id)} />)}
      </div>
    </div>
  );
}
function GalleryCard({ row, onSave, onDelete }: { row: GalleryItem; onSave: (r: GalleryItem) => void; onDelete: () => void }) {
  const [r, setR] = useState(row);
  return (
    <Card>
      <img src={r.image_url} alt="" className="w-full aspect-square object-cover border border-border" />
      <div className="mt-3 grid gap-3">
        <div><Label>Position</Label><Input type="number" value={r.position} onChange={(e) => setR({ ...r, position: +e.target.value })} /></div>
        <div><Label>Caption</Label><Input value={r.caption ?? ""} onChange={(e) => setR({ ...r, caption: e.target.value })} /></div>
      </div>
      <RowActions onSave={() => onSave(r)} onDelete={onDelete} />
    </Card>
  );
}

// ---------- helpers ----------
function Grid({ children }: { children: React.ReactNode }) { return <div className="grid sm:grid-cols-3 gap-3">{children}</div>; }
function Form({ children, onSubmit }: { children: React.ReactNode; onSubmit: (e: FormEvent) => void }) { return <form onSubmit={onSubmit}>{children}</form>; }
function RowActions({ onSave, onDelete }: { onSave: () => void; onDelete: () => void }) {
  return (
    <div className="mt-4 flex gap-3 justify-end">
      <BtnGhost type="button" onClick={onDelete}>Delete</BtnGhost>
      <Btn type="button" onClick={onSave}>Save</Btn>
    </div>
  );
}
