import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/ui/toastProvider";

export const metadata: Metadata = {
  title: "FinanceAI",
  description: "Controle financeiro com uma experiência moderna.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#050913] text-white antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
