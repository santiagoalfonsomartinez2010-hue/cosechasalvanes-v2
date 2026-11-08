import type { Metadata } from "next";
import Link from "next/link";
import { tienda } from "@/config/tienda";
import { PaginaLegal, Pendiente } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de la web de Cosecha de Salvanés (borrador pendiente de revisión).",
  alternates: { canonical: "/legal/aviso-legal" },
};

export default function AvisoLegal() {
  const { direccion } = tienda;
  return (
    <PaginaLegal titulo="Aviso legal">
      <h2>1. Titular de la web</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio
        electrónico (LSSI-CE), se informa de los datos del titular de esta web:
      </p>
      <ul>
        <li>
          <strong>Titular:</strong> <Pendiente>nombre y apellidos o razón social</Pendiente>, que opera con el nombre
          comercial «{tienda.nombre}».
        </li>
        <li>
          <strong>NIF / CIF:</strong> <Pendiente>número</Pendiente>
        </li>
        <li>
          <strong>Domicilio:</strong> <Pendiente>calle y número</Pendiente>, {direccion.localidad}, {direccion.codigoPostal},{" "}
          {direccion.provincia}, {direccion.pais}.
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${tienda.email}`}>{tienda.email}</a>
        </li>
        <li>
          <strong>Teléfonos:</strong> {tienda.telefonos.join(" · ")}
        </li>
        <li>
          <strong>Datos registrales:</strong> <Pendiente>solo si es una sociedad: Registro Mercantil, tomo, folio y hoja</Pendiente>
        </li>
        <li>
          <strong>Registros sanitarios y agrarios:</strong>{" "}
          <Pendiente>
            número de registro de la explotación y, si procede, del Registro Sanitario (venta de huevos y miel)
          </Pendiente>
        </li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Esta web informa sobre {tienda.nombre} y permite comprar sus productos de huerta, legumbres, huevos y miel con
        entrega a domicilio en las zonas de reparto indicadas en la página de{" "}
        <Link href="/envios-y-promociones">Envíos y promociones</Link>. Las compras se rigen por las{" "}
        <Link href="/legal/condiciones-de-venta">condiciones de venta</Link>.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso a la web es gratuito y atribuye la condición de usuario. El usuario se compromete a hacer un uso adecuado
        de los contenidos y a no emplearlos para actividades ilícitas o contrarias a la buena fe.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, el logotipo, el diseño y las fotografías propias de esta web pertenecen a su titular o se usan con
        autorización. No se permite su reproducción sin permiso.
      </p>
      <p>
        Algunas imágenes proceden de bancos de imágenes con licencia libre (Unsplash).{" "}
        <Pendiente>confirmar el origen y el permiso de uso de las fotografías antiguas en blanco y negro</Pendiente>
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        El titular procura que la información de la web sea correcta y esté actualizada, pero no garantiza la ausencia de
        errores puntuales en precios o disponibilidad. Si se detecta un error en un pedido, se avisará al cliente antes de
        la entrega para que decida si mantiene o anula la compra.
      </p>

      <h2>6. Enlaces a otras webs</h2>
      <p>
        La web enlaza con servicios de terceros (WhatsApp, Instagram, Facebook y la pasarela de pago Stripe). El titular no
        es responsable de sus contenidos ni de sus políticas, que conviene consultar en cada caso.
      </p>

      <h2>7. Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia con consumidores serán
        competentes los juzgados y tribunales del domicilio del consumidor.
      </p>
    </PaginaLegal>
  );
}
