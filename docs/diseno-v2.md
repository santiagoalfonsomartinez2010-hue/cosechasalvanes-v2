# Versión 2: diseño alternativo para comparar

Misma tienda, mismos textos, mismas imágenes y misma lógica (carrito, envíos, pago con Stripe, redirecciones, SEO y páginas legales) que la versión 1 (repositorio `cosechasalvanes`). Lo que cambia es la disposición de todo.

| | Versión 1 | Versión 2 |
|---|---|---|
| Estilo | Natural y cálido: crema, verde, tarjetas redondeadas con sombra | «Almanaque» editorial: papel, tinta negra, líneas finas, sin sombras |
| Tipografía | Fraunces + Figtree | Instrument Serif + Inter Tight |
| Navegación en escritorio | Menú horizontal arriba | Barra lateral fija a la izquierda, con secciones numeradas y la cesta |
| Navegación en móvil | Botón de tres barras con menú | Pestañas fijas abajo (Inicio, Nosotros, Tienda, Envíos, Contacto) y la cesta arriba |
| Inicio | Secciones a todo lo ancho con fotos de fondo | Mosaico de portada; «Conócenos» como lista numerada; raíl horizontal de productos; lista grande de municipios |
| Bienvenidos | Bloques y tres columnas | Reportaje: letra capitular, cita destacada, características en zigzag y bloques foto/texto |
| Productos | Cuadrícula de tarjetas y filtro con botones | «Pizarra de precios»: filas con foto pequeña, buscador y categorías en columna (desplegable en móvil); el botón «Añadir» se convierte en selector de cantidad |
| Ficha de producto | Foto a la izquierda, datos a la derecha | Título enorme con el precio, tira de fotos a lo ancho, caja de compra y texto debajo |
| Envíos | Tarjetas de zonas y calculadora | Calculadora primero, zonas en tabla, promociones como cupones recortables con botón «Copiar código» |
| Contacto | Cabecera, datos y formulario en dos columnas | Mosaicos grandes para llamar, escribir o abrir redes, y formulario junto a la foto |
| Carrito | Una página con resumen lateral | Tres pasos: Cesta → Entrega → Pago |
| Pie | Verde oscuro | Claro, con el nombre de la marca en grande |

## Movimiento

Casi nada, a petición del cliente tras la versión 1: sin menús animados, sin apariciones al hacer scroll y sin entradas escalonadas. Solo queda un leve hundimiento al pulsar los botones (160 ms) y el aviso «Añadido a la cesta», que se funde (200 ms). Con «reducir movimiento» activado en el dispositivo, el hundimiento también desaparece.

## Dónde está cada cosa

Igual que en la versión 1: `config/tienda.ts`, `config/envios.ts` y `content/original/catalogo.json`. Los cambios de contenido hechos en una versión no pasan solos a la otra.
