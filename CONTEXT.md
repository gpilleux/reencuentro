# Reencuentro

Lenguaje ubicuo del dominio: base de datos universal de personas desaparecidas y
encontradas tras el terremoto de Venezuela de junio de 2026. Este archivo es solo un
glosario — sin detalles de implementación.

## Language

**Registro**:
Lo que *una* fuente afirma sobre alguien en un momento dado (una fila de un Excel, una
entrada de un refugio, un "encontrado" que alguien ingresa). Es inmutable y siempre
conserva su procedencia. Nunca se borra ni se sobrescribe al consolidar.
_Avoid_: entrada, fila, ficha, record

**Persona**:
La persona real del mundo a la que pueden apuntar uno o varios Registros, agrupados sólo
cuando hay evidencia inequívoca de que son la misma. La capa de Personas es reversible y
auditable; agrupar nunca destruye Registros.
_Avoid_: individuo, sujeto, perfil

**Fuente**:
Un origen externo de Registros que se ingiere a la base universal (un archivo subido o un
link que se crawlea). Cada Fuente trae su propio esquema y formato.
_Avoid_: origen, dataset, base externa

**Procedencia**:
El rastro de origen de un Registro: de qué Fuente vino, cuándo se ingirió y bajo qué
esquema original. Permite auditar y revertir.
_Avoid_: origen, source (como campo)

**Lote de ingesta**:
El conjunto de Registros que entró a la base universal en una sola operación de ingesta de
una Fuente, con Procedencia común. Es la unidad reversible: una mala ingesta se revierte
como un todo.
_Avoid_: import, carga, batch

**Integración propuesta**:
El resultado que el agente de ingesta presenta a un humano antes de aterrizar una Fuente:
qué Registros encontró, cómo mapean al modelo, qué candidatos a duplicado hay y qué
ampliaciones del modelo propone. Nada entra a la base universal sin aprobar la Integración
propuesta.
_Avoid_: preview, propuesta (a secas), staging

**Identidad en la fuente**:
La clave estable que identifica una fila dentro de su Fuente —el ID provisto por la Fuente,
o un fingerprint (content-hash) si no hay— y que hace idempotente la re-sincronización: dos
crawls de la misma Fuente reconocen la misma línea de Registro sin duplicarla.
_Avoid_: ID (a secas), clave primaria

## Tipos de Registro

**Reporte de desaparición**:
Un Registro que afirma "esta persona está perdida, la estoy buscando".
_Avoid_: búsqueda, missing

**Reporte de hallazgo**:
Un Registro que afirma "esta persona está presente / a salvo / bajo custodia" (refugio,
hospital, ciudadano, o la propia persona auto-reportándose).
_Avoid_: encontrado, found, avistamiento (un avistamiento es una pista de baja confianza,
no un hallazgo con custodia)

**Reporte de fallecimiento**:
Un Registro que afirma el fallecimiento de una persona (morgues, listas oficiales de
víctimas). Se trata con cuidado extremo por la restricción asimétrica.
_Avoid_: muerte, deceso (como tipo)

**Actualización**:
Un Registro nuevo e inmutable que referencia y corrige/avanza a un Registro anterior
(p. ej. "ya fue dado de alta y reunido", "el reporte previo fue un error"). Nunca se
edita un Registro existente; se agrega uno que lo referencia.
_Avoid_: edición, corrección (como mutación)

## Resolución de identidad

**No Identificado (NN)**:
Una persona presente en un Reporte de hallazgo o fallecimiento de la que no se conoce el
nombre; solo se tienen atributos físicos y de contexto. Ciudadano de primera clase: se
captura, almacena y es consultable desde el día uno, aunque el auto-vínculo aún no lo
enlace.
_Avoid_: anónimo, desconocido, sin datos

**Vínculo**:
La relación no destructiva que conecta dos o más Registros que se cree son la misma
Persona. Es reversible y auditable; agrupar nunca borra ni mezcla Registros.
_Avoid_: fusión, merge (esos implican destrucción)

**Reencuentro**:
El resultado valioso de vincular un Reporte de desaparición con un Reporte de hallazgo
(o fallecimiento) de la misma Persona. Es el objetivo del producto, no un duplicado a
depurar.
_Avoid_: match (a secas)

**Cola de posibles duplicados**:
El lugar donde van los Vínculos candidatos cuya coincidencia no es inequívoca, para
revisión de mayor confianza. Ante la duda, ambos Registros se conservan y se encolan;
nunca se auto-vinculan.
_Avoid_: cola de revisión (a secas), pending merges

**Estado derivado**:
El estado actual de una Persona, *calculado* a partir de sus Registros vinculados, nunca
editado a mano: `desaparecida` → `reportado encontrado (sin confirmar)` (señal blanda del
crowd) / `posible reencuentro` (candidato en cola) → `encontrada con vida` / `fallecida`
(terminales, solo por el camino cuidadoso); más `no identificada` para un NN sin vincular.
_Avoid_: status, estado (mutable)

## Seguridad infantil

**Menor no acompañado**:
Una Persona menor de edad sin un adulto responsable identificado. "Menor de edad" es un
atributo de primera clase que gatilla la guía hacia Puntos seguros. Su búsqueda es pública;
el control antitráfico es un protocolo presencial fuera de alcance de la app.
_Avoid_: huérfano (presume fallecimiento de padres), niño perdido

**Punto seguro**:
Un lugar institucional y confiable (centro de acopio, refugio, hospital, autoridad) donde
dejar a un menor encontrado. La app mantiene un directorio simple de Puntos seguros y
encamina hacia ellos en vez de avalar custodia privada.
_Avoid_: refugio (es solo un tipo de punto seguro), centro
