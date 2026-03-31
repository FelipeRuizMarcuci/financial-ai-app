import { apiFetch } from "../api";

export function getReports(start: string, end: string) {
  return apiFetch(`/reports?start=${start}&end=${end}`);
}
