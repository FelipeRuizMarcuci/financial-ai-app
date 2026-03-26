import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { ReactNode } from "react";
import Input from "./input";

type AuthCardProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  extraField?: ReactNode;
  footerText: string;
  footerAction: string;
  footerHref: string;
};

export default function AuthCard({
  title,
  subtitle,
  buttonText,
  extraField,
  footerText,
  footerAction,
  footerHref,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900/90 p-7 shadow-2xl shadow-black/30">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {extraField}
        <Input
          icon={<Mail className="h-4 w-4" />}
          placeholder="seu@email.com"
        />
        <Input
          icon={<Lock className="h-4 w-4" />}
          placeholder="Senha"
          type="password"
        />

        <Link
          href="/dashboard"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 text-sm font-semibold text-slate-950 transition hover:brightness-110"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-7 text-center text-sm text-slate-400">
        {footerText}{" "}
        <Link
          href={footerHref}
          className="font-semibold text-emerald-400 transition hover:text-emerald-300"
        >
          {footerAction}
        </Link>
      </p>
    </div>
  );
}
