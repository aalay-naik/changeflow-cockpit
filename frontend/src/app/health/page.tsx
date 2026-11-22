import { connection } from "next/server";
import { Suspense } from "react";

import { getBackendHealth } from "@/lib/api";

// Runs on every visit (not at build time) and asks the backend if it is alive
async function BackendStatus() {
  await connection();
  const apiUrl = process.env.API_URL ?? "http://localhost:8000";
  const health = await getBackendHealth(apiUrl);
  return <p>Backend: {health.ok ? "OK" : `DOWN (${health.message})`}</p>;
}

export default function HealthPage() {
  return (
    <main>
      <h1>System health</h1>
      <p>Frontend: OK</p>
      <Suspense fallback={<p>Backend: checking…</p>}>
        <BackendStatus />
      </Suspense>
    </main>
  );
}
