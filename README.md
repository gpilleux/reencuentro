# Reencuentro

> Base de datos universal de personas desaparecidas y encontradas — respuesta a la
> catástrofe del terremoto de Venezuela (junio de 2026).

Consolida bases de datos dispersas de personas desaparecidas en una sola base consultable
públicamente. Permite **buscar** desaparecidos, **registrar** personas encontradas e
**ingerir** fuentes externas (Excel/CSV o crawling de un link), fusionándolas sin perder a
nadie.

El *por qué*, el alcance y las restricciones del proyecto viven en [`CLAUDE.md`](./CLAUDE.md).

## Estado

Esqueleto andante en marcha (issue #2): Next.js + TypeScript + Postgres, con CI y deploy
en Railway. El diseño vive en [`CONTEXT.md`](./CONTEXT.md) (glosario del dominio) y
[`docs/adr/`](./docs/adr) (decisiones de arquitectura). El trabajo está picado en issues
`ready-for-agent` (ver [PRD #1](https://github.com/gpilleux/reencuentro/issues/1)).

## Desarrollo local

Requisitos: Node 22+, Docker.

```bash
npm install                    # dependencias
docker compose up -d db        # Postgres local (pgvector, puerto 54329)
cp .env.example .env           # configuración local
npm run db:migrate             # aplicar migraciones
npm run dev                    # http://localhost:3000
```

Verificación (lo mismo que corre el CI):

```bash
npm run lint                   # ESLint
npm run typecheck              # TypeScript
npm test                       # tests (aplican migraciones solos)
npm run test:coverage          # tests + cobertura mínima 80%
```

Convención de código: identificadores en inglés; comentarios y docstrings en español.
Los tests de integración corren contra el Postgres de docker compose — la seam de
testing es la API HTTP (ver *Testing Decisions* del PRD #1).

## Deploy (Railway)

El repo trae [`railway.json`](./railway.json): las migraciones corren antes del start y
`/api/health` es el healthcheck. Setup una sola vez: crear proyecto en Railway desde este
repo de GitHub + agregar el servicio de Postgres (con soporte pgvector) + exponer
`DATABASE_URL` al servicio web. Después, cada push a `main` despliega.

## Cómo trabajar aquí

Este repo trae instalados los *engineering skills* de Matt Pocock en `.claude/skills/`.
Ver la sección "Cómo trabajamos en este repo" de [`CLAUDE.md`](./CLAUDE.md).
