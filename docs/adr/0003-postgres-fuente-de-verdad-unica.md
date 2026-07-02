# Postgres como fuente de verdad única

Usamos un único Postgres como datastore de toda la base universal, en vez de combinar
varios motores especializados.

Convergen cuatro razones: (1) `pgvector` queda disponible para el match semántico por
rasgos de v2 sin introducir un segundo datastore; (2) full-text search nativo y `pg_trgm`
cubren el match por nombre (léxico/trigram) de v1 sin dependencias extra; (3) `JSONB`
hospeda la metadata abierta del esquema híbrido (`atributos_adicionales` verbatim) junto a
un núcleo canónico en columnas tipadas e indexadas; (4) una sola pieza que operar, lo que
sirve al objetivo de despliegue simple.

## Consecuencias

- El esquema híbrido vive en una tabla: núcleo en columnas + bolsa `JSONB` para metadata.
- ~~No se construye el pipeline de embeddings en v1~~ → revisado por
  [ADR-0008](0008-busqueda-hibrida-sesgada-a-recall.md): el pipeline de embeddings entra en
  v1.1 para búsqueda vectorial. La puerta a `pgvector` queda abierta sin costo de migración.
- La elección de Postgres *gestionado* (deploy de un clic) se decide después, sin afectar
  esta decisión de motor.
