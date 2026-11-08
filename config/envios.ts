/**
 * ZONAS DE REPARTO Y GASTOS DE ENVÍO
 * ----------------------------------
 * Este archivo se puede editar desde GitHub (botón del lápiz) sin saber programar.
 * Los importes van en euros. Cuando guardes, Vercel vuelve a publicar la web sola.
 *
 * Reglas copiadas de la página «Envíos y promociones» de la web original:
 *  - Municipios sin coste adicional: pedido mínimo 10 €, envío gratis siempre.
 *  - Municipios con coste de envío: pedido mínimo 25 €, envío 5 €,
 *    gratis «en los casos en que el pedido sea mayor a 50 €».
 *  - Resto de España: «Actualmente no realizamos envíos fuera de la Comunidad de Madrid».
 *
 * CÓDIGOS POSTALES: la web original no los daba. Los de abajo son los públicos de cada
 * municipio (comprobados en noviembre de 2026 en directorios de códigos postales,
 * Wikipedia y boletines oficiales). TODOS están PENDIENTES de que el dueño los confirme.
 * Las dudas concretas están en el campo «nota» de cada municipio.
 */

export type ComparacionEnvioGratis =
  /** Gratis solo si el pedido supera el importe (texto de la página de Envíos: «mayor a 50 €»). */
  | "mayor"
  /** Gratis también con el importe exacto («a partir de 50 €», como decía la barra superior). */
  | "mayor-o-igual";

export type Municipio = {
  nombre: string;
  codigosPostales: string[];
  nota?: string;
};

export type ZonaEnvio = {
  id: string;
  nombre: string;
  /** Si es false, la zona existe pero la web la trata como si no se repartiera allí. */
  activa: boolean;
  /** Pedido mínimo en euros (productos, sin contar el envío). */
  pedidoMinimo: number;
  /** Gastos de envío en euros. 0 = gratis siempre. null = sin fijar (no se puede pagar online). */
  costeEnvio: number | null;
  /** Importe a partir del cual el envío es gratis. null = nunca es gratis por importe. */
  envioGratisDesde: number | null;
  municipios: Municipio[];
};

export type ConfigEnvios = {
  comparacionEnvioGratis: ComparacionEnvioGratis;
  mensajeFueraDeMadrid: string;
  mensajeMadridSinReparto: string;
  zonas: ZonaEnvio[];
};

export const envios: ConfigEnvios = {
  /**
   * PENDIENTE: la página de Envíos dice «mayor a 50 €» y la barra superior decía
   * «a partir de 50 €». Se usa la regla de la página de Envíos. Para cambiarla,
   * pon "mayor-o-igual".
   */
  comparacionEnvioGratis: "mayor",

  /** Mensaje para códigos postales de fuera de la Comunidad de Madrid (texto de la web original). */
  mensajeFueraDeMadrid: "Actualmente no realizamos envíos fuera de la Comunidad de Madrid.",

  /** Mensaje para códigos de Madrid donde todavía no se reparte (texto de la sección REPARTO). */
  mensajeMadridSinReparto:
    "Estamos trabajando en abastecer los máximos rincones posibles. Pronto llegaremos a todas vuestras casas.",

  zonas: [
    {
      id: "sin-coste",
      nombre: "Municipios sin coste adicional",
      activa: true,
      pedidoMinimo: 10,
      costeEnvio: 0,
      envioGratisDesde: null,
      municipios: [
        { nombre: "Villarejo de Salvanés", codigosPostales: ["28590"] },
        { nombre: "Tielmes", codigosPostales: ["28550"] },
        { nombre: "Carabaña", codigosPostales: ["28560"] },
        {
          nombre: "Villanueva de la Cañada",
          codigosPostales: ["28691"],
          nota:
            "Villafranca del Castillo pertenece a este municipio pero está en la zona con coste. Se ha separado por código postal (28691 aquí, 28692 Villafranca). Confirmar con el dueño, porque algunas fuentes asignan también el 28692 a otras partes de Villanueva de la Cañada.",
        },
      ],
    },
    {
      id: "con-coste",
      nombre: "Municipios con coste de envío",
      activa: true,
      pedidoMinimo: 25,
      costeEnvio: 5,
      envioGratisDesde: 50,
      municipios: [
        { nombre: "Majadahonda", codigosPostales: ["28220", "28221", "28222"] },
        {
          nombre: "Pozuelo de Alarcón",
          codigosPostales: ["28223", "28224"],
          nota:
            "La web original dice «Pozuelo». Se entiende Pozuelo de Alarcón y no Pozuelo del Rey (28813), que está en otra parte de Madrid.",
        },
        {
          nombre: "Boadilla del Monte",
          codigosPostales: ["28660", "28668", "28669"],
          nota: "28660 es el general. 28669 y 28668 son de urbanizaciones; el 28668 solo aparece en un directorio.",
        },
        {
          nombre: "El Escorial",
          codigosPostales: ["28280"],
          nota:
            "28280 es el municipio de El Escorial. San Lorenzo de El Escorial (28200) es otro municipio: confirmar si también se reparte allí.",
        },
        { nombre: "Brunete", codigosPostales: ["28690"] },
        {
          nombre: "Villanueva del Pardillo",
          codigosPostales: ["28229"],
          nota: "Un directorio asigna el 28229 también a una urbanización de Villanueva de la Cañada.",
        },
        {
          nombre: "Villafranca del Castillo",
          codigosPostales: ["28692"],
          nota: "Urbanización del municipio de Villanueva de la Cañada (ver la nota de ese municipio).",
        },
      ],
    },
    {
      /**
       * «Fuera de Madrid a partir de 70 €» aparecía en la barra superior de la web original,
       * pero la página de Envíos dice que no se envía fuera de la Comunidad de Madrid.
       * Queda preparada y DESACTIVADA. Para activarla: activa: true y fija el costeEnvio.
       */
      id: "fuera-de-madrid",
      nombre: "Fuera de la Comunidad de Madrid",
      activa: false,
      pedidoMinimo: 0,
      costeEnvio: null, // PENDIENTE: el dueño debe fijar el precio antes de activarla
      envioGratisDesde: 70,
      municipios: [], // Se aplica a cualquier código postal que no empiece por 28
    },
  ],
};

/** Identificador de la zona que recoge los códigos postales de fuera de Madrid. */
export const ZONA_FUERA_DE_MADRID = "fuera-de-madrid";
