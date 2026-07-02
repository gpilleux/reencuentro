# Modelo de dos capas: Registro vs Persona

La base universal no almacena "personas" directamente. Almacena **Registros** inmutables
—cada uno una afirmación de una sola Fuente, con su Procedencia— y, por encima, una capa
de **Personas** resueltas que agrupa Registros sólo cuando la coincidencia es inequívoca.

Lo decidimos así porque la restricción crítica del proyecto prohíbe la fusión destructiva:
ante la duda hay que conservar ambos Registros y enviarlos a revisión, nunca perder a una
persona que alguien busca. Un modelo de entidad única que fusionara al ingerir haría
imposible cumplir esa restricción. La separación Registro↔Persona hace la agrupación
reversible y auditable: agrupar es un vínculo, no una destrucción.

## Consecuencias

- La búsqueda pública opera sobre Registros, agrupándolos por Persona cuando existe el
  vínculo.
- Toda ingesta crea Registros nuevos; jamás modifica ni borra Registros existentes.
- La deduplicación produce *vínculos* (o candidatos en cola), no merges destructivos.
