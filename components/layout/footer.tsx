export default function AppFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          © 2026 FinanceAI. Controle financeiro com uma experiência moderna.
        </p>
        <div className="flex items-center gap-5">
          <span>Privacidade</span>
          <span>Termos</span>
          <span>Contato</span>
        </div>
      </div>
    </footer>
  );
}
