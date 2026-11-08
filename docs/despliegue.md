# Publicar la web en Vercel (sin terminal) · versión 2

Todo se hace desde el navegador o el iPad. Nadie tiene que instalar nada.

## 0. Antes de empezar: el código tiene que estar en `main`

Vercel publica la rama `main` del repositorio de la versión 2 (`cosechasalvanes-v2`). Si el trabajo está en un *pull request* (PR) sin fusionar:

1. Abre el PR en GitHub.
2. Baja hasta el final y pulsa **Merge pull request** y después **Confirm merge**.

## 1. Publicar por primera vez

1. Entra en [vercel.com](https://vercel.com) y pulsa **Continue with GitHub** (entrar con GitHub).
2. Pulsa **Add New…** → **Project**.
3. En la lista de repositorios, busca **cosechasalvanes-v2** y pulsa **Import**.
   - Si no aparece, pulsa **Adjust GitHub App Permissions** y da acceso a ese repositorio.
4. En la pantalla siguiente no cambies nada: Vercel detecta solo que es una web Next.js.
5. Pulsa **Deploy** y espera uno o dos minutos.
6. Vercel te da el enlace de la web, del estilo `https://cosechasalvanes-v2.vercel.app`.

Desde ese momento, **cada cambio que se guarde en `main` se publica solo** en uno o dos minutos.

> **Plan Hobby (gratuito): solo para uso personal y no comercial.** Una tienda que vende es un uso comercial. Sirve para ver y revisar la web, pero antes de abrir la tienda al público hay que pasar el proyecto al plan **Pro** (de pago) desde **Settings → Billing**, o alojar la web en otro sitio. Consulta el precio actual en [vercel.com/pricing](https://vercel.com/pricing).

## 2. Activar el pago de prueba con tarjeta (Stripe)

Sin este paso la web funciona igual, pero el botón de pagar avisa de que el pago de prueba no está activado y ofrece enviar el pedido por WhatsApp.

1. Crea una cuenta gratuita en [stripe.com](https://stripe.com). Para pagos de prueba no hace falta dar datos bancarios.
2. En el panel de Stripe, comprueba que estás en **modo de prueba** (interruptor o «entorno de prueba» arriba a la derecha).
3. Ve a **Desarrolladores → Claves de API** y copia la **clave secreta**. Empieza por `sk_test_`.
4. En Vercel, abre el proyecto → **Settings** → **Environment Variables**:
   - **Key:** `STRIPE_SECRET_KEY`
   - **Value:** pega la clave `sk_test_…`
   - Pulsa **Save**.
5. Ve a **Deployments**, abre los tres puntos (⋯) del último despliegue y pulsa **Redeploy**. Las variables solo se aplican al volver a publicar.
6. Prueba una compra con la tarjeta de prueba **4242 4242 4242 4242**, cualquier fecha futura y cualquier CVC. No se cobra nada.

**Dónde se ven los pedidos.** Todavía no hay panel de pedidos (se saltaron las Fases 1 y 3). Cada pago aparece en Stripe → **Pagos**. En el detalle, el apartado **Metadatos** tiene el nombre, teléfono, dirección, código postal, municipio, notas y la lista de productos. Conviene activar en Stripe los avisos por email de pagos nuevos.

**Lo que todavía no hace la web:** no descuenta stock (los agotados se marcan a mano, ver abajo), no guarda los pedidos en ningún panel y no avisa por WhatsApp.

### Pasar a pagos reales (cuando todo esté revisado)

1. Activa la cuenta de Stripe con los datos del negocio y la cuenta bancaria.
2. Cambia `STRIPE_SECRET_KEY` por la clave real (`sk_live_…`).
3. Añade la variable `STRIPE_PERMITIR_PAGOS_REALES` con el valor `si`. Sin ella, la web no cobra con claves reales: es un seguro para no cobrar por error antes de tiempo.
4. **Redeploy**.

## 3. Conectar un dominio propio

1. Si aún no tenéis dominio, compradlo en un registrador (por ejemplo DonDominio, IONOS o Arsys) o desde Vercel (**Domains → Buy**).
2. En Vercel: proyecto → **Settings** → **Domains** → escribe el dominio (por ejemplo `cosechadesalvanes.es`) → **Add**. Acepta la opción recomendada de añadir también `www` y redirigir uno al otro.
3. Vercel muestra los **registros DNS** que hay que crear. Copia esos valores exactamente en el panel DNS del registrador donde compraste el dominio (normalmente un registro **A** para el dominio y un **CNAME** para `www`). La otra opción es cambiar los *nameservers* del dominio a los que indique Vercel.
4. Espera a que Vercel marque el dominio como válido (de minutos a 48 horas). El certificado HTTPS se pone solo.
5. Añade la variable `NEXT_PUBLIC_SITE_URL` con la dirección definitiva, sin barra al final (por ejemplo `https://www.cosechadesalvanes.es`) y haz **Redeploy**. Con esto:
   - el `sitemap.xml`, las direcciones canónicas y los datos para Google usan el dominio bueno;
   - **la web se deja indexar en Google.** Mientras esta variable esté vacía, la web pide a los buscadores que no la indexen, porque es la versión de pruebas.
6. En [Google Search Console](https://search.google.com/search-console) añade el dominio y envía el sitemap: `https://www.tudominio.es/sitemap.xml`.

## 4. Dejar Wix

- La web nueva ya redirige las direcciones antiguas de Wix (`/about-1`, `/general-5`, `/contact-3`, `/category/…` y `/product-page/…`) a las nuevas. Esto funciona en el dominio nuevo. La dirección `mgomezsantanacontr.wixsite.com` es de Wix y no se puede redirigir desde aquí.
- Cuando la web nueva esté abierta, poned en la de Wix un aviso con el enlace a la nueva (o despublicadla) para no tener dos webs con el mismo contenido.
- Cambiad el enlace de la web en Instagram, Facebook, WhatsApp Business y la ficha de Google.
- Comprobación rápida: abrid `https://www.tudominio.es/about-1` y debe llevar a **Bienvenidos**.

## 5. Cambiar contenidos sin programar

Desde GitHub en el navegador: abre el archivo, pulsa el **lápiz** (Edit), cambia el texto y pulsa **Commit changes**. Vercel publica el cambio solo.

| Qué quieres cambiar | Archivo |
|---|---|
| Teléfonos, email, WhatsApp, redes, plazo de pedidos | `config/tienda.ts` |
| Unidad de venta de cada producto (kg, unidad, docena…) | `config/tienda.ts` → `unidades` |
| Mostrar u ocultar los agotados por defecto | `config/tienda.ts` → `mostrarAgotadosPorDefecto` |
| Zonas de reparto, códigos postales, pedido mínimo, gastos de envío | `config/envios.ts` |
| Activar el envío fuera de Madrid | `config/envios.ts` → zona `fuera-de-madrid` → `activa: true` y su `costeEnvio` |
| Precio o disponibilidad de un producto (agotado = `"disponible": false`) | `content/original/catalogo.json` |

Cuando exista el panel de administración (Fase 3), productos, stock y zonas se cambiarán desde el móvil sin tocar archivos.

## 6. Comprobaciones después de publicar

- [ ] Se abren Inicio, Bienvenidos, Productos, una ficha, Envíos y promociones, Contacto, Carrito y las cuatro páginas legales.
- [ ] El código postal 28590 da envío gratis con mínimo 10 €, y el 28220 envío de 5 € con mínimo 25 €.
- [ ] El botón verde de WhatsApp abre el chat con el número correcto.
- [ ] Con la clave de prueba, una compra con la tarjeta 4242… llega a la página de «¡Gracias por tu pedido!» y aparece en Stripe.
- [ ] `/sitemap.xml` y `/robots.txt` se abren.
