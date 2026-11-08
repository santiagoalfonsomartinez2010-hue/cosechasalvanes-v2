import Link from "next/link";
import type { ProductoLigero } from "@/lib/catalogo";
import { ImagenProducto } from "@/components/ImagenProducto";
import { Precio } from "@/components/Precio";
import { AccionCesta } from "@/components/AccionCesta";

/** Tarjeta vertical del raíl horizontal de Inicio. */
export function TarjetaRail({ producto, numero }: { producto: ProductoLigero; numero: number }) {
  const href = `/productos/${producto.slug}`;
  return (
    <article className="flex flex-col">
      <Link href={href} className="relative block aspect-[3/4] overflow-hidden rounded-md bg-papel-2" tabIndex={-1} aria-hidden>
        <ImagenProducto imagen={producto.imagen} nombre={producto.nombre} sizes="240px" />
        <span className="absolute top-2 left-2 rounded-sm bg-papel px-1.5 py-0.5 text-xs font-semibold tabular-nums">
          {String(numero).padStart(2, "0")}
        </span>
      </Link>
      <h3 className="titular mt-3 text-2xl leading-tight">
        <Link href={href} className="hover:underline">
          {producto.nombre}
        </Link>
      </h3>
      <div className="mt-1 text-sm">
        <Precio centimos={producto.precioCentimos} unidad={producto.unidad} />
      </div>
      <div className="mt-3">
        <AccionCesta slug={producto.slug} nombre={producto.nombre} />
      </div>
    </article>
  );
}
