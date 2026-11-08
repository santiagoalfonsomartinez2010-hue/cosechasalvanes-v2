import { tienda } from "@/config/tienda";

/** Enlace de WhatsApp con un mensaje ya escrito. */
export function enlaceWhatsapp(mensaje?: string): string {
  const base = `https://wa.me/${tienda.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/** «+34 688 909 278» → «tel:+34688909278» */
export function enlaceTelefono(telefono: string): string {
  return `tel:${telefono.replace(/\s+/g, "")}`;
}
