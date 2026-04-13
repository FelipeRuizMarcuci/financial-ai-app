"use client";

import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import StatCard from "@/components/ui/statCard";
import {
  CreditCard,
  LogOut,
  PiggyBank,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import OverviewChart from "./overViewCharts";
import { useEffect, useState } from "react";
import { getDashboard } from "@/src/services/dashboard.service";
import { currency } from "@/lib/utils";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("last_6_months");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    getDashboard(period)
      .then((res) => {
        console.log("🔥 BACKEND RESPONSE:", res);
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [period]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050913] text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  const {
    summary,
    recentTransactions,
    topTransactions,
    chartDaily,
    chartMonthly,
    insightsResponse,
    forecast,
  } = data;

  // ✅ ADAPTAÇÃO DO BACKEND
  const insights = insightsResponse?.insights ?? [];

  const summaryAI = insightsResponse?.summary
    ? { message: insightsResponse.summary }
    : null;

  const alertAI = insightsResponse?.alert
    ? { message: insightsResponse.alert }
    : null;

  const actionAI = insightsResponse?.action
    ? { message: insightsResponse.action }
    : null;

  const chart =
    period === "last_6_months"
      ? (chartMonthly ?? []).map((item: any) => ({
          date: item.month?.slice(0, 7),
          income: item.income,
          expense: item.expense,
        }))
      : (chartDaily ?? []);

  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-slate-400">Visão geral das suas finanças</p>
          </div>
        </div>

        {/* STATS */}
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

        {/* MAIN GRID */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr,1fr]">
          {/* LEFT SIDE */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            {/* CHART HEADER */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Visão geral
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Receitas e despesas
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

            {/* CHART */}
            {loading ? (
              <div className="h-[320px] flex items-center justify-center text-slate-400">
                Atualizando...
              </div>
            ) : (
              <OverviewChart data={chart} />
            )}

            {/* FORECAST */}
            <div className="mt-6 rounded-2xl bg-black p-5">
              <p className="text-sm text-slate-400">Previsão de saldo</p>

              <p className="text-2xl font-bold text-white mt-1">
                {currency.format(forecast?.forecast ?? 0)}
              </p>

              {forecast?.forecast < summary.balance ? (
                <p className="text-red-400 text-xs mt-1">
                  ⚠️ Tendência de queda no saldo
                </p>
              ) : (
                <p className="text-emerald-400 text-xs mt-1">
                  📈 Tendência positiva
                </p>
              )}
            </div>

            {/* TOP TRANSACTIONS */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-emerald-500/10 p-4">
                <p className="text-sm text-emerald-300">
                  Entrada mais relevante
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {topTransactions.topIncome?.title ?? "—"}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {currency.format(topTransactions.topIncome?.value ?? 0)}
                </p>
              </div>

              <div className="rounded-2xl bg-rose-500/10 p-4">
                <p className="text-sm text-rose-300">Saída mais relevante</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {topTransactions.topExpense?.title ?? "—"}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {currency.format(topTransactions.topExpense?.value ?? 0)}
                </p>
              </div>
            </div>

            {/* IA SECTION */}
            <div className="mt-6 space-y-4">
              {/* SUMMARY */}
              {summaryAI?.message && (
                <div className="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/20">
                  <p className="text-sm text-emerald-300">Resumo inteligente</p>
                  <p className="mt-1 text-white font-medium">
                    {summaryAI.message}
                  </p>
                </div>
              )}

              {/* ALERT */}
              {alertAI?.message && (
                <div className="rounded-2xl bg-red-500/10 p-5 border border-red-500/20">
                  <p className="text-sm text-red-300">Ponto de atenção</p>
                  <p className="mt-1 text-white font-medium">
                    {alertAI.message}
                  </p>
                </div>
              )}

              {/* ACTION */}
              {actionAI?.message && (
                <div className="rounded-2xl bg-yellow-500/10 p-5 border border-yellow-500/20">
                  <p className="text-sm text-yellow-300">Ação recomendada</p>
                  <p className="mt-1 text-white font-medium">
                    {actionAI.message}
                  </p>
                </div>
              )}

              {/* INSIGHTS LIST */}
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div className="w-full">
                    <p className="font-semibold text-white">Insights de IA</p>

                    <div className="mt-3 space-y-2">
                      {insights.length > 0 ? (
                        insights.map((item: any, index: number) => {
                          const color =
                            item.type === "anomaly"
                              ? "text-red-400"
                              : item.type === "trend"
                                ? "text-yellow-400"
                                : item.type === "warning"
                                  ? "text-orange-400"
                                  : "text-blue-400";

                          return (
                            <p key={index} className={`text-sm ${color}`}>
                              • {item.message}
                            </p>
                          );
                        })
                      ) : (
                        <p className="text-sm text-slate-500">
                          Nenhum insight encontrado ainda
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Transações recentes
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Últimos lançamentos
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
              {recentTransactions.map((transaction: any) => (
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
                        {new Date(transaction.date).toLocaleDateString("pt-BR")}
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
      </section>

      <AppFooter />
    </div>
  );
}
