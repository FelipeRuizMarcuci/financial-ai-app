import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import AuthCard from "@/components/ui/authCard";
import Logo from "@/components/ui/logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050913] text-white">
      <AppHeader />

      <section className="flex min-h-[calc(100vh-145px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 flex justify-center">
            <Logo />
          </div>

          <AuthCard
            title="Bem-vindo de volta"
            subtitle="Entre para gerenciar suas finanças"
            buttonText="Entrar"
            footerText="Não tem conta?"
            footerAction="Criar conta"
            footerHref="/register"
          />
        </div>
      </section>

      <AppFooter />
    </div>
  );
}
