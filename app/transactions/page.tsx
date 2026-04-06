"use client";

import { useEffect, useState } from "react";
import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import AppModal from "@/components/ui/appModal";
import { currency } from "@/lib/mock";
import { ArrowDownRight, ArrowUpRight, Plus, Search } from "lucide-react";

import {
  getTransactions,
  createTransaction,
  Transaction,
} from "@/src/services/transactions.service";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 filtros
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"" | "REVENUE" | "EXPENSE">("");
  const [monthFilter, setMonthFilter] = useState("");

  // form
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"REVENUE" | "EXPENSE">("REVENUE");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    loadTransactions();
  }, [search, typeFilter, monthFilter]);

  async function loadTransactions() {
    try {
      const res = await getTransactions({
        q: search || undefined,
        type: typeFilter || undefined,
        month: monthFilter || undefined,
      });

      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createTransaction({
        title,
        type,
        value: Number(value),
        date,
      });

      await loadTransactions();

      setTitle("");
      setType("REVENUE");
      setValue("");
      setDate("");

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Lançamentos</h1>
            <p className="mt-2 text-slate-400">
              Gerencie receitas e despesas de forma simples
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            Novo lançamento
          </button>
        </div>

        {/* filtros */}
        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr,220px,180px]">
          {/* busca */}
          <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {/* tipo */}
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as "REVENUE" | "EXPENSE" | "")
            }
            className="h-14 rounded-2xl border border-white/10 bg-slate-900/80 px-4 text-sm text-slate-300"
          >
            <option value="">Todos os tipos</option>
            <option value="REVENUE">Receitas</option>
            <option value="EXPENSE">Despesas</option>
          </select>

          {/* mês */}
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="h-14 rounded-2xl border border-white/10 bg-slate-900/80 px-4 text-sm text-slate-300"
          />
        </div>

        {/* lista */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
          <div className="divide-y divide-white/5">
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "REVENUE";

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between px-6 py-5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        isIncome
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>

                    <div>
                      <p className="font-medium">{transaction.title}</p>

                      <div className="mt-1 flex items-center gap-3 text-sm">
                        <span className="text-slate-400">
                          {isIncome ? "Receita" : "Despesa"}
                        </span>

                        <span className="text-slate-500">
                          {new Date(transaction.date).toLocaleDateString(
                            "pt-BR",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-semibold ${
                      isIncome ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {currency.format(transaction.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AppFooter />

      {/* modal */}
      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo lançamento"
        subtitle="Adicione uma nova transação"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="h-12 w-full rounded-2xl bg-white/5 px-4"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as "REVENUE" | "EXPENSE")}
            className="h-12 w-full rounded-2xl bg-white/5 px-4"
          >
            <option value="REVENUE">Receita</option>
            <option value="EXPENSE">Despesa</option>
          </select>

          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor"
            className="h-12 w-full rounded-2xl bg-white/5 px-4"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-12 w-full rounded-2xl bg-white/5 px-4"
          />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-emerald-400 px-4 py-2 rounded-xl text-black"
            >
              Salvar
            </button>
          </div>
        </form>
      </AppModal>
    </div>
  );
}
