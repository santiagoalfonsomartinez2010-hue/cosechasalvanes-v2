"use client";

import { CANTIDAD_MAXIMA } from "@/lib/carrito";
import { IconoMas, IconoMenos } from "@/components/Iconos";

export function SelectorCantidad({
  valor,
  alCambiar,
  minimo = 1,
  etiqueta,
  compacto = false,
}: {
  valor: number;
  alCambiar: (n: number) => void;
  minimo?: number;
  etiqueta: string;
  compacto?: boolean;
}) {
  const tam = compacto ? "h-10 w-10" : "h-12 w-12";
  return (
    <div className="inline-flex items-center rounded-md border border-tinta" role="group" aria-label={etiqueta}>
      <button
        type="button"
        onClick={() => alCambiar(Math.max(minimo, valor - 1))}
        disabled={valor <= minimo}
        className={`inline-flex ${tam} items-center justify-center hover:bg-papel-2 disabled:opacity-30`}
        aria-label="Quitar uno"
      >
        <IconoMenos width={16} height={16} />
      </button>
      <span className="min-w-7 text-center font-semibold tabular-nums" aria-live="polite">
        {valor}
      </span>
      <button
        type="button"
        onClick={() => alCambiar(Math.min(CANTIDAD_MAXIMA, valor + 1))}
        disabled={valor >= CANTIDAD_MAXIMA}
        className={`inline-flex ${tam} items-center justify-center hover:bg-papel-2 disabled:opacity-30`}
        aria-label="Añadir uno"
      >
        <IconoMas width={16} height={16} />
      </button>
    </div>
  );
}
