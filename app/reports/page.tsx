"use client";

import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";

import { currency } from "@/lib/utils";
import {
  ArrowDownRight,
  CalendarRange,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import ReportsBarChart from "./reportsBarChart";
import ReportsDonutChart from "./reportsDonutChart";

import {
  getSummary,
  getExpensesByCategory,
  getDailyBalance,
  getInsights,
  getTopExpenses,
} from "@/src/services/reports.service";

import { useEffect, useState } from "react";

type Summary = {
  income: number;
  expense: number;
  balance: number;
  totalTransactions?: number;
};

type Category = {
  name?: string;
  category?: string;
  value?: number;
  total?: number;
};

type Daily = {
  date: string;
  income: number;
  expense: number;
};

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

type Insights = {
  topExpenses: Expense[];
  topCategory?: {
    category: string;
    total: number;
  }[];
  transactionCount?: number;
  balance?: number;
};

type TopExpenseRaw = {
  date: Date;
  value: number;
  id: number;
  title: string;
  category: string;
};

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState<Summary | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [topExpensesRaw, setTopExpensesRaw] = useState<TopExpenseRaw[]>([]);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getSummary(),
      getExpensesByCategory(),
      getDailyBalance(),
      getInsights(),
      getTopExpenses(),
    ])
      .then(
        ([
          summaryRes,
          categoriesRes,
          dailyRes,
          insightsRes,
          topExpensesRes,
        ]) => {
          setSummary(summaryRes);
          setCategories(categoriesRes);
          setDaily(dailyRes);
          setInsights(insightsRes);
          setTopExpensesRaw(topExpensesRes);
        },
      )
      .catch((err) => {
        console.error("Erro ao carregar reports:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !summary || !insights) {
    return (
      <div className="min-h-screen bg-[#050913] text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  const income = summary.income;
  const expense = summary.expense;
  const balance = summary.balance;

  const topExpenses = topExpensesRaw.map((item) => ({
    id: item.id,
    title: item.title,
    categories: item.category,
    amount: item.value,
    date: new Date(item.date).toLocaleDateString("pt-BR"),
  }));
  const topCategoryRaw = insights.topCategory?.[0];

  const topCategory = topCategoryRaw
    ? {
        name: topCategoryRaw.category,
        value: topCategoryRaw.total,
      }
    : null;

  const formattedDaily = daily.map((item) => ({
    day: item.date.slice(-2),
    income: item.income,
    expense: item.expense,
  }));

  const formattedCategories = categories.map((c) => ({
    name: c.category ?? c.name ?? "Outros",
    value: c.total ?? c.value ?? 0,
  }));

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
            <h2 className="text-xl font-semibold text-white mb-2">
              Receitas vs Despesas por dia
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              Comparativo diário do período selecionado
            </p>

            <ReportsBarChart data={formattedDaily} />
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Despesas por categoria
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              Distribuição dos gastos por tipo
            </p>

            <ReportsDonutChart data={formattedCategories} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Maiores despesas
            </h2>

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
                      <p className="font-small text-white">
                        {expenseItem.categories}
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
            <h2 className="text-xl font-semibold text-white mb-4">
              Resumo rápido
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Maior categoria</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {topCategory?.name ?? "-"}
                </p>
                <p className="text-sm text-slate-300">
                  {currency.format(topCategory?.value ?? 0)}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Saldo do período</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {currency.format(balance)}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">
                  Quantidade de lançamentos
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {summary.totalTransactions ?? 0}
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
