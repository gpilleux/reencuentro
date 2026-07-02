/**
 * Rama degradada de GET /api/health: con la base caída el endpoint debe
 * responder 503 con el envelope de error — nunca lanzar ni colgarse.
 * Se mockea el cliente de DB porque tumbar un Postgres real sería frágil.
 */
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db/client", () => ({
  getPool: () => ({
    query: async () => {
      throw new Error("connection refused (simulado)");
    },
  }),
}));

describe("GET /api/health con la base caída", () => {
  it("responde 503 con envelope de error y data null", async () => {
    const { GET } = await import("@/app/api/health/route");

    const response = await GET();

    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.data).toBeNull();
    expect(body.error).toMatch(/base de datos/i);
  });
});
