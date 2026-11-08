"use client";

import { useEffect, useMemo, useState } from "react";
import type { Categoria, ProductoLigero } from "@/lib/catalogo";
import { FilaProducto } from "@/components/FilaProducto";
import { IconoBuscar } from "@/components/Iconos";

const TODOS = "todos";

const normalizar = (t: string) =>
  t
    .toLocaleLowerCase("es-ES")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

/**
 * Tienda en formato «pizarra de precios»: categorías en columna (escritorio) o desplegable
 * (móvil), buscador y lista de filas. El filtro se guarda en la dirección (?categoria=…&agotados=1).
 */
export function Pizarra({
  productos,
  categorias,
  mostrarAgotadosPorDefecto,
}: {
  productos: ProductoLigero[];
  categorias: Categoria[];
  mostrarAgotadosPorDefecto: boolean;
}) {
  const [categoria, setCategoria] = useState(TODOS);
  const [verAgotados, setVerAgotados] = useState(mostrarAgotadosPorDefecto);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get("categoria");
    if (c && categorias.some((x) => x.slug === c)) setCategoria(c);
    if (p.get("agotados") === "1") setVerAgotados(true);
  }, [categorias]);

  const actualizarUrl = (c: string, agotados: boolean) => {
    const p = new URLSearchParams();
    if (c !== TODOS) p.set("categoria", c);
    if (agotados !== mostrarAgotadosPorDefecto) p.set("agotados", agotados ? "1" : "0");
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const elegirCategoria = (c: string) => {
    setCategoria(c);
    actualizarUrl(c, verAgotados);
  };

  const base = useMemo(() => productos.filter((p) => verAgotados || p.disponible), [productos, verAgotados]);
  const contar = (c: string) => (c === TODOS ? base.length : base.filter((p) => p.categorias.includes(c)).length);
  const termino = normalizar(busqueda.trim());
  const lista = base
    .filter((p) => categoria === TODOS || p.categorias.includes(categoria))
    .filter((p) => !termino || normalizar(p.nombre).includes(termino));
  const nombres = new Map(categorias.map((c) => [c.slug, c.nombre]));
  const actual = categorias.find((c) => c.slug === categoria);
  const opciones = [{ slug: TODOS, nombre: "Todos los productos" }, ...categorias];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="space-y-5 lg:sticky lg:top-8">
          <div className="relative">
            <label htmlFor="buscar" className="sr-only">
              Buscar producto
            </label>
            <IconoBuscar className="pointer-events-none absolute top-1/2 left-0 h-5 w-5 -translate-y-1/2 text-tinta-2" />
            <input
              id="buscar"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar: tomate, miel…"
              className="entrada pl-7"
            />
          </div>

          <div className="lg:hidden">
            <label htmlFor="categoria" className="etiqueta">
              Categoría
            </label>
            <select id="categoria" value={categoria} onChange={(e) => elegirCategoria(e.target.value)} className="entrada mt-1 bg-papel">
              {opciones.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.nombre} ({contar(o.slug)})
                </option>
              ))}
            </select>
          </div>

          <nav aria-label="Categorías" className="hidden lg:block">
            <p className="etiqueta">Categorías</p>
            <ul className="mt-2">
              {opciones.map((o) => {
                const elegida = o.slug === categoria;
                return (
                  <li key={o.slug}>
                    <button
                      type="button"
                      onClick={() => elegirCategoria(o.slug)}
                      aria-pressed={elegida}
                      className={`flex w-full items-baseline justify-between border-b border-linea py-2.5 text-left ${
                        elegida ? "font-semibold text-tinta" : "text-tinta-2 hover:text-tinta"
                      }`}
                    >
                      <span className="flex items-baseline gap-2">
                        <span aria-hidden className={elegida ? "" : "invisible"}>
                          →
                        </span>
                        {o.nombre}
                      </span>
                      <span className="text-xs tabular-nums">{contar(o.slug)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={verAgotados}
              onChange={(e) => {
                setVerAgotados(e.target.checked);
                actualizarUrl(categoria, e.target.checked);
              }}
              className="h-5 w-5 accent-tinta"
            />
            Mostrar también los agotados
          </label>
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="flex items-baseline justify-between gap-4 border-b border-tinta pb-3">
          <h2 className="titular text-3xl">{actual?.nombre ?? "Todos los productos"}</h2>
          <p className="text-sm tabular-nums text-tinta-2" aria-live="polite">
            {lista.length === 1 ? "1 producto" : `${lista.length} productos`}
          </p>
        </div>
        {actual?.descripcion && <p className="mt-3 text-sm text-tinta-2">{actual.descripcion}</p>}
        {lista.length > 0 ? (
          <ul className="grid gap-x-8 xl:grid-cols-2">
            {lista.map((p, i) => (
              <li key={p.slug}>
                <FilaProducto producto={p} categoria={p.categorias[0] ? nombres.get(p.categorias[0]) : undefined} preload={i < 2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center">
            <p className="titular text-3xl">Ahora mismo no hay productos disponibles aquí.</p>
            {!verAgotados && (
              <button
                type="button"
                onClick={() => {
                  setVerAgotados(true);
                  actualizarUrl(categoria, true);
                }}
                className="btn btn-linea mt-5"
              >
                Ver también los agotados
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
