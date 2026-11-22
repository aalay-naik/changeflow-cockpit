import { describe, expect, it } from "vitest";

import { getBackendHealth } from "../src/lib/api";

// A fake fetch, so the tests don't need a running backend
function fakeFetch(status: number, body: unknown): typeof fetch {
  return async () => new Response(JSON.stringify(body), { status });
}

describe("getBackendHealth", () => {
  it("reports ok when the backend says ok", async () => {
    const result = await getBackendHealth("http://api", fakeFetch(200, { status: "ok" }));
    expect(result.ok).toBe(true);
  });

  it("reports down on an error status", async () => {
    const result = await getBackendHealth("http://api", fakeFetch(500, {}));
    expect(result).toEqual({ ok: false, message: "Backend answered with HTTP 500" });
  });

  it("reports down when the backend is unreachable", async () => {
    const failingFetch: typeof fetch = async () => {
      throw new TypeError("fetch failed");
    };
    const result = await getBackendHealth("http://api", failingFetch);
    expect(result).toEqual({ ok: false, message: "Backend is not reachable" });
  });
});
