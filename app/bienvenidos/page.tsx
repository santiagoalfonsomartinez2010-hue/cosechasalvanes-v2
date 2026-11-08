import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { tienda } from "@/config/tienda";
import { img } from "@/lib/imagenes";
import { IconoFacebook, IconoFlecha, IconoInstagram, IconoWhatsapp } from "@/components/Iconos";

export const metadata: Metadata = {
  title: "Bienvenidos",
  description:
    "Cosecha de Salvanés nace del deseo de volver a lo auténtico y de rescatar los sabores de siempre. Producción local de la Comarca de Las Vegas, regada con el agua del río Tajuña.",
  alternates: { canonical: "/bienvenidos" },
};

const caracteristicas = [
  {
    titulo: "Producto orgánico selecto",
    texto:
      "Nos encargamos de seleccionar cuidadosamente todas las hortalizas y las verduras de temporada que producimos en nuestra huerta, buscando siempre la máxima calidad y preservando los sabores originarios de cada alimento.",
    foto: img.bienvenidosProductoOrganico,
  },
  {
    titulo: "Precio competitivo",
    texto:
      "Comer fruta y verdura es accesible para cualquier familia. En Cosecha de Salvanés, calidad y precio encuentran un punto de equilibrio, con el objetivo de diferenciarnos, y de desmentir el mito de que los productos ecológicos y saludables son «caros».",
    foto: img.bienvenidosPrecioCompetitivo,
  },
  {
    titulo: "Envío a domicilio",
    texto:
      "Queremos acercar la producción de la huerta y facilitar la compra rutinaria de verdura, por lo que nuestra marca se diferencia por un servicio de entrega semanal de verdura fresca de la manera más eficiente y sencilla.",
    foto: img.bienvenidosEnvioDomicilio,
  },
];

function Dividido({ imagen, etiqueta, titulo, invertido = false }: { imagen: StaticImageData; etiqueta: string; titulo: string; invertido?: boolean }) {
  return (
    <section className="grid border-y border-tinta md:grid-cols-2">
      <div className={`relative min-h-64 md:min-h-[26rem] ${invertido ? "md:order-2" : ""}`}>
        <Image src={imagen} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center bg-papel-2 p-8 sm:p-12">
        <p className="etiqueta">- {etiqueta} -</p>
        <h2 className="titular mt-4 text-[clamp(2.6rem,1.8rem+3vw,4.4rem)] italic">{titulo}</h2>
      </div>
    </section>
  );
}

export default function Bienvenidos() {
  return (
    <article>
      {/* PRESENTACIÓN */}
      <header className="marco pt-10 pb-12 md:pt-16">
        <p className="etiqueta">Bienvenidos</p>
        <h1 className="titular mt-4 text-[clamp(4rem,2rem+9vw,9rem)]">¡Bienvenido!</h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7 md:columns-2 md:gap-8">
            <p className="parrafo first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-tinta">
              Cosecha de Salvanés es una iniciativa que nace del deseo de volver a lo auténtico y de rescatar los sabores de
              siempre, esos que nos conectan con la tierra y con nuestras raíces.
            </p>
            <p className="parrafo mt-4">
              De esta manera, también pretendemos poner en valor el enorme trabajo que hay detrás de la producción agraria
              nacional.
            </p>
            <p className="parrafo mt-4">
              Creemos en mirar al origen para entender el presente. Por eso, nuestra misión es acercar los orígenes del
              sector primario a quienes, poco a poco, se han ido alejando de él. Porque lo esencial no debería olvidarse,
              sino redescubrirse.
            </p>
          </div>
          <figure className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image src={img.coliflor1} alt="Coliflor recién cogida en la huerta" fill sizes="(min-width: 768px) 36vw, 100vw" placeholder="blur" preload className="object-cover" />
            </div>
          </figure>
        </div>
        <blockquote className="titular mt-14 border-l-2 border-tinta pl-6 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] italic">
          «Porque lo esencial no debería olvidarse, sino redescubrirse.»
        </blockquote>
      </header>

      {/* CARACTERÍSTICAS EN ZIGZAG */}
      <section className="border-t border-tinta">
        <div className="marco py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <p className="etiqueta">Características de nuestros servicios</p>
              <Image src={img.logo} alt="" sizes="80px" className="mt-5 h-20 w-auto" />
            </div>
            <p className="parrafo md:col-span-6">
              Nuestra producción local proviene de la Comarca Madrileña de «Las Vegas». Cultivamos en el Sureste de la
              Comunidad, aprovechando el agua del río Tajuña para que nuestras verduras crezcan como ningunas.
            </p>
          </div>
          <div className="mt-12 space-y-12 md:space-y-0">
            {caracteristicas.map((c, i) => (
              <div key={c.titulo} className="grid items-center gap-6 md:grid-cols-2 md:gap-14 md:py-8">
                <div className={`relative aspect-[3/2] overflow-hidden rounded-md ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={c.foto} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" className="object-cover" />
                </div>
                <div>
                  <span className="titular text-6xl text-oliva">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="titular mt-2 text-4xl">{c.titulo}</h3>
                  <p className="parrafo mt-3">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 hidden justify-center gap-6 md:flex" aria-hidden>
            <Image src={img.ilustracionTomatesRama} alt="" sizes="100px" className="h-20 w-auto" />
            <Image src={img.ilustracionVerduras1} alt="" sizes="100px" className="h-28 w-auto" />
          </div>
        </div>
      </section>

      <Dividido imagen={img.bandaCebollas} etiqueta="Cultivado como antiguamente" titulo="Conoce los sabores más tradicionales" />

      {/* REDES */}
      <section className="marco py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="etiqueta">Síguenos en RR.SS.</p>
            <p className="parrafo mt-4 text-lg">
              Si quieres conocer de primera mano todas las novedades, no dudes en seguirnos en nuestra cuenta{" "}
              <a href={tienda.redes.instagram} target="_blank" rel="noopener noreferrer" className="vinculo text-tinta">
                {tienda.redes.instagramUsuario}
              </a>
              .
            </p>
            <div className="mt-6 flex items-end gap-4" aria-hidden>
              <Image src={img.ilustracionCitrico} alt="" sizes="70px" className="h-16 w-auto" />
              <Image src={img.ilustracionVerduras2} alt="" sizes="120px" className="h-36 w-auto" />
            </div>
          </div>
          <ul className="grid gap-2 sm:grid-cols-3 md:col-span-7">
            {[
              { href: tienda.redes.grupoWhatsapp, texto: "Grupo de WhatsApp", Icono: IconoWhatsapp },
              { href: tienda.redes.instagram, texto: "Instagram", Icono: IconoInstagram },
              { href: tienda.redes.facebook, texto: "Facebook", Icono: IconoFacebook },
            ].map(({ href, texto, Icono }) => (
              <li key={texto}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full min-h-32 flex-col justify-between rounded-md border border-tinta p-5 hover:bg-tinta hover:text-papel"
                >
                  <Icono width={26} height={26} />
                  <span className="flex items-center justify-between gap-2 font-semibold">
                    {texto} <IconoFlecha width={16} height={16} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Dividido imagen={img.huevosCamperos1} etiqueta="Producción 100% Ecológica" titulo="Respetamos los tiempos de la naturaleza" invertido />

      {/* HISTORIA */}
      <section className="marco py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="etiqueta">Nuestra historia</p>
          <h2 className="titular mt-4 text-[clamp(2.4rem,1.7rem+2.8vw,4rem)]">¿Quién hay detrás de Cosecha de Salvanés?</h2>
          <p className="parrafo mt-6 text-lg">
            Este proyecto es una iniciativa de una pareja de jóvenes con una misma inquietud: que la esencia de lo
            tradicional no se pierda.
          </p>
          <p className="parrafo mt-4 text-lg">
            Movidos por el respeto por el campo, la admiración por quienes lo trabajan y el amor por un estilo de vida que
            merece ser reconocido y preservado, se ha construido este maravilloso negocio.
          </p>
          <Image src={img.ilustracionVerduras3} alt="" sizes="160px" className="mx-auto mt-10 h-56 w-auto" />
          <Link href="/productos" className="btn btn-tinta mt-10">
            Ver productos
          </Link>
        </div>
      </section>
    </article>
  );
}
