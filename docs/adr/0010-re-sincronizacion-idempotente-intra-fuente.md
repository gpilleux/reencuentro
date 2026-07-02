# Re-sincronización idempotente, intra-fuente

El botón "descargar nuevamente" re-crawlea una Fuente-link y consolida cambios sin re-crear
lo existente. Como todo Registro es inmutable y nunca fusionamos, resolvemos la idempotencia
con dos piezas:

- **Identidad en la fuente:** cada Registro guarda una clave estable de su fila de origen —
  el ID que provea la Fuente si existe, o un fingerprint (content-hash) de la fila si no. Así
  re-crawlear no re-crea lo ya visto.
- **Cambios como Actualización:** una fila que cambió en la Fuente no edita el Registro
  previo; entra como Registro nuevo de tipo Actualización que referencia al anterior (misma
  identidad en la fuente). El Estado derivado toma el más reciente; la historia queda intacta.

Comportamiento del re-sync: sin cambios → omitir; identidad nueva → Registro nuevo; misma
identidad con contenido distinto → Actualización.

## Por qué es seguro

La idempotencia es **intra-fuente** (misma Fuente + misma identidad = misma línea de
Registro), determinista, y **no toca** la lógica de Vínculo/dedup entre fuentes. Por eso el
re-sync no puede provocar un falso merge de personas distintas — es un problema mucho más
acotado que la dedup.

## Consecuencias

- Como la Fuente ya fue validada en su primera Integración propuesta, el re-sync **auto-aplica**
  la parte intra-fuente (omitir/agregar/versionar) con menos fricción que una Fuente nueva,
  exponiendo un resumen ("N nuevos, M actualizados, K omitidos").
- Los Registros nuevos que genere el re-sync **sí** pasan por la dedup cross-source normal
  (candidatos a la Cola de posibles duplicados).
