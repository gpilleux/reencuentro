/**
 * Global setup de Vitest.
 *
 * Aplica las migraciones contra la base de test antes de correr la suite,
 * para que los tests de integración sean auto-suficientes (no requieren
 * pasos manuales previos). Es idempotente: re-ejecutar no duplica nada.
 */
import { runMigrations } from "../../scripts/migrate";

export default async function setup(): Promise<void> {
  // Fallback local: si no hay DATABASE_URL definida, apuntamos al Postgres
  // de docker compose (puerto 54329). En CI la define el workflow.
  process.env.DATABASE_URL ??=
    "postgresql://reencuentro:reencuentro@localhost:54329/reencuentro";

  await runMigrations();
}
