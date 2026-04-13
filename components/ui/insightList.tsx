/* eslint-disable @typescript-eslint/no-explicit-any */
import { InsightCard } from "./insightCard";

export function InsightList({ insights }: any) {
  if (!insights || insights.length === 0) {
    return <p className="text-gray-500">Nenhum insight encontrado</p>;
  }

  return (
    <div className="grid gap-3">
      {insights.map((insight: any, index: number) => (
        <InsightCard key={index} insight={insight} />
      ))}
    </div>
  );
}
