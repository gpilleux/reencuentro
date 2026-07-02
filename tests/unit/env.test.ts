/**
 * Tests de la validación de entorno (regla: validar en los bordes,
 * fallar rápido con mensaje claro). Se re-importa el módulo en cada caso
 * para resetear el cache interno.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("getEnv", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("lanza con mensaje claro cuando falta DATABASE_URL", async () => {
    vi.stubEnv("DATABASE_URL", undefined);
    const { getEnv } = await import("@/lib/env");

    expect(() => getEnv()).toThrow(/DATABASE_URL/);
  });

  it("devuelve el entorno validado y lo cachea (misma referencia)", async () => {
    vi.stubEnv(
      "DATABASE_URL",
      "postgresql://user:pass@localhost:5432/testdb",
    );
    const { getEnv } = await import("@/lib/env");

    expect(getEnv().DATABASE_URL).toBe(
      "postgresql://user:pass@localhost:5432/testdb",
    );
    expect(getEnv()).toBe(getEnv());
  });
});
