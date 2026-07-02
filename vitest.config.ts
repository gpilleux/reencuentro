import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Configuración de Vitest.
 * - Tests de integración corren contra un Postgres real (docker compose / CI service).
 * - globalSetup aplica las migraciones antes de la suite para que los tests
 *   sean auto-suficientes.
 * - Umbral de cobertura mínimo: 80% (regla del proyecto).
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    globalSetup: ["./tests/setup/global.ts"],
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
