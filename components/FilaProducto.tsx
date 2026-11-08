import Link from "next/link";
import type { ProductoLigero } from "@/lib/catalogo";
import { ImagenProducto } from "@/components/ImagenProducto";
import { Precio } from "@/components/Precio";
import { AccionCesta } from "@/components/AccionCesta";

/** Fila de la «pizarra» de precios de la tienda. */
export function FilaProducto({ producto, categoria, preload = false }: { producto: ProductoLigero; categoria?: string; preload?: boolean }) {
  const href = `/productos/${producto.slug}`;
  return (
    <article className="flex items-center gap-4 border-b border-linea py-4">
      <Link href={href} className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-md bg-papel-2 sm:h-24 sm:w-24" tabIndex={-1} aria-hidden>
        <ImagenProducto imagen={producto.imagen} nombre={producto.nombre} sizes="96px" compacto preload={preload} className={producto.disponible ? "" : "opacity-60 grayscale"} />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {categoria && <span className="etiqueta text-[0.62rem]">{categoria}</span>}
          {!producto.disponible && (
            <span className="rounded-sm bg-tinta px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-papel">Agotado</span>
          )}
          {producto.cinta && (
            <span className="rounded-sm bg-miel px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-tinta">{producto.cinta}</span>
          )}
        </div>
        <h3 className="titular mt-1 text-[1.6rem] leading-tight">
          <Link href={href} className="hover:underline">
            {producto.nombre}
          </Link>
        </h3>
        <div className="mt-1 text-sm">
          <Precio centimos={producto.precioCentimos} unidad={producto.unidad} />
        </div>
      </div>
      <div className="shrink-0">
        {producto.disponible && producto.opciones.length === 0 ? (
          <AccionCesta slug={producto.slug} nombre={producto.nombre} />
        ) : (
          <Link href={href} className="btn btn-linea min-h-10 px-3.5 text-sm">
            {producto.disponible ? "Elegir" : "Ver"}
          </Link>
        )}
      </div>
    </article>
  );
}
