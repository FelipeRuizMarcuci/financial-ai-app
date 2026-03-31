"use client";

import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import StatCard from "@/components/ui/statCard";
import {
  BarChart3,
  CreditCard,
  LogOut,
  PiggyBank,
  Plus,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import OverviewChart from "./overViewCharts";
import { useEffect, useState } from "react";
import { getDashboard } from "@/src/services/dashboard.service";
import { DashboardData } from "@/types/dashboard";
import { currency } from "@/lib/utils";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("last_6_months");
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    setLoading(true);
    getDashboard(period)
      .then(setData)
      .finally(() => setLoading(false));
  }, [period]);

  useEffect(() => {
    getDashboard(period).then(setData);
  }, [period]);

  if (!data) {
    return <div className="text-white p-10">Carregando...</div>;
  }

  const { summary, recentTransactions, topTransactions, chart } = data;

  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-slate-400">
              Março de 2026 — visão geral das suas finanças
            </p>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
              <BarChart3 className="h-4 w-4" />
              Relatórios
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
              <Plus className="h-4 w-4" />
              Nova transação
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          <StatCard
            title="Saldo do mês"
            value={currency.format(summary.balance)}
            icon={<CreditCard className="h-5 w-5" />}
            negative={summary.balance < 0}
          />
          <StatCard
            title="Receitas"
            value={currency.format(summary.income)}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <StatCard
            title="Despesas"
            value={currency.format(summary.expense)}
            icon={<TrendingDown className="h-5 w-5" />}
            negative
          />
          <StatCard
            title="Economia"
            value={`${summary.savingsRate.toFixed(0)}%`}
            icon={<PiggyBank className="h-5 w-5" />}
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr,1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Visão geral
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Receitas e despesas dos últimos meses
                </p>
              </div>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300 outline-none"
              >
                <option value="current_month">Mês atual</option>
                <option value="last_month">Último mês</option>
                <option value="last_6_months">Últimos 6 meses</option>
              </select>
            </div>

            {loading ? (
              <div className="h-[320px] flex items-center justify-center text-slate-400">
                Atualizando...
              </div>
            ) : (
              <OverviewChart data={chart} />
            )}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-emerald-500/10 p-4">
                <p className="text-sm text-emerald-300">
                  Entrada mais relevante
                </p>
                <p className="mt-2 text-lg font-semibold text-white">Salário</p>
                <p className="mt-1 text-sm text-slate-300">
                  {currency.format(topTransactions.topIncome?.value ?? 0)}
                </p>
              </div>

              <div className="rounded-2xl bg-rose-500/10 p-4">
                <p className="text-sm text-rose-300">Saída mais relevante</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Supermercado
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {currency.format(topTransactions.topExpense?.value ?? 0)}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Insight rápido de IA
                  </p>
                  <p className="text-sm text-slate-400">
                    Você manteve um saldo positivo no mês. Continue monitorando
                    despesas recorrentes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Transações recentes
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Últimos lançamentos do mês
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:bg-white/5"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sair
              </Link>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                        transaction.type === "REVENUE"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {transaction.type === "REVENUE" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {transaction.title}
                      </p>
                      <p className="text-sm text-slate-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>

                  <p
                    className={
                      transaction.type === "REVENUE"
                        ? "font-semibold text-emerald-400"
                        : "font-semibold text-rose-400"
                    }
                  >
                    {transaction.type === "REVENUE" ? "+" : "-"}
                    {currency.format(transaction.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-200">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Estrutura pronta para evoluir
              </h2>
              <p className="text-sm text-slate-400">
                Essa base já cobre login, cadastro, dashboard, header e footer.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">Próxima tela</p>
              <p className="mt-2 font-semibold text-white">Lançamentos</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">Próxima tela</p>
              <p className="mt-2 font-semibold text-white">Metas</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">Próxima tela</p>
              <p className="mt-2 font-semibold text-white">Insights IA</p>
            </div>
          </div>
        </div> */}
      </section>

      <AppFooter />
    </div>
  );
}
