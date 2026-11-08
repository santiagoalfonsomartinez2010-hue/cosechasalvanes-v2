import Image from "next/image";
import type { ImagenProducto as TipoImagen } from "@/lib/catalogo";

/** Foto del producto o, si no tiene (Melón, Berenjena), un hueco neutro con su nombre. Nunca otra foto. */
export function ImagenProducto({
  imagen,
  nombre,
  sizes,
  className = "",
  preload = false,
  cargaInmediata = false,
  compacto = false,
}: {
  imagen: TipoImagen | null;
  nombre: string;
  sizes: string;
  className?: string;
  preload?: boolean;
  cargaInmediata?: boolean;
  /** Para miniaturas: solo «Sin foto», sin el nombre. */
  compacto?: boolean;
}) {
  if (!imagen && compacto) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-salvia text-center ${className}`} role="img" aria-label={`${nombre}: foto próximamente`}>
        <span className="text-[0.6rem] font-semibold uppercase leading-tight tracking-[0.12em] text-tinta-2">Sin foto</span>
      </div>
    );
  }
  if (!imagen) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-1 bg-salvia p-3 text-center ${className}`}
        role="img"
        aria-label={`${nombre}: foto próximamente`}
      >
        <span className="titular text-xl leading-tight sm:text-2xl">{nombre}</span>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-tinta-2">Foto próximamente</span>
      </div>
    );
  }
  return (
    <Image
      src={imagen.src}
      alt={nombre}
      width={imagen.ancho}
      height={imagen.alto}
      sizes={sizes}
      preload={preload}
      loading={cargaInmediata && !preload ? "eager" : undefined}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
