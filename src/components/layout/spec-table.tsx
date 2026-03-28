import type { ReactNode } from "react";

export type SpecTableRow = {
  label: string;
  value: ReactNode;
};

export function SpecTable({
  title,
  rows,
}: {
  title?: string;
  rows: SpecTableRow[];
}) {
  const visibleRows = rows.filter((row) => row.value !== null && row.value !== undefined && row.value !== "");

  if (visibleRows.length === 0) {
    return null;
  }

  return (
    <div>
      {title ? <h3 className="text-data-heading mb-3 text-[1.05rem] leading-none text-stone-900">{title}</h3> : null}
      <div className="divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
        {visibleRows.map((row) => (
          <div key={row.label} className="grid gap-1.5 py-3 sm:grid-cols-[128px_minmax(0,1fr)] sm:items-start sm:gap-4">
            <div className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
              {row.label}
            </div>
            <div className="min-w-0 whitespace-pre-line break-words text-[13px] leading-6 text-stone-900">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
