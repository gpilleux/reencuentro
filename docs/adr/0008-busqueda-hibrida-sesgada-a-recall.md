# Búsqueda híbrida sesgada a recall

La búsqueda es el caso de uso #1 y hereda la restricción asimétrica **al revés** que la
dedup: aquí el error grave es **no mostrarle a un familiar a la persona que sí está**. Por
eso la búsqueda se sesga a **recall** (mejor 10 quizás que ocultar el correcto), nunca
devuelve "sin resultados" prematuramente, y consulta tanto el núcleo canónico como la
metadata abierta.

**Unidad de resultado:** una Persona (agrupando sus Registros vinculados) cuando el Vínculo
existe; Registros sueltos cuando no. Nunca se oculta un Registro por no estar vinculado
todavía (coherente con NN siempre visible).

**Tres capas, espejando el matching por fases:**

1. **Léxica** (full-text + `pg_trgm`): match exacto/difuso de tokens. Para nombres y cédulas.
2. **Vectorial/semántica** (embeddings + `pgvector`): recall por significado, **determinista
   en tiempo de consulta** (no requiere agente). Para descripciones y NN por rasgos.
3. **Agéntica** (v2): un LLM razona, re-ordena y repregunta sobre candidatos.

**Secuencia:** v1.0 = léxica (para estar vivo en un link rápido); v1.1 = se suma la
vectorial como *fast-follow*, **sin retrabajo** porque el esquema y `pgvector` ya lo
acomodan; v2 = capa agéntica encima.

## Consecuencias

- La búsqueda vectorial es puro **recall**: recupera candidatos, el humano decide. Que sea
  determinista **no** la habilita para el auto-vínculo — similitud coseno ≠ identidad (ver
  [ADR-0004](0004-politica-de-auto-vinculo.md)).
- Esto **revisa** la consecuencia del [ADR-0003](0003-postgres-fuente-de-verdad-unica.md)
  que decía "sin pipeline de embeddings en v1": ahora hay pipeline de embeddings, pero
  recién en v1.1.
- Candidato de modelo de embeddings para v1.1: **Qwen3-Embedding-0.6B** (buen desempeño en
  español, liviano, fácil de desplegar). A confirmar al implementar.
- Falta decidir, al implementar v1.1, *qué texto* se embebe (núcleo + qué campos de
  metadata).
