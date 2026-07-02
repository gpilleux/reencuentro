# Revisión de la cola: rol de confianza, no crowdsourcing

Aunque el ethos del producto es crowdsourcing, la revisión de la Cola de posibles
duplicados **no se crowdsourcea**: confirmar un Vínculo es exactamente la decisión
peligrosa (un falso positivo de fusión es el error gravísimo del dominio). El crowd aporta
Registros y señales blandas; **confirmar identidad es un rol de confianza**.

Mecánica v1:

- **Revisor = admin** (grupo chico definido a mano). Preparado para sumar organizaciones
  verificadas cuando escale.
- Cada ítem muestra los Registros candidatos **lado a lado** con toda su evidencia (núcleo +
  metadata + Procedencia) y **por qué** el sistema los propuso.
- Acciones: **confirmar Vínculo**, **rechazar** (no volver a proponer ese par) o **dejar
  pendiente**.
- Todo reversible y auditable: un Vínculo confirmado por error se deshace; queda quién hizo
  qué y cuándo.
- Casos sensibles (fallecimiento, menores) se marcan y exigen confirmación explícita
  (coherente con [ADR-0004](0004-politica-de-auto-vinculo.md)).

## Consecuencias

- El triador agéntico (pre-filtrar/priorizar la cola **proponiendo, nunca confirmando**)
  queda para v2; v1 es revisión humana directa.
- Se necesita una noción mínima de cuenta/rol de admin en v1 (el resto del producto es
  anónimo).
