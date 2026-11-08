"use client";

import { anadirAlCarrito, cambiarCantidad, useCarrito, useCarritoListo } from "@/lib/carrito";
import { SelectorCantidad } from "@/components/SelectorCantidad";
import { IconoMas } from "@/components/Iconos";

/** «Añadir» y, si el producto ya está en la cesta, el selector de cantidad en su lugar. */
export function AccionCesta({ slug, nombre }: { slug: string; nombre: string }) {
  const carrito = useCarrito();
  const listo = useCarritoListo();
  const linea = listo ? carrito.lineas.find((l) => l.slug === slug && l.opcion === null) : undefined;
  if (linea) {
    return (
      <SelectorCantidad
        compacto
        minimo={0}
        valor={linea.cantidad}
        alCambiar={(n) => cambiarCantidad(slug, null, n)}
        etiqueta={`Cantidad de ${nombre} en la cesta`}
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => anadirAlCarrito({ slug, nombre })}
      className="btn btn-tinta min-h-10 px-3.5 text-sm"
      aria-label={`Añadir ${nombre} a la cesta`}
    >
      <IconoMas width={16} height={16} /> Añadir
    </button>
  );
}
