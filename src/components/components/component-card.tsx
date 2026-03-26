import Link from "next/link";

import type { ComponentItem } from "@/types/component";

export function ComponentCard({ component }: { component: ComponentItem }) {
  return (
    <Link
      href={`/components/${component.component_id}`}
      className="group rounded-[1.45rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] px-4 py-4.5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Component</p>
        <h2
          title={component.component_name}
          className="text-data-heading mt-1.5 truncate text-[1.08rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)] sm:text-[1.18rem]"
        >
          {component.component_name}
        </h2>
        <p className="mt-1 truncate text-xs font-medium text-[color:var(--muted)]">{component.brand_name}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-stone-600">
        <span className="text-data-meta rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
          {component.component_category}
        </span>
        {component.series ? (
          <span className="text-data-meta rounded-full bg-[rgba(191,91,44,0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
            {component.series}
          </span>
        ) : null}
        {component.msrp_price ? (
          <span className="text-data-number rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2.5 py-1 text-[10px] font-bold tracking-[0.04em] text-stone-800">
            {component.msrp_currency || "USD"} {component.msrp_price}
          </span>
        ) : null}
      </div>

      {component.notes ? <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-[color:var(--muted)]">{component.notes}</p> : null}
    </Link>
  );
}
