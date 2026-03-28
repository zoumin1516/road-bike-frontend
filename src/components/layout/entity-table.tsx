import Link from "next/link";

import type { ReactNode } from "react";

export type EntityTableColumn<T> = {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
};

export function EntityTable<T>({
  items,
  href,
  columns,
}: {
  items: T[];
  href: (item: T) => string;
  columns: EntityTableColumn<T>[];
}) {
  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-[color:var(--line)] bg-white shadow-[var(--shadow)]">
      <div className="hidden grid-cols-[minmax(220px,1.2fr)_repeat(3,minmax(120px,0.8fr))] gap-4 border-b border-[color:var(--line)] bg-stone-50 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)] lg:sticky lg:top-0 lg:z-10 lg:grid">
        {columns.map((column) => (
          <div key={column.key}>{column.label}</div>
        ))}
      </div>
      <div className="divide-y divide-[color:var(--line)]">
        {items.map((item, index) => (
          <Link
            key={index}
            href={href(item)}
            className="grid gap-2.5 px-4 py-3 transition hover:bg-stone-50 lg:grid-cols-[minmax(220px,1.2fr)_repeat(3,minmax(120px,0.8fr))] lg:items-center lg:gap-4"
          >
            {columns.map((column) => (
              <div key={column.key} className="min-w-0">
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)] lg:hidden">{column.label}</div>
                <div className="mt-1 text-[13px] leading-5 text-stone-900 lg:mt-0">{column.render(item) || "-"}</div>
              </div>
            ))}
          </Link>
        ))}
      </div>
    </div>
  );
}
