"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { escucharAvisos, type AvisoAnadido } from "@/lib/carrito";
import { IconoCerrar } from "@/components/Iconos";

/** Aviso «Añadido a la cesta». Arriba en el móvil (bajo la barra) y abajo a la izquierda en escritorio. */
export function AvisoCarrito() {
  const [aviso, setAviso] = useState<AvisoAnadido | null>(null);
  const [visible, setVisible] = useState(false);
  const temporizador = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(
    () =>
      escucharAvisos((nuevo) => {
        setAviso(nuevo);
        setVisible(true);
        if (temporizador.current !== null) window.clearTimeout(temporizador.current);
        temporizador.current = window.setTimeout(() => setVisible(false), 3500);
      }),
    [],
  );
  useEffect(() => setVisible(false), [pathname]);

  return (
    <div
      className="aviso no-imprimir fixed inset-x-3 top-[4.5rem] z-50 lg:top-auto lg:right-auto lg:bottom-6 lg:left-[17rem] lg:w-96"
      data-visible={visible}
      aria-hidden={!visible}
    >
      <div role="status" aria-live="polite" className="flex items-center gap-3 rounded-md border border-tinta bg-papel px-4 py-3 shadow-lg shadow-tinta/10">
        <p className="min-w-0 flex-1 text-sm">
          {aviso && (
            <>
              <strong>{aviso.nombre}</strong>
              {aviso.cantidad > 1 ? ` (×${aviso.cantidad})` : ""} añadido a la cesta.
            </>
          )}
        </p>
        <Link href="/carrito" tabIndex={visible ? 0 : -1} className="shrink-0 text-sm font-semibold underline underline-offset-2">
          Ver cesta
        </Link>
        <button
          type="button"
          onClick={() => setVisible(false)}
          tabIndex={visible ? 0 : -1}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-papel-2"
          aria-label="Cerrar aviso"
        >
          <IconoCerrar width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
