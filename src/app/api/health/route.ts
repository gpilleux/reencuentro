import { apiError, apiOk } from "@/lib/api/envelope";
import { getPool } from "@/lib/db/client";
import { checkHealth } from "@/lib/health";

/**
 * GET /api/health — estado de la app y de la conexión a Postgres.
 * Railway lo usa como healthcheck de deploy.
 */

// El health check consulta la base en cada request: nunca prerenderizar.
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const health = await checkHealth(async () => {
    await getPool().query("SELECT 1");
  });

  if (health.database === "connected") {
    return apiOk(health);
  }
  return apiError("La base de datos no está disponible", 503);
}
