/**
 * Envelope estándar de la API (contrato del PRD #1): toda respuesta lleva
 * indicador de éxito, payload, mensaje de error y metadata opcional de
 * paginación. Los helpers construyen objetos nuevos (inmutabilidad).
 */

/** Metadata de paginación para respuestas de listado. */
export type PaginationMeta = Readonly<{
  total: number;
  page: number;
  limit: number;
}>;

export type ApiEnvelope<T> = Readonly<{
  success: boolean;
  data: T | null;
  error: string | null;
  meta?: PaginationMeta;
}>;

type OkOptions = Readonly<{
  status?: number;
  meta?: PaginationMeta;
}>;

/** Respuesta exitosa con el envelope estándar. */
export function apiOk<T>(data: T, options: OkOptions = {}): Response {
  const { status = 200, meta } = options;
  const body: ApiEnvelope<T> =
    meta === undefined
      ? { success: true, data, error: null }
      : { success: true, data, error: null, meta };
  return Response.json(body, { status });
}

/** Respuesta de error con el envelope estándar (mensaje apto para UI). */
export function apiError(error: string, status: number): Response {
  const body: ApiEnvelope<never> = { success: false, data: null, error };
  return Response.json(body, { status });
}
