"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setSuccess("Account created. Let’s set up your business.");
      setTimeout(() => router.push("/onboarding"), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#e7e9ea]">
      <header className="border-b border-[#2f3336]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1d9bf0] flex items-center justify-center">
              <span className="text-white font-bold text-sm">RF</span>
            </div>
            <span className="font-bold text-[17px] tracking-tight">
              ReputationFlow
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold tracking-tight text-center">
            Create your account
          </h1>
          <p className="mt-2 text-[15px] text-[#71767b] text-center">
            Start collecting reviews faster
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#71767b] mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#2f3336] bg-[#16181c] px-4 py-3 text-[15px] text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"
                placeholder="you@business.com"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#71767b] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#2f3336] bg-[#16181c] px-4 py-3 text-[15px] text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"
                placeholder="Create a password"
              />
            </div>

            {error && (
              <p className="text-[14px] text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {success && (
              <p className="text-[14px] text-green-400 bg-green-400/10 rounded-lg px-3 py-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1d9bf0] py-3 text-[15px] font-bold text-white hover:bg-[#1a8cd8] transition disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-[14px] text-[#71767b]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1d9bf0] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
