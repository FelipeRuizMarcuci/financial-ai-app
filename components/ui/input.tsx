import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  icon: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ icon, ...props }: InputProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-800 px-4">
      {icon}
      <input
        className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
        {...props}
      />
    </div>
  );
}
