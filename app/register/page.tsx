import Logo from "@/components/ui/logo";
import AuthCard from "@/components/ui/authCard";

import { User } from "lucide-react";
import AppHeader from "@/components/layout/header";
import Input from "@/components/ui/input";
import AppFooter from "@/components/layout/footer";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="flex min-h-[calc(100vh-145px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 flex justify-center">
            <Logo />
          </div>

          <AuthCard
            title="Criar conta"
            subtitle="Comece a controlar suas finanças com IA"
            buttonText="Criar conta"
            extraField={
              <Input
                icon={<User className="h-4 w-4" />}
                placeholder="Seu nome"
              />
            }
            footerText="Já tem conta?"
            footerAction="Fazer login"
            footerHref="/login"
          />
        </div>
      </section>

      <AppFooter />
    </div>
  );
}
