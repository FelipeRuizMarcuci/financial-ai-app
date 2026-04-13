"use client";

import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import {
  AlertTriangle,
  ArrowUpRight,
  Brain,
  Lightbulb,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboard } from "@/src/services/dashboard.service";

function getCardStyles(color: string) {
  switch (color) {
    case "emerald":
      return {
        iconBox: "bg-emerald-500/10 text-emerald-400",
        badge: "bg-emerald-500/10 text-emerald-300",
      };
    case "rose":
      return {
        iconBox: "bg-rose-500/10 text-rose-400",
        badge: "bg-rose-500/10 text-rose-300",
      };
    case "amber":
      return {
        iconBox: "bg-amber-500/10 text-amber-400",
        badge: "bg-amber-500/10 text-amber-300",
      };
    case "cyan":
      return {
        iconBox: "bg-cyan-500/10 text-cyan-400",
        badge: "bg-cyan-500/10 text-cyan-300",
      };
    default:
      return {
        iconBox: "bg-white/10 text-white",
        badge: "bg-white/10 text-white",
      };
  }
}

function mapInsightType(type: string) {
  switch (type) {
    case "anomaly":
      return {
        label: "Atenção",
        color: "rose",
        icon: AlertTriangle,
      };
    case "pattern":
      return {
        label: "Padrão",
        color: "cyan",
        icon: ArrowUpRight,
      };
    case "trend":
      return {
        label: "Tendência",
        color: "emerald",
        icon: TrendingUp,
      };
    case "warning":
      return {
        label: "Alerta",
        color: "amber",
        icon: AlertTriangle,
      };
    default:
      return {
        label: "Insight",
        color: "cyan",
        icon: Sparkles,
      };
  }
}

export default function InsightsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDashboard("last_6_months").then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#050913]">
        Carregando insights...
      </div>
    );
  }

  const insightsResponse = data.insightsResponse;

  const insights = insightsResponse?.insights ?? [];
  const summary = insightsResponse?.summary;
  const alert = insightsResponse?.alert;
  const action = insightsResponse?.action;
  const trend = insightsResponse?.trend;
  const economy = insightsResponse?.economySuggestion;

  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Insights IA
            </h1>
            <p className="mt-2 text-slate-400">
              Análises automáticas para ajudar você a entender seu comportamento
              financeiro
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
            <Sparkles className="h-4 w-4" />
            Gerar novos insights
          </button>
        </div>

        {/* TOP CARDS */}
        <div className="mb-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
              <Brain className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Insights gerados</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {insights.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Tendência do mês</p>
            <p
              className={`mt-2 text-3xl font-bold ${
                trend === "Negativa" ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {trend ?? "—"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
              <Lightbulb className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Economia sugerida</p>
            <p className="mt-2 text-3xl font-bold text-white">
              R$ {economy ?? 0}
            </p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          {/* INSIGHTS LIST */}
          <div className="space-y-6">
            {insights.map((item: any, index: number) => {
              const mapped = mapInsightType(item.type);
              const Icon = mapped.icon;
              const styles = getCardStyles(mapped.color);

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.iconBox}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          {mapped.label}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                          Insight automático
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}
                    >
                      {mapped.label}
                    </span>
                  </div>

                  <p className="leading-7 text-slate-300">{item.message}</p>
                </div>
              );
            })}
          </div>

          {/* SIDE INFO */}
          <div className="space-y-6">
            {/* SUMMARY */}
            {summary && (
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Resumo inteligente
                  </h2>
                </div>

                <p className="text-sm leading-7 text-slate-300">{summary}</p>
              </div>
            )}

            {/* ALERT */}
            {alert && (
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <div className="mb-5 flex items-center gap-3 text-rose-400">
                  <AlertTriangle className="h-5 w-5" />
                  <h2 className="text-xl font-semibold text-white">
                    Ponto de atenção
                  </h2>
                </div>

                <p className="text-sm leading-7 text-slate-300">{alert}</p>
              </div>
            )}

            {/* ACTION */}
            {action && (
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <div className="mb-5 flex items-center gap-3 text-emerald-400">
                  <TrendingDown className="h-5 w-5" />
                  <h2 className="text-xl font-semibold text-white">
                    Ação sugerida
                  </h2>
                </div>

                <p className="text-sm leading-7 text-slate-300">{action}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}
