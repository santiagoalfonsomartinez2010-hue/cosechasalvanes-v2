import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { tienda } from "@/config/tienda";
import { formatearEuros } from "@/lib/dinero";
import { enlaceWhatsapp } from "@/lib/whatsapp";
import { VaciarCarrito } from "@/components/VaciarCarrito";
import { IconoWhatsapp } from "@/components/Iconos";

export const metadata: Metadata = {
  title: "Pedido recibido",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ session_id?: string | string[] }> };

type Resultado =
  | { estado: "pagado"; total: number | null; email: string | null; prueba: boolean; referencia: string }
  | { estado: "pendiente" | "desconocido" };

async function comprobarPago(sessionId: string | undefined): Promise<Resultado> {
  const clave = process.env.STRIPE_SECRET_KEY?.trim();
  if (!clave || !sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return { estado: "desconocido" };
  try {
    const stripe = new Stripe(clave);
    const s = await stripe.checkout.sessions.retrieve(sessionId);
    if (s.payment_status !== "paid") return { estado: "pendiente" };
    return {
      estado: "pagado",
      total: s.amount_total ?? null,
      email: s.customer_details?.email ?? s.customer_email ?? null,
      prueba: !s.livemode,
      referencia: sessionId.slice(-8).toUpperCase(),
    };
  } catch {
    return { estado: "desconocido" };
  }
}

export default async function PedidoConfirmado({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const r = await comprobarPago(Array.isArray(session_id) ? session_id[0] : session_id);

  return (
    <div className="marco py-14 sm:py-20">
      <div className="mx-auto max-w-2xl border-y border-tinta py-12 text-center">
        {r.estado === "pagado" ? (
          <>
            <VaciarCarrito />
            {r.prueba && (
              <p className="mx-auto mb-6 inline-block bg-miel/40 px-3 py-1 text-sm font-semibold">
                Pago de prueba: no se ha cobrado nada
              </p>
            )}
            <h1 className="titular text-5xl sm:text-6xl">¡Gracias por tu pedido!</h1>
            <p className="parrafo mt-5">
              Hemos recibido tu pago{r.total !== null ? ` de ${formatearEuros(r.total)}` : ""}. Referencia:{" "}
              <strong className="text-tinta">{r.referencia}</strong>.
            </p>
            <p className="parrafo mt-3">
              Nos pondremos en contacto contigo para confirmar el día de entrega. {tienda.plazoPedidos}
            </p>
            {r.email && <p className="mt-3 text-sm text-tinta-2">Email de contacto: {r.email}</p>}
          </>
        ) : r.estado === "pendiente" ? (
          <>
            <h1 className="titular text-5xl">Tu pago está pendiente</h1>
            <p className="parrafo mt-5">
              El pago todavía no se ha completado. Si crees que es un error, escríbenos y lo revisamos.
            </p>
          </>
        ) : (
          <>
            <h1 className="titular text-5xl">No encontramos este pedido</h1>
            <p className="parrafo mt-5">
              No hemos podido comprobar el pago. Si has pagado, escríbenos por WhatsApp y lo revisamos enseguida.
            </p>
          </>
        )}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/productos" className="btn btn-tinta">
            Volver a la tienda
          </Link>
          <a
            href={enlaceWhatsapp(
              r.estado === "pagado"
                ? `Hola, Cosecha de Salvanés. Acabo de hacer el pedido ${r.referencia} en la web.`
                : "Hola, Cosecha de Salvanés. Tengo una duda con un pedido de la web.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-linea"
          >
            <IconoWhatsapp width={20} height={20} /> Escríbenos
          </a>
        </div>
      </div>
    </div>
  );
}
