import type { Metadata } from "next";
import Link from "next/link";
import { envios, ZONA_FUERA_DE_MADRID } from "@/config/envios";
import { tienda } from "@/config/tienda";
import { eurosACentimos, formatearEurosCorto } from "@/lib/dinero";
import { textoUmbral, zonasActivas } from "@/lib/envio";
import { PaginaLegal, Pendiente } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Condiciones de venta",
  description: "Condiciones generales de venta de Cosecha de Salvanés (borrador pendiente de revisión).",
  alternates: { canonical: "/legal/condiciones-de-venta" },
};

const euros = (n: number) => formatearEurosCorto(eurosACentimos(n));

export default function CondicionesDeVenta() {
  const zonas = zonasActivas().filter((z) => z.id !== ZONA_FUERA_DE_MADRID);
  const fuera = zonasActivas().find((z) => z.id === ZONA_FUERA_DE_MADRID);
  return (
    <PaginaLegal titulo="Condiciones de venta">
      <p>
        Estas condiciones regulan las compras hechas en esta web, conforme al Real Decreto Legislativo 1/2007 (Ley General
        para la Defensa de los Consumidores y Usuarios) y a la Ley 34/2002 (LSSI-CE). Al hacer un pedido, el cliente
        declara haberlas leído y aceptado.
      </p>

      <h2>1. Vendedor</h2>
      <p>
        Los datos del vendedor ({tienda.nombre}) están en el <Link href="/legal/aviso-legal">aviso legal</Link>. Contacto:{" "}
        <a href={`mailto:${tienda.email}`}>{tienda.email}</a> · {tienda.telefonos.join(" · ")}.
      </p>

      <h2>2. Productos y precios</h2>
      <ul>
        <li>Los precios están en euros e incluyen el IVA.</li>
        <li>
          Cada precio se refiere a la unidad de venta indicada en el producto.{" "}
          <Pendiente>la unidad de venta de cada producto (kg, unidad, docena, manojo, bote…)</Pendiente>
        </li>
        <li>
          Son productos del campo y de temporada: el tamaño y el aspecto pueden variar ligeramente de una pieza a otra.{" "}
          <Pendiente>indicar si en los productos por peso se ajusta el precio al peso real</Pendiente>
        </li>
        <li>La disponibilidad depende de la cosecha. Los productos agotados no se pueden comprar.</li>
      </ul>

      <h2>3. Cómo se hace un pedido</h2>
      <ol>
        <li>Añade los productos al carrito.</li>
        <li>Escribe tu código postal para comprobar la zona de reparto, el pedido mínimo y los gastos de envío.</li>
        <li>Rellena tus datos de entrega y acepta estas condiciones.</li>
        <li>Paga con tarjeta en la página segura de Stripe. El contrato se perfecciona cuando el pago se confirma.</li>
      </ol>
      <p>{tienda.plazoPedidos} <Pendiente>días y franjas de entrega concretos</Pendiente></p>

      <h2>4. Zonas de reparto y gastos de envío</h2>
      <p>Solo se reparte en estas zonas de la Comunidad de Madrid:</p>
      <ul>
        {zonas.map((z) => (
          <li key={z.id}>
            <strong>{z.nombre}</strong> ({z.municipios.map((m) => m.nombre).join(", ")}): pedido mínimo{" "}
            {euros(z.pedidoMinimo)};{" "}
            {z.costeEnvio === 0
              ? "envío gratis."
              : z.costeEnvio === null
                ? "gastos de envío a consultar."
                : `envío ${euros(z.costeEnvio)}${z.envioGratisDesde !== null ? `, gratis en pedidos ${textoUmbral(z.envioGratisDesde)}` : ""}.`}
          </li>
        ))}
      </ul>
      <p>
        {fuera
          ? `Fuera de la Comunidad de Madrid${fuera.envioGratisDesde !== null ? `, envío gratis en pedidos ${textoUmbral(fuera.envioGratisDesde)}` : ""}.`
          : envios.mensajeFueraDeMadrid}
      </p>

      <h2>5. Pago</h2>
      <p>
        El pago se hace con tarjeta a través de Stripe, que cumple la normativa de seguridad de pagos. {tienda.nombre} no
        conoce ni guarda los datos de la tarjeta. <Pendiente>si se aceptarán Bizum o pago en la entrega</Pendiente>
      </p>
      <p>
        Los códigos promocionales (BIENVENIDO26, PROMOSUSCRIPTORES) se aplican en los encargos por WhatsApp o Instagram,
        según se explica en <Link href="/envios-y-promociones#promociones">Envíos y promociones</Link>.
      </p>

      <h2>6. Entrega</h2>
      <p>
        El pedido se entrega en la dirección indicada. Si no hay nadie para recibirlo, se contactará con el cliente por
        teléfono o WhatsApp. <Pendiente>qué ocurre si el cliente no está: nuevo intento, coste, dejarlo a un vecino…</Pendiente>
      </p>

      <h2>7. Derecho de desistimiento</h2>
      <p>
        Como regla general, el consumidor puede desistir de una compra a distancia en el plazo de 14 días naturales desde
        la entrega, sin dar explicaciones (artículo 102 de la Ley General para la Defensa de los Consumidores y Usuarios).
      </p>
      <p>Según el artículo 103 de esa ley, no hay derecho de desistimiento en:</p>
      <ul>
        <li>
          Productos que pueden deteriorarse o caducar con rapidez, como las verduras, hortalizas, frutas y huevos frescos.
        </li>
        <li>
          Productos precintados que no se pueden devolver por razones de salud o higiene una vez abiertos.
        </li>
      </ul>
      <p>
        Para los productos no perecederos sin abrir (por ejemplo, legumbres envasadas o miel con el precinto intacto), el
        cliente puede desistir escribiendo a <a href={`mailto:${tienda.email}`}>{tienda.email}</a> con este modelo:
      </p>
      <blockquote>
        A la atención de {tienda.nombre}, {tienda.email}: por la presente le comunico que desisto de mi contrato de venta
        del siguiente bien: [producto], pedido el [fecha] y recibido el [fecha]. Nombre del consumidor, dirección, firma
        (solo si se envía en papel) y fecha.
      </blockquote>
      <p>
        El importe se devolverá en un máximo de 14 días por el mismo medio de pago.{" "}
        <Pendiente>quién paga la devolución y cómo se recoge el producto</Pendiente>
      </p>

      <h2>8. Productos en mal estado o pedidos incorrectos</h2>
      <p>
        Si algún producto llega en mal estado o el pedido no es correcto, avisa cuanto antes por WhatsApp o email, a ser
        posible con una foto, y se buscará una solución (reposición o devolución del importe).{" "}
        <Pendiente>política de devoluciones real: plazo para avisar y solución</Pendiente>
      </p>

      <h2>9. Atención al cliente y reclamaciones</h2>
      <p>
        Para cualquier consulta o reclamación: <a href={`mailto:${tienda.email}`}>{tienda.email}</a> o los teléfonos{" "}
        {tienda.telefonos.join(" y ")}. El consumidor también puede solicitar una hoja de reclamaciones o acudir a los
        servicios de consumo de la Comunidad de Madrid.
      </p>

      <h2>10. Ley aplicable</h2>
      <p>
        Estas condiciones se rigen por la ley española. En caso de conflicto, el consumidor puede acudir a los juzgados de
        su domicilio.
      </p>
    </PaginaLegal>
  );
}
