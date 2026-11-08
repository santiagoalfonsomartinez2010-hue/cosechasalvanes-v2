import type { NextConfig } from "next";
import catalogo from "./content/original/catalogo.json";

/**
 * Redirecciones permanentes (308) de las direcciones de la web de Wix a las nuevas,
 * para no perder visitas ni posicionamiento al cambiar de web.
 */
type Redireccion = { source: string; destination: string; permanent: true };

function redireccionesWix(): Redireccion[] {
  const r: Redireccion[] = [
    { source: "/about-1", destination: "/bienvenidos", permanent: true },
    { source: "/general-5", destination: "/envios-y-promociones", permanent: true },
    { source: "/contact-3", destination: "/contacto", permanent: true },
    { source: "/category/all-products", destination: "/productos", permanent: true },
  ];

  for (const c of catalogo.categorias) {
    r.push({ source: `/category/${c.slug}`, destination: `/productos?categoria=${c.slug}`, permanent: true });
  }
  // El botón VER PRODUCTOS DISPONIBLES de Wix llevaba a /category, que daba error 404.
  r.push({ source: "/category", destination: "/productos", permanent: true });

  // Fichas de producto: la dirección de Wix tal cual (con tildes) y codificada (%C3%B3…).
  const vistos = new Set<string>();
  const anadir = (source: string, destination: string) => {
    if (vistos.has(source)) return;
    vistos.add(source);
    r.push({ source, destination, permanent: true });
  };
  for (const p of catalogo.productos) {
    const destino = `/productos/${p.slug}`;
    const codificado = encodeURIComponent(p.slug_original);
    anadir(`/product-page/${p.slug_original}`, destino);
    anadir(`/product-page/${codificado}`, destino);
    anadir(`/product-page/${codificado.toLowerCase()}`, destino);
  }
  return r;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Solo WebP: se genera rápido y gasta menos transformaciones del plan de Vercel que AVIF + WebP.
    formats: ["image/webp"],
  },
  async redirects() {
    return redireccionesWix();
  },
};

export default nextConfig;
