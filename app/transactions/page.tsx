"use client";

import { useState } from "react";
import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import AppModal from "@/components/ui/appModal";
import { currency, sampleTransactions } from "@/lib/mock";
import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Lançamentos
            </h1>
            <p className="mt-2 text-slate-400">
              Gerencie receitas e despesas de forma simples e organizada
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            Novo lançamento
          </button>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr,220px,180px]">
          <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              placeholder="Buscar por título ou data"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <button className="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 text-sm text-slate-300">
            Todos os tipos
            <SlidersHorizontal className="h-4 w-4" />
          </button>

          <button className="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 text-sm text-slate-300">
            Março 2026
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
          <div className="divide-y divide-white/5">
            {sampleTransactions.map((transaction) => {
              const isIncome = transaction.type === "income";

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
                      <p className="font-medium text-white">
                        {transaction.title}
                      </p>

                      <div className="mt-1 flex items-center gap-3 text-sm">
                        <span className="text-slate-400">
                          {isIncome
                            ? "Receita registrada"
                            : "Despesa registrada"}
                        </span>

                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            isIncome
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-rose-500/10 text-rose-300"
                          }`}
                        >
                          {isIncome ? "Receita" : "Despesa"}
                        </span>

                        <span className="text-slate-500">
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-right font-semibold ${
                      isIncome ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {currency.format(transaction.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AppFooter />

      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo lançamento"
        subtitle="Preencha as informações para adicionar uma nova receita ou despesa."
      >
        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Título</label>
            <input
              type="text"
              placeholder="Ex.: Supermercado"
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Tipo</label>
            <select className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none">
              <option className="bg-slate-900">Receita</option>
              <option className="bg-slate-900">Despesa</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Valor</label>
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Data</label>
            <input
              type="date"
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Salvar lançamento
            </button>
          </div>
        </form>
      </AppModal>
    </div>
  );
}
