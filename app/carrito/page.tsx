import type { Metadata } from "next";
import { obtenerProductosLigeros } from "@/lib/catalogo";
import { Carrito } from "@/components/Carrito";

export const metadata: Metadata = {
  title: "Cesta",
  robots: { index: false, follow: true },
  alternates: { canonical: "/carrito" },
};

export default function PaginaCarrito() {
  return (
    <div className="marco py-8 md:py-12">
      <h1 className="sr-only">Tu pedido</h1>
      <Carrito productos={obtenerProductosLigeros()} />
    </div>
  );
}
