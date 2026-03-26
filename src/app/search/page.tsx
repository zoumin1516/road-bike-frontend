import { EmptyResults } from "@/components/layout/empty-results";
import { PageIntro } from "@/components/layout/page-intro";
import { SearchResultList, resolveSearchTypeLabel, sortSearchTypes } from "@/components/search/search-result-list";
import { searchAll } from "@/lib/api/search";
import type { SearchItem, SearchItemType } from "@/types/search";

const quickQueries = ["Shimano", "Canyon", "Aero", "Ultegra", "碟刹", "轮组"];

function groupItemsByType(items: SearchItem[]) {
  const grouped = new Map<SearchItemType, SearchItem[]>();

  for (const item of items) {
    const bucket = grouped.get(item.type) ?? [];
    bucket.push(item);
    grouped.set(item.type, bucket);
  }

  return grouped;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; page_size?: string }>;
}) {
  const { q, type, page_size } = await searchParams;
  const keyword = q?.trim() || "Shimano";
  const currentPageSize = Number(page_size || "20");
  const data = await searchAll({ q: keyword, page: 1, page_size: currentPageSize, type });
  const groupedItems = groupItemsByType(data.items);
  const groupedTypes = sortSearchTypes([...groupedItems.keys()]);

  const currentFilters = {
    q: keyword,
    type: type || "",
    page_size: String(currentPageSize),
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow="Search"
          title="全站搜索"
          description="统一检索品牌、车型、配置和零部件，并按类型查看结果。"
          stats={[
            { label: "关键词", value: keyword },
            { label: "结果数", value: data.pagination.total },
          ]}
        />

        <div className="mt-7 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-4 shadow-[var(--shadow)] sm:p-5">
          <form className="grid gap-3 lg:grid-cols-[1fr_200px_140px]" method="get">
            <input
              type="text"
              name="q"
              defaultValue={keyword}
              placeholder="搜索品牌、车型、配置、套件或零部件"
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[color:var(--accent)] focus:bg-white"
            />
            <select
              name="type"
              defaultValue={type || ""}
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-4 text-sm text-stone-800 outline-none transition focus:border-[color:var(--accent)] focus:bg-white"
            >
              <option value="">全部类型</option>
              <option value="brand">品牌</option>
              <option value="model">车型</option>
              <option value="build">配置</option>
              <option value="component">零部件</option>
            </select>
            <input type="hidden" name="page_size" value={String(currentPageSize)} />
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)]"
            >
              搜索
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-data-meta text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">Quick Query</span>
            {quickQueries.map((item) => (
              <a
                key={item}
                href={`/search?q=${encodeURIComponent(item)}${type ? `&type=${encodeURIComponent(type)}` : ""}`}
                className="inline-flex items-center rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-1.5 text-[12px] font-medium text-stone-700 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[1.2rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.78)] px-4 py-3 shadow-[var(--shadow)]">
          <span className="text-data-meta text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">Search State</span>
          <span className="text-sm text-stone-700">关键词：<span className="font-semibold text-stone-900">{keyword}</span></span>
          <span className="text-sm text-stone-700">类型：<span className="font-semibold text-stone-900">{type || "全部"}</span></span>
          <span className="text-sm text-stone-700">结果：<span className="text-data-number font-semibold text-stone-900">{data.pagination.total}</span></span>
        </div>

        {data.items.length > 0 ? (
          <section className="mt-7 rounded-[1.5rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.82)] p-4 shadow-[var(--shadow)] sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-data-meta text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">Type Stats</span>
              {groupedTypes.map((groupType) => (
                <span
                  key={groupType}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-1.5 text-xs font-medium text-stone-700"
                >
                  <span>{resolveSearchTypeLabel(groupType)}</span>
                  <span className="text-data-number rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-stone-900">
                    {groupedItems.get(groupType)?.length ?? 0}
                  </span>
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-7">
          {data.items.length === 0 ? (
            <EmptyResults
              title="没有找到匹配的搜索结果"
              description="可以尝试更短的关键词、切换搜索类型，或者先回到全部类型重新检索。"
              currentSearchParams={currentFilters}
              browseHref="/search"
              browseLabel="重新浏览搜索"
            />
          ) : (
            <div className="space-y-8">
              {groupedTypes.map((groupType) => {
                const items = groupedItems.get(groupType) ?? [];

                return (
                  <section key={groupType} className="rounded-[1.5rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-4 shadow-[var(--shadow)] sm:p-5">
                    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[color:var(--line)] pb-4">
                      <div>
                        <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Result Group</p>
                        <h2 className="text-data-heading mt-2 text-[1.4rem] leading-none text-stone-900">{resolveSearchTypeLabel(groupType)}</h2>
                      </div>
                      <p className="text-sm text-stone-700">
                        共 <span className="text-data-number font-semibold text-stone-900">{items.length}</span> 条
                      </p>
                    </div>
                    <div className="mt-5">
                      <SearchResultList items={items} />
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
