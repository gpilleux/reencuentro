# Ingesta de dos velocidades: el agente propone, el modelo evoluciona con ratificación humana

El sistema multiagente de ingesta es innegociable y es el pilar diferenciador: distintas
fuentes con esquemas propios deben converger en un modelo coherente. El riesgo es la
mutabilidad: si el agente puede inventar entidades/contextos al vuelo, el modelo de dominio
se disuelve y se pierde la coherencia que hace que "¿es la misma persona?" tenga respuesta.

Distinguimos dos niveles de "ampliar el modelo":

- **Atributos nuevos sobre entidades existentes** (p. ej. una lista de admisiones de
  hospital → Registros de hallazgo) → la metadata abierta los captura sin pérdida; campos
  promovibles a canónico se **proponen** (ver
  [ADR-0002](0002-nn-esquema-completo-matching-por-fases.md) y el esquema híbrido).
- **Un tipo de entidad / dominio completamente nuevo** (p. ej. "organizaciones en puntos
  geográficos" = coordinación de rescate) → el modelo actual no tiene casa para eso.

Resolución: un sistema de **dos velocidades**.

- **Vía rápida (runtime, por lote, aprobada por humano):** el agente clasifica la fuente
  contra un catálogo de contextos conocidos. Si calza, mapea y emite una Integración
  propuesta. Atributos nuevos → metadata.
- **Vía lenta (evolución del modelo, liderada por humano):** si la fuente describe un tipo
  de cosa sin casa, el agente **no la inventa** — detecta el hueco y **propone un contexto
  nuevo**, gatillando una sesión de domain-modeling (glosario + ADR). Ratificado por un
  humano, esa fuente pasa a vía rápida.

## Consecuencias

- El agente **nunca** crea entidades/contextos ni ejecuta DDL de forma autónoma. El modelo
  crece por pasos deliberados y auditados.
- Reencuentro probablemente se vuelva **multi-contexto** (`CONTEXT-MAP.md`) cuando se
  ratifique el primer contexto nuevo (p. ej. coordinación de rescate). El MVP es
  single-context.
- El agente hace barata la vía lenta (redacta el análisis y el contexto propuesto), pero no
  se salta la ratificación.
