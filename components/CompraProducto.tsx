"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { anadirAlCarrito } from "@/lib/carrito";
import { enlaceWhatsapp } from "@/lib/whatsapp";
import { SelectorCantidad } from "@/components/SelectorCantidad";
import { IconoWhatsapp } from "@/components/Iconos";

export function CompraProducto({
  slug,
  nombre,
  disponible,
  opciones,
}: {
  slug: string;
  nombre: string;
  disponible: boolean;
  opciones: { nombre: string; valores: string[] }[];
}) {
  const id = useId();
  const [cantidad, setCantidad] = useState(1);
  const opcion = opciones[0];
  const [valorOpcion, setValorOpcion] = useState(opcion?.valores[0] ?? "");

  if (!disponible) {
    return (
      <div className="space-y-4">
        <p className="titular text-3xl">Agotado ahora mismo</p>
        {opcion && (
          <p className="text-sm text-tinta-2">
            {opcion.nombre}: {opcion.valores.join(", ")}.
          </p>
        )}
        <a
          href={enlaceWhatsapp(`Hola, Cosecha de Salvanés. ¿Cuándo volveréis a tener ${nombre}?`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-linea w-full"
        >
          <IconoWhatsapp width={20} height={20} /> Pregúntanos cuándo vuelve
        </a>
        <Link href="/productos" className="vinculo block text-sm">
          Ver productos disponibles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {opcion && (
        <div>
          <label htmlFor={`${id}-opcion`} className="etiqueta">
            {opcion.nombre}
          </label>
          <select id={`${id}-opcion`} value={valorOpcion} onChange={(e) => setValorOpcion(e.target.value)} className="entrada mt-1 bg-papel">
            {opcion.valores.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex items-center gap-3">
        <SelectorCantidad valor={cantidad} alCambiar={setCantidad} etiqueta="Cantidad" />
        <button
          type="button"
          onClick={() => anadirAlCarrito({ slug, nombre }, cantidad, opcion ? valorOpcion : null)}
          className="btn btn-tinta flex-1"
        >
          Añadir a la cesta
        </button>
      </div>
    </div>
  );
}
