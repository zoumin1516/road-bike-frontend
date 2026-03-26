import Link from "next/link";

import type { SearchItem, SearchItemType } from "@/types/search";

const TYPE_ORDER: SearchItemType[] = ["brand", "model", "build", "component"];

export function resolveSearchHref(item: SearchItem) {
  switch (item.type) {
    case "brand":
      return `/brands/${item.id}`;
    case "model":
      return `/models/${item.id}`;
    case "build":
      return `/builds/${item.id}`;
    case "component":
      return `/components/${item.id}`;
    default:
      return "/search";
  }
}

export function resolveSearchTypeLabel(type: SearchItemType) {
  switch (type) {
    case "brand":
      return "品牌";
    case "model":
      return "车型";
    case "build":
      return "配置";
    case "component":
      return "零部件";
    default:
      return type;
  }
}

export function sortSearchTypes(types: SearchItemType[]) {
  return [...types].sort((left, right) => {
    const leftIndex = TYPE_ORDER.indexOf(left);
    const rightIndex = TYPE_ORDER.indexOf(right);
    const normalizedLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
    const normalizedRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

    if (normalizedLeft !== normalizedRight) {
      return normalizedLeft - normalizedRight;
    }

    return String(left).localeCompare(String(right));
  });
}

export function SearchResultList({ items }: { items: SearchItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link
          key={`${item.type}-${item.id}`}
          href={resolveSearchHref(item)}
          className="group rounded-[1.5rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-4 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Search Hit</p>
              <h2 className="text-data-heading mt-1.5 truncate text-[1.15rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)]" title={item.title}>
                {item.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">{item.subtitle}</p>
            </div>
            <span className="text-data-meta shrink-0 rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
              {resolveSearchTypeLabel(item.type)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
