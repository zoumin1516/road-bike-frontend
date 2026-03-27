import Link from "next/link";

import { CardMedia } from "@/components/layout/card-media";
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
    <div className="grid gap-4 xl:grid-cols-2">
      {items.map((item) => (
        <Link
          key={`${item.type}-${item.id}`}
          href={resolveSearchHref(item)}
          className="card-hover-glow group grid min-h-[220px] gap-4 rounded-[1.7rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,252,248,0.96),rgba(255,247,239,0.84))] p-5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] sm:grid-cols-[minmax(0,1fr)_180px] sm:items-start"
        >
          <div className="min-w-0 flex-1">
            <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Search Hit</p>
            <h2 className="text-data-heading mt-2 text-[1.3rem] leading-none text-stone-900 group-hover:text-[color:var(--accent-strong)]" title={item.title}>
              {item.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[color:var(--muted)]">{item.subtitle}</p>
          </div>
          <div className="flex h-full flex-col justify-between gap-3 rounded-[1.2rem] border border-white/65 bg-white/70 p-3.5 backdrop-blur-sm">
            <CardMedia
              label="搜索结果预留图位"
              tone="search"
              imageUrl={item.image_url}
              alt={`${item.title} visual`}
            />
            <span className="text-data-meta inline-flex w-fit rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
              {resolveSearchTypeLabel(item.type)}
            </span>
            <span className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 transition group-hover:text-[color:var(--accent-strong)]">
              Open detail
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
