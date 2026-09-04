"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

function createSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleBusinessSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextSlug = createSlug(name);
    if (!nextSlug) {
      return;
    }
    setSlug(nextSlug);
    setStep(2);
  }

  function handleGoogleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedUrl = googleUrl.trim();
    if (!/google|g\.page/i.test(normalizedUrl)) {
      setUrlError("Enter a valid Google review link to continue.");
      return;
    }
    setUrlError("");
    setGoogleUrl(normalizedUrl);
    setStep(3);
  }

  async function finishOnboarding() {
    setSaveError("");
    setSaving(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error(userError?.message || "Please log in before finishing setup.");
      }

      const { error: insertError } = await supabase.from("businesses").insert({
        user_id: user.id,
        name: name.trim(),
        slug,
        google_review_url: googleUrl,
      });
      if (insertError) {
        throw new Error(insertError.message);
      }

      localStorage.setItem(
        "rf_business",
        JSON.stringify({ name: name.trim(), slug, googleUrl }),
      );
      router.push("/dashboard");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Unable to save your business right now.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-black px-5 py-6 text-[#e7e9ea] sm:px-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#2f3336] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d9bf0] text-sm font-bold text-white">
              RF
            </div>
            <span className="text-[17px] font-bold tracking-tight">ReputationFlow</span>
          </div>
          <span className="text-sm text-[#71767b]">Setup</span>
        </header>

        <section className="flex flex-1 items-center py-10 sm:py-16">
          <div className="w-full rounded-2xl border border-[#2f3336] bg-[#16181c] p-6 shadow-2xl shadow-black/40 sm:p-10">
            <div className="mb-9">
              <div className="mb-3 flex items-center justify-between text-xs font-medium text-[#71767b]">
                <span>Step {step} of 3</span>
                <span>{step === 1 ? "Business details" : step === 2 ? "Google reviews" : "Review setup"}</span>
              </div>
              <div aria-label={`Step ${step} of 3`} className="flex gap-2" role="progressbar" aria-valuemax={3} aria-valuemin={1} aria-valuenow={step}>
                {[1, 2, 3].map((item) => (
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#2f3336]" key={item}>
                    <div className={`h-full rounded-full bg-[#1d9bf0] transition-all ${item <= step ? "w-full" : "w-0"}`} />
                  </div>
                ))}
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleBusinessSubmit}>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#1d9bf0]">Welcome aboard</p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Tell us about your business</h1>
                <p className="mt-4 text-sm leading-6 text-[#8b949e]">We&apos;ll use this to create your branded review link.</p>
                <label className="mt-8 block text-sm font-medium" htmlFor="business-name">Business name</label>
                <input
                  autoFocus
                  className="mt-2 w-full rounded-xl border border-[#2f3336] bg-black px-4 py-3.5 text-[15px] text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
                  id="business-name"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Demo Plumbing Co."
                  required
                  value={name}
                />
                <button className="mt-6 w-full rounded-xl bg-[#1d9bf0] px-4 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:ring-offset-2 focus:ring-offset-[#16181c]" type="submit">
                  Continue
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleGoogleSubmit}>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#1d9bf0]">Connect your reviews</p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Where should happy customers review you?</h1>
                <p className="mt-4 text-sm leading-6 text-[#8b949e]">Paste your Google Business review link. You can find it in your Google Business Profile.</p>
                <label className="mt-8 block text-sm font-medium" htmlFor="google-url">Google review URL</label>
                <input
                  autoFocus
                  className="mt-2 w-full rounded-xl border border-[#2f3336] bg-black px-4 py-3.5 text-[15px] text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
                  id="google-url"
                  onChange={(event) => { setGoogleUrl(event.target.value); setUrlError(""); }}
                  placeholder="https://g.page/your-business/review"
                  required
                  type="url"
                  value={googleUrl}
                />
                {urlError && <p className="mt-2 text-sm text-red-400" role="alert">{urlError}</p>}
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                  <button className="w-full rounded-xl border border-[#2f3336] px-4 py-3.5 text-[15px] font-semibold text-[#e7e9ea] transition hover:border-[#71767b] sm:w-1/3" onClick={() => setStep(1)} type="button">Back</button>
                  <button className="w-full rounded-xl bg-[#1d9bf0] px-4 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:ring-offset-2 focus:ring-offset-[#16181c] sm:flex-1" type="submit">Continue</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#1d9bf0]">Almost ready</p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Review your setup</h1>
                <p className="mt-4 text-sm leading-6 text-[#8b949e]">Here&apos;s what your customers will see when they open your smart link.</p>
                <dl className="mt-8 divide-y divide-[#2f3336] rounded-xl border border-[#2f3336] bg-black px-4">
                  <div className="py-4"><dt className="text-xs uppercase tracking-[0.14em] text-[#71767b]">Business name</dt><dd className="mt-1 text-sm font-medium">{name}</dd></div>
                  <div className="py-4"><dt className="text-xs uppercase tracking-[0.14em] text-[#71767b]">Slug</dt><dd className="mt-1 break-all text-sm font-medium text-[#1d9bf0]">{slug}</dd></div>
                  <div className="py-4"><dt className="text-xs uppercase tracking-[0.14em] text-[#71767b]">Smart link preview</dt><dd className="mt-1 break-all text-sm font-medium text-[#1d9bf0]">{origin || "https://your-domain.com"}/r/{slug}</dd></div>
                  <div className="py-4"><dt className="text-xs uppercase tracking-[0.14em] text-[#71767b]">Google review URL</dt><dd className="mt-1 break-all text-sm text-[#8b949e]">{googleUrl}</dd></div>
                </dl>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                  <button className="w-full rounded-xl border border-[#2f3336] px-4 py-3.5 text-[15px] font-semibold text-[#e7e9ea] transition hover:border-[#71767b] sm:w-1/3" onClick={() => setStep(2)} type="button">Back</button>
                  <button className="w-full rounded-xl bg-[#1d9bf0] px-4 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:ring-offset-2 focus:ring-offset-[#16181c] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1" disabled={saving} onClick={finishOnboarding} type="button">{saving ? "Saving..." : "Finish setup"}</button>
                </div>
                {saveError && <p className="mt-4 text-sm text-red-400" role="alert">{saveError}</p>}
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-[#2f3336] pt-5 text-center text-xs text-[#71767b]">Powered by ReputationFlow</footer>
      </div>
    </main>
  );
}
