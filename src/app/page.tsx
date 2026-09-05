"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (active) setAuthenticated(Boolean(data.session));
    }

    checkSession();
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#e7e9ea]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#2f3336]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1d9bf0] flex items-center justify-center">
                <span className="text-white font-bold text-sm">RF</span>
              </div>
              <span className="font-bold text-[17px] tracking-tight">
                ReputationFlow
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-[15px] text-[#71767b]">
              <a href="#how-it-works" className="hover:text-[#e7e9ea] transition">
                How it works
              </a>
              <a href="#benefits" className="hover:text-[#e7e9ea] transition">
                Benefits
              </a>
              <a href="#pricing" className="hover:text-[#e7e9ea] transition">
                Pricing
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href={authenticated ? "/dashboard" : "/login"}
                className="text-[15px] font-medium text-[#e7e9ea] hover:text-white transition px-3 py-1.5"
              >
                {authenticated ? "Dashboard" : "Log in"}
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#e7e9ea] px-4 py-1.5 text-[14px] font-bold text-black hover:bg-white transition"
              >
                Start free
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2f3336] bg-[#16181c] px-3 py-1 text-[13px] text-[#71767b] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d9bf0]"></span>
                For independent local businesses
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.1] text-[#e7e9ea]">
                Get more Google reviews.
                <br />
                <span className="text-[#1d9bf0]">Protect your rating.</span>
              </h1>
              <p className="mt-6 text-[17px] sm:text-xl text-[#71767b] leading-relaxed max-w-xl">
                Collect more 5-star Google reviews while giving unhappy customers
                a private path to reach you.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-[#1d9bf0] px-6 py-3 text-[15px] font-bold text-white hover:bg-[#1a8cd8] transition"
                >
                  Start free trial
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-[#2f3336] bg-transparent px-6 py-3 text-[15px] font-bold text-[#e7e9ea] hover:bg-[#16181c] transition"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-5 text-[13px] text-[#71767b]">
                Setup in under 5 minutes · No credit card required for your trial
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-[#2f3336]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-xl mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e7e9ea]">
                How ReputationFlow works
              </h2>
              <p className="mt-3 text-[17px] text-[#71767b]">
                A simple system that runs in the background.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Share your smart link or QR after every job",
                  desc: "Send your unique review link by text or show the QR code while the experience is fresh.",
                },
                {
                  step: "02",
                  title: "Happy customers (4–5★) go to Google",
                  desc: "Satisfied customers get a direct path to your Google review page in seconds.",
                },
                {
                  step: "03",
                  title: "Unhappy customers (1–3★) leave private feedback only",
                  desc: "You get the chance to make things right before frustration becomes a public review.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <div className="text-[13px] font-bold text-[#1d9bf0] tracking-widest mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-[17px] font-bold text-[#e7e9ea]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-[#71767b] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="border-t border-[#2f3336]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-xl mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e7e9ea]">
                A better review workflow, built for busy teams
              </h2>
              <p className="mt-3 text-[17px] text-[#71767b]">
                Spend less time chasing reviews and more time running your business.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  title: "More 5-star Google reviews",
                  desc: "Give happy customers the shortest path to sharing a great experience on Google.",
                },
                {
                  title: "Protect your public rating",
                  desc: "Angry customers get a private feedback path so you can resolve issues before they go public.",
                },
                {
                  title: "AI reply suggestions",
                  desc: "Generate thoughtful, professional responses to reviews in seconds, then edit and post.",
                },
                {
                  title: "WhatsApp sharing",
                  desc: "Send your smart link after every job with a ready-to-use WhatsApp message.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-5 hover:bg-[#1c1f23] transition"
                >
                  <h3 className="text-[16px] font-bold text-[#e7e9ea]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] text-[#71767b] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-[#2f3336]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e7e9ea]">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 text-[17px] text-[#71767b]">
                Start free, then keep the tools that help your rating grow.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-6">
                <p className="text-[13px] font-bold uppercase tracking-wider text-[#71767b]">
                  Free trial
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#e7e9ea]">14</span>
                  <span className="text-[#71767b]">days</span>
                </div>
                <p className="mt-1 text-[13px] text-[#71767b]">Full access · No credit card required</p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Unlimited smart links and QR codes",
                    "Private feedback inbox",
                    "AI reply suggestions",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[14px]">
                      <span className="text-[#1d9bf0]">✓</span>
                      <span className="text-[#e7e9ea]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#1d9bf0] px-5 py-2.5 text-[15px] font-bold text-white transition hover:bg-[#1a8cd8]">
                  Start free trial
                </Link>
              </div>
              <div className="rounded-2xl border border-[#1d9bf0] bg-[#16181c] p-6">
                <p className="text-[13px] font-bold text-[#1d9bf0] uppercase tracking-wider">
                  Professional
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#e7e9ea]">
                    $49
                  </span>
                  <span className="text-[#71767b]">/month</span>
                </div>
                <p className="mt-1 text-[13px] text-[#71767b]">
                  Cancel anytime · After your 14-day trial
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Unlimited smart links and QR codes",
                    "Private feedback inbox",
                    "AI reply suggestions",
                    "Dashboard and basic analytics",
                    "WhatsApp sharing",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[14px]"
                    >
                      <svg
                        className="w-4 h-4 text-[#1d9bf0] shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-[#e7e9ea]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#1d9bf0] px-5 py-2.5 text-[15px] font-bold text-white transition hover:bg-[#1a8cd8]">
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-[#2f3336]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e7e9ea]">
                Ready to protect your Google rating?
              </h2>
              <p className="mt-3 text-[17px] text-[#71767b]">
                Start building a stronger review engine after your very next job.
              </p>
              <Link
                href="/signup"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e7e9ea] px-6 py-3 text-[15px] font-bold text-black hover:bg-white transition"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2f3336]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1d9bf0] flex items-center justify-center">
                <span className="text-white font-bold text-xs">RF</span>
              </div>
              <span className="font-bold text-[#e7e9ea]">ReputationFlow</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#71767b]">
              <span>Powered by ReputationFlow</span>
              <span>© {new Date().getFullYear()} ReputationFlow</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}