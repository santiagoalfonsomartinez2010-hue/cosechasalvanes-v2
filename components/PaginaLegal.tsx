import Link from "next/link";
import type { ReactNode } from "react";
import { enlacesLegales } from "@/config/navegacion";
import { MigasDePan } from "@/components/MigasDePan";

/** Marca visible para los datos que faltan por confirmar. */
export function Pendiente({ children }: { children: ReactNode }) {
  return <mark className="bg-miel/40 px-1 font-medium text-tinta [box-decoration-break:clone]">[PENDIENTE: {children}]</mark>;
}

/** Páginas legales: aviso de borrador y menú legal en columna lateral, texto a la derecha. */
export function PaginaLegal({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="marco py-10 md:py-14">
      <MigasDePan migas={[{ nombre: titulo }]} />
      <div className="mt-8 grid gap-10 md:grid-cols-12">
        <aside className="md:col-span-4">
          <div className="space-y-6 md:sticky md:top-8">
            <div role="note" className="border-2 border-tomate p-4">
              <p className="titular text-2xl text-tomate">Borrador pendiente de revisión</p>
              <p className="mt-2 text-sm leading-relaxed">
                Este texto es una propuesta y no está aprobado. Debe revisarlo un profesional antes de abrir la web al público.
                Los datos marcados como <Pendiente>…</Pendiente> faltan por confirmar con el titular.
              </p>
            </div>
            <nav aria-label="Textos legales">
              <p className="etiqueta">Textos legales</p>
              <ul className="mt-2">
                {enlacesLegales.map((e) => (
                  <li key={e.href}>
                    <Link href={e.href} className="block border-b border-linea py-2 hover:underline">
                      {e.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <article className="md:col-span-8">
          <h1 className="titular text-[clamp(2.8rem,1.8rem+4vw,5rem)]">{titulo}</h1>
          <p className="etiqueta mt-3">Borrador de noviembre de 2026</p>
          <div className="prosa mt-6">{children}</div>
        </article>
      </div>
    </div>
  );
}
