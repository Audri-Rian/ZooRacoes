"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
  timestamp: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const res = await fetch(`${API_URL}/api/health`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = (await res.json()) as HealthResponse;
        if (!cancelled) {
          setHealth(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setHealth(null);
          setError(err instanceof Error ? err.message : "Falha ao conectar na API");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void checkHealth();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">ZooRações</p>
          <h1 className="text-3xl font-semibold tracking-tight">Scaffold front ↔ back</h1>
          <p className="text-stone-600 text-sm">
            Next.js consultando <code className="text-stone-800">GET /api/health</code> no Spring Boot.
          </p>
        </header>

        <section className="rounded-xl border border-stone-300 bg-white p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-medium text-stone-500">Status da API</h2>

          {loading && <p className="text-stone-600">Verificando…</p>}

          {!loading && health && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-stone-500">status</dt>
              <dd className="font-medium text-emerald-700">{health.status}</dd>
              <dt className="text-stone-500">service</dt>
              <dd>{health.service}</dd>
              <dt className="text-stone-500">timestamp</dt>
              <dd className="font-mono text-xs">{health.timestamp}</dd>
              <dt className="text-stone-500">base URL</dt>
              <dd className="font-mono text-xs break-all">{API_URL}</dd>
            </dl>
          )}

          {!loading && error && (
            <div className="space-y-2 text-sm">
              <p className="text-red-700 font-medium">API indisponível</p>
              <p className="text-stone-600">{error}</p>
              <p className="text-stone-500">
                Suba o back com <code className="text-stone-800">./mvnw spring-boot:run</code> em{" "}
                <code className="text-stone-800">back/</code>.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
