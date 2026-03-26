import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";

import { currency, reportsCategoryData, sampleTransactions } from "@/lib/mock";
import {
  ArrowDownRight,
  CalendarRange,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import ReportsBarChart from "./reportsBarChart";
import ReportsDonutChart from "./reportsDonutChart";

export default function ReportsPage() {
  const income = sampleTransactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = sampleTransactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expense;

  const topExpenses = sampleTransactions
    .filter((item) => item.type === "expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const topCategory = [...reportsCategoryData].sort(
    (a, b) => b.value - a.value,
  )[0];

  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Relatórios
            </h1>
            <p className="mt-2 text-slate-400">
              Análise detalhada das suas finanças
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 text-sm text-slate-300">
              <CalendarRange className="h-4 w-4" />
              Março
            </div>

            <div className="flex h-11 items-center rounded-2xl border border-white/10 bg-slate-900/80 px-4 text-sm text-slate-300">
              2026
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Receitas</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {currency.format(income)}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
              <TrendingDown className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Despesas</p>
            <p className="mt-2 text-3xl font-bold text-rose-400">
              {currency.format(expense)}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Wallet className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Balanço</p>
            <p
              className={`mt-2 text-3xl font-bold ${
                balance >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {currency.format(balance)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr,1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-white">
                Receitas vs Despesas por dia
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Comparativo diário do período selecionado
              </p>
            </div>

            <ReportsBarChart />
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-white">
                Despesas por categoria
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Distribuição dos gastos por tipo
              </p>
            </div>

            <ReportsDonutChart />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-white">
                Maiores despesas
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Principais saídas financeiras do mês
              </p>
            </div>

            <div className="space-y-3">
              {topExpenses.map((expenseItem) => (
                <div
                  key={expenseItem.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
                      <ArrowDownRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {expenseItem.title}
                      </p>
                      <p className="text-sm text-slate-400">
                        {expenseItem.date}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-rose-400">
                    -{currency.format(expenseItem.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-white">
                Resumo rápido
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Leitura rápida do mês atual
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Maior categoria</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {topCategory?.name}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {currency.format(topCategory?.value ?? 0)}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Saldo do período</p>
                <p
                  className={`mt-2 text-lg font-semibold ${
                    balance >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {currency.format(balance)}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">
                  Quantidade de lançamentos
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {sampleTransactions.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}
