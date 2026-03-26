import Link from "next/link";
import Logo from "@/components/ui/logo";

export default function AppHeader() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/dashboard"
            className="rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/transactions"
            className="rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Lançamentos
          </Link>

          <Link
            href="/goals"
            className="rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Metas
          </Link>

          <Link
            href="/reports"
            className="rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Relatórios
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            Criar conta
          </Link>
        </nav>
      </div>
    </header>
  );
}
