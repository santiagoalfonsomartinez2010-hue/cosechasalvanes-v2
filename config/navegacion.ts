export const enlacesPrincipales = [
  { href: "/", texto: "Inicio", corto: "Inicio" },
  { href: "/bienvenidos", texto: "Bienvenidos", corto: "Nosotros" },
  { href: "/productos", texto: "Productos", corto: "Tienda" },
  { href: "/envios-y-promociones", texto: "Envíos y promociones", corto: "Envíos" },
  { href: "/contacto", texto: "Contacto", corto: "Contacto" },
] as const;

export const enlacesLegales = [
  { href: "/legal/aviso-legal", texto: "Aviso legal" },
  { href: "/legal/privacidad", texto: "Privacidad" },
  { href: "/legal/cookies", texto: "Cookies" },
  { href: "/legal/condiciones-de-venta", texto: "Condiciones de venta" },
] as const;

export function esRutaActiva(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
