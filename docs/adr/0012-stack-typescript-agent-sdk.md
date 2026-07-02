# Stack: TypeScript end-to-end con Next.js y Claude Agent SDK

Un solo lenguaje en todo el repo: **Next.js** (web + API) y **Claude Agent SDK** (TypeScript)
para el sistema multiagente de ingesta. Descartamos Python/LangGraph para los agentes.

Razones: (1) el pipeline de ingesta que diseñamos es "agente con herramientas y compuertas
humanas" (Integración propuesta), el sweet spot del Agent SDK, no un grafo determinista
complejo que justifique LangGraph; (2) un solo lenguaje reduce superficie para un equipo
chico y los agentes AFK (Sandcastle/Claude Code) trabajan mejor en un monolito coherente;
(3) el flujo del proyecto ya vive en el ecosistema Claude Code; (4) parsing de Excel/CSV en
TS está bien cubierto (SheetJS/papaparse).

## Autenticación del Agent SDK

- El SDK acepta `ANTHROPIC_API_KEY` **o** credenciales de suscripción Claude Code Pro/Max
  (`claude setup-token` → `CLAUDE_CODE_OAUTH_TOKEN`).
- ToS de Anthropic: **prohibido** ofrecer login/rate limits de claude.ai a usuarios finales
  de un producto. La distinción práctica:
  - **Ingesta admin-gated (v1):** disparada por el admin bajo su cuenta → viable con
    suscripción (comparte rate limits con el uso interactivo del CLI).
  - **Funcionalidad agéntica pública (v2, búsqueda para usuarios):** requiere API key con
    billing.
- Cambiar de suscripción a API key es un env var, cero refactor — el código es idéntico.

## Consecuencias

- El Agent SDK ejecuta el binario de Claude Code como subproceso → el runtime de ingesta
  necesita un proceso persistente (container/VM), **no** serverless/edge. Condiciona la
  elección de plataforma de deploy.
- Next.js sirve web y API; la ingesta agéntica corre como proceso/worker aparte o ruta de
  larga duración según la plataforma elegida.
