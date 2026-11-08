"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { ProductoLigero } from "@/lib/catalogo";
import { cambiarCantidad, guardarDestino, quitarDelCarrito, useCarrito, useCarritoListo } from "@/lib/carrito";
import { formatearEuros, formatearEurosCorto } from "@/lib/dinero";
import { buscarCP, calcularEnvio, textoUmbral } from "@/lib/envio";
import { MENSAJES_ERROR, resolverDestino, resolverLineas, validarDatosCliente } from "@/lib/pedido";
import { enlaceWhatsapp } from "@/lib/whatsapp";
import { ImagenProducto } from "@/components/ImagenProducto";
import { SelectorCantidad } from "@/components/SelectorCantidad";
import { IconoWhatsapp } from "@/components/Iconos";

type EstadoPago = { activo: boolean; modo: "prueba" | "real" | null; motivo?: string } | null;
type Paso = 1 | 2 | 3;

const MOTIVOS = {
  "no-existe": "Este producto ya no está en la tienda.",
  agotado: "Este producto se ha agotado.",
  "opcion-invalida": "Esta opción ya no está disponible.",
} as const;

const PASOS: { n: Paso; texto: string }[] = [
  { n: 1, texto: "Cesta" },
  { n: 2, texto: "Entrega" },
  { n: 3, texto: "Pago" },
];

/** Carrito en tres pasos: 1 Cesta (productos y código postal), 2 Entrega (datos), 3 Pago. */
export function Carrito({ productos }: { productos: ProductoLigero[] }) {
  const id = useId();
  const carrito = useCarrito();
  const listo = useCarritoListo();
  const [paso, setPaso] = useState<Paso>(1);
  const [cpEscrito, setCpEscrito] = useState<string | null>(null);
  const [pago, setPago] = useState<EstadoPago>(null);
  const [cancelado, setCancelado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cliente, setCliente] = useState({ nombre: "", telefono: "", email: "", direccion: "", notas: "", aceptaCondiciones: false });

  useEffect(() => {
    setCancelado(new URLSearchParams(window.location.search).get("pago") === "cancelado");
    let vivo = true;
    fetch("/api/checkout", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: EstadoPago) => vivo && setPago(d))
      .catch(() => vivo && setPago({ activo: false, modo: null }));
    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setError(null);
  }, [paso]);

  if (!listo) return <div className="min-h-[40vh]" aria-busy="true" aria-label="Cargando cesta" />;

  if (carrito.lineas.length === 0) {
    return (
      <div className="border-y border-tinta py-16 text-center">
        <p className="titular text-5xl">Tu cesta está vacía</p>
        <p className="parrafo mx-auto mt-3 max-w-md">Elige tus productos de temporada y te los llevamos a casa.</p>
        <Link href="/productos" className="btn btn-tinta mt-8">
          Ver productos
        </Link>
      </div>
    );
  }

  const { validas, problemas, subtotalCentimos } = resolverLineas(carrito.lineas, productos);
  const porSlug = new Map(productos.map((p) => [p.slug, p]));
  const cpGuardado = carrito.codigoPostal;
  const busqueda = cpGuardado ? buscarCP(cpGuardado) : null;
  const destino = cpGuardado ? resolverDestino(cpGuardado, carrito.municipio) : null;
  const envio = destino ? calcularEnvio(destino.zona, subtotalCentimos) : null;
  const totalCentimos = envio && envio.costeCentimos !== null ? subtotalCentimos + envio.costeCentimos : null;
  const cpInput = cpEscrito ?? cpGuardado;

  const bloqueos: string[] = [];
  if (problemas.length) bloqueos.push(MENSAJES_ERROR["productos-con-problemas"]);
  if (!destino) bloqueos.push("Indica tu código postal para calcular el envío.");
  if (envio && envio.costeCentimos === null) bloqueos.push(MENSAJES_ERROR["envio-sin-precio"]);
  if (envio && !envio.cumpleMinimo)
    bloqueos.push(
      `El pedido mínimo en tu zona es de ${formatearEurosCorto(envio.pedidoMinimoCentimos)}. Te faltan ${formatearEuros(envio.faltaParaMinimoCentimos)}.`,
    );
  const cestaLista = bloqueos.length === 0 && validas.length > 0;

  const mensajeWhatsapp = () => {
    const partes = [
      "Hola, Cosecha de Salvanés. Quiero hacer este pedido:",
      ...validas.map((l) => `• ${l.cantidad} × ${l.producto.nombre}${l.opcion ? ` (${l.opcion})` : ""} — ${formatearEuros(l.totalCentimos)}`),
      `Subtotal: ${formatearEuros(subtotalCentimos)}`,
    ];
    if (destino && envio) {
      partes.push(
        `Envío a ${destino.municipio ?? "mi zona"} (${cpGuardado}): ${
          envio.costeCentimos === null ? "a consultar" : envio.esGratis ? "gratis" : formatearEuros(envio.costeCentimos)
        }`,
      );
      if (totalCentimos !== null) partes.push(`Total: ${formatearEuros(totalCentimos)}`);
    }
    if (cliente.nombre) partes.push(`Nombre: ${cliente.nombre}`);
    if (cliente.telefono) partes.push(`Teléfono: ${cliente.telefono}`);
    if (cliente.direccion) partes.push(`Dirección: ${cliente.direccion}`);
    if (cliente.notas) partes.push(`Notas: ${cliente.notas}`);
    return partes.join("\n");
  };

  const pagar = async () => {
    setError(null);
    const e = validarDatosCliente(cliente);
    if (e) {
      setError(MENSAJES_ERROR[e]);
      return;
    }
    setEnviando(true);
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineas: carrito.lineas, codigoPostal: cpGuardado, municipio: destino?.municipio ?? null, cliente }),
      });
      const datos = (await r.json().catch(() => ({}))) as { url?: string; mensaje?: string };
      if (r.ok && datos.url) {
        window.location.assign(datos.url);
        return;
      }
      setError(datos.mensaje ?? "No se ha podido iniciar el pago. Inténtalo de nuevo en unos minutos.");
    } catch {
      setError("No se ha podido conectar. Revisa tu conexión e inténtalo de nuevo.");
    }
    setEnviando(false);
  };

  const resumenImportes = (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-tinta-2">Productos</dt>
        <dd className="font-semibold tabular-nums">{formatearEuros(subtotalCentimos)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-tinta-2">Envío{destino ? ` a ${destino.municipio ?? "tu zona"}` : ""}</dt>
        <dd className="font-semibold tabular-nums">
          {!envio ? "—" : envio.costeCentimos === null ? "A consultar" : envio.esGratis ? "Gratis" : formatearEuros(envio.costeCentimos)}
        </dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-tinta pt-3">
        <dt className="font-semibold">Total</dt>
        <dd className="titular text-4xl tabular-nums">{formatearEuros(totalCentimos ?? subtotalCentimos)}</dd>
      </div>
      <p className="text-xs text-tinta-2">IVA incluido.</p>
    </dl>
  );

  const puedeIrA = (n: Paso) => n === 1 || (n === 2 && cestaLista) || (n === 3 && cestaLista && !validarDatosParaEntrega(cliente));

  return (
    <div className="mx-auto max-w-3xl">
      {/* PASOS */}
      <ol className="grid grid-cols-3 border-y border-tinta" aria-label="Pasos del pedido">
        {PASOS.map((p) => {
          const actual = p.n === paso;
          return (
            <li key={p.n} className="border-r border-linea last:border-r-0">
              <button
                type="button"
                onClick={() => puedeIrA(p.n) && setPaso(p.n)}
                disabled={!puedeIrA(p.n) && !actual}
                aria-current={actual ? "step" : undefined}
                className={`flex w-full items-baseline gap-2 px-2 py-3 text-left sm:px-4 ${actual ? "bg-tinta text-papel" : "text-tinta-2 disabled:opacity-50"}`}
              >
                <span className="titular text-2xl">{p.n}</span>
                <span className="text-sm font-semibold">{p.texto}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {cancelado && paso === 1 && (
        <p className="mt-6 border-l-2 border-tomate pl-4">Has cancelado el pago. Tu cesta sigue aquí por si quieres terminar el pedido.</p>
      )}

      {/* PASO 1 · CESTA */}
      {paso === 1 && (
        <section aria-labelledby={`${id}-p1`} className="mt-8">
          <h2 id={`${id}-p1`} className="titular text-5xl">
            Tu cesta
          </h2>
          <ul className="mt-6 border-t border-tinta">
            {carrito.lineas.map((linea, i) => {
              const p = porSlug.get(linea.slug);
              const problema = problemas.find((x) => x.slug === linea.slug && x.opcion === linea.opcion);
              return (
                <li key={`${linea.slug}-${linea.opcion ?? ""}`} className="flex gap-4 border-b border-linea py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-papel-2">
                    {p && <ImagenProducto imagen={p.imagen} nombre={p.nombre} sizes="80px" compacto cargaInmediata={i < 3} />}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="titular text-2xl leading-tight">{p ? p.nombre : "Producto retirado"}</p>
                        {linea.opcion && <p className="text-sm text-tinta-2">{linea.opcion}</p>}
                        {p && (
                          <p className="text-xs text-tinta-2">
                            {formatearEuros(p.precioCentimos)}
                            {p.unidad ? `/${p.unidad}` : " · unidad por confirmar"}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold tabular-nums">{p && !problema ? formatearEuros(p.precioCentimos * linea.cantidad) : "—"}</p>
                    </div>
                    {problema && <p className="text-sm font-semibold text-tomate">{MOTIVOS[problema.motivo]}</p>}
                    <div className="flex items-center justify-between">
                      {!problema ? (
                        <SelectorCantidad
                          compacto
                          valor={linea.cantidad}
                          alCambiar={(n) => cambiarCantidad(linea.slug, linea.opcion, n)}
                          etiqueta={`Cantidad de ${p?.nombre ?? "producto"}`}
                        />
                      ) : (
                        <span />
                      )}
                      <button type="button" onClick={() => quitarDelCarrito(linea.slug, linea.opcion)} className="min-h-10 text-sm underline underline-offset-4">
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const cp = (cpInput ?? "").trim();
                const r = buscarCP(cp);
                guardarDestino(cp, r.estado === "encontrado" && r.destinos.length === 1 ? r.destinos[0].municipio : null);
                setCpEscrito(null);
              }}
            >
              <label htmlFor={`${id}-cp`} className="etiqueta">
                Código postal de entrega
              </label>
              <div className="mt-1 flex items-end gap-2">
                <input
                  id={`${id}-cp`}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder="28590"
                  value={cpInput}
                  onChange={(e) => setCpEscrito(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  className="entrada"
                />
                <button type="submit" className="btn btn-linea">
                  Calcular
                </button>
              </div>
              <div aria-live="polite" className="mt-3 text-sm">
                {busqueda?.estado === "invalido" && <p className="text-tomate">Escribe un código postal de 5 cifras.</p>}
                {(busqueda?.estado === "fuera-de-madrid" || busqueda?.estado === "madrid-sin-reparto") && (
                  <p className="text-tomate">
                    De momento no repartimos en ese código postal. {busqueda.mensaje}{" "}
                    <Link href="/envios-y-promociones" className="vinculo">
                      Ver zonas
                    </Link>
                  </p>
                )}
                {busqueda?.estado === "encontrado" && busqueda.destinos.length > 1 && (
                  <fieldset className="space-y-1">
                    <legend>Ese código postal corresponde a varios sitios. ¿Dónde es la entrega?</legend>
                    {busqueda.destinos.map((d) => (
                      <label key={`${d.zona.id}-${d.municipio}`} className="flex min-h-11 items-center gap-3">
                        <input
                          type="radio"
                          name={`${id}-municipio`}
                          checked={carrito.municipio === d.municipio}
                          onChange={() => guardarDestino(cpGuardado, d.municipio)}
                          className="h-5 w-5 accent-tinta"
                        />
                        {d.municipio}
                      </label>
                    ))}
                  </fieldset>
                )}
                {destino && (
                  <p className="text-bosque">
                    Entrega en <strong>{destino.municipio ?? "tu zona"}</strong> · {destino.zona.nombre.toLowerCase()}.
                  </p>
                )}
                {envio && envio.faltaParaGratisCentimos !== null && envio.umbralGratisCentimos !== null && (
                  <p className="mt-2">
                    Te faltan <strong>{formatearEuros(envio.faltaParaGratisCentimos)}</strong> para el envío gratis (pedidos{" "}
                    {textoUmbral(envio.umbralGratisCentimos / 100)}).
                  </p>
                )}
              </div>
            </form>
            <div>{resumenImportes}</div>
          </div>

          {bloqueos.length > 0 && (
            <ul className="mt-6 space-y-1 border-l-2 border-miel pl-4 text-sm">
              {bloqueos.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Link href="/productos" className="btn btn-linea">
              Seguir comprando
            </Link>
            <button type="button" disabled={!cestaLista} onClick={() => setPaso(2)} className="btn btn-tinta">
              Continuar con la entrega
            </button>
          </div>
        </section>
      )}

      {/* PASO 2 · ENTREGA */}
      {paso === 2 && (
        <form
          aria-labelledby={`${id}-p2`}
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const err = validarDatosParaEntrega(cliente);
            if (err) setError(err);
            else setPaso(3);
          }}
        >
          <h2 id={`${id}-p2`} className="titular text-5xl">
            Datos de entrega
          </h2>
          <p className="text-sm text-tinta-2">
            Entrega en {destino?.municipio ?? "tu zona"} ({cpGuardado}).{" "}
            <button type="button" onClick={() => setPaso(1)} className="underline underline-offset-4">
              Cambiar
            </button>
          </p>
          <Campo id={`${id}-nombre`} etiqueta="Nombre y apellidos" autoComplete="name" valor={cliente.nombre} alCambiar={(v) => setCliente({ ...cliente, nombre: v })} />
          <div className="grid gap-6 sm:grid-cols-2">
            <Campo id={`${id}-tel`} etiqueta="Teléfono" tipo="tel" autoComplete="tel" valor={cliente.telefono} alCambiar={(v) => setCliente({ ...cliente, telefono: v })} />
            <Campo id={`${id}-email`} etiqueta="Email" tipo="email" autoComplete="email" valor={cliente.email} alCambiar={(v) => setCliente({ ...cliente, email: v })} />
          </div>
          <Campo
            id={`${id}-dir`}
            etiqueta="Dirección de entrega"
            autoComplete="street-address"
            valor={cliente.direccion}
            alCambiar={(v) => setCliente({ ...cliente, direccion: v })}
            ayuda={`Calle, número y piso en ${destino?.municipio ?? "tu municipio"} (${cpGuardado}).`}
          />
          <div>
            <label htmlFor={`${id}-notas`} className="etiqueta">
              Notas para la entrega (opcional)
            </label>
            <textarea
              id={`${id}-notas`}
              rows={2}
              maxLength={500}
              value={cliente.notas}
              onChange={(e) => setCliente({ ...cliente, notas: e.target.value })}
              className="entrada resize-y"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm font-semibold text-tomate">
              {error}
            </p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <button type="button" onClick={() => setPaso(1)} className="btn btn-linea">
              Volver a la cesta
            </button>
            <button type="submit" className="btn btn-tinta">
              Continuar al pago
            </button>
          </div>
        </form>
      )}

      {/* PASO 3 · PAGO */}
      {paso === 3 && (
        <section aria-labelledby={`${id}-p3`} className="mt-8">
          <h2 id={`${id}-p3`} className="titular text-5xl">
            Revisa y paga
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div className="text-sm">
              <p className="etiqueta">Tu pedido</p>
              <ul className="mt-2 space-y-1">
                {validas.map((l) => (
                  <li key={`${l.producto.slug}-${l.opcion ?? ""}`} className="flex justify-between gap-3">
                    <span>
                      {l.cantidad} × {l.producto.nombre}
                      {l.opcion ? ` (${l.opcion})` : ""}
                    </span>
                    <span className="tabular-nums">{formatearEuros(l.totalCentimos)}</span>
                  </li>
                ))}
              </ul>
              <p className="etiqueta mt-6">Entrega</p>
              <p className="mt-2">
                {cliente.nombre} · {cliente.telefono}
                <br />
                {cliente.direccion}, {destino?.municipio ?? ""} ({cpGuardado})
                <br />
                {cliente.email}
              </p>
              <button type="button" onClick={() => setPaso(2)} className="mt-2 underline underline-offset-4">
                Cambiar datos
              </button>
            </div>
            <div>{resumenImportes}</div>
          </div>

          <form
            className="mt-8 space-y-5 border-t border-tinta pt-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (cestaLista && pago?.activo) void pagar();
            }}
          >
            <label className="flex items-start gap-3 text-sm leading-snug">
              <input
                type="checkbox"
                checked={cliente.aceptaCondiciones}
                onChange={(e) => setCliente({ ...cliente, aceptaCondiciones: e.target.checked })}
                className="mt-0.5 h-5 w-5 shrink-0 accent-tinta"
              />
              <span>
                He leído y acepto las{" "}
                <Link href="/legal/condiciones-de-venta" className="vinculo" target="_blank">
                  condiciones de venta
                </Link>{" "}
                y la{" "}
                <Link href="/legal/privacidad" className="vinculo" target="_blank">
                  política de privacidad
                </Link>
                .
              </span>
            </label>
            {pago && !pago.activo && (
              <p className="border-l-2 border-miel pl-4 text-sm">
                <strong>El pago de prueba con tarjeta no está activado todavía.</strong>{" "}
                {pago.motivo ?? "Faltan las claves de prueba de Stripe en la configuración de la web."} Mientras tanto, puedes
                enviarnos el pedido por WhatsApp.
              </p>
            )}
            {pago?.activo && pago.modo === "prueba" && (
              <p className="text-xs text-tinta-2">
                Modo de prueba: no se cobrará nada. Usa la tarjeta 4242 4242 4242 4242, cualquier fecha futura y cualquier CVC.
              </p>
            )}
            {error && (
              <p role="alert" className="text-sm font-semibold text-tomate">
                {error}
              </p>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              <a href={enlaceWhatsapp(mensajeWhatsapp())} target="_blank" rel="noopener noreferrer" className="btn btn-linea">
                <IconoWhatsapp width={20} height={20} /> Enviar el pedido por WhatsApp
              </a>
              <button type="submit" disabled={!cestaLista || !pago?.activo || enviando} className="btn btn-tinta">
                {enviando
                  ? "Abriendo el pago seguro…"
                  : pago === null
                    ? "Comprobando el pago…"
                    : pago.activo
                      ? `Pagar ${formatearEuros(totalCentimos ?? subtotalCentimos)} con tarjeta`
                      : "Pago con tarjeta no activado"}
              </button>
            </div>
            <p className="text-center text-xs text-tinta-2">
              El pago con tarjeta se hace en la página segura de Stripe. Nosotros no vemos los datos de tu tarjeta.
            </p>
          </form>
        </section>
      )}
    </div>
  );
}

/** Comprueba los datos de entrega (sin la casilla de condiciones, que va en el paso 3). */
function validarDatosParaEntrega(c: { nombre: string; telefono: string; email: string; direccion: string; notas: string }): string | null {
  const e = validarDatosCliente({ ...c, aceptaCondiciones: true });
  return e ? MENSAJES_ERROR[e] : null;
}

function Campo({
  id,
  etiqueta,
  valor,
  alCambiar,
  tipo = "text",
  autoComplete,
  ayuda,
}: {
  id: string;
  etiqueta: string;
  valor: string;
  alCambiar: (v: string) => void;
  tipo?: string;
  autoComplete?: string;
  ayuda?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="etiqueta">
        {etiqueta}
      </label>
      <input
        id={id}
        type={tipo}
        autoComplete={autoComplete}
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        aria-describedby={ayuda ? `${id}-ayuda` : undefined}
        className="entrada"
        required
      />
      {ayuda && (
        <p id={`${id}-ayuda`} className="mt-1 text-xs text-tinta-2">
          {ayuda}
        </p>
      )}
    </div>
  );
}
