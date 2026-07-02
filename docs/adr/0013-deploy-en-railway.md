# Deploy en Railway (una sola plataforma)

Toda la app se despliega en **Railway**: Next.js (web + API), Postgres (con `pgvector`) y el
worker de ingesta agéntica como servicio persistente, en un solo proyecto con deploy por
`git push`.

Lo que decidió: el Agent SDK ejecuta el binario de Claude Code como subproceso (ver
[ADR-0012](0012-stack-typescript-agent-sdk.md)), así que la ingesta **no puede correr en
serverless** — eso descarta "todo en Vercel", el default natural para Next.js. Las
alternativas (Vercel + Neon/Supabase + worker aparte) obligan a operar tres plataformas, en
contra del objetivo declarado de despliegue simple ("vivo en un link rápido, un push").

## Consecuencias

- Una plataforma, un `git push`, cero orquestación multi-proveedor.
- Si a futuro se quiere el edge/CDN de Vercel para el frontend público, migrar solo el
  frontend es barato; el worker y Postgres se quedan.
- El Postgres de Railway debe tener `pgvector` habilitado desde el día uno (barato ahora,
  necesario en v1.1 para búsqueda vectorial).
