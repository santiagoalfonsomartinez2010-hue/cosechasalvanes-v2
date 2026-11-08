import { envios, ZONA_FUERA_DE_MADRID, type ZonaEnvio } from "@/config/envios";
import { eurosACentimos, formatearEurosCorto } from "@/lib/dinero";

/**
 * Cálculo de gastos de envío a partir de config/envios.ts.
 * Se usa igual en el navegador (para enseñar el precio) y en el servidor (al pagar),
 * así el cliente nunca puede cambiar el importe que se cobra.
 */

export type Destino = {
  zona: ZonaEnvio;
  /** null para la zona «fuera de Madrid», que no tiene lista de municipios. */
  municipio: string | null;
};

export type BusquedaCP =
  | { estado: "invalido" }
  | { estado: "fuera-de-madrid"; mensaje: string }
  | { estado: "madrid-sin-reparto"; mensaje: string }
  | { estado: "encontrado"; destinos: Destino[] };

export function normalizarCP(cp: string): string {
  return cp.replace(/\s+/g, "");
}

export function esCPValido(cp: string): boolean {
  return /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(normalizarCP(cp));
}

export function zonasActivas(): ZonaEnvio[] {
  return envios.zonas.filter((z) => z.activa);
}

/** Busca en qué zona(s) y municipio(s) cae un código postal. */
export function buscarCP(cpEntrada: string): BusquedaCP {
  const cp = normalizarCP(cpEntrada);
  if (!esCPValido(cp)) return { estado: "invalido" };

  const destinos: Destino[] = [];
  for (const zona of zonasActivas()) {
    for (const municipio of zona.municipios) {
      if (municipio.codigosPostales.includes(cp)) {
        destinos.push({ zona, municipio: municipio.nombre });
      }
    }
  }
  if (destinos.length > 0) return { estado: "encontrado", destinos };

  const esMadrid = cp.startsWith("28");
  if (!esMadrid) {
    const fuera = zonasActivas().find((z) => z.id === ZONA_FUERA_DE_MADRID);
    if (fuera) return { estado: "encontrado", destinos: [{ zona: fuera, municipio: null }] };
    return { estado: "fuera-de-madrid", mensaje: envios.mensajeFueraDeMadrid };
  }
  return { estado: "madrid-sin-reparto", mensaje: envios.mensajeMadridSinReparto };
}

export type CalculoEnvio = {
  pedidoMinimoCentimos: number;
  cumpleMinimo: boolean;
  faltaParaMinimoCentimos: number;
  /** null si la zona no tiene precio fijado: no se puede pagar online. */
  costeCentimos: number | null;
  esGratis: boolean;
  /** Cuánto falta para el envío gratis. null si la zona no tiene envío gratis por importe. */
  faltaParaGratisCentimos: number | null;
  umbralGratisCentimos: number | null;
};

export function superaUmbralGratis(subtotalCentimos: number, umbralCentimos: number): boolean {
  return envios.comparacionEnvioGratis === "mayor-o-igual"
    ? subtotalCentimos >= umbralCentimos
    : subtotalCentimos > umbralCentimos;
}

export function calcularEnvio(zona: ZonaEnvio, subtotalCentimos: number): CalculoEnvio {
  const minimo = eurosACentimos(zona.pedidoMinimo);
  const umbral = zona.envioGratisDesde === null ? null : eurosACentimos(zona.envioGratisDesde);
  const costeBase = zona.costeEnvio === null ? null : eurosACentimos(zona.costeEnvio);

  const gratisPorImporte = umbral !== null && superaUmbralGratis(subtotalCentimos, umbral);
  const esGratis = costeBase === 0 || gratisPorImporte;
  const coste = esGratis ? 0 : costeBase;

  let faltaParaGratis: number | null = null;
  if (umbral !== null && !esGratis) {
    // Con «mayor», hace falta superar el umbral al menos en 1 céntimo.
    const objetivo = envios.comparacionEnvioGratis === "mayor" ? umbral + 1 : umbral;
    faltaParaGratis = Math.max(0, objetivo - subtotalCentimos);
  }

  return {
    pedidoMinimoCentimos: minimo,
    cumpleMinimo: subtotalCentimos >= minimo,
    faltaParaMinimoCentimos: Math.max(0, minimo - subtotalCentimos),
    costeCentimos: coste,
    esGratis,
    faltaParaGratisCentimos: faltaParaGratis,
    umbralGratisCentimos: umbral,
  };
}

/** «a partir de 50 €» o «de más de 50 €», según la regla configurada. */
export function textoUmbral(euros: number): string {
  const importe = formatearEurosCorto(eurosACentimos(euros));
  return envios.comparacionEnvioGratis === "mayor-o-igual"
    ? `a partir de ${importe}`
    : `de más de ${importe}`;
}

/** Texto de la barra superior, generado a partir de las zonas activas. */
export function textoBarraEnvios(): string {
  const conUmbral = zonasActivas().filter(
    (z) => z.id !== ZONA_FUERA_DE_MADRID && z.envioGratisDesde !== null,
  );
  const umbralMadrid = conUmbral.length
    ? Math.max(...conUmbral.map((z) => z.envioGratisDesde as number))
    : null;
  const partes: string[] = [];
  if (umbralMadrid !== null) {
    partes.push(`Envío gratis en Madrid en pedidos ${textoUmbral(umbralMadrid)}`);
  }
  const fuera = zonasActivas().find((z) => z.id === ZONA_FUERA_DE_MADRID);
  if (fuera && fuera.envioGratisDesde !== null) {
    partes.push(`fuera de Madrid en pedidos ${textoUmbral(fuera.envioGratisDesde)}`);
  }
  return partes.join(" y ");
}
