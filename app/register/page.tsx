"use client";

import Logo from "@/components/ui/logo";
import AuthCard from "@/components/ui/authCard";
import { register } from "@/src/services/register.service";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <section className="flex min-h-[calc(100vh-145px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 flex justify-center">
            <Logo />
          </div>

          <AuthCard
            mode="register"
            title="Criar conta"
            subtitle="Comece a controlar suas finanças com IA"
            buttonText="Criar conta"
            onSubmit={async ({ name, email, password, confirmPassword }) => {
              const res = await register(
                name!,
                email,
                password,
                confirmPassword!,
              );

              return {
                access_token: res.token.access_token,
              };
            }}
            footerText="Já tem conta?"
            footerAction="Fazer login"
            footerHref="/login"
          />
        </div>
      </section>
    </div>
  );
}
