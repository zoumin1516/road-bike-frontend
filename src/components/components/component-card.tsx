import Link from "next/link";

import { CardMedia } from "@/components/layout/card-media";
import type { ComponentItem } from "@/types/component";

export function ComponentCard({ component }: { component: ComponentItem }) {
  return (
    <Link
      href={`/components/${component.component_id}`}
      className="card-hover-glow group grid min-h-[236px] gap-5 rounded-[1.8rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,252,248,0.96),rgba(255,247,239,0.84))] p-5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] sm:min-h-[246px] sm:grid-cols-[minmax(0,1.3fr)_220px] sm:p-6"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Component</p>
        <h2 title={component.component_name} className="text-data-heading mt-2 text-[1.35rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)] sm:text-[1.58rem]">
          {component.component_name}
        </h2>
        <p className="mt-2 text-sm font-medium text-[color:var(--muted)]">{component.brand_name}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-stone-600">
          <span className="text-data-meta rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
            {component.component_category}
          </span>
          {component.series ? (
            <span className="text-data-meta rounded-full bg-[rgba(191,91,44,0.1)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
              {component.series}
            </span>
          ) : null}
        </div>

        {component.notes ? <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">{component.notes}</p> : null}
      </div>

      <div className="flex h-full flex-col justify-between gap-4 rounded-[1.35rem] border border-white/65 bg-white/70 p-4 backdrop-blur-sm">
        <CardMedia
          label="零部件展示图 / 产品图"
          tone="component"
          imageUrl={component.image_url || component.hero_image_url}
          alt={`${component.component_name} visual`}
        />
        <div>
          <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Price</p>
          <p className="text-data-number mt-2 text-lg font-bold leading-none text-stone-900">
            {component.msrp_price ? `${component.msrp_currency || "USD"} ${component.msrp_price}` : "-"}
          </p>
        </div>
        <span className="text-data-meta inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 transition group-hover:text-[color:var(--accent-strong)]">
          View component
        </span>
      </div>
    </Link>
  );
}
