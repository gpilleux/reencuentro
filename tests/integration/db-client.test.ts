/**
 * Comportamiento del cliente de base de datos: pool singleton,
 * cierre seguro (incluso sin pool creado) y acceso vía Drizzle.
 */
import { describe, expect, it } from "vitest";
import { closePool, getDb, getPool } from "@/lib/db/client";

describe("db client", () => {
  it("closePool sin pool creado no lanza (cierre idempotente)", async () => {
    await expect(closePool()).resolves.toBeUndefined();
  });

  it("getPool devuelve siempre el mismo pool (singleton) y getDb funciona", async () => {
    const first = getPool();
    const second = getPool();
    expect(first).toBe(second);

    const db = getDb();
    expect(db).toBeDefined();

    await closePool();
    // Tras cerrar, el siguiente uso crea un pool nuevo
    const third = getPool();
    expect(third).not.toBe(first);
    await closePool();
  });
});
