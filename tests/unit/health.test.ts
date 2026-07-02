/**
 * Tests de la lógica de health check (ambas ramas, con el ping inyectado).
 * La rama "desconectada" se cubre acá porque forzar una caída de Postgres
 * real en integración sería frágil; el cableado real se cubre en
 * tests/integration/health.route.test.ts.
 */
import { describe, expect, it } from "vitest";
import { checkHealth } from "@/lib/health";

describe("checkHealth", () => {
  it("reporta ok/connected cuando el ping a la base funciona", async () => {
    const result = await checkHealth(async () => {
      /* ping exitoso: no lanza */
    });

    expect(result).toEqual({ status: "ok", database: "connected" });
  });

  it("reporta degraded/disconnected cuando el ping lanza, sin propagar el error", async () => {
    const result = await checkHealth(async () => {
      throw new Error("connection refused");
    });

    expect(result).toEqual({ status: "degraded", database: "disconnected" });
  });
});
