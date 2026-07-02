/**
 * Tests del envelope estándar de la API (contrato del PRD #1):
 * toda respuesta lleva indicador de éxito, payload, error y metadata
 * opcional de paginación. Solo se testea comportamiento externo.
 */
import { describe, expect, it } from "vitest";
import { apiError, apiOk } from "@/lib/api/envelope";

describe("apiOk", () => {
  it("devuelve success=true, el payload y error=null con status 200 por defecto", async () => {
    const response = apiOk({ greeting: "hola" });

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
      success: true,
      data: { greeting: "hola" },
      error: null,
    });
  });

  it("acepta un status HTTP explícito", async () => {
    const response = apiOk({ id: 1 }, { status: 201 });

    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toEqual({ id: 1 });
  });

  it("incluye metadata de paginación cuando se provee", async () => {
    const response = apiOk([1, 2, 3], {
      meta: { total: 30, page: 1, limit: 3 },
    });

    const body = await response.json();
    expect(body.meta).toEqual({ total: 30, page: 1, limit: 3 });
  });

  it("no incluye la clave meta cuando no se provee", async () => {
    const response = apiOk({ x: 1 });

    const body = await response.json();
    expect("meta" in body).toBe(false);
  });
});

describe("apiError", () => {
  it("devuelve success=false, data=null y el mensaje de error", async () => {
    const response = apiError("Algo salió mal", 500);

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body).toEqual({
      success: false,
      data: null,
      error: "Algo salió mal",
    });
  });

  it("soporta errores de cliente (4xx)", async () => {
    const response = apiError("Payload inválido", 400);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe("Payload inválido");
  });
});
