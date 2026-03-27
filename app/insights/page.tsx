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

const insights = [
  {
    id: 1,
    type: "positive",
    title: "Redução em gastos recorrentes",
    description:
      "Seus gastos com assinaturas caíram 18% em comparação ao mês anterior, indicando maior controle sobre despesas fixas.",
    period: "Março 2026",
    icon: TrendingDown,
    color: "emerald",
  },
  {
    id: 2,
    type: "alert",
    title: "Aumento em alimentação",
    description:
      "Os gastos com alimentação cresceram 24% neste mês. Vale revisar delivery, compras por impulso e refeições fora.",
    period: "Março 2026",
    icon: AlertTriangle,
    color: "rose",
  },
  {
    id: 3,
    type: "opportunity",
    title: "Oportunidade de economia",
    description:
      "Se você mantiver o ritmo atual de receitas e reduzir 10% das despesas variáveis, poderá economizar cerca de R$ 620 no próximo mês.",
    period: "Próximo mês",
    icon: Lightbulb,
    color: "amber",
  },
  {
    id: 4,
    type: "positive",
    title: "Saldo melhor que o mês passado",
    description:
      "Seu saldo líquido melhorou em relação ao período anterior, impulsionado por aumento de receitas e menor volume de despesas pequenas.",
    period: "Comparativo mensal",
    icon: ArrowUpRight,
    color: "cyan",
  },
];

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

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
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

        <div className="mb-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
              <Brain className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Insights gerados</p>
            <p className="mt-2 text-3xl font-bold text-white">8</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Tendência do mês</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">Positiva</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
              <Lightbulb className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-400">Economia sugerida</p>
            <p className="mt-2 text-3xl font-bold text-white">R$ 620,00</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            {insights.map((insight) => {
              const Icon = insight.icon;
              const styles = getCardStyles(insight.color);

              return (
                <div
                  key={insight.id}
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
                          {insight.title}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                          {insight.period}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}
                    >
                      {insight.type === "positive"
                        ? "Positivo"
                        : insight.type === "alert"
                          ? "Atenção"
                          : "Oportunidade"}
                    </span>
                  </div>

                  <p className="leading-7 text-slate-300">
                    {insight.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-200">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Resumo inteligente
                  </h2>
                  <p className="text-sm text-slate-400">
                    Leitura consolidada do período
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-300">
                Seu comportamento financeiro mostra evolução gradual, com
                melhora no saldo líquido e redução em algumas despesas
                recorrentes. Ainda assim, categorias variáveis como alimentação
                merecem atenção, pois apresentam oscilações mais agressivas ao
                longo do mês.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Ponto de atenção
                  </h2>
                  <p className="text-sm text-slate-400">
                    O que acompanhar de perto
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-300">
                Os maiores riscos do mês estão ligados ao aumento de despesas
                variáveis e à ausência de limites bem definidos para categorias
                de consumo rápido. Criar metas específicas por categoria pode
                ajudar a reduzir esse comportamento.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Ação sugerida
                  </h2>
                  <p className="text-sm text-slate-400">
                    Próximo passo recomendado
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-300">
                Revise as despesas com alimentação e assinaturas na próxima
                semana. Uma redução simples nesses grupos já pode aumentar sua
                capacidade de aporte nas metas mensais sem comprometer sua
                rotina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}
