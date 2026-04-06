import { apiFetch } from "../api";

interface DateParams {
  start?: string;
  end?: string;
}

export async function getSummary(params?: DateParams) {
  const query = new URLSearchParams();

  if (params?.start) query.append("start", params.start);
  if (params?.end) query.append("end", params.end);

  return apiFetch(`/reports/summary?${query.toString()}`);
}

export async function getTopExpenses(params?: DateParams) {
  const query = new URLSearchParams();

  if (params?.start) query.append("start", params.start);
  if (params?.end) query.append("end", params.end);

  return apiFetch(`/reports/top-expenses?${query.toString()}`);
}

export async function getExpensesByCategory(params?: DateParams) {
  const query = new URLSearchParams();

  if (params?.start) query.append("start", params.start);
  if (params?.end) query.append("end", params.end);

  return apiFetch(`/reports/expenses-by-category?${query.toString()}`);
}

export async function getDailyBalance(params?: DateParams) {
  const query = new URLSearchParams();

  if (params?.start) query.append("start", params.start);
  if (params?.end) query.append("end", params.end);

  return apiFetch(`/reports/daily-balance?${query.toString()}`);
}

export async function getInsights(params?: DateParams) {
  const query = new URLSearchParams();

  if (params?.start) query.append("start", params.start);
  if (params?.end) query.append("end", params.end);

  return apiFetch(`/reports/insights?${query.toString()}`);
}
