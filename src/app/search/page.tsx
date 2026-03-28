import { EmptyResults } from "@/components/layout/empty-results";
import { EntityTable } from "@/components/layout/entity-table";
import { PageIntro } from "@/components/layout/page-intro";
import { ResultsToolbar } from "@/components/layout/results-toolbar";
import { ViewModeSwitch } from "@/components/layout/view-mode-switch";
import { SearchResultList, resolveSearchHref, resolveSearchTypeLabel, sortSearchTypes } from "@/components/search/search-result-list";
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

function resolveSearchPageCopy(type?: string) {
  switch (type) {
    case "brand":
      return {
        eyebrow: "Brand Search",
        title: "搜索品牌",
        description: "按关键词快速检索品牌，并切换卡片或表格查看结果。",
      };
    case "model":
      return {
        eyebrow: "Model Search",
        title: "搜索车型",
        description: "按关键词快速检索车型，并切换卡片或表格查看结果。",
      };
    case "build":
      return {
        eyebrow: "Build Search",
        title: "搜索配置",
        description: "按关键词快速检索配置，并切换卡片或表格查看结果。",
      };
    case "component":
      return {
        eyebrow: "Component Search",
        title: "搜索零部件",
        description: "按关键词快速检索零部件，并切换卡片或表格查看结果。",
      };
    default:
      return {
        eyebrow: "Search",
        title: "全站搜索",
        description: "统一检索品牌、车型、配置和零部件，并按类型查看结果。",
      };
  }
}

function getSearchTableColumns(type?: string) {
  const titleColumn = {
    key: "title",
    label: "结果",
    render: (item: SearchItem) => (
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-stone-900">{item.title}</div>
        <div className="truncate text-[11px] text-[color:var(--muted)]">{item.id}</div>
      </div>
    ),
  };

  switch (type) {
    case "brand":
      return [
        titleColumn,
        { key: "type", label: "类型", render: () => "品牌" },
        { key: "subtitle", label: "国家 / 简介", render: (item: SearchItem) => item.subtitle || "-" },
        { key: "open", label: "详情", render: () => "查看" },
      ];
    case "model":
      return [
        titleColumn,
        { key: "type", label: "类型", render: () => "车型" },
        { key: "subtitle", label: "类别 / 简介", render: (item: SearchItem) => item.subtitle || "-" },
        { key: "open", label: "详情", render: () => "查看" },
      ];
    case "build":
      return [
        titleColumn,
        { key: "type", label: "类型", render: () => "配置" },
        { key: "subtitle", label: "价格 / 套件", render: (item: SearchItem) => item.subtitle || "-" },
        { key: "open", label: "详情", render: () => "查看" },
      ];
    case "component":
      return [
        titleColumn,
        { key: "type", label: "类型", render: () => "零部件" },
        { key: "subtitle", label: "品牌 / 规格", render: (item: SearchItem) => item.subtitle || "-" },
        { key: "open", label: "详情", render: () => "查看" },
      ];
    default:
      return [
        titleColumn,
        { key: "type", label: "类型", render: (item: SearchItem) => resolveSearchTypeLabel(item.type) },
        { key: "subtitle", label: "摘要", render: (item: SearchItem) => item.subtitle || "-" },
        { key: "open", label: "详情", render: () => "查看" },
      ];
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; page_size?: string; view?: string }>;
}) {
  const { q, type, page_size, view } = await searchParams;
  const keyword = q?.trim() || "Shimano";
  const currentPageSize = Number(page_size || "20");
  const data = await searchAll({ q: keyword, page: 1, page_size: currentPageSize, type });
  const groupedItems = groupItemsByType(data.items);
  const groupedTypes = sortSearchTypes([...groupedItems.keys()]);
  const currentView = view === "table" ? "table" : "card";
  const isSingleTypeView = Boolean(type && groupedTypes.length <= 1);
  const pageCopy = resolveSearchPageCopy(type);
  const currentColumns = getSearchTableColumns(type);

  const currentFilters = {
    q: keyword,
    type: type || "",
    page_size: String(currentPageSize),
    view: currentView,
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow={pageCopy.eyebrow}
          title={pageCopy.title}
          description={pageCopy.description}
          stats={[
            { label: "关键词", value: keyword },
            { label: "结果数", value: data.pagination.total },
          ]}
        />

        <div className="mt-4 rounded-[1rem] border border-[color:var(--line)] bg-white p-3.5 shadow-[var(--shadow)]">
          <form className="grid gap-2.5 lg:grid-cols-[1fr_180px_120px]" method="get">
            <input
              type="text"
              name="q"
              defaultValue={keyword}
              placeholder="搜索品牌、车型、配置、套件或零部件"
              className="h-10 rounded-lg border border-[color:var(--line)] bg-white px-3.5 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-stone-900 focus:bg-white"
            />
            <select
              name="type"
              defaultValue={type || ""}
              className="h-10 rounded-lg border border-[color:var(--line)] bg-white px-3.5 text-sm text-stone-800 outline-none transition focus:border-stone-900 focus:bg-white"
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
              className="inline-flex h-10 items-center justify-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              搜索
            </button>
          </form>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="text-data-meta text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">Quick Query</span>
            {quickQueries.map((item) => (
              <a
                key={item}
                href={`/search?q=${encodeURIComponent(item)}${type ? `&type=${encodeURIComponent(type)}` : ""}`}
                className="inline-flex items-center rounded-full border border-[color:var(--line)] bg-white px-3 py-1.5 text-[12px] font-medium text-stone-700 transition hover:border-[color:var(--accent)] hover:text-stone-900"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <ResultsToolbar
            title="搜索结果"
            meta={`共 ${data.pagination.total} 条`}
            controls={
              <div className="flex items-center gap-3">
                <div className="text-[10px] text-[color:var(--muted)]">
                  {type ? `类型 ${resolveSearchTypeLabel(type as SearchItemType)}` : "全部类型"}
                </div>
                <ViewModeSwitch pathname="/search" currentSearchParams={currentFilters} mode={currentView} />
              </div>
            }
          />
        </div>

        {data.items.length > 0 && !isSingleTypeView ? (
          <section className="mt-4 rounded-[1rem] border border-[color:var(--line)] bg-white p-3.5 shadow-[var(--shadow)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-data-meta text-[9px] uppercase tracking-[0.14em] text-[color:var(--accent)]">Type Stats</span>
              {groupedTypes.map((groupType) => (
                <span
                  key={groupType}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-medium text-stone-700"
                >
                  <span>{resolveSearchTypeLabel(groupType)}</span>
                  <span className="text-data-number rounded-full bg-stone-50 px-2 py-0.5 text-[10px] font-semibold text-stone-900">
                    {groupedItems.get(groupType)?.length ?? 0}
                  </span>
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-6">
          {data.items.length === 0 ? (
            <EmptyResults
              title="没有找到匹配的搜索结果"
              description="可以尝试更短的关键词、切换搜索类型，或者先回到全部类型重新检索。"
              currentSearchParams={currentFilters}
              browseHref="/search"
              browseLabel="重新浏览搜索"
            />
          ) : isSingleTypeView ? (
            currentView === "table" ? (
              <EntityTable
                items={data.items}
                href={(item) => resolveSearchHref(item)}
                columns={currentColumns}
              />
            ) : (
              <SearchResultList items={data.items} />
            )
          ) : (
            <div className="space-y-5">
              {groupedTypes.map((groupType) => {
                const items = groupedItems.get(groupType) ?? [];

                return (
                  <section key={groupType} className="rounded-[1rem] border border-[color:var(--line)] bg-white p-3.5 shadow-[var(--shadow)]">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line)] pb-2.5">
                      <div className="flex items-center gap-2">
                        <h2 className="text-data-heading text-[1.1rem] font-semibold leading-none text-stone-900">{resolveSearchTypeLabel(groupType)}</h2>
                        <span className="text-[11px] text-[color:var(--muted)]">共 {items.length} 条</span>
                      </div>
                    </div>
                    {currentView === "table" ? (
                      <EntityTable
                        items={items}
                        href={(item) => resolveSearchHref(item)}
                        columns={getSearchTableColumns(groupType)}
                      />
                    ) : (
                      <SearchResultList items={items} />
                    )}
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
