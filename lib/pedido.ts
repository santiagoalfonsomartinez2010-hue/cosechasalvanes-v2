import { buscarCP, calcularEnvio, type CalculoEnvio, type Destino } from "@/lib/envio";
import { CANTIDAD_MAXIMA_PEDIDO } from "@/lib/limites";

/**
 * Validación del pedido. La usan el carrito (para enseñar los importes) y el servidor
 * (para cobrar): el servidor no se fía de ningún precio que venga del navegador.
 */

type ProductoParaPedido = {
  slug: string;
  nombre: string;
  precioCentimos: number;
  unidad: string | null;
  disponible: boolean;
  opciones: { nombre: string; valores: string[] }[];
};

export type LineaSolicitada = { slug: string; opcion: string | null; cantidad: number };

export type DatosCliente = {
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  notas: string;
  aceptaCondiciones: boolean;
};

export type SolicitudPago = {
  lineas: LineaSolicitada[];
  codigoPostal: string;
  municipio: string | null;
  cliente: DatosCliente;
};

export type LineaValidada<P extends ProductoParaPedido = ProductoParaPedido> = {
  producto: P;
  opcion: string | null;
  cantidad: number;
  totalCentimos: number;
};

export type ProblemaLinea = { slug: string; opcion: string | null; motivo: "no-existe" | "agotado" | "opcion-invalida" };

export function resolverLineas<P extends ProductoParaPedido>(lineas: LineaSolicitada[], productos: P[]) {
  const porSlug = new Map(productos.map((p) => [p.slug, p]));
  const validas: LineaValidada<P>[] = [];
  const problemas: ProblemaLinea[] = [];
  for (const l of lineas) {
    const producto = porSlug.get(l.slug);
    if (!producto) {
      problemas.push({ slug: l.slug, opcion: l.opcion, motivo: "no-existe" });
      continue;
    }
    if (!producto.disponible) {
      problemas.push({ slug: l.slug, opcion: l.opcion, motivo: "agotado" });
      continue;
    }
    const opcionValida =
      producto.opciones.length === 0
        ? l.opcion === null
        : l.opcion !== null && producto.opciones[0].valores.includes(l.opcion);
    if (!opcionValida) {
      problemas.push({ slug: l.slug, opcion: l.opcion, motivo: "opcion-invalida" });
      continue;
    }
    validas.push({ producto, opcion: l.opcion, cantidad: l.cantidad, totalCentimos: producto.precioCentimos * l.cantidad });
  }
  const subtotalCentimos = validas.reduce((s, l) => s + l.totalCentimos, 0);
  return { validas, problemas, subtotalCentimos };
}

/** Elige el destino: si el CP es de un solo municipio, ese; si es de varios, el elegido. */
export function resolverDestino(codigoPostal: string, municipio: string | null): Destino | null {
  const r = buscarCP(codigoPostal);
  if (r.estado !== "encontrado") return null;
  if (r.destinos.length === 1) return r.destinos[0];
  return r.destinos.find((d) => d.municipio === municipio) ?? null;
}

export type PedidoValidado<P extends ProductoParaPedido> = {
  lineas: LineaValidada<P>[];
  subtotalCentimos: number;
  destino: Destino;
  envio: CalculoEnvio & { costeCentimos: number };
  totalCentimos: number;
};

export type ErrorPedido =
  | "carrito-vacio"
  | "productos-con-problemas"
  | "cantidad-invalida"
  | "sin-reparto"
  | "envio-sin-precio"
  | "minimo-no-alcanzado"
  | "datos-incompletos"
  | "condiciones-no-aceptadas";

export const MENSAJES_ERROR: Record<ErrorPedido, string> = {
  "carrito-vacio": "El carrito está vacío.",
  "productos-con-problemas": "Hay productos del carrito que ya no están disponibles. Quítalos para continuar.",
  "cantidad-invalida": "Revisa las cantidades del carrito.",
  "sin-reparto": "De momento no repartimos en ese código postal.",
  "envio-sin-precio": "Los gastos de envío a tu zona están por confirmar. Escríbenos por WhatsApp para hacer el pedido.",
  "minimo-no-alcanzado": "Tu pedido no llega al importe mínimo de tu zona.",
  "datos-incompletos": "Rellena tu nombre, teléfono, email y dirección de entrega.",
  "condiciones-no-aceptadas": "Para pagar tienes que aceptar las condiciones de venta y la política de privacidad.",
};

const esTexto = (v: unknown, max: number) => typeof v === "string" && v.trim().length > 0 && v.length <= max;

export function validarDatosCliente(c: Partial<DatosCliente> | undefined): ErrorPedido | null {
  if (!c) return "datos-incompletos";
  if (!esTexto(c.nombre, 120) || !esTexto(c.direccion, 300) || !esTexto(c.telefono, 30) || !esTexto(c.email, 200)) {
    return "datos-incompletos";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(c.email).trim())) return "datos-incompletos";
  if (String(c.telefono).replace(/\D/g, "").length < 9) return "datos-incompletos";
  if (c.notas !== undefined && (typeof c.notas !== "string" || c.notas.length > 500)) return "datos-incompletos";
  if (c.aceptaCondiciones !== true) return "condiciones-no-aceptadas";
  return null;
}

export function validarPedido<P extends ProductoParaPedido>(
  lineas: LineaSolicitada[],
  codigoPostal: string,
  municipio: string | null,
  productos: P[],
): { ok: true; pedido: PedidoValidado<P> } | { ok: false; error: ErrorPedido } {
  if (!Array.isArray(lineas) || lineas.length === 0) return { ok: false, error: "carrito-vacio" };
  if (lineas.length > 60) return { ok: false, error: "cantidad-invalida" };
  for (const l of lineas) {
    if (
      !l ||
      typeof l.slug !== "string" ||
      !(l.opcion === null || typeof l.opcion === "string") ||
      !Number.isInteger(l.cantidad) ||
      l.cantidad < 1 ||
      l.cantidad > CANTIDAD_MAXIMA_PEDIDO
    ) {
      return { ok: false, error: "cantidad-invalida" };
    }
  }
  const { validas, problemas, subtotalCentimos } = resolverLineas(lineas, productos);
  if (problemas.length > 0) return { ok: false, error: "productos-con-problemas" };
  if (validas.length === 0) return { ok: false, error: "carrito-vacio" };

  const destino = resolverDestino(typeof codigoPostal === "string" ? codigoPostal : "", municipio);
  if (!destino) return { ok: false, error: "sin-reparto" };
  const envio = calcularEnvio(destino.zona, subtotalCentimos);
  if (envio.costeCentimos === null) return { ok: false, error: "envio-sin-precio" };
  if (!envio.cumpleMinimo) return { ok: false, error: "minimo-no-alcanzado" };

  return {
    ok: true,
    pedido: {
      lineas: validas,
      subtotalCentimos,
      destino,
      envio: { ...envio, costeCentimos: envio.costeCentimos },
      totalCentimos: subtotalCentimos + envio.costeCentimos,
    },
  };
}
