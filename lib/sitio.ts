/**
 * Dirección pública de la web.
 * - Con dominio propio: define NEXT_PUBLIC_SITE_URL en Vercel (p. ej. https://www.cosechadesalvanes.es).
 * - Sin ella, se usa la dirección .vercel.app que Vercel da al proyecto.
 */
function calcularUrl(): string {
  const propia = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (propia) return propia.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const URL_SITIO = calcularUrl();

/**
 * La web solo se deja indexar en Google cuando tiene dominio propio (NEXT_PUBLIC_SITE_URL).
 * Así la versión de pruebas en .vercel.app no aparece en buscadores mientras quedan
 * pendientes los textos legales y la certificación ecológica.
 */
export const PERMITIR_INDEXAR = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());

export function urlAbsoluta(ruta: string): string {
  return `${URL_SITIO}${ruta.startsWith("/") ? ruta : `/${ruta}`}`;
}
