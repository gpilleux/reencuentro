/**
 * Test de integración de GET /api/health por la seam de la API
 * (route handler real + Postgres real). Verifica el envelope estándar
 * y que el estado de la base venga incluido — criterio del issue #2.
 */
import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("responde 200 con envelope estándar y la base conectada", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.error).toBeNull();
    expect(body.data).toEqual({ status: "ok", database: "connected" });
  });
});
