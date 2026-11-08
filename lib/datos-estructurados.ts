import { tienda } from "@/config/tienda";
import { urlAbsoluta, URL_SITIO } from "@/lib/sitio";

/** Negocio local con la dirección VISIBLE en la web (Villarejo de Salvanés, 28590). */
export function datosNegocio(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "@id": `${URL_SITIO}/#negocio`,
    name: tienda.nombre,
    description:
      "Cosecha de Salvanés pone en valor la producción que la tierra nos ofrece cuando nos encargamos de cultivarla y de recoger sus frutos con dedicación.",
    url: URL_SITIO,
    logo: urlAbsoluta("/images/logo-fondo-blanco.jpg"),
    image: urlAbsoluta("/images/categoria-huerta-de-verano.jpg"),
    email: tienda.email,
    telephone: tienda.telefonos[0].replace(/\s+/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: tienda.direccion.localidad,
      postalCode: tienda.direccion.codigoPostal,
      addressRegion: tienda.direccion.provincia,
      addressCountry: tienda.direccion.codigoPais,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Comunidad de Madrid" },
    currenciesAccepted: "EUR",
    sameAs: [tienda.redes.instagram, tienda.redes.facebook],
  };
}
