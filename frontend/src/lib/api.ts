export type HealthResult = { ok: boolean; message: string };

/**
 * Ask the backend's /health endpoint whether it is running.
 * Never throws: a down or broken backend becomes { ok: false }.
 */
export async function getBackendHealth(
  baseUrl: string,
  fetchFn: typeof fetch = fetch,
): Promise<HealthResult> {
  try {
    const response = await fetchFn(`${baseUrl}/health`, { cache: "no-store" });
    if (!response.ok) {
      return { ok: false, message: `Backend answered with HTTP ${response.status}` };
    }
    const body: unknown = await response.json();
    if (typeof body === "object" && body !== null && "status" in body && body.status === "ok") {
      return { ok: true, message: "Backend is running" };
    }
    return { ok: false, message: "Backend sent an unexpected answer" };
  } catch {
    return { ok: false, message: "Backend is not reachable" };
  }
}
