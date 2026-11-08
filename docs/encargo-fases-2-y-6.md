# Encargo: Fases 2 y 6

Texto del encargo y decisiones tomadas hasta ahora. El contexto general está en `CLAUDE.md`. El contenido migrado de Wix está en `content/original/` y las imágenes en `public/images/`.

## Instrucción actual del usuario

Pasar directamente a las Fases 2 y 6, saltando las Fases 1, 3, 4 y 5. Trabajar en la nube. Dar un enlace de la web al terminar. Usar la skill `animate` (copiada en `.claude/skills/animate/`).

## Fase 2: tienda pública (texto del encargo)

- Todas las páginas de la web original con su contenido real e imágenes locales: Inicio, Bienvenidos, Productos (con filtro por categoría), ficha de producto, Envíos y promociones, Contacto.
- Diseño: natural y gourmet, fiel a la marca (logo, tonos tierra y verdes), mobile-first, tipografía cuidada. Que se vea claramente más profesional que la actual.
- Precio siempre con unidad. Agotados ocultos por defecto.
- Carrito, cálculo de envío por código postal y zona (gratis en Madrid desde 50 €, fuera desde 70 €), checkout con Stripe en modo test.
- Botón flotante de WhatsApp, newsletter con consentimiento, SEO (metadatos, sitemap, slugs limpios).

## Fase 6: cierre (texto del encargo)

- Páginas legales (aviso legal, privacidad, cookies, condiciones de venta) como borrador, marcadas para revisión.
- Redirecciones de las URLs antiguas de Wix a las nuevas.
- Instrucciones para desplegar en Vercel y conectar un dominio propio.
- Lista final de todo lo PENDIENTE de confirmar con el cliente.

## Decisiones ya comunicadas al usuario

Al saltar las Fases 1 y 3 no hay base de datos:

- El catálogo se lee de `content/original/catalogo.json`. El stock no se descuenta y los pedidos no se guardan en ningún panel.
- El pago necesita las claves de prueba de Stripe como variables en Vercel. Sin ellas, la web debe seguir funcionando y el botón de pagar debe explicar que el pago de prueba no está activado.
- Newsletter y contacto no guardan datos hasta que haya dónde hacerlo. La web debe decirlo con claridad y no fingir un envío correcto.

Sobre lo que sigue sin confirmar:

- **Envíos:** usar las reglas de la página de Envíos (ver `content/original/envios-y-promociones.md`). Quitar «fuera de Madrid a partir de 70€» de la barra superior y dejar esa regla implementada y desactivada en la configuración.
- **Códigos postales:** usar los públicos de cada municipio y marcarlos como pendientes de confirmar con el dueño. Comprobarlos antes de usarlos. Villafranca del Castillo pertenece a Villanueva de la Cañada y está en otra zona.
- **Unidades:** ningún producto tiene unidad. Mostrar «unidad por confirmar» y no inventar el dato.
- **Erratas:** corregirlas en la web nueva (lista en `content/original/PENDIENTES.md`). `content/original/` no se toca.
- **`historia-papel-floral.jpg`:** no usarla, porque lleva visible la firma «Laura Ashley».
- **Textos y sello de «ecológico»:** se mantienen y siguen en la lista de pendientes. Hay que confirmar la certificación antes de abrir la web al público.
- **Enlaces rotos del original:** CONSULTA CONDICIONES lleva a las promociones y VER PRODUCTOS DISPONIBLES lleva al catálogo. El correo de Contacto es cosechadesalvanes@gmail.com.
- **Textos de plantilla de Wix:** no usarlos. Un producto sin descripción no muestra texto inventado.
- **Imágenes de stock:** usarlas solo si no hay foto propia mejor. `categoria-huerta-de-verano.jpg` y `categoria-legumbres.jpg` son fotos propias aprovechables.
- **Melón y Berenjena:** no tienen foto. No usar imágenes de otro producto como si fueran suyas.

## Publicación

No crear cuentas ni escribir contraseñas o claves: las cuentas de Vercel y Stripe son del usuario. La web se publica cuando el usuario importe el repositorio en Vercel.
