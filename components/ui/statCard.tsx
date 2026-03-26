import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  negative?: boolean;
};

export default function StatCard({
  title,
  value,
  icon,
  negative = false,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-black/10">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{title}</p>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            negative
              ? "bg-rose-500/10 text-rose-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {icon}
        </div>
      </div>
      <p
        className={`text-3xl font-bold tracking-tight ${negative ? "text-rose-400" : "text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}
