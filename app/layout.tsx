import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { tienda } from "@/config/tienda";
import { PERMITIR_INDEXAR, URL_SITIO } from "@/lib/sitio";
import { datosNegocio } from "@/lib/datos-estructurados";
import { textoBarraEnvios } from "@/lib/envio";
import { BarraLateral } from "@/components/BarraLateral";
import { BarraMovil } from "@/components/BarraMovil";
import { Pie } from "@/components/Pie";
import { BotonWhatsapp } from "@/components/BotonWhatsapp";
import { AvisoCarrito } from "@/components/AvisoCarrito";
import { JsonLd } from "@/components/JsonLd";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const descripcion =
  "En Cosecha de Salvanés producimos verduras y hortalizas de temporada. Nos aseguramos de facilitarte alimentos gourmet y ecológicos a domicilio, para que conozcas el verdadero sabor de la tierra bien cultivada.";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: {
    default: `${tienda.nombre} | Huerta gourmet en Villarejo de Salvanés`,
    template: `%s | ${tienda.nombre}`,
  },
  description: descripcion,
  applicationName: tienda.nombre,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: tienda.nombre,
    title: tienda.nombre,
    description: descripcion,
    images: [{ url: "/images/categoria-huerta-de-verano.jpg", width: 1600, height: 1600, alt: "Verduras de temporada de Cosecha de Salvanés" }],
  },
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    apple: [{ url: "/images/logo-fondo-blanco.jpg" }],
  },
  robots: PERMITIR_INDEXAR ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const avisoEnvios = textoBarraEnvios();
  return (
    <html lang="es" className={`${instrument.variable} ${interTight.variable}`}>
      <body className="antialiased">
        <a href="#contenido" className="sr-only z-50 bg-tinta px-4 py-2 text-papel focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Saltar al contenido
        </a>
        <BarraLateral avisoEnvios={avisoEnvios} />
        <div className="flex min-h-dvh flex-col lg:pl-64">
          <BarraMovil avisoEnvios={avisoEnvios} />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Pie />
        </div>
        <BotonWhatsapp />
        <AvisoCarrito />
        <JsonLd datos={datosNegocio()} />
      </body>
    </html>
  );
}
