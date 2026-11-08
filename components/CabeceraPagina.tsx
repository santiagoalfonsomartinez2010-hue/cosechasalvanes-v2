import type { ReactNode } from "react";

/** Cabecera editorial de página: número de sección, título grande y entradilla a la derecha. */
export function CabeceraPagina({
  numero,
  etiqueta,
  titulo,
  children,
}: {
  numero?: string;
  etiqueta: string;
  titulo: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-tinta">
      <div className="marco grid gap-6 pt-10 pb-8 md:grid-cols-12 md:items-end md:pt-16">
        <div className="md:col-span-7">
          <p className="etiqueta">
            {numero && <span className="mr-3 text-tinta">{numero}</span>}
            {etiqueta}
          </p>
          <h1 className="titular mt-3 text-[clamp(3rem,1.8rem+5vw,6rem)]">{titulo}</h1>
        </div>
        {children && <div className="parrafo md:col-span-5">{children}</div>}
      </div>
    </header>
  );
}
