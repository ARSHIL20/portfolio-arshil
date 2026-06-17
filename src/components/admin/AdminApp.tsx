import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminDashboard } from "./AdminDashboard";

export function AdminApp() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    const check = async (em: string | null) => {
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

  const onEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalized = emailInput.trim().toLowerCase();
    setBusy(true);
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email: normalized,
        password: passwordInput,
      });
      console.log("Signin response:", { data, err });
      if (err) setError(err.message + " (check console for details)");
    } catch (e) {
      console.error("Unexpected error:", e);
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setEmail(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">Loading…</div>;
  }

  if (!email) {
    return (
      <Shell>
        <h1 className="display text-3xl md:text-4xl">Admin access</h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-md">
          Sign in with your admin account.
        </p>

        <div className="my-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> sign in with email <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onEmailSubmit} className="grid gap-3">
          <input
            type="email"
            required
            placeholder="admin@email.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="bg-input/30 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-warm"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="bg-input/30 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-warm"
          />
          <button
            type="submit"
            disabled={busy}
            className="px-5 py-3 border border-border font-mono text-[12px] uppercase tracking-[0.18em] hover:border-warm hover:text-warm disabled:opacity-60"
          >
            {busy ? "Please wait…" : "Sign in"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </Shell>
    );
  }

  return <AdminDashboard email={email} onSignOut={signOut} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <a href="/" className="eyebrow hover:text-warm">← Back to site</a>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
