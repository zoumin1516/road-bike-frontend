import Link from "next/link";

import type { BrandItem } from "@/types/brand";

export function BrandCard({ brand }: { brand: BrandItem }) {
  return (
    <Link
      href={`/brands/${brand.brand_id}`}
      className="card-hover-glow group rounded-[1.2rem] border border-[color:var(--line)] bg-white p-4 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-stone-400"
    >
      <div className="min-w-0">
        {brand.brand_name_cn ? <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{brand.brand_name_cn}</p> : null}
        <h2 className="text-data-heading mt-1.5 line-clamp-2 text-[1.15rem] font-semibold leading-tight text-stone-900 group-hover:text-stone-900">
          {brand.brand_name_en}
        </h2>
        <p className="mt-2 text-[12px] font-medium text-[color:var(--muted)]">{brand.country_region || "-"}</p>
        {brand.notes ? <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[color:var(--muted)]">{brand.notes}</p> : null}
      </div>
    </Link>
  );
}
