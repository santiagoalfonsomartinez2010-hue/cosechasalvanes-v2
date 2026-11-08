import type { Metadata } from "next";
import Image from "next/image";
import { tienda } from "@/config/tienda";
import { img } from "@/lib/imagenes";
import { enlaceTelefono, enlaceWhatsapp } from "@/lib/whatsapp";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { FormularioContacto } from "@/components/FormularioContacto";
import { IconoCorreo, IconoFacebook, IconoFlecha, IconoInstagram, IconoTelefono, IconoUbicacion, IconoWhatsapp } from "@/components/Iconos";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Cosecha de Salvanés: disponibilidad de productos, horarios de entrega o zonas de reparto. Villarejo de Salvanés, 28590, Madrid.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  const { direccion } = tienda;
  const telefonos = [...tienda.telefonos].reverse();
  const mosaicos = [
    { titulo: "Teléfono", lineas: [telefonos[0]], href: enlaceTelefono(telefonos[0]), Icono: IconoTelefono, externo: false },
    { titulo: "Teléfono", lineas: [telefonos[1]], href: enlaceTelefono(telefonos[1]), Icono: IconoTelefono, externo: false },
    { titulo: "Email", lineas: [tienda.email], href: `mailto:${tienda.email}`, Icono: IconoCorreo, externo: false },
    { titulo: "WhatsApp", lineas: ["Escríbenos"], href: enlaceWhatsapp("Hola, Cosecha de Salvanés. Tengo una consulta:"), Icono: IconoWhatsapp, externo: true },
    { titulo: "Instagram", lineas: [tienda.redes.instagramUsuario], href: tienda.redes.instagram, Icono: IconoInstagram, externo: true },
    { titulo: "Facebook", lineas: ["Cosecha de Salvanés"], href: tienda.redes.facebook, Icono: IconoFacebook, externo: true },
  ];
  return (
    <>
      <CabeceraPagina numero="05" etiqueta="Contacto" titulo="Contacto">
        <p>
          Estamos aquí para ayudarte. ¿Qué necesitas? Nuestro equipo de soporte se pondrá en contacto contigo de inmediato.
        </p>
        <p className="mt-3">
          Quedamos a tu disposición para cualquier consulta que quieras realizarnos ya sea sobre disponibilidad de productos,
          horarios de entrega, zonas de reparto o cualquier otra cuestión.
        </p>
      </CabeceraPagina>

      {/* MOSAICOS DE CONTACTO */}
      <section className="marco py-10">
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {mosaicos.map(({ titulo, lineas, href, Icono, externo }) => (
            <li key={href}>
              <a
                href={href}
                {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full min-h-36 flex-col justify-between rounded-md border border-tinta p-4 hover:bg-tinta hover:text-papel sm:p-5"
              >
                <span className="flex items-center justify-between">
                  <Icono width={24} height={24} />
                  <IconoFlecha width={16} height={16} />
                </span>
                <span>
                  <span className="etiqueta block text-current opacity-70">{titulo}</span>
                  {lineas.map((l) => (
                    <span key={l} className="titular mt-1 block break-all text-2xl leading-tight sm:break-normal">
                      {l}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center gap-4 rounded-md bg-papel-2 p-4 sm:p-5">
          <IconoUbicacion width={24} height={24} className="shrink-0" />
          <p className="flex-1">
            <span className="etiqueta block">Dirección</span>
            {direccion.localidad}, {direccion.codigoPostal}, {direccion.provincia}, {direccion.pais}.
          </p>
          <Image src={img.ilustracionVerduras3} alt="" sizes="60px" className="hidden h-24 w-auto sm:block" />
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md">
            <Image src={img.contactoMercado} alt="" fill sizes="80px" placeholder="blur" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ATENCIÓN PERSONALIZADA + FORMULARIO */}
      <section className="border-t border-tinta">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-72 md:min-h-full">
            <Image src={img.bandaColes} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/80 to-transparent p-6 pt-20 text-papel">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-papel/80">- Atención personalizada -</p>
              <p className="titular mt-2 text-4xl italic">Estamos a tu entera disposición</p>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <h2 className="titular text-5xl">Escríbenos</h2>
            <div className="mt-8">
              <FormularioContacto />
            </div>
          </div>
        </div>
      </section>

      {/* COMUNIDAD */}
      <section className="border-t border-tinta bg-bosque text-papel">
        <div className="marco grid gap-8 py-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-2">
            <Image src={img.logo} alt="" sizes="96px" className="h-24 w-auto" />
          </div>
          <div className="md:col-span-7">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-papel/70">- Forma parte de nuestra comunidad -</p>
            <h2 className="titular mt-2 text-5xl">Únete a un nuevo estilo de consumo</h2>
            <p className="mt-4 leading-relaxed text-papel/85">
              También puedes formar parte de nuestra comunidad de WhatsApp. De este modo estarás al día sobre los horarios de
              entrega y de reparto, las novedades de la semana y también podrás conocer de primera mano cualquier información
              adicional de gran interés, por lo que te recomendamos que te unas.
            </p>
          </div>
          <div className="md:col-span-3 md:text-right">
            <a href={tienda.redes.grupoWhatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-papel w-full md:w-auto">
              <IconoWhatsapp width={20} height={20} /> Quiero formar parte del grupo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
