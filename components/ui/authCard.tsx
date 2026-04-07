"use client";

import Link from "next/link";
import { ArrowRight, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./input";
import { login } from "@/src/services/auth.service";

type AuthCardProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  footerText: string;
  footerAction: string;
  footerHref: string;
  mode?: "login" | "register";
  onSubmit?: (data: {
    email: string;
    password: string;
    confirmPassword?: string;
    name?: string;
  }) => Promise<{ access_token?: string } | void>;
};

export default function AuthCard({
  title,
  subtitle,
  buttonText,
  footerText,
  footerAction,
  footerHref,
  mode = "login",
  onSubmit,
}: AuthCardProps) {
  const router = useRouter();
  const isRegister = mode === "register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  // 🔥 validações
  const passwordsMatch = password === confirmPassword;
  const passwordStrong = password.length >= 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        if (!passwordStrong) {
          throw new Error("A senha deve ter pelo menos 6 caracteres");
        }

        if (!passwordsMatch) {
          throw new Error("As senhas não coincidem");
        }
      }

      let token: string | undefined;

      if (onSubmit) {
        const res = await onSubmit({
          name,
          email,
          password,
          confirmPassword,
        });

        token = res?.access_token;
      } else {
        const data = await login(email, password);
        token = data.access_token;
      }

      if (token) {
        localStorage.setItem("token", token);
        document.cookie = `token=${token}; path=/`;
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro na autenticação");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900/90 p-7 shadow-2xl shadow-black/30"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {/* Nome */}
        {isRegister && (
          <Input
            icon={<User className="h-4 w-4" />}
            placeholder="Seu nome"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        )}

        {/* Email */}
        <Input
          icon={<Mail className="h-4 w-4" />}
          placeholder="seu@email.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        {/* Senha */}
        <div className="relative">
          <Input
            icon={<Lock className="h-4 w-4" />}
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Feedback senha */}
        {isRegister && (
          <p
            className={`text-xs ${
              passwordStrong ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {passwordStrong ? "Senha válida" : "Mínimo de 6 caracteres"}
          </p>
        )}

        {/* Confirmar senha */}
        {isRegister && (
          <>
            <div className="relative">
              <Input
                icon={<Lock className="h-4 w-4" />}
                placeholder="Confirmar senha"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Feedback confirmação */}
            <p
              className={`text-xs ${
                passwordsMatch ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {passwordsMatch
                ? "Senhas coincidem"
                : "As senhas devem coincidir"}
            </p>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Carregando..." : buttonText}
          <ArrowRight className="h-4 w-4" />
        </button>
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
    </form>
  );
}
