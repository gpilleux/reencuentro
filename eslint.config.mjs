import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Configuración de ESLint (flat config).
 * eslint-config-next v16 exporta flat configs nativos — se componen directo.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    // Objeto solo-ignores = ignores globales
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "coverage/**",
      "drizzle/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
