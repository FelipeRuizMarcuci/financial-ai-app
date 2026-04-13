/* eslint-disable @typescript-eslint/no-explicit-any */
export function ForecastCard({ forecast }: any) {
  const value = forecast?.forecast ?? 0;

  const formatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="p-6 rounded-2xl bg-black text-white shadow-lg">
      <p className="text-sm opacity-70">Previsão de saldo</p>
      <h2 className="text-2xl font-bold">{formatted}</h2>
    </div>
  );
}
