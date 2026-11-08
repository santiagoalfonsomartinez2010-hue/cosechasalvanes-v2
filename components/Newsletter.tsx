"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { newsletter, tienda } from "@/config/tienda";

/**
 * Newsletter con casilla de consentimiento. Mientras no haya dónde guardar los emails
 * (newsletter.activa = false), no envía nada y lo dice: no finge una suscripción correcta.
 */
export function Newsletter() {
  const id = useId();
  const [mensaje, setMensaje] = useState<string | null>(null);
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!newsletter.activa) {
          setMensaje(
            "Todavía no podemos guardar suscripciones desde la web, así que no hemos guardado tu email. Mientras tanto, únete a nuestro grupo de WhatsApp para enterarte de las novedades.",
          );
        }
      }}
    >
      <div>
        <p className="etiqueta">{newsletter.activa ? "Newsletter" : "Newsletter · próximamente"}</p>
        <h2 className="titular mt-2 text-4xl">¡Únete a nuestra Newsletter!</h2>
      </div>
      <div className="flex items-end gap-3">
        <label htmlFor={`${id}-email`} className="sr-only">
          Tu email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder="Escribe tu email aquí"
          className="entrada"
        />
        <button type="submit" className="btn btn-tinta shrink-0">
          Suscribirse ahora
        </button>
      </div>
      <label className="flex items-start gap-2.5 text-sm leading-snug text-tinta-2">
        <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-tinta" />
        <span>
          Quiero recibir novedades de {tienda.nombre} por email y he leído la{" "}
          <Link href="/legal/privacidad" className="vinculo">
            política de privacidad
          </Link>
          .
        </span>
      </label>
      <p role="status" aria-live="polite" className="text-sm leading-snug text-tinta">
        {mensaje && (
          <>
            {mensaje}{" "}
            <a href={tienda.redes.grupoWhatsapp} target="_blank" rel="noopener noreferrer" className="vinculo font-semibold">
              Unirme al grupo
            </a>
          </>
        )}
      </p>
    </form>
  );
}
