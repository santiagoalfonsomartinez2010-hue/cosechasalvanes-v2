# Cosecha de Salvanés · tienda online (versión 2)

Web de la huerta Cosecha de Salvanés (Villarejo de Salvanés, Madrid), hecha con Next.js, TypeScript y Tailwind. Sustituye a la web de Wix.

Esta es la **versión 2**, un diseño alternativo para compararlo con la versión 1 (repositorio `cosechasalvanes`). Las diferencias están en [`docs/diseno-v2.md`](docs/diseno-v2.md).

- **Publicarla en Vercel, conectar el dominio y activar el pago de prueba:** [`docs/despliegue.md`](docs/despliegue.md)
- **Lo que falta por confirmar con el cliente:** [`docs/pendientes-final.md`](docs/pendientes-final.md)
- **Diseño de esta versión frente a la 1:** [`docs/diseno-v2.md`](docs/diseno-v2.md)
- **Contexto y reglas del proyecto:** [`CLAUDE.md`](CLAUDE.md) y [`docs/encargo-fases-2-y-6.md`](docs/encargo-fases-2-y-6.md)

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Datos de contacto, WhatsApp, unidades de venta | `config/tienda.ts` |
| Zonas de reparto, códigos postales y gastos de envío | `config/envios.ts` |
| Catálogo (precios, disponibilidad, descripciones) | `content/original/catalogo.json` |
| Imágenes | `public/images/` |
| Páginas | `app/` |
| Pago con Stripe Checkout | `app/api/checkout/route.ts` |
| Redirecciones desde las direcciones de Wix | `next.config.ts` |

## Comandos (solo para desarrolladores)

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run typecheck
```

Las variables de entorno están descritas en `.env.example`. Ninguna clave va en el código.
