import type { Metadata } from "next";
import Link from "next/link";
import { tienda } from "@/config/tienda";
import { PaginaLegal, Pendiente } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata Cosecha de Salvanés los datos personales (borrador pendiente de revisión).",
  alternates: { canonical: "/legal/privacidad" },
};

export default function Privacidad() {
  return (
    <PaginaLegal titulo="Política de privacidad">
      <p>
        Esta política explica cómo se tratan los datos personales en la web de {tienda.nombre}, conforme al Reglamento
        (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos
        digitales (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        <Pendiente>nombre o razón social y NIF</Pendiente>, con domicilio en {tienda.direccion.localidad} (
        {tienda.direccion.codigoPostal}, {tienda.direccion.provincia}) y email{" "}
        <a href={`mailto:${tienda.email}`}>{tienda.email}</a>. Más datos en el <Link href="/legal/aviso-legal">aviso legal</Link>.
      </p>

      <h2>2. Qué datos tratamos y para qué</h2>
      <h3>Pedidos</h3>
      <p>
        Cuando haces un pedido pedimos tu nombre, teléfono, email, dirección y código postal de entrega, y las notas que
        quieras añadir. Los usamos para preparar, cobrar y entregar el pedido y para contactar contigo sobre él.
      </p>
      <p>
        <strong>Base legal:</strong> la ejecución del contrato de compraventa (art. 6.1.b RGPD) y el cumplimiento de
        obligaciones legales contables y fiscales (art. 6.1.c RGPD).
      </p>
      <h3>Pagos con tarjeta</h3>
      <p>
        El pago se hace en la página segura de Stripe. Nosotros no vemos ni guardamos los datos de tu tarjeta: los trata
        Stripe como proveedor de pagos.
      </p>
      <h3>Consultas</h3>
      <p>
        El formulario de contacto no envía datos a nuestra web: abre tu WhatsApp o tu correo con el mensaje escrito, y eres
        tú quien lo envía. Usamos los datos de tu mensaje solo para responderte (consentimiento, art. 6.1.a RGPD).
      </p>
      <h3>Newsletter y novedades por WhatsApp</h3>
      <p>
        Todavía no está activa. Cuando lo esté, solo enviaremos novedades a quien lo haya pedido marcando la casilla de
        consentimiento, que se podrá retirar en cualquier momento (art. 6.1.a RGPD).{" "}
        <Pendiente>herramienta de envío de la newsletter</Pendiente>
      </p>

      <h2>3. Cuánto tiempo guardamos los datos</h2>
      <p>
        Los datos de los pedidos se conservan mientras dure la relación comercial y, después, durante los plazos que
        exige la ley (por ejemplo, seis años para la documentación contable según el Código de Comercio).{" "}
        <Pendiente>confirmar plazos con la gestoría</Pendiente>
      </p>

      <h2>4. Con quién compartimos los datos</h2>
      <p>No vendemos ni cedemos datos a terceros. Algunos proveedores nos prestan servicios y acceden a ellos por encargo nuestro:</p>
      <ul>
        <li>
          <strong>Stripe Payments Europe, Ltd.</strong> (pagos con tarjeta).
        </li>
        <li>
          <strong>Vercel Inc.</strong> (alojamiento de la web). Puede implicar transferencias a Estados Unidos amparadas
          en el Marco de Privacidad de Datos UE-EE. UU. o en cláusulas contractuales tipo.
        </li>
        <li>
          <strong>Meta Platforms</strong> (WhatsApp e Instagram) y <strong>Google</strong> (correo electrónico), si
          contactas con nosotros por esos medios.
        </li>
      </ul>
      <p>
        <Pendiente>revisar la lista de proveedores y sus garantías antes de publicar</Pendiente>
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes pedir el acceso, la rectificación o la supresión de tus datos, la limitación u oposición a su tratamiento y
        su portabilidad, escribiendo a <a href={`mailto:${tienda.email}`}>{tienda.email}</a>. Si crees que no hemos tratado
        bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          www.aepd.es
        </a>
        ).
      </p>

      <h2>6. Datos guardados en tu navegador</h2>
      <p>
        La web guarda en tu propio navegador el contenido del carrito y el código postal que escribes, para que no se
        pierdan al cambiar de página. No se envían a ningún servidor hasta que decides pagar. Más información en la{" "}
        <Link href="/legal/cookies">política de cookies</Link>.
      </p>

      <h2>7. Menores</h2>
      <p>Las compras están dirigidas a mayores de edad.</p>
    </PaginaLegal>
  );
}
