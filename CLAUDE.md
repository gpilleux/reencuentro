# Reencuentro

Base de datos universal de personas desaparecidas y encontradas, en respuesta a la
catástrofe del **terremoto de Venezuela de junio de 2026**.

Este archivo es la fuente de verdad del *por qué* del proyecto. Se carga al inicio de
cada sesión de agente. Manténlo actualizado a medida que las decisiones se tomen
(idealmente vía los skills de ingeniería; ver `## Agent skills` más abajo cuando exista).

---

## Misión

Tras el terremoto se generaron **múltiples bases de datos dispersas** de personas
desaparecidas (planillas de hospitales, refugios, ONGs, gobierno, listas comunitarias).
Están fragmentadas, duplicadas e inconsistentes. El objetivo es **consolidarlas en una
única base de datos universal** que cualquier persona pueda consultar libremente para:

1. **Buscar** a una persona de interés (un desaparecido).
2. **Registrar** a una persona que ha sido **encontrada**, para que esa información quede
   disponible públicamente.
3. **Ingerir bases de datos externas** y fusionarlas en la base universal.

## Alcance del MVP

**Dentro de alcance (foco principal):**

- **Búsqueda** de personas dentro de la base universal (por nombre y otros atributos de interés).
- **Registro** de personas encontradas, disponibilizando la información para consulta pública.
- **Ingesta de fuentes de datos externas**, en dos modalidades:
  - **Subida de archivo** (Excel/CSV u otro formato tabular).
  - **Link/URL** que apunta a una base de datos en sí misma → el sistema **crawlea** el
    link y se trae todas las personas que existan ahí dentro.
- **Re-sincronización de fuentes**: para una fuente tipo link ya ingerida, un botón
  ("descargar nuevamente") vuelve al link, busca información nueva y **consolida** los
  cambios en la base universal sin re-crear lo ya existente.
- **Consulta pública** sin fricción (cualquier persona puede buscar).

**Fuera de alcance (por ahora):**

- Visualización en mapa / componentes geográficos. *No* es prioridad.

## Restricción crítica: deduplicación con sesgo a la seguridad

Al consolidar fuentes habrá registros que parezcan la misma persona. La estrategia de
deduplicación debe tratar **dos tipos de error de forma asimétrica**:

- **Falso positivo de fusión** (juntar/descartar como duplicados a dos personas que en
  realidad son distintas) → **ERROR GRAVÍSIMO**. Dada la magnitud de la catástrofe,
  *perder* a una persona que alguien está buscando es inaceptable.
- **Falso negativo de fusión** (dejar dos registros que sí eran la misma persona) →
  tolerable; ruido que se puede limpiar después.

Por lo tanto, el sistema **nunca debe descartar ni mezclar registros de forma destructiva
ante la duda**. La estrategia debe ser de **alta precisión en las fusiones**: cuando la
coincidencia no sea inequívoca, *conservar ambos registros* y enviarlos a una **cola de
"posibles duplicados" para revisión** (humana o de mayor confianza), en lugar de
auto-fusionar. La fusión debe ser, idealmente, **reversible/auditable**.

## Ingesta inteligente (sistema multiagente)

Cada fuente externa trae su **propio esquema** (columnas, idiomas, formatos de fecha,
campos parciales). Se contempla un **sistema multiagente** (LangGraph o Claude Code /
Claude Agent SDK — a decidir) capaz de:

1. **Entender** la base de datos adjuntada (inferir su esquema y semántica de campos).
2. **Mapear** ese esquema al **esquema canónico** de la base universal.
3. **Proponer** la integración (incluyendo candidatos a duplicado) respetando la
   restricción crítica anterior.

## Despliegue

Objetivo: que la app esté **viva en un link rápidamente** para disponibilizarla a la
gente que lo necesita. Se priorizará una **estrategia de despliegue simple** (un click /
un push). Se evaluará integrar **Sandcastle** (`github.com/mattpocock/sandcastle`) para
orquestar **agentes AFK** que trabajen issues "ready-for-agent" en sandboxes aislados.

---

## Cómo trabajamos en este repo

Este repo viene con los **skills de ingeniería de Matt Pocock** instalados en
`.claude/skills/`. El flujo previsto:

1. **`/grill-me`** — entrevista para afinar los detalles de la app (SIGUIENTE PASO).
2. **`/setup-matt-pocock-skills`** — configurar issue tracker, labels de triage y docs de
   dominio (correr una vez antes de usar `to-prd` / `to-issues` / `triage`).
3. **`/to-prd`** → **`/to-issues`** → **`/triage`** — especificar y picar el trabajo.
4. **`/tdd`** — implementar test-first; **`/diagnosing-bugs`** para bugs difíciles.
5. **Sandcastle** — lanzar agentes AFK sobre los issues "ready-for-agent".

> Si no sabes qué skill aplica en un momento dado, invoca **`/ask-matt`**.

### Principios de código (heredados de la config global del usuario)

- **Inmutabilidad**: nunca mutar; crear copias nuevas.
- **Muchos archivos pequeños** (200–400 líneas típico, 800 máx).
- **Validar en los bordes** del sistema; nunca confiar en datos externos (¡crítico aquí,
  donde ingerimos fuentes de terceros!).
- **Manejo de errores explícito**; nunca tragar errores en silencio.
- **TDD**, cobertura mínima 80%.

---

## Agent skills

### Issue tracker

Los issues y PRDs viven como **GitHub Issues** (CLI `gh`). Los **PRs externos también
entran a la cola de triage**. Ver `docs/agents/issue-tracker.md`.

### Triage labels

Vocabulario canónico por defecto (`needs-triage`, `needs-info`, `ready-for-agent`,
`ready-for-human`, `wontfix`). Ver `docs/agents/triage-labels.md`.

### Domain docs

**Single-context**: un `CONTEXT.md` + `docs/adr/` en la raíz del repo. Ver
`docs/agents/domain.md`.
