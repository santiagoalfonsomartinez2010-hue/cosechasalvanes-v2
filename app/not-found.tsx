import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/imagenes";

export default function NoEncontrada() {
  return (
    <div className="marco grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
      <div>
        <p className="etiqueta">Error 404</p>
        <h1 className="titular mt-3 text-[clamp(3.5rem,2rem+6vw,7rem)]">Esta página no existe</h1>
        <p className="parrafo mt-4 max-w-md">Puede que la dirección haya cambiado al estrenar la web nueva. Te esperamos en la tienda.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/productos" className="btn btn-tinta">
            Ver productos
          </Link>
          <Link href="/" className="btn btn-linea">
            Ir al inicio
          </Link>
        </div>
      </div>
      <Image src={img.ilustracionRabanos} alt="" sizes="160px" className="mx-auto h-56 w-auto" />
    </div>
  );
}
