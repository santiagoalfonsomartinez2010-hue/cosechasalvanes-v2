"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { buscarCP, textoUmbral, type BusquedaCP } from "@/lib/envio";
import { eurosACentimos, formatearEurosCorto } from "@/lib/dinero";
import { guardarDestino, useCarrito } from "@/lib/carrito";

/** Comprobador de código postal, en grande. Guarda el código para la cesta. */
export function CalculadoraEnvio() {
  const id = useId();
  const carrito = useCarrito();
  const [cp, setCp] = useState<string | null>(null);
  const [resultado, setResultado] = useState<BusquedaCP | null>(null);
  const valor = cp ?? carrito.codigoPostal;
  const euros = (n: number) => formatearEurosCorto(eurosACentimos(n));

  return (
    <div>
      <form
        className="flex items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const r = buscarCP(valor);
          setResultado(r);
          if (r.estado === "encontrado") guardarDestino(valor.trim(), r.destinos.length === 1 ? r.destinos[0].municipio : null);
        }}
      >
        <div className="flex-1">
          <label htmlFor={`${id}-cp`} className="etiqueta">
            Tu código postal
          </label>
          <input
            id={`${id}-cp`}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="28590"
            value={valor}
            onChange={(e) => {
              setCp(e.target.value.replace(/\D/g, "").slice(0, 5));
              setResultado(null);
            }}
            className="entrada titular !text-5xl tabular-nums"
            required
          />
        </div>
        <button type="submit" className="btn btn-tinta">
          Comprobar
        </button>
      </form>
      <div aria-live="polite" className="mt-5">
        {resultado?.estado === "invalido" && <p className="text-tomate">Escribe un código postal de 5 cifras.</p>}
        {(resultado?.estado === "fuera-de-madrid" || resultado?.estado === "madrid-sin-reparto") && (
          <div className="border-l-2 border-tomate pl-4">
            <p className="font-semibold">De momento no repartimos en ese código postal.</p>
            <p className="mt-1 text-tinta-2">{resultado.mensaje}</p>
          </div>
        )}
        {resultado?.estado === "encontrado" &&
          resultado.destinos.map(({ zona, municipio }) => (
            <div key={`${zona.id}-${municipio}`} className="border-l-2 border-bosque pl-4">
              <p className="titular text-3xl">¡Sí! Repartimos en {municipio ?? "tu zona"}.</p>
              <p className="mt-1 text-tinta-2">
                Pedido mínimo {euros(zona.pedidoMinimo)}.{" "}
                {zona.costeEnvio === 0
                  ? "Envío gratis."
                  : zona.costeEnvio === null
                    ? "Gastos de envío a consultar."
                    : `Envío ${euros(zona.costeEnvio)}${zona.envioGratisDesde !== null ? `, gratis en pedidos ${textoUmbral(zona.envioGratisDesde)}` : ""}.`}{" "}
                <Link href="/productos" className="vinculo text-tinta">
                  Empezar mi pedido
                </Link>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
