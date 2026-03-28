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
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Link
          key={`${item.type}-${item.id}`}
          href={resolveSearchHref(item)}
          className="card-hover-glow group rounded-[1.2rem] border border-[color:var(--line)] bg-white p-4 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-stone-400"
        >
          <div className="min-w-0">
            <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{resolveSearchTypeLabel(item.type)}</p>
            <h2 className="text-data-heading mt-1.5 line-clamp-2 text-[1.05rem] font-semibold leading-tight text-stone-900 group-hover:text-stone-900" title={item.title}>
              {item.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[color:var(--muted)]">{item.subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
