const formato = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 350 → «3,50 €» */
export function formatearEuros(centimos: number): string {
  return formato.format(centimos / 100);
}

/** Para textos: 5000 → «50 €», 350 → «3,50 €» (sin «,00» si es un importe redondo). */
export function formatearEurosCorto(centimos: number): string {
  return centimos % 100 === 0 ? `${new Intl.NumberFormat("es-ES").format(centimos / 100)}\u00a0€` : formatearEuros(centimos);
}

/** 3.5 → 350. Redondea para evitar errores de coma flotante. */
export function eurosACentimos(euros: number): number {
  return Math.round(euros * 100);
}

/** Texto de la unidad de venta. Si no está confirmada, lo dice. */
export function textoUnidad(unidad: string | null): string {
  return unidad ? `/${unidad}` : "unidad por confirmar";
}

/** «3,50 €/kg» o «3,50 € · unidad por confirmar» (precio siempre con unidad). */
export function precioConUnidad(centimos: number, unidad: string | null): string {
  return unidad
    ? `${formatearEuros(centimos)}/${unidad}`
    : `${formatearEuros(centimos)} · unidad por confirmar`;
}
