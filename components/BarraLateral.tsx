"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { enlacesPrincipales, esRutaActiva } from "@/config/navegacion";
import { tienda } from "@/config/tienda";
import { img } from "@/lib/imagenes";
import { contarUnidades, useCarrito } from "@/lib/carrito";
import { enlaceTelefono, enlaceWhatsapp } from "@/lib/whatsapp";
import { IconoCesta, IconoWhatsapp } from "@/components/Iconos";

/** Barra lateral fija (solo escritorio, desde 1024 px). */
export function BarraLateral({ avisoEnvios }: { avisoEnvios: string }) {
  const pathname = usePathname();
  const unidades = contarUnidades(useCarrito());
  return (
    <aside className="no-imprimir fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-linea bg-papel lg:flex">
      <Link href="/" className="flex items-center gap-3 border-b border-linea px-6 py-6" aria-label={`${tienda.nombre}, inicio`}>
        <Image src={img.logo} alt="" sizes="56px" className="h-14 w-auto" />
        <span className="titular text-[1.6rem] leading-[0.95]">
          Cosecha
          <br />
          de Salvanés
        </span>
      </Link>

      <nav aria-label="Principal" className="flex-1 overflow-y-auto px-3 py-5">
        <ol className="space-y-0.5">
          {enlacesPrincipales.map((e, i) => {
            const activa = esRutaActiva(pathname, e.href);
            return (
              <li key={e.href}>
                <Link
                  href={e.href}
                  aria-current={activa ? "page" : undefined}
                  className={`flex items-baseline gap-3 rounded-md px-3 py-2.5 ${
                    activa ? "bg-tinta text-papel" : "text-tinta hover:bg-papel-2"
                  }`}
                >
                  <span className={`text-xs tabular-nums ${activa ? "text-papel/60" : "text-tinta-2"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="titular text-[1.45rem]">{e.texto}</span>
                </Link>
              </li>
            );
          })}
        </ol>
        <Link
          href="/carrito"
          aria-current={pathname === "/carrito" ? "page" : undefined}
          className="mt-5 flex items-center justify-between rounded-md border border-tinta px-4 py-3 font-semibold hover:bg-tinta hover:text-papel"
        >
          <span className="flex items-center gap-2">
            <IconoCesta width={20} height={20} /> Cesta
          </span>
          <span className="tabular-nums">{unidades}</span>
        </Link>
      </nav>

      <div className="space-y-3 border-t border-linea px-6 py-5 text-sm text-tinta-2">
        {avisoEnvios && (
          <Link href="/envios-y-promociones" className="block leading-snug text-bosque hover:underline">
            {avisoEnvios}.
          </Link>
        )}
        <div className="flex flex-col">
          {tienda.telefonos.map((t) => (
            <a key={t} href={enlaceTelefono(t)} className="hover:text-tinta">
              {t}
            </a>
          ))}
        </div>
        <a
          href={enlaceWhatsapp("Hola, Cosecha de Salvanés. Tengo una consulta:")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold text-tinta hover:underline"
        >
          <IconoWhatsapp width={18} height={18} /> WhatsApp
        </a>
      </div>
    </aside>
  );
}
