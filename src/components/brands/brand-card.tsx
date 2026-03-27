import Link from "next/link";

import { CardMedia } from "@/components/layout/card-media";
import type { BrandItem } from "@/types/brand";

export function BrandCard({ brand }: { brand: BrandItem }) {
  return (
    <Link
      href={`/brands/${brand.brand_id}`}
      className="card-hover-glow group grid min-h-[228px] gap-5 rounded-[1.8rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,252,248,0.96),rgba(255,247,239,0.84))] p-5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] sm:min-h-[238px] sm:grid-cols-[minmax(0,1.2fr)_200px] sm:items-start sm:p-6"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Brand</p>
        <h2 className="text-data-heading mt-2 text-[1.45rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)] sm:text-[1.72rem]">
          {brand.brand_name_en}
        </h2>
        {brand.brand_name_cn ? <p className="mt-2 text-sm font-medium text-[color:var(--muted)]">{brand.brand_name_cn}</p> : null}
        {brand.notes ? <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">{brand.notes}</p> : null}
      </div>

      <div className="flex h-full flex-col justify-between gap-4 rounded-[1.35rem] border border-white/65 bg-white/70 p-4 backdrop-blur-sm">
        <CardMedia
          label="品牌 Logo / 展示图"
          tone="brand"
          imageUrl={brand.logo_url || brand.hero_image_url}
          alt={`${brand.brand_name_en} visual`}
        />
        <div className="space-y-3">
          {brand.country_region ? (
            <div>
              <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Country</p>
              <p className="mt-1 text-sm font-semibold text-stone-900">{brand.country_region}</p>
            </div>
          ) : null}
          {brand.market_positioning ? (
            <div>
              <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Positioning</p>
              <span className="mt-1 inline-flex rounded-full bg-[rgba(191,91,44,0.12)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
                {brand.market_positioning}
              </span>
            </div>
          ) : null}
        </div>
        <span className="text-data-meta inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 transition group-hover:text-[color:var(--accent-strong)]">
          View brand
        </span>
      </div>
    </Link>
  );
}
