import type { MetadataRoute } from "next";
import { PERMITIR_INDEXAR, urlAbsoluta } from "@/lib/sitio";

/**
 * Mientras la web no tenga dominio propio (variable NEXT_PUBLIC_SITE_URL), se pide a los
 * buscadores que no la indexen: es la versión de pruebas. Ver docs/despliegue.md.
 */
export default function robots(): MetadataRoute.Robots {
  if (!PERMITIR_INDEXAR) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/carrito", "/pedido/"] }],
    sitemap: urlAbsoluta("/sitemap.xml"),
  };
}
