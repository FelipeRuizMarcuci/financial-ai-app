import { apiFetch } from "../api";

export interface Transaction {
  id: number;
  title: string;
  type: "REVENUE" | "EXPENSE";
  value: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface GetTransactionsParams {
  page?: number;
  limit?: number;
  q?: string;
  type?: "REVENUE" | "EXPENSE";
  month?: string;
}

export async function getTransactions(params?: GetTransactionsParams) {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));
  if (params?.q) query.append("q", params.q);
  if (params?.type) query.append("type", params.type);
  if (params?.month) query.append("month", params.month);

  const url = `/transactions${query.toString() ? `?${query}` : ""}`;

  return apiFetch(url, {
    method: "GET",
  });
}

export async function createTransaction(data: {
  title: string;
  type: "REVENUE" | "EXPENSE";
  value: number;
  date: string;
}) {
  return apiFetch("/transactions", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteTransaction(id: number) {
  return apiFetch(`/transactions/${id}`, {
    method: "DELETE",
  });
}
