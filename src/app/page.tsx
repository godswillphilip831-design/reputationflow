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
              <a href="#features" className="hover:text-[#e7e9ea] transition">
                Features
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
                ReputationFlow helps local service businesses collect more 5-star
                Google reviews, keep negative feedback private, and turn happy
                customers into marketing assets.
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
                No credit card required · Setup in under 5 minutes
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-[#2f3336]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e7e9ea]">
                Your Google ranking is your lifeline
              </h2>
              <p className="mt-3 text-[17px] text-[#71767b] leading-relaxed">
                When a plumber, dentist, or HVAC company drops from #2 to #6 on
                Google Maps, the phone stops ringing.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Forgotten follow-ups",
                  desc: "Owners mean to ask for reviews but forget after a busy day. Reviews never happen.",
                },
                {
                  title: "Public bad reviews",
                  desc: "Unhappy customers leave 1-star feedback publicly before you can fix the issue.",
                },
                {
                  title: "Reviews stay unused",
                  desc: "Great 5-star reviews sit on Google instead of becoming social posts and trust signals.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-5"
                >
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
                  title: "Share your smart link or QR",
                  desc: "After every job, send your unique review link by text or show the QR code. Takes seconds.",
                },
                {
                  step: "02",
                  title: "Smart routing protects you",
                  desc: "Happy customers (4–5 stars) go straight to Google. Unhappy ones send private feedback only.",
                },
                {
                  step: "03",
                  title: "Grow ranking & marketing",
                  desc: "More 5-star reviews improve your Maps position. Turn top reviews into ready-to-post graphics.",
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

        {/* Features */}
        <section id="features" className="border-t border-[#2f3336]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-xl mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e7e9ea]">
                Everything you need. Nothing you don’t.
              </h2>
              <p className="mt-3 text-[17px] text-[#71767b]">
                Focused tools built for independent local service businesses.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Smart Review Link & QR",
                  desc: "One link that routes happy customers to Google and keeps negative feedback private.",
                },
                {
                  title: "Private Feedback Inbox",
                  desc: "See low-star feedback first so you can resolve issues before they become public.",
                },
                {
                  title: "AI Reply Suggestions",
                  desc: "Generate professional, personalized responses to reviews in seconds. Edit and post.",
                },
                {
                  title: "Social Proof Graphics",
                  desc: "Turn any 5-star review into a clean Instagram or Facebook image ready to download.",
                },
                {
                  title: "Simple Dashboard",
                  desc: "Track requests, private feedback, and growth at a glance. No complicated reports.",
                },
                {
                  title: "Mobile-Friendly",
                  desc: "Works perfectly on phone so you can manage reputation between jobs.",
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
                One plan. Built for single-location local businesses.
              </p>
            </div>
            <div className="max-w-sm">
              <div className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-6">
                <p className="text-[13px] font-bold text-[#1d9bf0] uppercase tracking-wider">
                  Professional
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#e7e9ea]">
                    $79
                  </span>
                  <span className="text-[#71767b]">/month</span>
                </div>
                <p className="mt-1 text-[13px] text-[#71767b]">
                  Cancel anytime · 14-day free trial
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Unlimited smart review links & QR codes",
                    "Private feedback inbox",
                    "AI review reply suggestions",
                    "Social proof graphic generator",
                    "Dashboard & basic analytics",
                    "Email support",
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
                <Link
                  href="/signup"
                  className="mt-6 w-full inline-flex items-center justify-center rounded-full bg-[#1d9bf0] px-5 py-2.5 text-[15px] font-bold text-white hover:bg-[#1a8cd8] transition"
                >
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
                Ready to grow your Google reviews?
              </h2>
              <p className="mt-3 text-[17px] text-[#71767b]">
                Join local businesses that use ReputationFlow to protect and grow
                their online reputation.
              </p>
              <Link
                href="/signup"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e7e9ea] px-6 py-3 text-[15px] font-bold text-black hover:bg-white transition"
              >
                Start your free trial
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
            <div className="flex items-center gap-6 text-[13px] text-[#71767b]">
              <Link href="/privacy" className="hover:text-[#e7e9ea] transition">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#e7e9ea] transition">
                Terms
              </Link>
              <span>
                © {new Date().getFullYear()} ReputationFlow
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}