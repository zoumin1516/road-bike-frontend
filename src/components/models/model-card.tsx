import Link from "next/link";

import { CardMedia } from "@/components/layout/card-media";
import type { ModelItem } from "@/types/model";

export function ModelCard({ model }: { model: ModelItem }) {
  return (
    <Link
      href={`/models/${model.model_id}`}
      className="card-hover-glow group grid min-h-[236px] gap-5 rounded-[1.8rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,252,248,0.96),rgba(255,247,239,0.84))] p-5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] sm:min-h-[246px] sm:grid-cols-[minmax(0,1.35fr)_220px] sm:p-6"
    >
      <div className="min-w-0">
        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Model</p>
        <h2 title={model.model_name} className="text-data-heading mt-2 text-[1.4rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)] sm:text-[1.68rem]">
          {model.model_name}
        </h2>
        {model.series_name ? <p className="mt-2 text-sm font-medium text-[color:var(--muted)]">{model.series_name}</p> : null}

        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-stone-600">
          {model.bike_category ? (
            <span className="text-data-meta rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
              {model.bike_category}
            </span>
          ) : null}
          {model.frame_material ? (
            <span className="text-data-meta rounded-full bg-[rgba(191,91,44,0.1)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
              {model.frame_material}
            </span>
          ) : null}
          {model.brake_type ? (
            <span className="text-data-meta rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
              {model.brake_type}
            </span>
          ) : null}
        </div>

        {model.notes ? <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">{model.notes}</p> : null}
      </div>

      <div className="flex h-full flex-col justify-between gap-4 rounded-[1.35rem] border border-white/65 bg-white/70 p-4 backdrop-blur-sm">
        <CardMedia
          label="车型图片 / 平台视觉"
          tone="model"
          imageUrl={model.image_url || model.hero_image_url}
          alt={`${model.model_name} visual`}
        />
        <div>
          <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Browse Detail</p>
          <p className="mt-2 text-sm leading-6 text-stone-700">查看车型平台、材质、刹车制式与系列归属，继续进入明细页深入浏览。</p>
        </div>
        <span className="text-data-meta inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 transition group-hover:text-[color:var(--accent-strong)]">
          View model
        </span>
      </div>
    </Link>
  );
}
