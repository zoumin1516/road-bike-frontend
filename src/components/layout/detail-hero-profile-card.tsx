import type { ReactNode } from "react";

export type DetailHeroProfileItem = {
  label: string;
  value: ReactNode;
  featured?: boolean;
};

export function DetailHeroProfileCard({
  title,
  items,
}: {
  title: string;
  items: DetailHeroProfileItem[];
}) {
  const featuredItem = items.find((item) => item.featured) || items[0];
  const detailItems = items.filter((item) => item !== featuredItem);

  return (
    <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-stone-50 px-5 py-5">
      <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{title}</p>
      <div className="mt-4 space-y-4">
        {featuredItem ? (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">{featuredItem.label}</p>
            <div className="mt-1 text-[1.05rem] font-semibold leading-7 text-stone-900">{featuredItem.value}</div>
          </div>
        ) : null}
        {detailItems.length ? (
          <div className="grid gap-3 border-t border-[color:var(--line)] pt-4">
            {detailItems.map((item) => (
              <div key={item.label}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">{item.label}</p>
                <div className="mt-1 text-[13px] leading-6 text-stone-900">{item.value}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
