/**
 * Lógica de health check, con el ping a la base inyectado como dependencia
 * para poder testear ambas ramas sin tumbar un Postgres real.
 */

export type HealthStatus = Readonly<{
  status: "ok" | "degraded";
  database: "connected" | "disconnected";
}>;

/**
 * Ejecuta el ping y traduce el resultado a un estado de salud.
 * Nunca propaga el error (el health endpoint siempre responde), pero lo
 * loguea con contexto en el servidor — regla: no tragar errores en silencio.
 */
export async function checkHealth(
  pingDatabase: () => Promise<void>,
): Promise<HealthStatus> {
  try {
    await pingDatabase();
    return { status: "ok", database: "connected" };
  } catch (error) {
    console.error("[health] fallo el ping a la base de datos:", error);
    return { status: "degraded", database: "disconnected" };
  }
}
