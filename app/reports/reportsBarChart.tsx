"use client";

import { currency, reportsDailyData } from "@/lib/mock";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ReportsBarChart() {
  return (
    <div className="h-[320px] w-full rounded-2xl bg-slate-950/40 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={reportsDailyData} barGap={10}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={(value) => `R$ ${Number(value) / 1000}k`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              color: "#fff",
            }}
            formatter={(value, name) => [
              typeof value === "number"
                ? currency.format(value)
                : String(value ?? ""),
              name === "income"
                ? "Receitas"
                : name === "expense"
                  ? "Despesas"
                  : String(name),
            ]}
          />

          <Bar
            dataKey="income"
            name="Receitas"
            radius={[10, 10, 0, 0]}
            fill="#34d399"
          />

          <Bar
            dataKey="expense"
            name="Despesas"
            radius={[10, 10, 0, 0]}
            fill="#fb7185"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
