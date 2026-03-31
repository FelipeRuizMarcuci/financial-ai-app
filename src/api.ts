export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("ERRO API:", data);
    throw new Error(data.message || "Erro na requisição");
  }

  return data;
}
