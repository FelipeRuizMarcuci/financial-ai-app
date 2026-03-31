export type DashboardData = {
  summary: {
    income: number;
    expense: number;
    balance: number;
    savingsRate: number;
  };
  topTransactions: {
    topIncome: {
      id: number;
      title: string;
      value: number;
    } | null;
    topExpense: {
      id: number;
      title: string;
      value: number;
    } | null;
  };
  recentTransactions: {
    id: number;
    title: string;
    value: number;
    type: "REVENUE" | "EXPENSE";
    date: string;
  }[];
  chart: {
    date: string;
    income: number;
    expense: number;
    balance: number;
  }[];
};
