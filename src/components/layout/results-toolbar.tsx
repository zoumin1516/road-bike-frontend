import type { ReactNode } from "react";

export function ResultsToolbar({
  title,
  meta,
  controls,
}: {
  title: string;
  meta?: string;
  controls?: ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3 border-b border-[color:var(--line)] pb-1.5">
      <div className="min-w-0">
        <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">Results</p>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-stone-900">
          <span className="truncate font-medium">{title}</span>
          {meta ? <span className="truncate text-[color:var(--muted)]">{meta}</span> : null}
        </div>
      </div>
      {controls ? <div className="shrink-0">{controls}</div> : null}
    </div>
  );
}
