"use client";

import { useSyncExternalStore } from "react";
import { CANTIDAD_MAXIMA_PEDIDO } from "@/lib/limites";

/**
 * Carrito guardado en el navegador (localStorage). Solo guarda qué productos y cuántos:
 * el precio se recalcula siempre a partir del catálogo, y al pagar lo vuelve a calcular el servidor.
 */

export type LineaCarrito = {
  slug: string;
  opcion: string | null;
  cantidad: number;
};

export type EstadoCarrito = {
  lineas: LineaCarrito[];
  /** Último código postal usado para calcular el envío. */
  codigoPostal: string;
  /** Municipio elegido si un código postal corresponde a varios. */
  municipio: string | null;
};

export type AvisoAnadido = { id: number; nombre: string; cantidad: number };

const CLAVE = "cosecha-carrito-v1";
export const CANTIDAD_MAXIMA = CANTIDAD_MAXIMA_PEDIDO;
const VACIO: EstadoCarrito = { lineas: [], codigoPostal: "", municipio: null };

let estado: EstadoCarrito = VACIO;
let cargado = false;
const oyentes = new Set<() => void>();
const oyentesAviso = new Set<(aviso: AvisoAnadido) => void>();
let contadorAvisos = 0;

function esLineaValida(l: unknown): l is LineaCarrito {
  if (!l || typeof l !== "object") return false;
  const x = l as Record<string, unknown>;
  return (
    typeof x.slug === "string" &&
    (x.opcion === null || typeof x.opcion === "string") &&
    typeof x.cantidad === "number" &&
    Number.isInteger(x.cantidad) &&
    x.cantidad > 0
  );
}

function leer(): EstadoCarrito {
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (!crudo) return VACIO;
    const datos = JSON.parse(crudo) as Partial<EstadoCarrito>;
    return {
      lineas: Array.isArray(datos.lineas)
        ? datos.lineas
            .filter(esLineaValida)
            .map((l) => ({ ...l, cantidad: Math.min(l.cantidad, CANTIDAD_MAXIMA) }))
        : [],
      codigoPostal: typeof datos.codigoPostal === "string" ? datos.codigoPostal : "",
      municipio: typeof datos.municipio === "string" ? datos.municipio : null,
    };
  } catch {
    return VACIO;
  }
}

function asegurarCargado() {
  if (cargado || typeof window === "undefined") return;
  cargado = true;
  estado = leer();
  window.addEventListener("storage", (e) => {
    if (e.key === CLAVE) {
      estado = leer();
      oyentes.forEach((o) => o());
    }
  });
}

function guardar(nuevo: EstadoCarrito) {
  estado = nuevo;
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(nuevo));
  } catch {
    // Navegación privada o almacenamiento lleno: el carrito sigue funcionando en esta pestaña.
  }
  oyentes.forEach((o) => o());
}

function suscribir(oyente: () => void) {
  asegurarCargado();
  oyentes.add(oyente);
  return () => oyentes.delete(oyente);
}

function obtener() {
  asegurarCargado();
  return estado;
}

function obtenerEnServidor() {
  return VACIO;
}

export function useCarrito(): EstadoCarrito {
  return useSyncExternalStore(suscribir, obtener, obtenerEnServidor);
}

/** true solo cuando el carrito ya se ha leído del navegador (evita parpadeos al cargar). */
export function useCarritoListo(): boolean {
  return useSyncExternalStore(
    suscribir,
    () => true,
    () => false,
  );
}

const mismaLinea = (a: { slug: string; opcion: string | null }, b: LineaCarrito) =>
  a.slug === b.slug && a.opcion === b.opcion;

export function anadirAlCarrito(
  producto: { slug: string; nombre: string },
  cantidad = 1,
  opcion: string | null = null,
) {
  const actual = obtener();
  const existente = actual.lineas.find((l) => mismaLinea({ slug: producto.slug, opcion }, l));
  const lineas = existente
    ? actual.lineas.map((l) =>
        l === existente ? { ...l, cantidad: Math.min(l.cantidad + cantidad, CANTIDAD_MAXIMA) } : l,
      )
    : [...actual.lineas, { slug: producto.slug, opcion, cantidad: Math.min(cantidad, CANTIDAD_MAXIMA) }];
  guardar({ ...actual, lineas });
  contadorAvisos += 1;
  const aviso = { id: contadorAvisos, nombre: producto.nombre, cantidad };
  oyentesAviso.forEach((o) => o(aviso));
}

export function cambiarCantidad(slug: string, opcion: string | null, cantidad: number) {
  const actual = obtener();
  const lineas =
    cantidad <= 0
      ? actual.lineas.filter((l) => !mismaLinea({ slug, opcion }, l))
      : actual.lineas.map((l) =>
          mismaLinea({ slug, opcion }, l) ? { ...l, cantidad: Math.min(cantidad, CANTIDAD_MAXIMA) } : l,
        );
  guardar({ ...actual, lineas });
}

export function quitarDelCarrito(slug: string, opcion: string | null) {
  cambiarCantidad(slug, opcion, 0);
}

export function vaciarCarrito() {
  guardar({ ...obtener(), lineas: [] });
}

export function guardarDestino(codigoPostal: string, municipio: string | null) {
  guardar({ ...obtener(), codigoPostal, municipio });
}

/** Escucha los avisos de «añadido al carrito». */
export function escucharAvisos(oyente: (aviso: AvisoAnadido) => void) {
  oyentesAviso.add(oyente);
  return () => {
    oyentesAviso.delete(oyente);
  };
}

export function contarUnidades(e: EstadoCarrito): number {
  return e.lineas.reduce((total, l) => total + l.cantidad, 0);
}
