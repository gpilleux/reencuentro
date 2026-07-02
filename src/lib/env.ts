import { z } from "zod";

/**
 * Validación de variables de entorno (regla del proyecto: validar en los
 * bordes y fallar rápido con mensajes claros).
 *
 * La validación es lazy (al primer uso) y no al cargar el módulo, para que
 * `next build` pueda importar las rutas sin exigir secretos en build time.
 */
const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL es requerida (ver .env.example)"),
});

export type Env = Readonly<z.infer<typeof envSchema>>;

let cachedEnv: Env | null = null;

/** Devuelve el entorno validado; lanza con detalle si falta configuración. */
export function getEnv(): Env {
  if (cachedEnv === null) {
    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
      const detail = parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new Error(`Configuración de entorno inválida — ${detail}`);
    }
    cachedEnv = parsed.data;
  }
  return cachedEnv;
}
