import Link from "next/link";

import type { BrandItem } from "@/types/brand";

export function BrandCard({ brand }: { brand: BrandItem }) {
  return (
    <Link
      href={`/brands/${brand.brand_id}`}
      className="group rounded-[1.45rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-4 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Brand</p>
          <h2 className="text-data-heading mt-1.5 truncate text-[1.22rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)] sm:text-[1.32rem]">
            {brand.brand_name_en}
          </h2>
          {brand.brand_name_cn ? <p className="mt-1 truncate text-xs font-medium text-[color:var(--muted)]">{brand.brand_name_cn}</p> : null}
        </div>
        {brand.country_region ? (
          <span className="text-data-meta shrink-0 rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
            {brand.country_region}
          </span>
        ) : null}
      </div>

      {brand.market_positioning ? (
        <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-stone-600">
          <span className="text-data-meta rounded-full bg-[rgba(191,91,44,0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
            {brand.market_positioning}
          </span>
        </div>
      ) : null}

      {brand.notes ? <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-[color:var(--muted)]">{brand.notes}</p> : null}
    </Link>
  );
}
