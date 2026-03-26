import Link from "next/link";

import type { BuildItem } from "@/types/build";

export function BuildCard({ build }: { build: BuildItem }) {
  return (
    <Link
      href={`/builds/${build.build_id}`}
      className="group rounded-[1.45rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] px-4 py-4.5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Build</p>
        <h2
          title={build.build_name}
          className="text-data-heading mt-1.5 truncate text-[1.08rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)] sm:text-[1.18rem]"
        >
          {build.build_name}
        </h2>
        <div className="mt-1 flex items-center gap-2 text-xs">
          {build.model_year ? <p className="text-data-number font-semibold text-[color:var(--muted)]">{build.model_year}</p> : null}
          {build.msrp_price ? (
            <span className="text-data-number rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2 py-1 text-[10px] font-bold tracking-[0.04em] text-stone-800">
              {build.msrp_currency || "USD"} {build.msrp_price}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-stone-600">
        {build.groupset_brand ? (
          <span className="text-data-meta rounded-full bg-[rgba(191,91,44,0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
            {build.groupset_brand}
          </span>
        ) : null}
        {build.cockpit_type ? (
          <span className="text-data-meta rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
            {build.cockpit_type}
          </span>
        ) : null}
      </div>

      <div className="mt-3 grid gap-1.5 rounded-[1.1rem] bg-[rgba(255,255,255,0.62)] px-3 py-2.5 text-xs leading-5 text-stone-700">
        <p className="truncate">轮组：{[build.wheel_brand, build.wheel_model].filter(Boolean).join(" ") || "-"}</p>
        <p className="text-data-number">重量：{build.claimed_weight_kg ? `${build.claimed_weight_kg} kg` : "-"}</p>
      </div>

      {build.notes ? <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-[color:var(--muted)]">{build.notes}</p> : null}
    </Link>
  );
}
