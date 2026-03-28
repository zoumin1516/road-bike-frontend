import { ComponentCard } from "@/components/components/component-card";
import { ActiveFilters } from "@/components/layout/active-filters";
import { EmptyResults } from "@/components/layout/empty-results";
import { EntityTable } from "@/components/layout/entity-table";
import { FilterSidebar } from "@/components/layout/filter-sidebar";
import { PageIntro } from "@/components/layout/page-intro";
import { PaginationBar } from "@/components/layout/pagination-bar";
import { ResultsToolbar } from "@/components/layout/results-toolbar";
import { ViewModeSwitch } from "@/components/layout/view-mode-switch";
import { getComponents } from "@/lib/api/components";
import { getFilterMeta } from "@/lib/api/meta";
import { buildMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/format";
import { toOptions } from "@/lib/utils/options";

export const metadata = buildMetadata({
  title: "零部件库",
  description: "按类别、品牌和价格区间快速筛选公路车零部件。",
  path: "/components",
});

export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    component_category?: string;
    brand_name?: string;
    min_price?: string;
    max_price?: string;
    sort?: string;
    page?: string;
    page_size?: string;
    view?: string;
  }>;
}) {
  const { keyword, component_category, brand_name, min_price, max_price, sort, page, page_size, view } = await searchParams;
  const currentPage = Number(page || "1");
  const currentPageSize = Number(page_size || "12");

  const [data, meta] = await Promise.all([
    getComponents({ page: currentPage, page_size: currentPageSize, keyword, component_category, brand_name, min_price, max_price, sort }),
    getFilterMeta(),
  ]);

  const currentView = view === "table" ? "table" : "card";

  const currentFilters = {
    keyword,
    component_category,
    brand_name,
    min_price,
    max_price,
    sort,
    page_size: String(currentPageSize),
    page: String(currentPage),
    view: currentView,
    __sortOptions: "name_asc::名称 A-Z||name_desc::名称 Z-A||price_desc::价格高到低||price_asc::价格低到高||brand_asc::品牌 A-Z||brand_desc::品牌 Z-A",
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow="Components"
          title="零部件库"
          description="按类别、品牌和价格区间快速筛选零部件。"
          stats={[
            { label: "总零部件数", value: data.pagination.total },
            { label: "当前页", value: `${data.pagination.page} / ${Math.max(data.pagination.total_pages, 1)}` },
          ]}
        />

        <div className="mt-5 grid gap-6 lg:grid-cols-[260px_1fr]">
          <FilterSidebar
            title="零部件筛选"
            values={currentFilters}
            fields={[
              { type: "input", name: "keyword", label: "关键词", placeholder: "部件名 / 系列名" },
              { name: "component_category", label: "零部件类别", options: toOptions(meta.data.component_categories) },
              { name: "brand_name", label: "品牌", options: toOptions(meta.data.component_brands) },
              { type: "input", name: "min_price", label: "最低价格", inputType: "number", placeholder: "例如 500" },
              { type: "input", name: "max_price", label: "最高价格", inputType: "number", placeholder: "例如 15000" },
            ]}
          />

          <div>
            <ResultsToolbar
              title="零部件结果"
              meta={`共 ${data.pagination.total} 条`}
              controls={<ViewModeSwitch pathname="/components" currentSearchParams={currentFilters} mode={currentView} />}
            />
            <ActiveFilters
              currentSearchParams={currentFilters}
              labels={{
                keyword: "关键词",
                component_category: "零部件类别",
                brand_name: "品牌",
                min_price: "最低价格",
                max_price: "最高价格",
                sort: "排序",
              }}
            />
            {data.items.length === 0 ? (
              <EmptyResults
                title="没有找到匹配的零部件"
                description="建议先放宽价格或品牌筛选。"
                currentSearchParams={currentFilters}
                browseHref="/components"
                browseLabel="浏览全部零部件"
              />
            ) : currentView === "table" ? (
              <EntityTable
                items={data.items}
                href={(component) => `/components/${component.component_id}`}
                columns={[
                  {
                    key: "name",
                    label: "零部件",
                    render: (component) => (
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-stone-900">{component.component_name}</div>
                        <div className="truncate text-[11px] text-[color:var(--muted)]">{component.series || component.component_id}</div>
                      </div>
                    ),
                  },
                  { key: "brand", label: "品牌", render: (component) => component.brand_name },
                  { key: "category", label: "类别", render: (component) => component.component_category },
                  { key: "price", label: "价格", render: (component) => formatPrice(component.msrp_price, component.msrp_currency) },
                ]}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.items.map((component) => (
                  <ComponentCard key={component.component_id} component={component} />
                ))}
              </div>
            )}
            <PaginationBar pagination={data.pagination} currentSearchParams={currentFilters} />
          </div>
        </div>
      </section>
    </main>
  );
}
