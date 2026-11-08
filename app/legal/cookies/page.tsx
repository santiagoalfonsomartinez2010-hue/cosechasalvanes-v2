import type { Metadata } from "next";
import Link from "next/link";
import { PaginaLegal } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies y almacenamiento usa la web de Cosecha de Salvanés (borrador pendiente de revisión).",
  alternates: { canonical: "/legal/cookies" },
};

export default function Cookies() {
  return (
    <PaginaLegal titulo="Política de cookies">
      <h2>1. ¿Usa cookies esta web?</h2>
      <p>
        Esta web <strong>no usa cookies de análisis, de publicidad ni de redes sociales</strong>. Por eso no muestra un
        aviso para aceptar cookies.
      </p>
      <p>
        Solo usa el almacenamiento local de tu navegador (una tecnología parecida a las cookies) para recordar el carrito y
        el código postal de entrega mientras compras. Es imprescindible para el servicio que pides, por lo que no necesita
        consentimiento (artículo 22.2 de la LSSI-CE).
      </p>
      <table className="mt-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-linea">
            <th className="py-2 pr-4 font-semibold text-tinta">Nombre</th>
            <th className="py-2 pr-4 font-semibold text-tinta">Para qué sirve</th>
            <th className="py-2 font-semibold text-tinta">Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-linea align-top">
            <td className="py-2 pr-4 font-mono">cosecha-carrito-v1</td>
            <td className="py-2 pr-4">Productos del carrito y código postal de entrega.</td>
            <td className="py-2">Hasta que vacíes el carrito o borres los datos del navegador.</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Servicios de terceros</h2>
      <ul>
        <li>
          <strong>Pago con Stripe.</strong> Al pagar pasas a la página segura de Stripe (checkout.stripe.com), que usa sus
          propias cookies técnicas y de prevención del fraude según su política de privacidad.
        </li>
        <li>
          <strong>WhatsApp, Instagram y Facebook.</strong> Los botones son enlaces normales: solo al pulsarlos se abre el
          servicio correspondiente, con sus propias cookies.
        </li>
        <li>
          <strong>Tipografías.</strong> Se sirven desde la propia web, sin conectar con Google Fonts.
        </li>
      </ul>

      <h2>3. Cómo borrar estos datos</h2>
      <p>
        Puedes borrar el carrito desde la página del carrito o eliminar los datos de este sitio en la configuración de tu
        navegador.
      </p>

      <h2>4. Cambios</h2>
      <p>
        Si en el futuro se añaden herramientas de estadísticas o publicidad, se pedirá antes tu consentimiento con un aviso
        y se actualizará esta página. Más información en la <Link href="/legal/privacidad">política de privacidad</Link>.
      </p>
    </PaginaLegal>
  );
}
