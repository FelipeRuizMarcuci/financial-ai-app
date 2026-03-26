// components/dashboard/OverviewChart.tsx
"use client";

import { currency, monthlyOverviewData } from "@/lib/mock";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function OverviewChart() {
  return (
    <div className="h-[320px] w-full rounded-2xl bg-slate-950/40 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyOverviewData}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
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

          <Area
            type="monotone"
            dataKey="income"
            stroke="#34d399"
            strokeWidth={3}
            fill="url(#incomeGradient)"
            name="Receitas"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#fb7185"
            strokeWidth={3}
            fill="url(#expenseGradient)"
            name="Despesas"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
