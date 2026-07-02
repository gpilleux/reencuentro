/**
 * Verifica que las migraciones dejen habilitadas las extensiones de Postgres
 * que el proyecto exige desde el día uno (ADR-0003, issue #2):
 * - pg_trgm y unaccent → búsqueda léxica difusa de v1.0
 * - vector (pgvector)  → búsqueda semántica de v1.1 (puerta abierta sin migración dolorosa)
 */
import { afterAll, describe, expect, it } from "vitest";
import { closePool, getPool } from "@/lib/db/client";

describe("extensiones de Postgres", () => {
  afterAll(async () => {
    await closePool();
  });

  it.each(["pg_trgm", "unaccent", "vector"])(
    "la extensión %s está habilitada",
    async (extension) => {
      const pool = getPool();
      const result = await pool.query(
        "SELECT extname FROM pg_extension WHERE extname = $1",
        [extension],
      );

      expect(result.rowCount).toBe(1);
    },
  );
});
