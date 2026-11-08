# Pendientes de la Fase 0

Web revisada el 7 de noviembre de 2026. Todo lo que no está en la web original queda aquí; no se ha inventado ningún dato.

## 1. A decidir con el dueño antes de cargar datos

### Envíos: la web se contradice

| Dónde | Qué dice |
|---|---|
| Barra superior y `CLAUDE.md` | Envío gratis en Madrid desde 50 € y fuera de Madrid desde 70 € |
| Página de Envíos | «Actualmente no realizamos envíos fuera de la Comunidad de Madrid» |

Reglas completas de la página de Envíos:

| Zona | Municipios | Pedido mínimo | Envío |
|---|---|---|---|
| Sin coste | Villarejo de Salvanés, Tielmes, Carabaña, Villanueva de la Cañada | 10 € | Gratis siempre |
| Con coste | Majadahonda, Pozuelo, Boadilla del Monte, El Escorial, Brunete, Villanueva del Pardillo, Villafranca del Castillo | 25 € | 5 €; gratis si el pedido es «mayor a 50€» |
| Resto de España | | | No se envía |

Hay que confirmar:

- [ ] ¿Se envía fuera de la Comunidad de Madrid? Si no, sobra el «fuera de Madrid a partir de 70€».
- [ ] ¿La regla vale con 50 € exactos («a partir de 50€») o solo por encima («mayor a 50€»)?
- [ ] ¿Se mantienen los pedidos mínimos de 10 € y 25 €? `CLAUDE.md` no los recoge y la tabla `zonas_envio` tendrá que guardarlos.
- [ ] Códigos postales de cada municipio: la web no los da y la nueva tienda calcula el envío por código postal.
- [ ] Villafranca del Castillo pertenece al municipio de Villanueva de la Cañada, pero están en zonas distintas. ¿Cómo se separan?
- [ ] ¿Sigue vigente el plazo? «Los pedidos se podrán encargar hasta el jueves, para así realizar las entregas durante el fin de semana.»

### «Promoción Suscriptores» no es una suscripción

La Fase 4 plantea el 20 % como descuento de las cestas por suscripción. En la web original es otra cosa: un 20 % para quien hace **cuatro pedidos o más al mes**, pidiéndolo por WhatsApp o Instagram con el código `PROMOSUSCRIPTORES`.

- [ ] ¿Se mantiene esta promoción, se sustituye por el descuento de la suscripción o conviven las dos?

### Promoción de bienvenida, que no estaba en el encargo

5 € de descuento en la primera compra de 25 € o más, solo clientes nuevos, con el código `BIENVENIDO26` por WhatsApp o Instagram.

- [ ] ¿Sigue vigente? Si es así, ¿se aplica como cupón en el pago con tarjeta?

### Sellos «ecológico»

La web dice «Producción 100% Ecológica», «Producto orgánico selecto» y usa un sello «100% Ecológico». En la UE estos términos están protegidos y exigen certificación.

- [ ] ¿Tienen certificado de agricultura ecológica? ¿Con qué organismo y número de operador? Si no lo tienen, hay que cambiar estos textos antes de publicar.

## 2. Datos que faltan en el catálogo

El catálogo tiene **23 productos**, no 22 ni los 20 de la tabla del encargo, que son los que se ven en la galería de Inicio. Los otros tres son Pimiento Gordo Verde (2,30 €, agotado), Calabacín (1,90 €, agotado) y Garbanzos (3,50 €, disponible). El sitemap de Wix confirma el total.

### Unidad de venta: faltan las 23

La web no indica la unidad de ningún producto y no se ha deducido ninguna.

| Producto | Precio | Unidad |
|---|---|---|
| Melón Piel de Sapo | 4,00 € | PENDIENTE |
| Berenjena | 4,00 € | PENDIENTE |
| Calabaza Cacahuete | 5,00 € | PENDIENTE |
| Repollo | 3,00 € | PENDIENTE |
| Espárragos Trigueros | 7,00 € | PENDIENTE |
| Miel de Flores Natural | 13,00 € | PENDIENTE |
| Patata | 4,00 € | PENDIENTE |
| Ajo | 7,00 € | PENDIENTE |
| Brócoli | 3,00 € | PENDIENTE |
| Coliflor | 3,00 € | PENDIENTE |
| Judión Extra | 7,00 € | PENDIENTE |
| Alubia Pinta | 3,50 € | PENDIENTE |
| Alubia Blanca | 3,50 € | PENDIENTE |
| Lenteja Castellana | 3,00 € | PENDIENTE |
| Lenteja Pardina | 2,80 € | PENDIENTE |
| Huevos Camperos | 3,50 € | PENDIENTE |
| Tomate de Ensalada | 2,70 € | PENDIENTE |
| Pimiento Italiano Verde | 2,30 € | PENDIENTE |
| Cebolla | 1,90 € | PENDIENTE |
| Pimiento Gordo Rojo | 2,30 € | PENDIENTE |
| Pimiento Gordo Verde | 2,30 € | PENDIENTE |
| Calabacín | 1,90 € | PENDIENTE |
| Garbanzos | 3,50 € | PENDIENTE |

### Descripción: faltan 13

- **Sin texto (9):** Ajo, Alubia Blanca, Alubia Pinta, Brócoli, Coliflor, Judión Extra, Lenteja Castellana, Lenteja Pardina, Pimiento Gordo Verde.
- **Solo con el texto de plantilla de Wix, descartado (4):** Calabacín, Cebolla, Pimiento Gordo Rojo, Pimiento Italiano Verde.

También se han descartado las secciones de plantilla «INFORMACIÓN DE PRODUCTO», «POLÍTICA DE DEVOLUCIÓN Y REEMBOLSO» e «INFORMACIÓN DEL ENVÍO» en Calabacín, Cebolla, Huevos Camperos, Pimiento Gordo Rojo, Pimiento Gordo Verde, Pimiento Italiano Verde y Tomate de Ensalada. La única información adicional real es la de Garbanzos.

- [ ] Hace falta una política de devoluciones real: la web original no tiene ninguna.

### Fotos: faltan 2

- [ ] Melón Piel de Sapo y Berenjena no tienen ninguna imagen en la web original.

### Categoría: faltan 3

Se usan las cinco categorías de Wix: Frutas, Huerta de Invierno, Huerta de Verano, Legumbres y Otros productos. Por eso Huevos Camperos y Miel de Flores Natural quedan en «Otros productos», igual que Calabaza Cacahuete y Espárragos Trigueros.

- [ ] Patata, Ajo y Cebolla solo aparecen en «Todos los productos». ¿En qué categoría van?
- [ ] ¿Se mantienen estas categorías o se prefieren las propuestas (Verduras y hortalizas, Legumbres, Huevos, Miel)?

### Otros

- [ ] Pimiento Gordo Verde tiene una opción «Tamaño» (Pequeño, Grande) al mismo precio. ¿Es real o un resto de plantilla?
- [ ] Cebolla lleva la cinta «Más vendido» estando agotada. ¿Se mantiene?

## 3. Errores del original que no se deben copiar

| Dónde | Error | Propuesta para la nueva web |
|---|---|---|
| Inicio, botón CONSULTA CONDICIONES | No lleva a ningún sitio | Enlazar a las promociones |
| Inicio, botón VER PRODUCTOS DISPONIBLES | Lleva a `/category`, que da error 404 | Enlazar al catálogo |
| Contacto, enlace del email | Apunta a `info@misitio.com`, dirección de plantilla | Usar cosechadesalvanes@gmail.com |
| Datos estructurados de la web | Dan Villanueva de la Cañada, 28691, frente a la dirección visible, Villarejo de Salvanés, 28590 | Confirmar la dirección real |
| Productos | Etiqueta «All Products» en inglés en el título y la ruta de navegación | «Todos los productos» |
| Huevos Camperos | URL `copia-de-garbanzos` | `huevos-camperos`, con redirección en la Fase 6 |

## 4. Erratas

Se conservan tal cual en `content/original/`. Con tu OK, en la Fase 2 irán corregidas.

| Página | Original | Corrección propuesta |
|---|---|---|
| Contacto | Fomrma parte de nuestra comunidad | Forma parte de nuestra comunidad |
| Envíos | Promoción suscriptroes | Promoción suscriptores |
| Envíos | Municipios con coste de envió | Municipios con coste de envío |
| Envíos | el importe mínimo para relanzar un pedido | el importe mínimo para realizar un pedido |
| Envíos | premiar a los más cuentan con nosotros | premiar a los que más cuentan con nosotros |
| Bienvenidos | se ha construído | se ha construido |
| Contacto | ¿qué necesitas? nuestro equipo | ¿Qué necesitas? Nuestro equipo |

## 5. Imágenes: derechos y uso

- [ ] **`historia-papel-floral.jpg`** lleva visible la firma «Laura Ashley». Conviene sustituirla.
- [ ] **11 fotos antiguas en blanco y negro** (marcadas en `imagenes.md`) son de origen desconocido y en `conocenos-tractor.jpg` se ve la marca John Deere. ¿De dónde salen y se pueden usar?
- [ ] **Los 3 sellos** (`sello-*.png`) parecen generados con Copilot, según el nombre de sus archivos originales. ¿Se quieren mantener?
- **7 imágenes de stock de Unsplash** (`stock-*.jpg`) con su autor en `imagenes.md`. Como pediste, solo se usarán si no hay foto propia mejor.
- **El hero original es una textura de lino**, no una foto de campo. Por eso se llama `hero-textura-lino.jpg`.
- **Fotos propias que la web apenas aprovecha:** `categoria-huerta-de-verano.jpg` y `categoria-legumbres.jpg` no se ven en ninguna página, solo están en los metadatos. Pueden servir para la nueva portada.

## 6. Pendientes de `CLAUDE.md` que siguen abiertos

- [ ] Método de cobro actual y si se quiere Bizum o pago en la entrega. Las promociones hablan de encargos por WhatsApp o Instagram, pero la web no dice cómo se cobra.
- [ ] Días de reparto concretos: la web solo dice «durante el fin de semana».
- [ ] Si la cesta es cerrada o personalizable.
- [ ] Número de WhatsApp que pasará a la API. Ese número no podrá usarse a la vez en la app normal de WhatsApp.
