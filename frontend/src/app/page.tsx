import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-app-black p-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-[1200px] flex-col rounded-xl border border-white/10 bg-gradient-to-br from-[#22252F] via-[#1E1F25] to-[#1A1B20] p-8 text-white shadow-panel">
        <header className="flex items-center justify-between gap-4 border-b border-white/15 pb-6">
          <h1 className="text-4xl font-semibold sm:text-3xl">Concert Reservation</h1>
          <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
            API: {API_BASE_URL}
          </span>
        </header>

        <main className="grid flex-1 gap-6 py-8 md:grid-cols-2">
          <Link
            href="/admin"
            className="group rounded-xl border border-white/10 bg-white/5 p-8 transition hover:border-app-primary hover:bg-white/10"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Portal</p>
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-3xl">Admin</h2>
            <p className="mt-4 text-xl text-white/75 sm:text-lg">
              Manage concerts, create or delete events, and review reservation history.
            </p>
            <p className="mt-8 text-lg font-semibold text-app-primary group-hover:text-[#6CB2FF]">Open dashboard →</p>
          </Link>

          <Link
            href="/user"
            className="group rounded-xl border border-white/10 bg-white/5 p-8 transition hover:border-app-success hover:bg-white/10"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Portal</p>
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-3xl">User</h2>
            <p className="mt-4 text-xl text-white/75 sm:text-lg">
              Browse all concerts and reserve or cancel one seat per concert.
            </p>
            <p className="mt-8 text-lg font-semibold text-app-success group-hover:text-[#74D9BE]">Start booking →</p>
          </Link>
        </main>
      </div>
    </div>
  );
}
