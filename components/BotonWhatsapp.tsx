import { enlaceWhatsapp } from "@/lib/whatsapp";
import { IconoWhatsapp } from "@/components/Iconos";

/** Botón flotante de WhatsApp. En el móvil queda por encima de las pestañas. Sin animación. */
export function BotonWhatsapp() {
  return (
    <a
      href={enlaceWhatsapp("Hola, Cosecha de Salvanés. Tengo una consulta:")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="no-imprimir fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 inline-flex h-13 w-13 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-lg shadow-tinta/25 hover:bg-[#19683f] lg:right-6 lg:bottom-6"
    >
      <IconoWhatsapp width={28} height={28} />
    </a>
  );
}
