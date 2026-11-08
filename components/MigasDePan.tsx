import Link from "next/link";
import { urlAbsoluta } from "@/lib/sitio";
import { JsonLd } from "@/components/JsonLd";

export type Miga = { nombre: string; href?: string };

export function MigasDePan({ migas }: { migas: Miga[] }) {
  const todas: Miga[] = [{ nombre: "Inicio", href: "/" }, ...migas];
  return (
    <>
      <nav aria-label="Ruta de navegación" className="etiqueta">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {todas.map((m, i) => (
            <li key={`${m.nombre}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>→</span>}
              {m.href && i < todas.length - 1 ? (
                <Link href={m.href} className="hover:text-tinta hover:underline">
                  {m.nombre}
                </Link>
              ) : (
                <span aria-current={i === todas.length - 1 ? "page" : undefined} className="text-tinta">
                  {m.nombre}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        datos={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: todas.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: m.nombre,
            ...(m.href ? { item: urlAbsoluta(m.href) } : {}),
          })),
        }}
      />
    </>
  );
}
