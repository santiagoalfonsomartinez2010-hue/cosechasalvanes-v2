/**
 * DATOS GENERALES DE LA TIENDA
 * ----------------------------
 * Este archivo se puede editar desde GitHub (botón del lápiz) sin saber programar.
 * Cambia solo el texto que va entre comillas y guarda con «Commit changes».
 * Vercel vuelve a publicar la web sola en uno o dos minutos.
 *
 * Lo marcado como PENDIENTE está a la espera de que lo confirme el dueño
 * (ver docs/pendientes-final.md).
 */

export const tienda = {
  nombre: "Cosecha de Salvanés",
  lema: "Desde el corazón de la tierra hasta tu mesa",

  /** Dirección visible en la web original. PENDIENTE: confirmar la dirección completa. */
  direccion: {
    localidad: "Villarejo de Salvanés",
    codigoPostal: "28590",
    provincia: "Madrid",
    pais: "España",
    codigoPais: "ES",
  },

  email: "cosechadesalvanes@gmail.com",

  /** Teléfonos tal y como aparecen en la web original. */
  telefonos: ["+34 688 909 278", "+34 620 761 482"],

  /**
   * Número al que abre el botón flotante de WhatsApp, solo dígitos y con prefijo 34.
   * PENDIENTE: confirmar cuál de los dos teléfonos tiene WhatsApp.
   */
  whatsapp: "34688909278",

  redes: {
    grupoWhatsapp: "https://chat.whatsapp.com/EqFCuoXhh9WC0xStmd7j5i",
    instagram: "https://www.instagram.com/cosechadesalvanes/",
    instagramUsuario: "@cosechadesalvanes",
    facebook: "https://www.facebook.com/people/Cosecha-de-Salvan%C3%A9s/61566027274756/",
  },

  /** Plazo de pedidos según la página de Envíos. PENDIENTE: confirmar que sigue vigente. */
  plazoPedidos:
    "Los pedidos se podrán encargar hasta el jueves, para así realizar las entregas durante el fin de semana.",
} as const;

export const catalogoAjustes = {
  /**
   * Si es true, los productos agotados se ven en el catálogo con la etiqueta «Agotado».
   * Si es false (recomendado), se ocultan y el cliente puede mostrarlos con una casilla.
   */
  mostrarAgotadosPorDefecto: false,

  /**
   * Unidad de venta de cada producto. Ninguna está confirmada todavía, así que la web
   * muestra «unidad por confirmar». Cuando el dueño las confirme, añádelas así:
   *
   *   patata: "kg",
   *   "huevos-camperos": "docena",
   *   "miel-de-flores-natural": "bote",
   *
   * Valores habituales: "kg", "unidad", "docena", "manojo", "bote", "paquete".
   */
  unidades: {} as Record<string, string>,

  /**
   * Categoría de los productos que en Wix solo estaban en «Todos los productos».
   * PENDIENTE: el dueño debe decir dónde van. Ejemplo: patata: ["huerta-de-invierno"],
   */
  categoriasExtra: {} as Record<string, string[]>,
};

export const newsletter = {
  /**
   * La web todavía no tiene dónde guardar los emails de la newsletter.
   * Mientras esté en false, el formulario explica que aún no se guardan y no envía nada.
   */
  activa: false,
};

/** Precio de 1,00 € = 100 céntimos. Todo el dinero se maneja en céntimos para evitar redondeos. */
export const moneda = "EUR";
