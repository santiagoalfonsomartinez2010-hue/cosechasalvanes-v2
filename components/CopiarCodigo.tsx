"use client";

import { useState } from "react";
import { IconoCopiar } from "@/components/Iconos";

/** Código promocional grande con botón para copiarlo. */
export function CopiarCodigo({ codigo }: { codigo: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <code className="rounded-sm bg-tinta px-3 py-1.5 font-mono text-lg tracking-wider text-papel">{codigo}</code>
      <button
        type="button"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline underline-offset-4"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(codigo);
            setCopiado(true);
            window.setTimeout(() => setCopiado(false), 2000);
          } catch {
            setCopiado(false);
          }
        }}
      >
        <IconoCopiar width={16} height={16} />
        <span aria-live="polite">{copiado ? "Copiado" : "Copiar código"}</span>
      </button>
    </div>
  );
}
