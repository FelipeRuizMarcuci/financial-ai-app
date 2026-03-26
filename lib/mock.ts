export const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};

export const sampleTransactions: Transaction[] = [
  {
    id: 1,
    title: "Freelance Landing Page",
    amount: 2800,
    type: "income",
    date: "20/03/2026",
  },
  {
    id: 2,
    title: "Supermercado",
    amount: 850,
    type: "expense",
    date: "22/03/2026",
  },
  {
    id: 3,
    title: "Assinaturas",
    amount: 120,
    type: "expense",
    date: "24/03/2026",
  },
  {
    id: 4,
    title: "Salário",
    amount: 4200,
    type: "income",
    date: "25/03/2026",
  },
];

export const monthlyOverviewData = [
  { month: "Jan", income: 4200, expense: 2600 },
  { month: "Fev", income: 4600, expense: 3100 },
  { month: "Mar", income: 7000, expense: 4200 },
  { month: "Abr", income: 5200, expense: 3000 },
  { month: "Mai", income: 6100, expense: 3900 },
  { month: "Jun", income: 6800, expense: 4100 },
];

export const reportsDailyData = [
  { day: "01", income: 1200, expense: 400 },
  { day: "05", income: 0, expense: 850 },
  { day: "10", income: 2200, expense: 300 },
  { day: "15", income: 0, expense: 120 },
  { day: "20", income: 2800, expense: 0 },
  { day: "25", income: 0, expense: 970 },
];

export const reportsCategoryData = [
  { name: "Moradia", value: 1800 },
  { name: "Alimentação", value: 850 },
  { name: "Transporte", value: 420 },
  { name: "Assinaturas", value: 120 },
  { name: "Outros", value: 300 },
];
