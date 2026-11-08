import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { envios, ZONA_FUERA_DE_MADRID } from "@/config/envios";
import { tienda } from "@/config/tienda";
import { img } from "@/lib/imagenes";
import { eurosACentimos, formatearEurosCorto } from "@/lib/dinero";
import { textoUmbral, zonasActivas } from "@/lib/envio";
import { enlaceWhatsapp } from "@/lib/whatsapp";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { CalculadoraEnvio } from "@/components/CalculadoraEnvio";
import { CopiarCodigo } from "@/components/CopiarCodigo";
import { IconoInstagram, IconoWhatsapp } from "@/components/Iconos";

export const metadata: Metadata = {
  title: "Envíos y promociones",
  description: "Zonas de reparto de Cosecha de Salvanés en la Comunidad de Madrid, pedido mínimo, gastos de envío y descuentos vigentes.",
  alternates: { canonical: "/envios-y-promociones" },
};

const euros = (n: number) => formatearEurosCorto(eurosACentimos(n));

function textoZona(z: (typeof envios.zonas)[number]): string {
  if (z.costeEnvio === 0) {
    return `En estas zonas de reparto el importe mínimo para realizar un pedido ha de ser ${euros(z.pedidoMinimo)}, sin embargo no se cobrarán gastos de envío al cliente.`;
  }
  const coste = z.costeEnvio === null ? "un coste adicional a consultar" : `un coste adicional de ${euros(z.costeEnvio)}`;
  const gratis =
    z.envioGratisDesde === null
      ? ""
      : ` En los casos en que el pedido sea ${envios.comparacionEnvioGratis === "mayor" ? "mayor a" : "igual o mayor a"} ${euros(z.envioGratisDesde)} los gastos de envío serán gratuitos.`;
  return `En estas zonas de reparto el importe mínimo para realizar un pedido ha de ser ${euros(z.pedidoMinimo)}, y habrá ${coste}.${gratis}`;
}

export default function EnviosYPromociones() {
  const zonas = zonasActivas().filter((z) => z.id !== ZONA_FUERA_DE_MADRID);
  const fuera = zonasActivas().find((z) => z.id === ZONA_FUERA_DE_MADRID);
  return (
    <>
      <CabeceraPagina numero="04" etiqueta="- Entrega semanal -" titulo="Recibe tu pedido en casa">
        {tienda.plazoPedidos}
      </CabeceraPagina>

      {/* CALCULADORA + FOTO */}
      <section className="marco grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-7">
          <h2 className="titular text-5xl">¿Llegamos a tu casa?</h2>
          <p className="parrafo mt-2">Escribe tu código postal y te decimos la zona, el pedido mínimo y el envío.</p>
          <div className="mt-8">
            <CalculadoraEnvio />
          </div>
        </div>
        <div className="relative min-h-64 overflow-hidden rounded-md md:col-span-5">
          <Image src={img.patata1} alt="Patatas recién cosechadas" fill sizes="(min-width: 768px) 30vw, 100vw" placeholder="blur" preload className="object-cover" />
        </div>
      </section>

      {/* ZONAS EN TABLA */}
      <section id="zonas" className="scroll-mt-20 border-t border-tinta">
        <div className="marco py-12 md:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="etiqueta">Zonas de reparto</p>
              <h2 className="titular mt-2 text-5xl">Comunidad de Madrid</h2>
            </div>
            <Image src={img.ilustracionRamaOlivo} alt="" sizes="140px" className="hidden h-24 w-auto sm:block" />
          </div>
          <div className="mt-8 divide-y divide-tinta border-y border-tinta">
            {zonas.map((z) => (
              <div key={z.id} className="grid gap-4 py-6 md:grid-cols-12">
                <h3 className="titular text-3xl md:col-span-3">{z.nombre}</h3>
                <div className="md:col-span-6">
                  <p className="text-lg">{z.municipios.map((m) => m.nombre).join(" · ")}</p>
                  <p className="parrafo mt-2 text-sm">{textoZona(z)}</p>
                </div>
                <dl className="grid grid-cols-2 gap-4 md:col-span-3 md:grid-cols-1 md:text-right">
                  <div>
                    <dt className="etiqueta">Pedido mínimo</dt>
                    <dd className="titular text-3xl tabular-nums">{euros(z.pedidoMinimo)}</dd>
                  </div>
                  <div>
                    <dt className="etiqueta">Envío</dt>
                    <dd className="titular text-3xl">
                      {z.costeEnvio === 0 ? "Gratis" : z.costeEnvio === null ? "A consultar" : euros(z.costeEnvio)}
                    </dd>
                    {z.costeEnvio !== 0 && z.envioGratisDesde !== null && (
                      <dd className="text-xs text-tinta-2">Gratis en pedidos {textoUmbral(z.envioGratisDesde)}</dd>
                    )}
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-5">
            <Image src={img.ilustracionColesBruselas} alt="" sizes="80px" className="h-16 w-auto" />
            <p className="text-lg">
              <strong className="titular text-2xl font-normal">Resto de España.</strong>{" "}
              {fuera
                ? `También enviamos fuera de la Comunidad de Madrid${fuera.envioGratisDesde !== null ? `, con envío gratis en pedidos ${textoUmbral(fuera.envioGratisDesde)}` : ""}.`
                : envios.mensajeFueraDeMadrid}
            </p>
          </div>
        </div>
      </section>

      {/* PROMOCIONES COMO CUPONES */}
      <section id="promociones" className="scroll-mt-20 border-t border-tinta bg-papel-2">
        <div className="relative h-28 overflow-hidden border-b border-tinta sm:h-36">
          <Image src={img.bandaPepinos} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
          <p aria-hidden className="titular absolute inset-0 flex items-center justify-center bg-tinta/45 text-[clamp(2rem,1.2rem+3vw,3.6rem)] italic text-papel">
            Promo • Promo • Promo
          </p>
        </div>
        <div className="marco py-12 md:py-16">
          <p className="etiqueta">Descuentos vigentes</p>
          <p className="parrafo mt-3 max-w-2xl text-lg">
            Queremos que nuestros clientes cuenten siempre con nosotros, por ello queremos premiar a los que más cuentan con
            nosotros.
          </p>

          <div className="mt-10 space-y-8">
            <article className="cupon grid md:grid-cols-[1fr_14rem]">
              <div className="p-6 sm:p-8">
                <p className="etiqueta">Promoción temporal</p>
                <p className="titular mt-2 text-6xl">5 €</p>
                <p className="parrafo mt-3">Te regalamos 5 € de descuento en tu primera compra igual o superior a 25 €.</p>
                <p className="parrafo mt-3">
                  Para activar el descuento es necesario indicar el código «BIENVENIDO26» cuando realices el encargo a través
                  de WhatsApp o Instagram.
                </p>
                <div className="mt-5">
                  <CopiarCodigo codigo="BIENVENIDO26" />
                </div>
                <p className="mt-4 text-sm text-tinta-2">*Condiciones: Solo se aplica a clientes nuevos.</p>
              </div>
              <div className="relative hidden overflow-hidden rounded-r-[0.65rem] border-l-[1.5px] border-dashed border-tinta md:block">
                <Image src={img.promocionesCajasCampo} alt="" fill sizes="224px" placeholder="blur" className="object-cover" />
              </div>
            </article>

            <article className="cupon grid md:grid-cols-[1fr_14rem]">
              <div className="p-6 sm:p-8">
                <p className="etiqueta">Promoción suscriptores</p>
                <p className="titular mt-2 text-6xl">20%</p>
                <p className="parrafo mt-3">
                  Si haces cuatro pedidos o más durante un mes, podrás tener un 20% de descuento en todas las compras que
                  realices.
                </p>
                <p className="parrafo mt-3">Nos gusta premiar a los compradores fieles, así que no te lo pienses y aprovecha esta oportunidad.</p>
                <p className="parrafo mt-3">
                  Para aplicar el descuento, cuando quieras hacer tu próximo pedido debes mandarnos un Mensaje Directo (MD) vía
                  Instagram o a través de WhatsApp con el código «PROMOSUSCRIPTORES».
                </p>
                <div className="mt-5">
                  <CopiarCodigo codigo="PROMOSUSCRIPTORES" />
                </div>
                <p className="mt-4 text-sm text-tinta-2">
                  *Condiciones: Solo se aplica a clientes habituales que realicen como mínimo cuatro pedidos al mes.
                </p>
              </div>
              <div className="relative hidden overflow-hidden rounded-r-[0.65rem] border-l-[1.5px] border-dashed border-tinta md:block">
                <Image src={img.promocionesRecoleccion} alt="" fill sizes="224px" placeholder="blur" className="object-cover" />
              </div>
            </article>
          </div>

          <div className="mt-10 flex flex-col gap-2 sm:flex-row">
            <a href={enlaceWhatsapp("Hola, Cosecha de Salvanés. Quiero hacer un pedido con el código ")} target="_blank" rel="noopener noreferrer" className="btn btn-tinta">
              <IconoWhatsapp width={20} height={20} /> Pedir por WhatsApp
            </a>
            <a href={tienda.redes.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-linea">
              <IconoInstagram width={20} height={20} /> Escribir por Instagram
            </a>
          </div>
          <p className="mt-3 text-sm text-tinta-2">
            Los códigos de descuento se aplican en los encargos por WhatsApp o Instagram. El pago con tarjeta de la web todavía no
            admite códigos.
          </p>

          <div className="mt-14 flex items-end justify-center gap-6" aria-hidden>
            <Image src={img.ilustracionRabanos} alt="" sizes="70px" className="h-24 w-auto" />
            <Image src={img.logo} alt="" sizes="110px" className="h-28 w-auto" />
            <Image src={img.ilustracionEsparragos} alt="" sizes="70px" className="h-24 w-auto" />
          </div>
          <p className="mt-6 text-center">
            <Link href="/productos" className="btn btn-linea">
              Ver productos
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
