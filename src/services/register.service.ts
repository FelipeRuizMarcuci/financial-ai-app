import { apiFetch } from "../api";

export async function register(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  return apiFetch("/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });
}
