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
  chartDaily: {
    date: string;
    income: number;
    expense: number;
    balance: number;
  }[];

  chartMonthly: {
    month: string;
    income: number;
    expense: number;
    balance: number;
  }[];

  insights: {
    type: "pattern" | "info" | "warning" | "anomaly" | "trend";
    message: string;
  }[];

  behavior: {
    type: "pattern" | "anomaly" | "trend" | "info";
    message: string;
  }[];

  forecast: {
    forecast: number;
  };
};
