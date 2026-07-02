# Corte de alcance: qué entra a v1.0, v1.1 y v2

El `CLAUDE.md` define el MVP incluyendo ingesta por archivo **y** por link. Este ADR
secuencia ese alcance: "MVP" ≠ "primer deploy vivo", y la prioridad declarada es estar
vivo en un link rápido.

**v1.0 (primer deploy):**
1. Búsqueda pública léxica (nombre + filtros; NN siempre visibles).
2. Registro crowdsourcing (desaparición/hallazgo, anónimo, contacto público — ADR-0009).
3. Directorio de Puntos seguros + atributo de menor (ADR-0006).
4. Ingesta agéntica **por archivo** (admin) con Integración propuesta (ADR-0007).
5. Cola de posibles duplicados (admin) + auto-vínculo por identificador (ADR-0004, 0011).

**v1.1 (fast-follow):** búsqueda vectorial (`pgvector` + candidato Qwen3-Embedding-0.6B,
ADR-0008) + **ingesta por link (crawling) + re-sincronización** (ADR-0010).

**v2:** búsqueda agéntica, triador agéntico de la cola, match por rasgos físicos.

## Por qué el crawling se difiere y no otra cosa

Es la pieza más difícil y peligrosa del sistema (SSRF, sandbox, HTML arbitrario,
paginación/JS, rate limiting), y la única "core" cuyo caso de uso tiene vía alternativa
mientras tanto: una base publicada en un link se puede descargar a mano y subir como
archivo. El re-sync solo existe para fuentes tipo link, así que se difiere junto con él.
Cada pieza de v1.0, en cambio, es indispensable para que el producto tenga sentido el
día uno.
