import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-[#e7e9ea]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <header className="flex items-center justify-between border-b border-[#2f3336] pb-6">
          <div>
            <p className="text-sm text-[#71767b]">Dashboard</p>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-[#2f3336] px-4 py-2 text-sm font-medium text-[#e7e9ea] hover:bg-[#16181c]"
          >
            Back home
          </Link>
        </header>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { label: "Reviews requested", value: "128" },
            { label: "5-star reviews", value: "96" },
            { label: "Private feedback", value: "5" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-5"
            >
              <p className="text-sm text-[#71767b]">{item.label}</p>
              <p className="mt-4 text-3xl font-bold text-[#e7e9ea]">{item.value}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
