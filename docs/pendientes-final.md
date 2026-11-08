# Pendientes finales para confirmar con el cliente

Lista de todo lo que falta por confirmar tras las Fases 2 y 6 (noviembre de 2026). Amplía `content/original/PENDIENTES.md`, que no se ha modificado. En la web, los datos sin confirmar se muestran de forma neutra («unidad por confirmar», «Foto próximamente») o marcados como **[PENDIENTE]** en los textos legales.

## 1. Imprescindible antes de abrir la web al público

- [ ] **Certificación ecológica.** La web mantiene «Producción 100% Ecológica», «Producto orgánico selecto», «Compromiso Ecológico» y el sello «100% Ecológico». En la UE «ecológico», «orgánico» y «bio» están protegidos y exigen certificación. ¿Organismo y número de operador? Si no hay certificado, hay que cambiar esos textos y el sello.
- [ ] **Datos del titular** para el aviso legal y la privacidad: nombre o razón social, NIF, dirección completa y, si es sociedad, datos del Registro Mercantil.
- [ ] **Registros sanitarios** necesarios para vender huevos y miel, y número de registro de la explotación.
- [ ] **Revisión profesional de los cuatro textos legales** (aviso legal, privacidad, cookies y condiciones de venta). Son borradores y lo dicen en un recuadro visible.
- [ ] **Política de devoluciones real**: plazo para avisar de un producto en mal estado, solución (reposición o reembolso) y quién paga la recogida si se ejerce el desistimiento en productos no perecederos.
- [ ] **Qué pasa si no hay nadie en casa** al entregar.
- [ ] **Plan de Vercel**: el gratuito (Hobby) es solo para uso no comercial; la tienda abierta necesita el plan Pro u otro alojamiento.
- [ ] **Stripe en real**: activar la cuenta con los datos del negocio y la cuenta bancaria; después poner la clave real y `STRIPE_PERMITIR_PAGOS_REALES=si` (ver `docs/despliegue.md`).
- [ ] **Dirección real del negocio.** La web usa la visible en la original (Villarejo de Salvanés, 28590), también en los datos para Google. Los datos ocultos de Wix decían Villanueva de la Cañada, 28691.

## 2. Envíos (`config/envios.ts`)

- [ ] **Códigos postales.** La web original no los daba. Se han puesto los públicos de cada municipio, comprobados en directorios de códigos postales, Wikipedia y boletines oficiales. Hay que confirmarlos todos:

  | Zona | Municipio | Códigos postales | Duda |
  |---|---|---|---|
  | Sin coste | Villarejo de Salvanés | 28590 | |
  | Sin coste | Tielmes | 28550 | |
  | Sin coste | Carabaña | 28560 | |
  | Sin coste | Villanueva de la Cañada | 28691 | Ver Villafranca del Castillo |
  | Con coste | Majadahonda | 28220, 28221, 28222 | |
  | Con coste | Pozuelo de Alarcón | 28223, 28224 | La web dice «Pozuelo»: ¿es Pozuelo de Alarcón y no Pozuelo del Rey (28813)? |
  | Con coste | Boadilla del Monte | 28660, 28668, 28669 | El 28668 solo aparece en un directorio |
  | Con coste | El Escorial | 28280 | ¿También San Lorenzo de El Escorial (28200), que es otro municipio? |
  | Con coste | Brunete | 28690 | |
  | Con coste | Villanueva del Pardillo | 28229 | Un directorio asigna el 28229 también a una urbanización de Villanueva de la Cañada |
  | Con coste | Villafranca del Castillo | 28692 | Es parte de Villanueva de la Cañada, que está en la zona sin coste. Se han separado por código postal: ¿es correcto? |

- [ ] **Envío gratis con 50 € exactos.** La página de Envíos dice «mayor a 50 €» y la barra superior de Wix decía «a partir de 50 €». La web aplica «mayor a 50 €» (con 50,00 € se cobra el envío). Se cambia en una línea (`comparacionEnvioGratis`).
- [ ] **Pedidos mínimos** de 10 € y 25 €: ¿se mantienen?
- [ ] **Envíos fuera de la Comunidad de Madrid.** La regla «fuera de Madrid a partir de 70 €» está preparada y **desactivada**, y se ha quitado de la barra superior. ¿Se envía fuera? Si es así, ¿a qué precio?
- [ ] **Plazo y días de reparto**: «hasta el jueves, entregas durante el fin de semana». ¿Sigue vigente? ¿Qué días y franjas concretos?

## 3. Catálogo

- [ ] **Unidad de venta de los 23 productos** (€/kg, €/unidad, €/docena, €/manojo, €/bote…). La web muestra «unidad por confirmar». Se añaden en `config/tienda.ts` → `unidades`.
- [ ] **Descripciones que faltan (13).** Sin texto: Ajo, Alubia Blanca, Alubia Pinta, Brócoli, Coliflor, Judión Extra, Lenteja Castellana, Lenteja Pardina y Pimiento Gordo Verde. Con texto de plantilla de Wix, descartado: Calabacín, Cebolla, Pimiento Gordo Rojo y Pimiento Italiano Verde. La web no inventa descripciones: esas fichas salen sin texto.
- [ ] **Fotos de Melón Piel de Sapo y Berenjena.** Ahora muestran un hueco con su nombre y «Foto próximamente».
- [ ] **Categoría de Patata, Ajo y Cebolla**, que en Wix solo estaban en «Todos los productos» (se asignan en `config/tienda.ts` → `categoriasExtra`).
- [ ] **¿Se mantienen las categorías de Wix** (Frutas, Huerta de Invierno, Huerta de Verano, Legumbres, Otros productos) o se prefieren Verduras y hortalizas, Legumbres, Huevos y Miel?
- [ ] **Pimiento Gordo Verde**: la opción «Tamaño» (Pequeño, Grande) al mismo precio, ¿es real? La web la mantiene.
- [ ] **Cebolla**: lleva la cinta «Más vendido» estando agotada. ¿Se mantiene?
- [ ] **Precio según el peso real**: en productos que se vendan por kg, ¿se ajusta el precio al peso entregado?

## 4. Promociones

- [ ] **Promoción Suscriptores** (20 % con cuatro o más pedidos al mes, código `PROMOSUSCRIPTORES`). ¿Se mantiene, se sustituye por el descuento de las cestas por suscripción (Fase 4) o conviven?
- [ ] **Promoción de bienvenida** (5 € en la primera compra desde 25 €, código `BIENVENIDO26`). ¿Sigue vigente? ¿Debe poder usarse también al pagar con tarjeta en la web? Ahora los códigos solo se aplican en los encargos por WhatsApp o Instagram, y la web lo dice.

## 5. Pago y pedidos

- [ ] **Método de cobro actual** y si se quiere Bizum o pago en la entrega además de tarjeta.
- [ ] **Quién revisa los pedidos** en Stripe y cómo se avisa al cliente del día de entrega. La página de confirmación dice que se le contactará para confirmar el día.
- [ ] **Stock**: no se descuenta solo. Los agotados se marcan a mano (`"disponible": false` en `content/original/catalogo.json`) hasta que exista el panel.

## 6. WhatsApp, newsletter y contacto

- [ ] **¿Cuál de los dos teléfonos tiene WhatsApp?** El botón flotante abre el +34 688 909 278 (`config/tienda.ts` → `whatsapp`).
- [ ] **Número que pasará a la API de WhatsApp** (Fase 5). Ese número no podrá usarse a la vez en la app normal de WhatsApp.
- [ ] **Newsletter**: ¿con qué herramienta? El formulario tiene la casilla de consentimiento, pero de momento no guarda emails y lo dice («Próximamente»).
- [ ] **Formulario de contacto**: ahora abre el WhatsApp o el correo del cliente con el mensaje escrito. ¿Se quiere que llegue por email directamente (necesita Resend, previsto en el stack)?

## 7. Imágenes

- [ ] **11 fotos antiguas en blanco y negro** de origen desconocido (en `conocenos-tractor.jpg` se ve la marca John Deere). ¿De dónde salen y se pueden usar?
- [ ] **Los 3 sellos** (`sello-*.png`) parecen generados con Copilot. ¿Se mantienen?
- [ ] `historia-papel-floral.jpg` **no se usa** (lleva visible la firma «Laura Ashley»).
- Las fotos de stock de Unsplash se han sustituido por fotos propias siempre que había una adecuada. Solo quedan en `public/images/` sin usar.

## 8. Dominio y salida de Wix

- [ ] ¿Qué dominio se usará? ¿Hay que comprarlo?
- [ ] Cerrar o redirigir la web de Wix cuando la nueva esté abierta, y cambiar el enlace en Instagram, Facebook y la ficha de Google.

## 9. Fases saltadas, pendientes de desarrollo

Se pasó directamente a las Fases 2 y 6. Quedan por hacer:

- **Fase 1, base de datos (Supabase):** pedidos guardados, stock con descuento automático y sin sobreventa (webhook de Stripe), zonas editables.
- **Fase 3, panel de administración** para el dueño desde el móvil: pedidos y sus estados, hoja de reparto, productos, fotos, zonas.
- **Fase 4, suscripciones** (cestas semanales o quincenales con Stripe Billing).
- **Fase 5, CRM y WhatsApp:** bandeja de conversaciones, plantillas automáticas, consentimientos RGPD.
- **Alertas al dueño** por WhatsApp y email en cada pedido y con el stock bajo.
