"use client";

import { currency } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#34d399", "#60a5fa", "#f59e0b", "#a78bfa", "#fb7185"];

type ReportsDonutChartProps = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function ReportsDonutChart({ data }: ReportsDonutChartProps) {
  return (
    <div className="h-[320px] w-full rounded-2xl bg-slate-950/40 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell
                key={`${entry.name}-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

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
              String(name),
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap gap-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
