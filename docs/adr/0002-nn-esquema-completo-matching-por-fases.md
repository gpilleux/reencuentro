# Esquema NN-completo desde el día uno; matching por fases

Separamos dos decisiones que suelen confundirse: el **esquema** y el **matching**.

El **esquema** soporta No Identificados (NN) desde la primera versión: el nombre es
opcional y los atributos físicos/contextuales son ciudadanos de primera clase. Es la
decisión más difícil de revertir y la más peligrosa de postergar — hornear "nombre
obligatorio" obligaría a re-procesar fuentes y, peor, a haber descartado Registros de NN
encontrados, que es el error gravísimo que el proyecto prohíbe.

El **matching** es incremental: v1 vincula por nombre (+ atributos de desempate), de alta
precisión y fácil de validar; v2 vincula por rasgos físicos, donde está el mayor valor.
Como la búsqueda se apoya en un sistema multiagente, el match por rasgos es la evolución
natural de la misma infraestructura (un agente razona sobre descripciones), no un sistema
aparte — por eso postergarlo es de bajo riesgo.

## Consecuencias

- Regla de oro del incrementalismo seguro: en v1 los Registros NN se **ingieren,
  almacenan y son consultables/visibles** aunque el auto-vínculo no los enlace todavía.
  Se difiere el **auto-vínculo**, nunca la **captura ni la visibilidad**.
- El esquema canónico trata el nombre como opcional y da peso de primera clase a edad
  aproximada, sexo, rasgos, ropa, y lugar/fecha de hallazgo.
