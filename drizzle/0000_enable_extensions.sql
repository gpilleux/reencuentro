-- Extensiones de Postgres requeridas desde el día uno (ADR-0003, issue #2):
-- pg_trgm y unaccent para la búsqueda léxica difusa de v1.0;
-- vector (pgvector) para la búsqueda semántica de v1.1 — habilitada ahora
-- para que agregarla después no requiera migración de plataforma.
CREATE EXTENSION IF NOT EXISTS pg_trgm;
--> statement-breakpoint
CREATE EXTENSION IF NOT EXISTS unaccent;
--> statement-breakpoint
CREATE EXTENSION IF NOT EXISTS vector;
