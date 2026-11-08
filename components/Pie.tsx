import Link from "next/link";
import { enlacesLegales, enlacesPrincipales } from "@/config/navegacion";
import { tienda } from "@/config/tienda";
import { enlaceTelefono } from "@/lib/whatsapp";
import { Newsletter } from "@/components/Newsletter";

export function Pie() {
  const { direccion } = tienda;
  return (
    <footer className="no-imprimir mt-auto border-t border-tinta bg-papel-2">
      <div className="marco grid gap-12 py-14 md:grid-cols-2">
        <Newsletter />
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="etiqueta">Datos de contacto</p>
            <address className="mt-3 space-y-2 not-italic text-tinta">
              <p>
                {direccion.localidad}, {direccion.codigoPostal},
                <br />
                {direccion.provincia}, {direccion.pais}.
              </p>
              <p>
                <a href={`mailto:${tienda.email}`} className="vinculo break-all">
                  {tienda.email}
                </a>
              </p>
              <p className="flex flex-col">
                {tienda.telefonos.map((t, i) => (
                  <a key={t} href={enlaceTelefono(t)} className="vinculo">
                    {i === 0 ? "Tel: " : ""}
                    {t}
                  </a>
                ))}
              </p>
            </address>
            <ul className="mt-5 space-y-1.5">
              <li>
                <a href={tienda.redes.grupoWhatsapp} target="_blank" rel="noopener noreferrer" className="vinculo">
                  Grupo de WhatsApp
                </a>
              </li>
              <li>
                <a href={tienda.redes.instagram} target="_blank" rel="noopener noreferrer" className="vinculo">
                  Instagram
                </a>
              </li>
              <li>
                <a href={tienda.redes.facebook} target="_blank" rel="noopener noreferrer" className="vinculo">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="etiqueta">Páginas</p>
            <ul className="mt-3 space-y-1.5">
              {enlacesPrincipales.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="hover:underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="etiqueta mt-6">Legal</p>
            <ul className="mt-3 space-y-1.5">
              {enlacesLegales.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="hover:underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="marco overflow-hidden border-t border-linea pt-6 pb-28 lg:pb-8">
        <p aria-hidden className="titular whitespace-nowrap text-[clamp(3rem,10.5vw,8.5rem)] leading-[0.85] text-tinta">
          Cosecha de Salvanés
        </p>
        <p className="mt-4 text-xs text-tinta-2">
          © {new Date().getFullYear()} {tienda.nombre}. Precios con IVA incluido.
        </p>
      </div>
    </footer>
  );
}
