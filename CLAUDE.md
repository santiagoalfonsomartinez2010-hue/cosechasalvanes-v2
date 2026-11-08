# Cosecha de Salvanés — Tienda online + panel de gestión

## Contexto
Huerta ecológica/gourmet de Villarejo de Salvanés (Madrid) que vende verduras, legumbres, miel y huevos con entrega a domicilio.
Web actual (Wix, a sustituir): https://mgomezsantanacontr.wixsite.com/cosechadesalvanes
Contacto: cosechadesalvanes@gmail.com · +34 688 909 278 · +34 620 761 482 · Instagram @cosechadesalvanes

El dueño NO es técnico: el panel de administración debe ser muy simple y usable desde el móvil.
El desarrollador trabaja desde iPad con Claude Code en la nube: nada de pasos que exijan terminal local.

## Stack
- Next.js (App Router) + TypeScript + Tailwind
- Supabase: Postgres, Auth (solo admin), Storage (fotos de productos), Row Level Security activado en todas las tablas
- Stripe: Checkout para pedidos sueltos y Billing para suscripciones (webhooks)
- WhatsApp Cloud API (Meta) para mensajes y bandeja del CRM (webhook entrante)
- Resend para emails transaccionales
- Despliegue en Vercel. Variables de entorno en `.env.example`, nunca claves en el código.

## Reglas de negocio
- Precios SIEMPRE con unidad de venta (€/kg, €/unidad, €/docena, €/manojo, €/bote).
- Envío gratis en Madrid desde 50 €; fuera de Madrid desde 70 €. Si no, coste de envío según zona.
- Zonas de reparto configurables por el dueño (código postal → zona → precio de envío → días de reparto).
- Productos agotados: ocultos del catálogo por defecto (opción de mostrarlos como "Agotado").
- Productos de temporada: activar/desactivar sin borrarlos.
- Idioma: español. Moneda: EUR. IVA incluido en precios.

## Módulos

### 1. Tienda pública
- Home (estilo natural/gourmet, fiel a la marca actual: logo, textos "Conócenos", compromiso ecológico, temporada)
- Catálogo por categorías (Verduras, Legumbres, Huevos, Miel, …), ficha de producto, carrito, checkout
- Página de zonas de envío, contacto, botón flotante de WhatsApp
- SEO: slugs limpios, metadatos, sitemap

### 2. Pedidos y stock
- Cada pedido se guarda en Supabase (cliente, líneas, total, zona, fecha de reparto, estado: pendiente → pagado → preparado → enviado → entregado / cancelado)
- El stock se descuenta al confirmarse el pago (webhook de Stripe), de forma atómica (sin sobreventa)
- Alerta al dueño (WhatsApp + email) por cada pedido nuevo y cuando un producto baja del stock mínimo

### 3. Panel de administración (/admin, login del dueño)
- Pedidos: lista filtrable, cambiar estado, hoja de reparto del día imprimible
- Productos: crear, editar, borrar, subir foto, precio, unidad, stock, stock mínimo, activo/temporada
- Clientes (CRM), suscripciones, zonas de envío, ajustes
- Mobile-first, botones grandes, cero jerga técnica

### 4. Suscripciones
- Cestas recurrentes (semanal / quincenal), p. ej. "Cesta pequeña" y "Cesta grande" con contenido según temporada
- Cobro recurrente con Stripe Billing; el cliente puede pausar, saltar una entrega o cancelar desde su enlace de gestión
- Cada ciclo genera automáticamente un pedido en el panel
- Descuento suscriptor configurable (la web actual anuncia 20 %)

### 5. CRM por WhatsApp
- Ficha de cliente: datos, dirección, zona, historial de pedidos, suscripción, etiquetas, notas
- Bandeja de conversaciones de WhatsApp dentro del panel (mensajes entrantes por webhook, respuesta desde el panel)
- Mensajes automáticos con plantillas aprobadas por Meta: pedido confirmado, sale mañana, entregado, cobro de suscripción fallido, novedades de temporada (solo a clientes con consentimiento)
- Consentimiento RGPD registrado (opt-in a WhatsApp y newsletter)

## Orden de trabajo
1. Esquema de base de datos + seed con los productos actuales de la web
2. Tienda pública + carrito + checkout Stripe + pedidos + stock
3. Panel admin (pedidos, productos, zonas)
4. Suscripciones
5. CRM + WhatsApp
6. Legal (aviso legal, privacidad, cookies, condiciones de venta), migración de dominio

## Pendiente de confirmar con el cliente
- Método de cobro actual y si quieren Bizum/pago en entrega además de tarjeta
- Días de reparto y si la cesta es cerrada o personalizable
- Unidad de venta de cada producto
- Número de WhatsApp que pasará a la API (no podrá usarse a la vez en la app normal de WhatsApp)
