import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tienda } from "@/config/tienda";
import { aLigero, obtenerCategoria, obtenerProducto, obtenerProductos } from "@/lib/catalogo";
import { formatearEuros } from "@/lib/dinero";
import { textoBarraEnvios } from "@/lib/envio";
import { urlAbsoluta } from "@/lib/sitio";
import { enlaceWhatsapp } from "@/lib/whatsapp";
import { MigasDePan, type Miga } from "@/components/MigasDePan";
import { ImagenProducto } from "@/components/ImagenProducto";
import { CompraProducto } from "@/components/CompraProducto";
import { Precio } from "@/components/Precio";
import { TarjetaRail } from "@/components/TarjetaRail";
import { JsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return obtenerProductos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = obtenerProducto(slug);
  if (!p) return {};
  const precio = `${formatearEuros(p.precioCentimos)}${p.unidad ? `/${p.unidad}` : ""}`;
  const resumen = p.descripcion[0]
    ? p.descripcion[0].length > 150
      ? `${p.descripcion[0].slice(0, 147).trimEnd()}…`
      : p.descripcion[0]
    : `${p.nombre} de ${tienda.nombre} a ${precio}. Entrega a domicilio en la Comunidad de Madrid.`;
  return {
    title: p.nombre,
    description: resumen,
    alternates: { canonical: `/productos/${p.slug}` },
    openGraph: {
      title: `${p.nombre} | ${tienda.nombre}`,
      description: resumen,
      images: p.imagenes[0] ? [{ url: p.imagenes[0].src, width: p.imagenes[0].ancho, height: p.imagenes[0].alto, alt: p.nombre }] : undefined,
    },
  };
}

export default async function FichaProducto({ params }: Props) {
  const { slug } = await params;
  const producto = obtenerProducto(slug);
  if (!producto) notFound();

  const categoria = producto.categorias[0] ? obtenerCategoria(producto.categorias[0]) : undefined;
  const migas: Miga[] = [{ nombre: "Productos", href: "/productos" }];
  if (categoria) migas.push({ nombre: categoria.nombre, href: `/productos?categoria=${categoria.slug}` });
  migas.push({ nombre: producto.nombre });

  const relacionados = obtenerProductos()
    .filter((p) => p.slug !== producto.slug && p.disponible)
    .sort((a, b) => {
      const ca = a.categorias.some((c) => producto.categorias.includes(c)) ? 0 : 1;
      const cb = b.categorias.some((c) => producto.categorias.includes(c)) ? 0 : 1;
      return ca - cb || a.orden - b.orden;
    })
    .slice(0, 8);
  const avisoEnvios = textoBarraEnvios();
  const fotos = producto.imagenes.length ? producto.imagenes : [null];

  return (
    <article>
      {/* TÍTULO Y PRECIO */}
      <header className="border-b border-tinta">
        <div className="marco pt-8 pb-8 md:pt-12">
          <MigasDePan migas={migas} />
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                {categoria && <span className="etiqueta">{categoria.nombre}</span>}
                <span
                  className={`rounded-sm px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${
                    producto.disponible ? "bg-salvia text-bosque" : "bg-tinta text-papel"
                  }`}
                >
                  {producto.disponible ? "Disponible" : "Agotado"}
                </span>
                {producto.cinta && (
                  <span className="rounded-sm bg-miel px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider">{producto.cinta}</span>
                )}
              </div>
              <h1 className="titular mt-3 text-[clamp(3.2rem,1.8rem+6vw,7rem)]">{producto.nombre}</h1>
            </div>
            <div className="md:text-right">
              <Precio centimos={producto.precioCentimos} unidad={producto.unidad} tamano="grande" />
              <p className="text-xs text-tinta-2">IVA incluido.</p>
            </div>
          </div>
        </div>
      </header>

      {/* TIRA DE FOTOS */}
      <div className="marco pt-8">
        <div className={fotos.length > 1 ? "grid grid-flow-col auto-cols-[85%] gap-3 overflow-x-auto pb-2 sm:auto-cols-[48%]" : ""}>
          {fotos.map((f, i) => (
            <div key={f?.src ?? "sin-foto"} className={`relative overflow-hidden rounded-md bg-papel-2 ${fotos.length > 1 ? "aspect-square" : "aspect-[4/3] md:aspect-[16/10]"}`}>
              <ImagenProducto
                imagen={f}
                nombre={producto.nombre}
                sizes={fotos.length > 1 ? "(min-width: 640px) 40vw, 85vw" : "(min-width: 1024px) 70vw, 100vw"}
                preload={i === 0}
                className={producto.disponible ? "" : "grayscale-[40%]"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* COMPRA E INFORMACIÓN */}
      <div className="marco grid gap-10 py-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="rounded-md border border-tinta p-5 md:sticky md:top-8">
            <CompraProducto slug={producto.slug} nombre={producto.nombre} disponible={producto.disponible} opciones={producto.opciones} />
            <ul className="mt-5 space-y-2 border-t border-linea pt-4 text-sm text-tinta-2">
              {avisoEnvios && (
                <li>
                  {avisoEnvios}.{" "}
                  <Link href="/envios-y-promociones" className="vinculo">
                    Zonas
                  </Link>
                </li>
              )}
              <li>{tienda.plazoPedidos}</li>
              <li>
                <a
                  href={enlaceWhatsapp(`Hola, Cosecha de Salvanés. Tengo una pregunta sobre ${producto.nombre}:`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vinculo"
                >
                  ¿Dudas sobre este producto? Escríbenos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-8">
          {producto.descripcion.length > 0 && (
            <section aria-labelledby="descripcion">
              <h2 id="descripcion" className="etiqueta">
                Descripción
              </h2>
              <div className="mt-3 max-w-2xl space-y-4">
                {producto.descripcion.map((p, i) => (
                  <p key={i} className={`parrafo ${i === 0 ? "titular text-2xl leading-snug text-tinta" : ""}`}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}
          {producto.informacionAdicional.map((info) => (
            <section key={info.titulo} className="mt-10 border-t border-linea pt-6">
              <h2 className="etiqueta">{info.titulo}</h2>
              <div className="mt-3 space-y-4">
                {info.parrafos.map((p, i) => (
                  <p key={i} className="parrafo">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="border-t border-tinta bg-papel-2">
          <div className="marco py-12">
            <h2 className="titular text-4xl">También te puede interesar</h2>
            <div className="rail mt-8" role="list">
              {relacionados.map((p, i) => (
                <div role="listitem" key={p.slug}>
                  <TarjetaRail producto={aLigero(p)} numero={i + 1} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        datos={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: producto.nombre,
          sku: producto.slug,
          url: urlAbsoluta(`/productos/${producto.slug}`),
          ...(producto.imagenes.length ? { image: producto.imagenes.map((i) => urlAbsoluta(i.src)) } : {}),
          ...(producto.descripcion.length ? { description: producto.descripcion.join(" ") } : {}),
          ...(categoria ? { category: categoria.nombre } : {}),
          brand: { "@type": "Brand", name: tienda.nombre },
          offers: {
            "@type": "Offer",
            url: urlAbsoluta(`/productos/${producto.slug}`),
            price: (producto.precioCentimos / 100).toFixed(2),
            priceCurrency: "EUR",
            availability: producto.disponible ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            seller: { "@id": urlAbsoluta("/#negocio") },
          },
        }}
      />
    </article>
  );
}
