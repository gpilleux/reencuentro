import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { getEnv } from "../src/lib/env";

/**
 * Aplica las migraciones de ./drizzle contra DATABASE_URL.
 *
 * Se usa en tres contextos:
 * - Deploy (Railway): `npm run db:migrate && npm run start`
 * - CI: paso previo a los tests
 * - Tests: importado por el globalSetup de Vitest
 *
 * Es idempotente: Drizzle lleva registro de lo ya aplicado.
 */
export async function runMigrations(): Promise<void> {
  const pool = new Pool({ connectionString: getEnv().DATABASE_URL, max: 1 });
  try {
    await migrate(drizzle(pool), { migrationsFolder: "./drizzle" });
    console.log("[migrate] migraciones aplicadas");
  } finally {
    await pool.end();
  }
}

// Ejecución directa por CLI (tsx scripts/migrate.ts); al ser importado
// (p. ej. por el globalSetup de Vitest) no corre automáticamente.
const executedDirectly = process.argv[1]?.endsWith("migrate.ts") ?? false;
if (executedDirectly) {
  runMigrations().catch((error) => {
    console.error("[migrate] error aplicando migraciones:", error);
    process.exit(1);
  });
}
