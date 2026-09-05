"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function redirectIfAuthenticated() {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (!active || sessionError) return;
      if (data.session) router.replace("/dashboard");
    }

    redirectIfAuthenticated();
    return () => { active = false; };
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message === "Invalid login credentials"
          ? "That email or password is incorrect. Please try again."
          : signInError.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in right now.");
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
            Log in to ReputationFlow
          </h1>
          <p className="mt-2 text-[15px] text-[#71767b] text-center">
            Welcome back
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
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-[14px] text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1d9bf0] py-3 text-[15px] font-bold text-white hover:bg-[#1a8cd8] transition disabled:opacity-60"
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-[14px] text-[#71767b]">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-[#1d9bf0] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
