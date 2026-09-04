"use client";

import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const business = {
  name: "Demo Plumbing Co.",
  googleReviewUrl:
    "https://www.google.com/search?q=Demo+Plumbing+Co.+reviews",
};

type Step = "rating" | "redirecting" | "feedback" | "thanks";

export default function ReviewFunnelPage() {
  const { slug } = useParams<{ slug: string }>();
  const [step, setStep] = useState<Step>("rating");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (step !== "redirecting") {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      window.location.assign(business.googleReviewUrl);
    }, 1200);

    return () => window.clearTimeout(redirectTimer);
  }, [step]);

  function handleRating(rating: number) {
    setSelectedRating(rating);
    setStep(rating >= 4 ? "redirecting" : "feedback");
  }

  function handleFeedbackSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }
    setStep("thanks");
  }

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-black px-5 py-6 text-[#e7e9ea] sm:px-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#2f3336] pb-5">
          <p className="text-sm font-semibold tracking-tight text-[#e7e9ea]">
            {business.name}
          </p>
          <span className="rounded-full border border-[#2f3336] px-3 py-1 text-xs text-[#71767b]">
            {slug}
          </span>
        </header>

        <section className="flex flex-1 items-center py-12 sm:py-20">
          <div className="w-full rounded-2xl border border-[#2f3336] bg-[#16181c] p-6 shadow-2xl shadow-black/40 sm:p-10">
            {step === "rating" && (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1d9bf0]/10 text-2xl text-[#1d9bf0]">
                  <span aria-hidden="true">★</span>
                </div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#71767b]">
                  Quick question
                </p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  How was your experience with {business.name}?
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#8b949e]">
                  Your feedback helps us keep delivering a better service.
                </p>
                <div
                  aria-label="Choose a rating from 1 to 5 stars"
                  className="mt-9 flex justify-center gap-2 sm:gap-3"
                  role="group"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2f3336] bg-black text-2xl text-[#71767b] transition hover:border-[#1d9bf0] hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:ring-offset-2 focus:ring-offset-[#16181c] sm:h-14 sm:w-14 sm:text-3xl"
                      key={rating}
                      onClick={() => handleRating(rating)}
                      type="button"
                    >
                      <span aria-hidden="true">★</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "redirecting" && (
              <div className="py-8 text-center sm:py-12">
                <div className="mx-auto mb-7 h-10 w-10 animate-spin rounded-full border-2 border-[#2f3336] border-t-[#1d9bf0]" />
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#1d9bf0]">
                  Thank you for the {selectedRating}-star rating
                </p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Taking you to Google...
                </h1>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#8b949e]">
                  You&apos;ll be able to share your experience publicly in just a moment.
                </p>
              </div>
            )}

            {step === "feedback" && (
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#1d9bf0]">
                  Help us improve
                </p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  We&apos;re sorry it wasn&apos;t perfect.
                </h1>
                <p className="mt-4 text-sm leading-6 text-[#8b949e]">
                  Tell us what happened and our team will follow up privately.
                </p>
                <form className="mt-8 space-y-5" onSubmit={handleFeedbackSubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-medium" htmlFor="name">
                      Your name <span className="font-normal text-[#71767b]">(optional)</span>
                    </label>
                    <input
                      className="w-full rounded-lg border border-[#2f3336] bg-black px-4 py-3 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
                      id="name"
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Jane Smith"
                      value={name}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium" htmlFor="message">
                      What could we have done better?
                    </label>
                    <textarea
                      className="min-h-32 w-full resize-y rounded-lg border border-[#2f3336] bg-black px-4 py-3 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
                      id="message"
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Share any details that would help us..."
                      required
                      value={message}
                    />
                  </div>
                  <button
                    className="w-full rounded-lg bg-[#1d9bf0] px-4 py-3 font-semibold text-white transition hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:ring-offset-2 focus:ring-offset-[#16181c]"
                    type="submit"
                  >
                    Send private feedback
                  </button>
                </form>
              </div>
            )}

            {step === "thanks" && (
              <div className="py-8 text-center sm:py-12">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1d9bf0]/10 text-2xl text-[#1d9bf0]">
                  <span aria-hidden="true">✓</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Thanks for letting us know.
                </h1>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#8b949e]">
                  {name ? `${name}, ` : ""}your feedback has been sent privately to our team. We appreciate your time.
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-[#2f3336] pt-5 text-center text-xs text-[#71767b]">
          Powered by ReputationFlow
        </footer>
      </div>
    </main>
  );
}
