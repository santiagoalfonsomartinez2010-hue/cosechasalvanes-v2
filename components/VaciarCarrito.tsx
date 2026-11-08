"use client";

import { useEffect } from "react";
import { vaciarCarrito } from "@/lib/carrito";

/** Vacía el carrito una vez confirmado el pago. */
export function VaciarCarrito() {
  useEffect(() => {
    vaciarCarrito();
  }, []);
  return null;
}
