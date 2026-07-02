import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { getEnv } from "@/lib/env";
import * as schema from "@/lib/db/schema";

/**
 * Cliente de base de datos: pool de pg como singleton lazy del proceso
 * (patrón estándar en Next.js para no abrir un pool por request),
 * con Drizzle encima para acceso tipado cuando exista esquema de dominio.
 */
let pool: Pool | null = null;

/** Devuelve el pool compartido, creándolo en el primer uso. */
export function getPool(): Pool {
  if (pool === null) {
    pool = new Pool({ connectionString: getEnv().DATABASE_URL });
  }
  return pool;
}

/** Instancia de Drizzle sobre el pool compartido. */
export function getDb() {
  return drizzle(getPool(), { schema });
}

/** Cierra el pool (usado por tests y apagados controlados). */
export async function closePool(): Promise<void> {
  if (pool !== null) {
    await pool.end();
    pool = null;
  }
}
