"use client";

import { useId, useState } from "react";
import { tienda } from "@/config/tienda";
import { enlaceWhatsapp } from "@/lib/whatsapp";
import { IconoCorreo, IconoWhatsapp } from "@/components/Iconos";

/**
 * Formulario de contacto (Nombre, Apellido, Email, Mensaje, como en la web original).
 * La web todavía no tiene dónde guardar mensajes, así que no los «envía» a ningún servidor:
 * prepara el mensaje y lo abre en WhatsApp o en el programa de correo del cliente,
 * que es quien lo envía. Lo dice claramente antes de pulsar.
 */
export function FormularioContacto() {
  const id = useId();
  const [error, setError] = useState<string | null>(null);

  const componer = (form: HTMLFormElement) => {
    const datos = new FormData(form);
    const nombre = String(datos.get("nombre") ?? "").trim();
    const apellido = String(datos.get("apellido") ?? "").trim();
    const email = String(datos.get("email") ?? "").trim();
    const mensaje = String(datos.get("mensaje") ?? "").trim();
    if (!nombre || !mensaje) {
      setError("Escribe al menos tu nombre y el mensaje.");
      return null;
    }
    setError(null);
    const firma = [`${nombre} ${apellido}`.trim(), email].filter(Boolean).join(" · ");
    return { texto: `${mensaje}\n\n${firma}`, asunto: `Consulta desde la web: ${nombre} ${apellido}`.trim() };
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        const destino = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value");
        const m = componer(e.currentTarget);
        if (!m) return;
        if (destino === "correo") {
          window.location.href = `mailto:${tienda.email}?subject=${encodeURIComponent(m.asunto)}&body=${encodeURIComponent(m.texto)}`;
        } else {
          window.open(enlaceWhatsapp(m.texto), "_blank", "noopener,noreferrer");
        }
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nombre`} className="etiqueta">
            Nombre
          </label>
          <input id={`${id}-nombre`} name="nombre" autoComplete="given-name" required className="entrada" />
        </div>
        <div>
          <label htmlFor={`${id}-apellido`} className="etiqueta">
            Apellido
          </label>
          <input id={`${id}-apellido`} name="apellido" autoComplete="family-name" className="entrada" />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="etiqueta">
          Email
        </label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" className="entrada" />
      </div>
      <div>
        <label htmlFor={`${id}-mensaje`} className="etiqueta">
          Mensaje
        </label>
        <textarea id={`${id}-mensaje`} name="mensaje" rows={5} required className="entrada resize-y" />
      </div>
      <p className="border-l-2 border-oliva pl-3 text-sm text-tinta-2">
        Al pulsar, tu mensaje se abre en WhatsApp o en tu correo para que lo envíes tú. La web no guarda ningún dato.
      </p>
      {error && (
        <p role="alert" className="text-sm font-semibold text-tomate">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" value="whatsapp" className="btn btn-tinta">
          <IconoWhatsapp width={20} height={20} /> Enviar por WhatsApp
        </button>
        <button type="submit" value="correo" className="btn btn-linea">
          <IconoCorreo width={20} height={20} /> Enviar por email
        </button>
      </div>
    </form>
  );
}
