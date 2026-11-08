import { formatearEuros } from "@/lib/dinero";

/** Precio siempre con su unidad de venta (o «unidad por confirmar»). */
export function Precio({ centimos, unidad, tamano = "normal" }: { centimos: number; unidad: string | null; tamano?: "normal" | "grande" }) {
  return (
    <span className="inline-flex flex-col">
      <span className={`tabular-nums ${tamano === "grande" ? "titular text-5xl" : "font-semibold"}`}>
        {formatearEuros(centimos)}
        {unidad && <span className="text-tinta-2">/{unidad}</span>}
      </span>
      {!unidad && <span className="text-[0.72rem] text-tinta-2">unidad por confirmar</span>}
    </span>
  );
}
