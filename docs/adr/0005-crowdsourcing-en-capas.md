# Crowdsourcing en capas: fricción cero para aportar, capa cuidadosa para confirmar

Adoptamos un modelo de crowdsourcing como las plataformas existentes (anónimo, sin login,
"si lo encontraste, avísanos"), pero separando la fricción en dos capas distintas para no
violar la restricción asimétrica.

- **Capa de creación de Registros (fricción cero):** cualquiera, anónimo, aporta un
  Reporte de desaparición o de hallazgo. Siempre se acepta — perder un aporte es peor que
  recibir ruido. El Registro entra con confianza según su Procedencia (auto-reporte e
  instituciones pesan más que anónimo).
- **Señal de estado "blanda":** un Reporte de hallazgo del crowd mueve de inmediato y de
  forma visible el Estado derivado de la Persona a "reportado encontrado (sin confirmar)",
  mostrando la procedencia. Nunca borra el Reporte de desaparición ni cierra el caso; la
  Persona sigue siendo buscable y el aporte es contradecible por otro Registro.
- **Capa cuidadosa (confirmación / dedup / estados terminales):** los estados terminales
  confirmados ("encontrada con vida", "fallecida") siguen el camino de la
  [política de auto-vínculo](0004-politica-de-auto-vinculo.md): identificador único, o
  revisión humana/de confianza. El crowd lleva a "posible/reportado", nunca a un terminal.

## Consecuencias

- Nos diferenciamos de las plataformas de referencia en que **no fusionamos
  destructivamente** en moderación: vinculamos sin destruir (ver
  [ADR-0001](0001-modelo-de-dos-capas-registro-persona.md)).
- El Estado derivado de la Persona distingue señales blandas (crowd, sin confirmar) de
  estados confirmados (camino cuidadoso).
