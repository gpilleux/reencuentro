import { defineConfig } from "drizzle-kit";

/**
 * Configuración de drizzle-kit (generación de migraciones).
 * Las migraciones viven en ./drizzle y se aplican con `npm run db:migrate`
 * (script programático, ver scripts/migrate.ts).
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // Solo usado por drizzle-kit en desarrollo; en runtime se valida vía src/lib/env.ts
    url: process.env.DATABASE_URL ?? "postgresql://reencuentro:reencuentro@localhost:54329/reencuentro",
  },
});
