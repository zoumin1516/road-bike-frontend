import Link from "next/link";

import { formatPrice, formatYear } from "@/lib/format";
import type { BuildItem } from "@/types/build";

export function BuildCard({ build }: { build: BuildItem }) {
  return (
    <Link
      href={`/builds/${build.build_id}`}
      className="card-hover-glow group rounded-[1.2rem] border border-[color:var(--line)] bg-white p-4 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-stone-400"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{build.groupset_brand || "Build"}</p>
        <h2 title={build.build_name} className="text-data-heading mt-1.5 line-clamp-2 text-[1.1rem] font-semibold leading-tight text-stone-900 group-hover:text-stone-900">
          {build.build_name}
        </h2>
        <p className="mt-1.5 text-[12px] font-medium text-[color:var(--muted)]">
          {[formatYear(build.model_year), formatPrice(build.msrp_price, build.msrp_currency)].filter((value) => value && value !== "-").join(" / ") || "-"}
        </p>
        <p className="mt-2 text-[12px] text-[color:var(--muted)]">{[build.wheel_brand, build.cockpit_type].filter(Boolean).join(" / ") || "-"}</p>
        {build.notes ? <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[color:var(--muted)]">{build.notes}</p> : null}
      </div>
    </Link>
  );
}
