# Menores: encaminar a puntos seguros, no esconder datos

Tras considerar el riesgo de tráfico de menores tras el terremoto, descartamos una primera
intuición de "ocultar la ubicación del menor encontrado": esconder datos rompe el
reencuentro legítimo (un familiar que busca a su hermano menor necesita saber dónde está).

El control real contra el tráfico es el **protocolo presencial** de verificar que quien
retira al menor es quien corresponde — eso ocurre en el punto físico de custodia y queda
**fuera del alcance de la app**. La app no puede ni debe hacerlo cumplir.

El aporte de la app a la seguridad infantil es **positivo, no restrictivo**: encaminar a
**puntos seguros**. Si alguien encuentra a un menor no acompañado, la app le indica los
puntos seguros (centros de acopio, refugios, hospitales, autoridad) donde dejarlo. Un menor
encontrado en un punto seguro **sí publica su ubicación** — "tu hermano está en el Centro
de Acopio San José" es exactamente lo que el familiar necesita.

## Consecuencias

- **"Menor de edad" es un atributo de primera clase** del núcleo canónico: alimenta
  matching, priorización y la guía de "llévalo a un punto seguro".
- **Búsqueda de un menor = pública** (alerta tipo AMBER); **hallazgo = frictionless**,
  idealmente anclado a un Punto seguro cuya ubicación se publica.
- Matiz de *recomendación*, no de bloqueo: la app empuja la custodia hacia puntos seguros
  institucionales por sobre la custodia privada, sin reintroducir fricción. Reportar el
  paradero real de un menor —incluida la custodia privada ("lo tengo yo en X")— es
  **frictionless** y usa el contacto público (modelo A, ver
  [ADR-0009](0009-contacto-publico-con-mitigaciones.md)); el Punto seguro es un empujón,
  nunca una traba. Ocultar el paradero del menor sería que la propia app sabotee el
  reencuentro.
- **v1.0 incluye un directorio de Puntos seguros** en versión mínima (lista curada: nombre
  + dirección + contacto; sin mapas), con modelo de datos diseñado para ampliarse. La
  coordinación geográfica rica (grupos de rescate por zona) queda fuera de alcance.
