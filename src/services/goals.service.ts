import { apiFetch } from "../api";

export interface Goal {
  id: number;
  title: string;
  targetValue: number;
  value: number;
  dateDeadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalResponse {
  id: number;
  title: string;
  targetValue: number;
  value: number;
  dateDeadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetGoalsResponse {
  data: GoalResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface GetGoalsParams {
  page?: number;
  limit?: number;
  q?: string;
}

export async function getGoals(
  params?: GetGoalsParams,
): Promise<GetGoalsResponse> {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));
  if (params?.q) query.append("q", params.q);

  const url = `/goals${query.toString() ? `?${query}` : ""}`;

  return apiFetch(url);
}

export async function createGoal(data: {
  title: string;
  targetValue: number;
  value: number;
  dateDeadline: string;
}) {
  return apiFetch("/goals", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function addValueToGoal(id: number, value: number) {
  return apiFetch(`/goals/addvalue/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ value }),
  });
}
