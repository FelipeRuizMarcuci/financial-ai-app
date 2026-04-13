/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function useDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/dashboard");
      const json = await res.json();

      setData(json);
      setLoading(false);
    }

    load();
  }, []);

  return { data, loading };
}
