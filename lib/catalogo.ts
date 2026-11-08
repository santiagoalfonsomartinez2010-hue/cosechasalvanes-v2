import datos from "@/content/original/catalogo.json";
import { catalogoAjustes } from "@/config/tienda";
import { eurosACentimos } from "@/lib/dinero";

/**
 * Catálogo de la tienda. Se lee de content/original/catalogo.json (contenido migrado de Wix),
 * que no se modifica. Las unidades y categorías que confirme el dueño se añaden en
 * config/tienda.ts.
 */

export type ImagenProducto = { src: string; ancho: number; alto: number };

export type Producto = {
  slug: string;
  slugOriginal: string;
  nombre: string;
  orden: number;
  precioCentimos: number;
  /** null mientras la unidad de venta no esté confirmada. */
  unidad: string | null;
  disponible: boolean;
  categorias: string[];
  cinta: string | null;
  /** Párrafos de la descripción original. Vacío si no hay descripción real (no se inventa). */
  descripcion: string[];
  informacionAdicional: { titulo: string; parrafos: string[] }[];
  opciones: { nombre: string; valores: string[] }[];
  imagenes: ImagenProducto[];
};

export type Categoria = {
  slug: string;
  nombre: string;
  orden: number;
  descripcion: string | null;
};

type ProductoJson = (typeof datos.productos)[number];

function parrafos(texto: string): string[] {
  return texto
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function aTitulo(texto: string): string {
  const minus = texto.toLocaleLowerCase("es-ES");
  return minus.charAt(0).toLocaleUpperCase("es-ES") + minus.slice(1);
}

function normalizar(p: ProductoJson): Producto {
  const unidadConfig = catalogoAjustes.unidades[p.slug];
  const unidadJson = p.unidad && p.unidad !== "PENDIENTE" ? p.unidad : null;
  return {
    slug: p.slug,
    slugOriginal: p.slug_original,
    nombre: p.nombre,
    orden: p.orden,
    precioCentimos: eurosACentimos(p.precio),
    unidad: unidadConfig ?? unidadJson,
    disponible: p.disponible,
    categorias: [...p.categorias, ...(catalogoAjustes.categoriasExtra[p.slug] ?? [])],
    cinta: p.cinta,
    // Solo se muestra la descripción real; las vacías y las de plantilla de Wix se descartan.
    descripcion: p.descripcion_estado === "original" ? parrafos(p.descripcion) : [],
    informacionAdicional: p.informacion_adicional.map((info) => ({
      titulo: aTitulo(info.titulo),
      parrafos: parrafos(info.texto),
    })),
    opciones: p.opciones.map((o) => ({ nombre: o.nombre, valores: [...o.valores] })),
    imagenes: p.imagenes.map((i) => ({ src: i.archivo, ancho: i.ancho, alto: i.alto })),
  };
}

const productos: Producto[] = datos.productos.map(normalizar).sort((a, b) => a.orden - b.orden);

const categorias: Categoria[] = datos.categorias
  .map((c) => ({ slug: c.slug, nombre: c.nombre, orden: c.orden, descripcion: c.descripcion_seo }))
  .sort((a, b) => a.orden - b.orden);

export function obtenerProductos(): Producto[] {
  return productos;
}

export function obtenerProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function obtenerCategorias(): Categoria[] {
  return categorias;
}

export function obtenerCategoria(slug: string): Categoria | undefined {
  return categorias.find((c) => c.slug === slug);
}

/** Datos mínimos que necesita el navegador (carrito, filtros). Sin descripciones. */
export type ProductoLigero = {
  slug: string;
  nombre: string;
  precioCentimos: number;
  unidad: string | null;
  disponible: boolean;
  categorias: string[];
  cinta: string | null;
  imagen: ImagenProducto | null;
  opciones: { nombre: string; valores: string[] }[];
};

export function aLigero(p: Producto): ProductoLigero {
  return {
    slug: p.slug,
    nombre: p.nombre,
    precioCentimos: p.precioCentimos,
    unidad: p.unidad,
    disponible: p.disponible,
    categorias: p.categorias,
    cinta: p.cinta,
    imagen: p.imagenes[0] ?? null,
    opciones: p.opciones,
  };
}

export function obtenerProductosLigeros(): ProductoLigero[] {
  return productos.map(aLigero);
}
