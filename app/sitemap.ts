import type { MetadataRoute } from "next";
import { obtenerProductos } from "@/lib/catalogo";
import { urlAbsoluta } from "@/lib/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    { ruta: "/", prioridad: 1, frecuencia: "weekly" as const },
    { ruta: "/productos", prioridad: 0.9, frecuencia: "daily" as const },
    { ruta: "/envios-y-promociones", prioridad: 0.7, frecuencia: "monthly" as const },
    { ruta: "/bienvenidos", prioridad: 0.6, frecuencia: "yearly" as const },
    { ruta: "/contacto", prioridad: 0.6, frecuencia: "yearly" as const },
    { ruta: "/legal/aviso-legal", prioridad: 0.2, frecuencia: "yearly" as const },
    { ruta: "/legal/privacidad", prioridad: 0.2, frecuencia: "yearly" as const },
    { ruta: "/legal/cookies", prioridad: 0.2, frecuencia: "yearly" as const },
    { ruta: "/legal/condiciones-de-venta", prioridad: 0.3, frecuencia: "yearly" as const },
  ];
  return [
    ...paginas.map((p) => ({ url: urlAbsoluta(p.ruta), changeFrequency: p.frecuencia, priority: p.prioridad })),
    ...obtenerProductos().map((p) => ({
      url: urlAbsoluta(`/productos/${p.slug}`),
      changeFrequency: "weekly" as const,
      priority: p.disponible ? 0.8 : 0.4,
      ...(p.imagenes.length ? { images: p.imagenes.map((i) => urlAbsoluta(i.src)) } : {}),
    })),
  ];
}
