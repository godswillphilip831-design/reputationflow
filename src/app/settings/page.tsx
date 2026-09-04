"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Business = {
  id: string;
  name: string;
  slug: string;
  google_review_url: string;
};

export default function SettingsPage() {
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [noBusiness, setNoBusiness] = useState(false);
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        router.replace("/login");
        return;
      }

      const { data, error: businessError } = await supabase
        .from("businesses")
        .select("id, name, slug, google_review_url")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      if (!active) return;
      if (businessError || !data) {
        if (businessError) {
          setError(businessError.message);
        } else {
          setNoBusiness(true);
        }
      } else {
        setBusiness(data);
        setName(data.name);
        setSlug(data.slug);
        setGoogleUrl(data.google_review_url);
      }
      setLoading(false);
    }

    loadSettings();
    return () => { active = false; };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!business) return;
    setSaving(true);
    setMessage("");
    setError("");

    const { error: updateError } = await supabase
      .from("businesses")
      .update({ name: name.trim(), slug: slug.trim(), google_review_url: googleUrl.trim() })
      .eq("id", business.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setBusiness({ ...business, name: name.trim(), slug: slug.trim(), google_review_url: googleUrl.trim() });
      setMessage("Settings saved successfully.");
    }
    setSaving(false);
  }

  return (
    <main className="min-h-screen flex-1 bg-black px-5 py-6 text-[#e7e9ea] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between border-b border-[#2f3336] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d9bf0] text-sm font-bold text-white">RF</div>
            <span className="text-[17px] font-bold tracking-tight">ReputationFlow</span>
          </div>
          <Link className="text-sm font-medium text-[#1d9bf0] hover:underline" href="/dashboard">Dashboard</Link>
        </header>

        <section className="mx-auto mt-10 max-w-xl rounded-2xl border border-[#2f3336] bg-[#16181c] p-6 shadow-2xl shadow-black/40 sm:mt-16 sm:p-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#1d9bf0]">Workspace settings</p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Business details</h1>
          <p className="mt-3 text-sm leading-6 text-[#8b949e]">Keep your public review experience current.</p>

          {loading ? (
            <p className="mt-8 rounded-xl border border-[#2f3336] bg-black px-4 py-3 text-sm text-[#8b949e]">Loading settings...</p>
          ) : noBusiness ? (
            <div className="mt-8 rounded-xl border border-[#2f3336] bg-black p-5">
              <p className="text-sm text-[#8b949e]">No business yet. Complete onboarding first.</p>
              <Link className="mt-4 inline-flex rounded-xl bg-[#1d9bf0] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1a8cd8]" href="/onboarding">
                Go to onboarding
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="business-name">Business name</label>
                <input className="w-full rounded-xl border border-[#2f3336] bg-black px-4 py-3.5 text-sm outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]" id="business-name" onChange={(event) => setName(event.target.value)} required value={name} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="slug">Smart link slug</label>
                <input className="w-full rounded-xl border border-[#2f3336] bg-black px-4 py-3.5 text-sm outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]" id="slug" onChange={(event) => setSlug(event.target.value)} required value={slug} />
                <p className="mt-2 break-all text-xs text-[#71767b]">{origin}/r/{slug || "your-slug"}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="google-url">Google review URL</label>
                <input className="w-full rounded-xl border border-[#2f3336] bg-black px-4 py-3.5 text-sm outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]" id="google-url" onChange={(event) => setGoogleUrl(event.target.value)} required type="url" value={googleUrl} />
              </div>
              {error && <p className="rounded-lg bg-red-400/10 px-3 py-2 text-sm text-red-300" role="alert">{error}</p>}
              {message && <p className="rounded-lg bg-green-400/10 px-3 py-2 text-sm text-green-300" role="status">{message}</p>}
              <button className="w-full rounded-xl bg-[#1d9bf0] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#1a8cd8] disabled:cursor-not-allowed disabled:opacity-60" disabled={saving || !business} type="submit">{saving ? "Saving..." : "Save changes"}</button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
