"use client";

import Link from "next/link";
import Logo from "@/components/ui/logo";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  name: string;
};

export default function AppHeader() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);

      setIsLogged(true);
      setUserName(decoded.name); // depois você troca isso
    }
  }, []);

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
            href="/insights"
            className="rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Insights IA
          </Link>

          {isLogged && (
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition cursor-pointer">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-slate-900">
                {userName.charAt(0).toUpperCase()}
              </div>
              {userName}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
