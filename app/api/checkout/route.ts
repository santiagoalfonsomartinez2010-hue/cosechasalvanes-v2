import Stripe from "stripe";
import { NextResponse, type NextRequest } from "next/server";
import { tienda } from "@/config/tienda";
import { obtenerProductos } from "@/lib/catalogo";
import { formatearEuros } from "@/lib/dinero";
import { MENSAJES_ERROR, validarDatosCliente, validarPedido, type SolicitudPago } from "@/lib/pedido";

/**
 * Pago con Stripe Checkout.
 * - La clave secreta se lee de la variable de entorno STRIPE_SECRET_KEY (nunca va en el código).
 * - Sin clave, la web funciona igual y el carrito explica que el pago de prueba no está activado.
 * - Por seguridad solo se aceptan claves de PRUEBA (sk_test_ / rk_test_). Para cobrar de verdad,
 *   además de poner la clave real hay que añadir STRIPE_PERMITIR_PAGOS_REALES=si, cuando los
 *   textos legales estén revisados.
 * - Los precios y el envío se recalculan aquí a partir del catálogo: no se usa ningún importe
 *   que venga del navegador.
 */

export const dynamic = "force-dynamic";

type Configuracion = { activo: true; modo: "prueba" | "real"; clave: string } | { activo: false; motivo: string };

function configuracionStripe(): Configuracion {
  const clave = process.env.STRIPE_SECRET_KEY?.trim();
  if (!clave) {
    return { activo: false, motivo: "Faltan las claves de prueba de Stripe en la configuración de la web." };
  }
  if (/^(sk|rk)_test_/.test(clave)) return { activo: true, modo: "prueba", clave };
  if (/^(sk|rk)_live_/.test(clave)) {
    if (process.env.STRIPE_PERMITIR_PAGOS_REALES === "si") return { activo: true, modo: "real", clave };
    return {
      activo: false,
      motivo: "La web tiene una clave real de Stripe, pero los pagos reales todavía no están permitidos.",
    };
  }
  return { activo: false, motivo: "La clave de Stripe configurada no es válida." };
}

/** El carrito pregunta aquí si el pago está activado, sin exponer ninguna clave. */
export async function GET() {
  const c = configuracionStripe();
  return NextResponse.json(c.activo ? { activo: true, modo: c.modo } : { activo: false, modo: null, motivo: c.motivo }, {
    headers: { "Cache-Control": "no-store" },
  });
}

const limpiar = (texto: string, max: number) => texto.replace(/\s+/g, " ").trim().slice(0, max);

export async function POST(req: NextRequest) {
  const config = configuracionStripe();
  if (!config.activo) {
    return NextResponse.json(
      { error: "pago-no-activado", mensaje: `El pago de prueba no está activado todavía. ${config.motivo}` },
      { status: 503 },
    );
  }

  let solicitud: SolicitudPago;
  try {
    const texto = await req.text();
    if (texto.length > 20_000) throw new Error("demasiado grande");
    solicitud = JSON.parse(texto) as SolicitudPago;
  } catch {
    return NextResponse.json({ error: "solicitud-invalida", mensaje: "No se ha podido leer el pedido." }, { status: 400 });
  }

  const errorDatos = validarDatosCliente(solicitud?.cliente);
  if (errorDatos) {
    return NextResponse.json({ error: errorDatos, mensaje: MENSAJES_ERROR[errorDatos] }, { status: 400 });
  }

  const resultado = validarPedido(solicitud.lineas, solicitud.codigoPostal, solicitud.municipio ?? null, obtenerProductos());
  if (!resultado.ok) {
    return NextResponse.json({ error: resultado.error, mensaje: MENSAJES_ERROR[resultado.error] }, { status: 400 });
  }

  const { pedido } = resultado;
  const cliente = solicitud.cliente;
  const origen = req.nextUrl.origin;
  const esHttps = origen.startsWith("https://");
  const municipio = pedido.destino.municipio ?? "Fuera de Madrid";

  const resumen = pedido.lineas
    .map((l) => `${l.cantidad}x ${l.producto.nombre}${l.opcion ? ` (${l.opcion})` : ""}`)
    .join(", ");

  const metadata: Record<string, string> = {
    nombre: limpiar(cliente.nombre, 120),
    telefono: limpiar(cliente.telefono, 30),
    direccion: limpiar(cliente.direccion, 300),
    codigo_postal: limpiar(solicitud.codigoPostal, 5),
    municipio: limpiar(municipio, 80),
    zona: pedido.destino.zona.nombre,
    notas: limpiar(cliente.notas ?? "", 500),
    pedido: limpiar(resumen, 500),
    subtotal: formatearEuros(pedido.subtotalCentimos),
    envio: pedido.envio.esGratis ? "Gratis" : formatearEuros(pedido.envio.costeCentimos),
    acepta_condiciones: "si",
  };
  for (const clave of Object.keys(metadata)) if (!metadata[clave]) delete metadata[clave];

  try {
    const stripe = new Stripe(config.clave);
    const sesion = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "es",
      currency: "eur",
      customer_email: limpiar(cliente.email, 200),
      line_items: pedido.lineas.map((l) => ({
        quantity: l.cantidad,
        price_data: {
          currency: "eur",
          unit_amount: l.producto.precioCentimos,
          product_data: {
            name: `${l.producto.nombre}${l.opcion ? ` (${l.opcion})` : ""}`,
            description: l.producto.unidad ? `Precio por ${l.producto.unidad}` : "Unidad de venta por confirmar",
            ...(esHttps && l.producto.imagenes[0] ? { images: [`${origen}${l.producto.imagenes[0].src}`] } : {}),
            metadata: { slug: l.producto.slug },
          },
        },
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: pedido.envio.esGratis ? `Envío gratis a ${municipio}` : `Envío a ${municipio}`,
            fixed_amount: { amount: pedido.envio.costeCentimos, currency: "eur" },
          },
        },
      ],
      metadata,
      payment_intent_data: {
        description: `Pedido web ${tienda.nombre}: ${limpiar(resumen, 300)}`,
        metadata,
      },
      success_url: `${origen}/pedido/confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origen}/carrito?pago=cancelado`,
    });

    if (!sesion.url) throw new Error("Stripe no ha devuelto la dirección de pago");
    return NextResponse.json({ url: sesion.url });
  } catch (e) {
    console.error("Error al crear la sesión de Stripe", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "stripe", mensaje: "No se ha podido iniciar el pago. Inténtalo de nuevo en unos minutos." },
      { status: 502 },
    );
  }
}
