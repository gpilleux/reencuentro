# Política de auto-vínculo: solo por identificador único

El sistema crea un Vínculo automáticamente **solo** cuando coincide un identificador único
y confiable (p. ej. cédula/documento idéntico, idealmente con un segundo campo de respaldo
que concuerde). *Todo* lo demás —incluido nombre completo idéntico, rasgos, fechas, o
cualquier similitud semántica— va a la **Cola de posibles duplicados** para revisión.

Lo decidimos así por la restricción asimétrica: en una catástrofe abundan homónimos,
errores de tipeo replicados entre Fuentes y datos parciales, de modo que "Juan Pérez" no
es evidencia de identidad. Descartamos explícitamente el auto-vínculo por *score* combinado:
promediar evidencia débil es la receta del falso positivo de fusión, agravado por una
falsa pátina de objetividad numérica.

## Consecuencias

- La similitud (incluidos embeddings/`pgvector` en v2) alimenta el **recall** —generar
  candidatos para la cola— **nunca** la decisión de vincular.
- Incluso el auto-vínculo por identificador es **reversible y auditable**: se registra qué
  regla lo disparó, porque las cédulas también se transcriben mal.
- Un **Reporte de fallecimiento** nunca se auto-vincula ni se notifica sin un humano en el
  loop, aunque haya match de documento: el daño de un falso positivo ahí es inaceptable.
- La Cola de posibles duplicados es, por diseño, parte del camino crítico: si nadie la
  revisa, no hay reencuentros. Su modelo de revisión se decide aparte.
