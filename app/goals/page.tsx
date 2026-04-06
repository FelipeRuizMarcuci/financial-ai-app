"use client";

import { useMemo, useState, useEffect } from "react";
import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import AppModal from "@/components/ui/appModal";
import { PiggyBank, Plus, Target, TrendingUp, Wallet } from "lucide-react";

import {
  getGoals,
  createGoal,
  addValueToGoal,
} from "@/src/services/goals.service";

type Goal = {
  id: number;
  title: string;
  current: number;
  target: number;
};

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [inputs, setInputs] = useState<Record<number, string>>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    dateDeadline: "",
  });

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    try {
      const res = await getGoals();

      setGoals(
        res.data.map((g) => ({
          id: g.id,
          title: g.title,
          current: g.value,
          target: g.targetValue,
        })),
      );
    } catch (err) {
      console.error(err);
    }
  }

  function handleInputChange(goalId: number, value: string) {
    const normalized = value.replace(",", ".");
    setInputs((prev) => ({
      ...prev,
      [goalId]: normalized,
    }));
  }

  async function handleAddFunds(goalId: number) {
    const rawValue = inputs[goalId];
    const amount = Number(rawValue);

    if (!rawValue || Number.isNaN(amount) || amount <= 0) return;

    try {
      await addValueToGoal(goalId, amount);
      await loadGoals();

      setInputs((prev) => ({
        ...prev,
        [goalId]: "",
      }));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateGoal() {
    const target = Number(newGoal.target);

    if (
      !newGoal.title ||
      Number.isNaN(target) ||
      target <= 0 ||
      !newGoal.dateDeadline
    )
      return;

    try {
      await createGoal({
        title: newGoal.title,
        targetValue: target,
        value: 0,
        dateDeadline: newGoal.dateDeadline,
      });

      await loadGoals();

      setNewGoal({ title: "", target: "", dateDeadline: "" });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  const summary = useMemo(() => {
    const totalGoals = goals.length;
    const totalSaved = goals.reduce((acc, goal) => acc + goal.current, 0);
    const averageProgress =
      totalGoals > 0
        ? goals.reduce(
            (acc, goal) =>
              acc + Math.min((goal.current / goal.target) * 100, 100),
            0,
          ) / totalGoals
        : 0;

    return {
      totalGoals,
      totalSaved,
      averageProgress,
    };
  }, [goals]);

  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Metas
            </h1>
            <p className="mt-2 text-slate-400">
              Acompanhe objetivos financeiros e seu progresso mensal
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            Nova meta
          </button>
        </div>

        <div className="mb-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Target className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Metas ativas</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {summary.totalGoals}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
              <PiggyBank className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Valor acumulado</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {money.format(summary.totalSaved)}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Progresso médio</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {summary.averageProgress.toFixed(0)}%
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {goals.map((goal) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            const completed = progress >= 100;

            return (
              <div
                key={goal.id}
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {goal.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                      {progress.toFixed(0)}% concluído
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      completed
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-cyan-500/10 text-cyan-300"
                    }`}
                  >
                    {completed ? "Concluída" : "Em andamento"}
                  </span>
                </div>

                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-slate-300">
                    {money.format(goal.current)}
                  </span>
                  <span className="text-slate-300">
                    {money.format(goal.target)}
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-5 border-t border-white/10 pt-5">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex h-11 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4">
                      <Wallet className="h-4 w-4 text-slate-500" />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Valor para adicionar"
                        value={inputs[goal.id] ?? ""}
                        onChange={(e) =>
                          handleInputChange(goal.id, e.target.value)
                        }
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      />
                    </div>

                    <button
                      onClick={() => handleAddFunds(goal.id)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-4 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar fundos
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova meta"
        subtitle="Defina um objetivo financeiro"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome da meta"
            value={newGoal.title}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, title: e.target.value }))
            }
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="number"
            placeholder="Valor alvo"
            value={newGoal.target}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, target: e.target.value }))
            }
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="date"
            value={newGoal.dateDeadline}
            onChange={(e) =>
              setNewGoal((prev) => ({
                ...prev,
                dateDeadline: e.target.value,
              }))
            }
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none"
          />

          <button
            onClick={handleCreateGoal}
            className="w-full rounded-2xl bg-emerald-400 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            Criar meta
          </button>
        </div>
      </AppModal>

      <AppFooter />
    </div>
  );
}
