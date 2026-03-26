import { Wallet } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
        <Wallet className="h-5 w-5" />
      </div>
      <span className="text-2xl font-bold tracking-tight text-white">
        FinanceAI
      </span>
    </div>
  );
}
