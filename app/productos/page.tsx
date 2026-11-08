import type { Metadata } from "next";
import { catalogoAjustes } from "@/config/tienda";
import { obtenerCategorias, obtenerProductos, obtenerProductosLigeros } from "@/lib/catalogo";
import { urlAbsoluta } from "@/lib/sitio";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Pizarra } from "@/components/Pizarra";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Verduras, legumbres, huevos camperos y miel de Cosecha de Salvanés. Elige tus productos de temporada y te los llevamos a casa en la Comunidad de Madrid.",
  alternates: { canonical: "/productos" },
};

export default function Productos() {
  const disponibles = obtenerProductos().filter((p) => p.disponible);
  return (
    <>
      <CabeceraPagina numero="03" etiqueta="Tienda" titulo="Todos los productos">
        Descubre la gran variedad de nuestra cosecha. Elige tus productos favoritos y déjanos entregarte lo mejor del campo
        directamente en la puerta de tu casa. Precios con IVA incluido.
      </CabeceraPagina>
      <div className="marco py-10">
        <Pizarra
          productos={obtenerProductosLigeros()}
          categorias={obtenerCategorias()}
          mostrarAgotadosPorDefecto={catalogoAjustes.mostrarAgotadosPorDefecto}
        />
      </div>
      <JsonLd
        datos={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Productos de Cosecha de Salvanés",
          itemListElement: disponibles.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: urlAbsoluta(`/productos/${p.slug}`),
            name: p.nombre,
          })),
        }}
      />
    </>
  );
}
