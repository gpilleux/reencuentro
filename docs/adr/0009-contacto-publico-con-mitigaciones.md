# Contacto público directo, con mitigaciones de bajo costo

El contacto entre un buscador y un Registro es **público y directo** (modelo A): el Registro
muestra el contacto del reportante. Lo elegimos porque las plataformas de referencia ya lo
hacen así, porque en una catástrofe la inmediatez pesa, y porque quien reporta quiere ser
contactado. Descartamos el contacto mediado por la plataforma para v1 por la infraestructura
de relay que exigiría y la fricción que agregaría al reencuentro.

Asumimos el riesgo de estafa/abuso que esto implica y lo mitigamos con medidas que **no
agregan fricción al humano real**:

- **Disclaimer concreto y prominente:** "Reencuentro nunca te pedirá dinero ni nada a cambio
  de información. Nadie legítimo lo hará. Para verificar, pide datos que solo un familiar
  sabría." (La verificación por dato-no-publicado funciona porque parte de la metadata no se
  muestra en público.)
- **Revelar el contacto al hacer clic**, no en el HTML crudo, con captcha/rate-limit liviano:
  un humano da un clic; un scraper que quiere bajar miles de teléfonos, no.
- **Nada de PII en bulk:** la API/exportación pública no entrega contactos masivamente.
- **Consentimiento + retiro:** al reportar se avisa que el contacto será público, se elige el
  canal y se puede quitar después (una Actualización que oculta el contacto, sin borrar el
  Registro).

## Menores: sin carve-out de contacto

El modelo (A) aplica **también a menores**. Reportar el paradero de un menor encontrado
—incluida la custodia privada— es **frictionless**; la app **incentiva** llevarlo a un Punto
seguro como empujón, nunca como traba (ver
[ADR-0006](0006-politica-de-menores-y-puntos-seguros.md)). El control antitráfico vive en el
protocolo presencial de verificación de custodia, fuera de alcance de la app.

## Consecuencias

- El riesgo residual de exponer la ubicación/contacto de personas vulnerables se reconoce y
  se **acepta** como decisión de valores: inmediatez y reencuentro priman.
- El reencuentro base no requiere infraestructura de notificación: el buscador ve el Registro
  y contacta directo.
