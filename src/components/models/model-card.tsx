import Link from "next/link";

import type { ModelItem } from "@/types/model";

export function ModelCard({ model }: { model: ModelItem }) {
  return (
    <Link
      href={`/models/${model.model_id}`}
      className="group rounded-[1.45rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] px-4 py-4.5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Model</p>
        <h2
          title={model.model_name}
          className="text-data-heading mt-1.5 truncate text-[1.12rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)] sm:text-[1.22rem]"
        >
          {model.model_name}
        </h2>
        {model.series_name ? <p className="mt-1 truncate text-xs font-medium text-[color:var(--muted)]">{model.series_name}</p> : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-stone-600">
        {model.bike_category ? (
          <span className="text-data-meta rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
            {model.bike_category}
          </span>
        ) : null}
        {model.frame_material ? (
          <span className="text-data-meta rounded-full bg-[rgba(191,91,44,0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
            {model.frame_material}
          </span>
        ) : null}
        {model.brake_type ? (
          <span className="text-data-meta rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
            {model.brake_type}
          </span>
        ) : null}
      </div>

      {model.notes ? <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-[color:var(--muted)]">{model.notes}</p> : null}
    </Link>
  );
}
