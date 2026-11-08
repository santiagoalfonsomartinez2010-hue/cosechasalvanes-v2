import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { tienda } from "@/config/tienda";
import { img } from "@/lib/imagenes";
import { aLigero, obtenerProductos } from "@/lib/catalogo";
import { zonasActivas } from "@/lib/envio";
import { ZONA_FUERA_DE_MADRID } from "@/config/envios";
import { TarjetaRail } from "@/components/TarjetaRail";
import { IconoFlecha } from "@/components/Iconos";

export const metadata: Metadata = {
  title: { absolute: "Cosecha de Salvanés | Huerta gourmet en Villarejo de Salvanés" },
  alternates: { canonical: "/" },
};

const valores = [
  {
    titulo: "Compromiso Ecológico",
    texto: "Practicamos un modelo de agricultura sostenible que protege el medio ambiente y apoya la biodiversidad.",
    foto: img.conocenosTractor,
    sello: img.sello100Ecologico,
    selloAlt: "Sello 100% Ecológico",
  },
  {
    titulo: "Calidad Gourmet y Cercanía",
    texto:
      "Cada producto es cuidadosamente seleccionado para garantizar sabores excepcionales, y además, nos encargamos de que éstos sean entregados en los domicilios de nuestros clientes.",
    foto: img.conocenosSiembra,
    sello: img.selloCalidadGourmet,
    selloAlt: "Sello Calidad Gourmet",
  },
  {
    titulo: "Variedad de Temporada",
    texto: "Ofrecemos únicamente los productos que la tierra nos regala en cada estación, respetando los ritmos de la naturaleza.",
    foto: img.conocenosCaballos,
    sello: img.selloProduccionNacional,
    selloAlt: "Sello Producción Nacional",
  },
];

export default function Inicio() {
  const disponibles = obtenerProductos().filter((p) => p.disponible);
  const municipios = zonasActivas()
    .filter((z) => z.id !== ZONA_FUERA_DE_MADRID)
    .flatMap((z) => z.municipios.map((m) => m.nombre));

  return (
    <>
      {/* MOSAICO DE PORTADA */}
      <section className="marco pt-4 pb-12 sm:pt-8 lg:pt-10">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:grid-rows-[minmax(15rem,auto)_minmax(15rem,auto)_13rem]">
          <div className="col-span-2 flex flex-col justify-between rounded-md border border-tinta p-6 sm:p-8 lg:row-span-2">
            <p className="etiqueta">Villarejo de Salvanés · Madrid</p>
            <div>
              <h1 className="titular mt-8 text-[clamp(2.9rem,1.6rem+5vw,5.2rem)]">
                Desde el corazón de la tierra <em>hasta tu mesa.</em>
              </h1>
              <p className="parrafo mt-5 max-w-lg">
                Trabajamos para ofrecerte productos de temporada que combinan la pureza de lo ecológico con el toque más
                sofisticado del mundo gourmet.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="/productos" className="btn btn-tinta">
                  Ver productos <IconoFlecha width={18} height={18} />
                </Link>
                <Link href="/bienvenidos" className="btn btn-linea">
                  Saber más
                </Link>
              </div>
            </div>
          </div>
          <div className="relative row-span-2 min-h-72 overflow-hidden rounded-md lg:min-h-0">
            <Image
              src={img.categoriaHuertaDeVerano}
              alt="Tomates, calabacines y bolsas de Cosecha de Salvanés sobre la hierba"
              fill
              sizes="(min-width: 1024px) 22vw, 50vw"
              placeholder="blur"
              preload
              className="object-cover"
            />
          </div>
          <div className="relative min-h-36 overflow-hidden rounded-md lg:min-h-0">
            <Image src={img.huevosCamperos1} alt="Cesta de huevos camperos" fill sizes="(min-width: 1024px) 22vw, 50vw" placeholder="blur" className="object-cover" />
          </div>
          <Link
            href="/envios-y-promociones#promociones"
            className="group flex min-h-36 flex-col justify-between rounded-md bg-tomate p-5 text-papel lg:min-h-0"
          >
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-papel/80">- Promoción Suscriptores -</span>
            <span>
              <span className="titular block text-[2.6rem] leading-none sm:text-5xl">20%</span>
              <span className="block text-sm">de descuento en tu compra</span>
              <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wider underline underline-offset-4">
                Consulta condiciones
              </span>
            </span>
          </Link>
          <div className="relative col-span-2 min-h-44 overflow-hidden rounded-md lg:min-h-0">
            <Image src={img.categoriaLegumbres} alt="Bolsas de garbanzos, lentejas y alubias" fill sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" className="object-cover" />
          </div>
          <div className="flex items-center justify-center rounded-md bg-papel-2 p-4">
            <Image src={img.logo} alt={tienda.nombre} sizes="160px" className="h-28 w-auto sm:h-36" />
          </div>
          <div className="flex flex-col justify-end rounded-md bg-bosque p-5 text-papel">
            <p className="titular text-3xl">Entrega a domicilio</p>
            <p className="mt-2 text-sm text-papel/80">{tienda.plazoPedidos}</p>
          </div>
        </div>
      </section>

      {/* CONÓCENOS */}
      <section className="border-t border-tinta">
        <div className="marco grid gap-10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-10">
              <p className="etiqueta">01 · Conócenos</p>
              <h2 className="titular mt-3 text-6xl">Conócenos</h2>
              <p className="parrafo mt-5">
                En Cosecha de Salvanés, creemos que lo extraordinario se cultiva con paciencia. Nuestra pasión por los
                productos de temporada ecológicos y gourmet nace del amor por la tierra, el respeto por el medio ambiente y
                el compromiso de llevar a tu mesa los alimentos de la más alta calidad al mejor precio.
              </p>
            </div>
          </div>
          <ol className="md:col-span-7">
            {valores.map((v, i) => (
              <li key={v.titulo} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-linea py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr_9rem]">
                <span className="titular text-3xl text-oliva">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="titular text-3xl">{v.titulo}</h3>
                  <p className="parrafo mt-2 text-base">{v.texto}</p>
                </div>
                <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-md sm:col-span-1 sm:aspect-square">
                  <Image src={v.foto} alt="" fill sizes="(min-width: 640px) 144px, 100vw" placeholder="blur" className="object-cover" />
                  <div className="absolute right-1.5 bottom-1.5 h-14 w-14 rounded-full bg-papel p-1.5">
                    <Image src={v.sello} alt={v.selloAlt} sizes="56px" className="h-full w-full object-contain" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SELECCIÓN DE TEMPORADA */}
      <section className="border-t border-tinta bg-papel-2">
        <div className="marco py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="etiqueta">02 · Selección de temporada</p>
              <h2 className="titular mt-3 text-[clamp(2.6rem,1.8rem+3vw,4.2rem)]">Lo más destacado de esta temporada</h2>
            </div>
            <div className="md:col-span-5">
              <p className="parrafo text-base">
                Descubre la gran variedad de nuestra cosecha. Navega por nuestra tienda online, elige tus productos
                favoritos y déjanos entregarte lo mejor del campo directamente en la puerta de tu casa.
              </p>
              <Link href="/productos" className="vinculo mt-3 inline-flex items-center gap-2 font-semibold">
                Ver productos disponibles <IconoFlecha width={16} height={16} />
              </Link>
            </div>
          </div>
          <div className="rail mt-10" role="list" aria-label="Productos disponibles">
            {disponibles.map((p, i) => (
              <div role="listitem" key={p.slug}>
                <TarjetaRail producto={aLigero(p)} numero={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPARTO */}
      <section className="border-t border-tinta">
        <div className="marco grid gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="etiqueta">03 · Reparto</p>
            <p className="parrafo mt-4 text-lg">
              Estamos trabajando en abastecer los máximos rincones posibles. Pronto llegaremos a todas vuestras casas. Os
              iremos informando de todas las novedades al respecto a través de RR.SS.
            </p>
            <Link href="/envios-y-promociones" className="btn btn-tinta mt-6">
              Consulta las zonas de envío
            </Link>
            <div className="mt-8 grid grid-cols-2 gap-2">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image src={img.reparto1} alt="" fill sizes="(min-width: 768px) 20vw, 45vw" placeholder="blur" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image src={img.reparto2} alt="" fill sizes="(min-width: 768px) 20vw, 45vw" placeholder="blur" className="object-cover" />
              </div>
            </div>
          </div>
          <div>
            <p className="etiqueta">Hoy repartimos en</p>
            <ul className="mt-4">
              {municipios.map((m) => (
                <li key={m} className="titular border-b border-linea py-2 text-[clamp(1.7rem,1.3rem+1.4vw,2.4rem)]">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="bg-bosque text-papel">
        <div className="marco flex flex-col items-start gap-6 py-16 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-papel/70">- Del campo a tu mesa -</p>
            <p className="titular mt-3 text-[clamp(3rem,2rem+4vw,5.5rem)] italic">Entrega a domicilio</p>
          </div>
          <Link href="/productos" className="btn btn-papel">
            Hacer mi pedido <IconoFlecha width={18} height={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
