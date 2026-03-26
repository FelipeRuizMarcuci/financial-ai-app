import { ReactNode } from "react";

type InputProps = {
  icon: ReactNode;
  placeholder: string;
  type?: string;
};

export default function Input({
  icon,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-emerald-400/60 focus-within:bg-white/[0.07]">
      <div className="text-slate-500">{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
      />
    </div>
  );
}
