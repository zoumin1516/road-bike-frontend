import Link from "next/link";

import type { ModelItem } from "@/types/model";

export function ModelCard({ model }: { model: ModelItem }) {
  return (
    <Link
      href={`/models/${model.model_id}`}
      className="card-hover-glow group rounded-[1.2rem] border border-[color:var(--line)] bg-white p-4 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-stone-400"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{model.bike_category || "Model"}</p>
        <h2 title={model.model_name} className="text-data-heading mt-1.5 line-clamp-2 text-[1.1rem] font-semibold leading-tight text-stone-900 group-hover:text-stone-900">
          {model.model_name}
        </h2>
        {model.series_name ? <p className="mt-1.5 truncate text-[12px] font-medium text-[color:var(--muted)]">{model.series_name}</p> : null}
        <p className="mt-2 text-[12px] text-[color:var(--muted)]">{[model.frame_material, model.brake_type].filter(Boolean).join(" / ") || "-"}</p>
        {model.notes ? <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[color:var(--muted)]">{model.notes}</p> : null}
      </div>
    </Link>
  );
}
