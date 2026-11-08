"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { enlacesPrincipales, esRutaActiva } from "@/config/navegacion";
import { tienda } from "@/config/tienda";
import { img } from "@/lib/imagenes";
import { contarUnidades, useCarrito } from "@/lib/carrito";
import { IconoCamion, IconoCasa, IconoCesta, IconoHoja, IconoTelefono, IconoTienda } from "@/components/Iconos";

const iconos = [IconoCasa, IconoHoja, IconoTienda, IconoCamion, IconoTelefono];

/** Móvil y tableta: barra superior con logo y cesta, y pestañas fijas abajo (sin menú desplegable). */
export function BarraMovil({ avisoEnvios }: { avisoEnvios: string }) {
  const pathname = usePathname();
  const unidades = contarUnidades(useCarrito());
  return (
    <>
      <header className="no-imprimir sticky top-0 z-40 border-b border-linea bg-papel/95 backdrop-blur lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${tienda.nombre}, inicio`}>
            <Image src={img.logo} alt="" sizes="40px" className="h-10 w-auto" />
            <span className="titular text-[1.35rem]">{tienda.nombre}</span>
          </Link>
          <Link
            href="/carrito"
            className="relative inline-flex h-11 items-center gap-1.5 rounded-md border border-tinta px-3 text-sm font-semibold"
            aria-label={unidades ? `Cesta: ${unidades} ${unidades === 1 ? "producto" : "productos"}` : "Cesta vacía"}
          >
            <IconoCesta width={18} height={18} />
            <span className="tabular-nums">{unidades}</span>
          </Link>
        </div>
        {avisoEnvios && (
          <Link
            href="/envios-y-promociones"
            className="block border-t border-linea bg-salvia px-4 py-1.5 text-center text-[0.78rem] text-bosque"
          >
            {avisoEnvios}
          </Link>
        )}
      </header>

      <nav
        aria-label="Principal"
        className="no-imprimir fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-papel lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {enlacesPrincipales.map((e, i) => {
            const activa = esRutaActiva(pathname, e.href);
            const Icono = iconos[i];
            return (
              <li key={e.href}>
                <Link
                  href={e.href}
                  aria-current={activa ? "page" : undefined}
                  className={`flex h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold ${
                    activa ? "text-tinta" : "text-tinta-2"
                  }`}
                >
                  <span className={`flex h-7 w-12 items-center justify-center rounded-full ${activa ? "bg-salvia" : ""}`}>
                    <Icono width={20} height={20} />
                  </span>
                  {e.corto}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
