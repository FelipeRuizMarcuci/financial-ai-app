import { apiFetch } from "../api";

export async function getDashboard(range = "current_month") {
  return apiFetch(`/dashboard?range=${range}`);
}
