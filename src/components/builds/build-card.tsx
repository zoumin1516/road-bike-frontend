import Link from "next/link";

import { CardMedia } from "@/components/layout/card-media";
import type { BuildItem } from "@/types/build";

export function BuildCard({ build }: { build: BuildItem }) {
  return (
    <Link
      href={`/builds/${build.build_id}`}
      className="card-hover-glow group grid min-h-[244px] gap-5 rounded-[1.8rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,252,248,0.96),rgba(255,247,239,0.84))] p-5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] sm:min-h-[254px] sm:grid-cols-[minmax(0,1.35fr)_230px] sm:p-6"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Build</p>
        <h2 title={build.build_name} className="text-data-heading mt-2 text-[1.35rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)] sm:text-[1.62rem]">
          {build.build_name}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          {build.model_year ? <p className="text-data-number font-semibold text-[color:var(--muted)]">{build.model_year}</p> : null}
          {build.msrp_price ? (
            <span className="text-data-number rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-1.5 text-[10px] font-bold tracking-[0.04em] text-stone-800">
              {build.msrp_currency || "USD"} {build.msrp_price}
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-stone-600">
          {build.groupset_brand ? (
            <span className="text-data-meta rounded-full bg-[rgba(191,91,44,0.1)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
              {build.groupset_brand}
            </span>
          ) : null}
          {build.cockpit_type ? (
            <span className="text-data-meta rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
              {build.cockpit_type}
            </span>
          ) : null}
        </div>

        {build.notes ? <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">{build.notes}</p> : null}
      </div>

      <div className="flex h-full flex-col justify-between gap-4 rounded-[1.35rem] border border-white/65 bg-white/70 p-4 backdrop-blur-sm">
        <CardMedia
          label="整车配置图 / 官方渲染"
          tone="build"
          imageUrl={build.image_url || build.hero_image_url}
          alt={`${build.build_name} visual`}
        />
        <div className="grid gap-3 text-sm leading-6 text-stone-700">
          <div>
            <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Wheelset</p>
            <p className="mt-1 line-clamp-2">{[build.wheel_brand, build.wheel_model].filter(Boolean).join(" ") || "-"}</p>
          </div>
          <div>
            <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Weight</p>
            <p className="text-data-number mt-1 font-semibold text-stone-900">{build.claimed_weight_kg ? `${build.claimed_weight_kg} kg` : "-"}</p>
          </div>
        </div>
        <span className="text-data-meta inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 transition group-hover:text-[color:var(--accent-strong)]">
          View build
        </span>
      </div>
    </Link>
  );
}
