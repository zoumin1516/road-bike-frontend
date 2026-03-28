import Link from "next/link";

import { formatPrice } from "@/lib/format";
import type { ComponentItem } from "@/types/component";

export function ComponentCard({ component }: { component: ComponentItem }) {
  return (
    <Link
      href={`/components/${component.component_id}`}
      className="card-hover-glow group rounded-[1.2rem] border border-[color:var(--line)] bg-white p-4 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-stone-400"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{component.component_category}</p>
        <h2 title={component.component_name} className="text-data-heading mt-1.5 line-clamp-2 text-[1.1rem] font-semibold leading-tight text-stone-900 group-hover:text-stone-900">
          {component.component_name}
        </h2>
        <p className="mt-1.5 truncate text-[12px] font-medium text-[color:var(--muted)]">{component.brand_name}</p>
        <p className="mt-2 text-[12px] text-[color:var(--muted)]">{[component.series, formatPrice(component.msrp_price, component.msrp_currency)].filter((value) => value && value !== "-").join(" / ") || "-"}</p>
        {component.notes ? <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[color:var(--muted)]">{component.notes}</p> : null}
      </div>
    </Link>
  );
}
