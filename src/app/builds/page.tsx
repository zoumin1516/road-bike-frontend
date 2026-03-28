import { BuildCard } from "@/components/builds/build-card";
import { ActiveFilters } from "@/components/layout/active-filters";
import { EmptyResults } from "@/components/layout/empty-results";
import { EntityTable } from "@/components/layout/entity-table";
import { FilterSidebar } from "@/components/layout/filter-sidebar";
import { PageIntro } from "@/components/layout/page-intro";
import { PaginationBar } from "@/components/layout/pagination-bar";
import { ResultsToolbar } from "@/components/layout/results-toolbar";
import { ViewModeSwitch } from "@/components/layout/view-mode-switch";
import { getBuilds } from "@/lib/api/builds";
import { getFilterMeta } from "@/lib/api/meta";
import { buildMetadata } from "@/lib/seo";
import { formatPrice, formatYear } from "@/lib/format";
import { toOptions } from "@/lib/utils/options";

export const metadata = buildMetadata({
  title: "配置库",
  description: "按套件、轮组、电变和价格区间筛选公路车配置。",
  path: "/builds",
});

export default async function BuildsPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    groupset_brand?: string;
    wheel_brand?: string;
    cockpit_type?: string;
    market_region?: string;
    is_electronic_shifting?: string;
    is_disc?: string;
    min_price?: string;
    max_price?: string;
    sort?: string;
    page?: string;
    page_size?: string;
    view?: string;
  }>;
}) {
  const {
    keyword,
    groupset_brand,
    wheel_brand,
    cockpit_type,
    market_region,
    is_electronic_shifting,
    is_disc,
    min_price,
    max_price,
    sort,
    page,
    page_size,
    view,
  } = await searchParams;
  const currentPage = Number(page || "1");
  const currentPageSize = Number(page_size || "12");

  const [data, meta] = await Promise.all([
    getBuilds({
      page: currentPage,
      page_size: currentPageSize,
      keyword,
      groupset_brand,
      wheel_brand,
      cockpit_type,
      market_region,
      is_electronic_shifting,
      is_disc,
      min_price,
      max_price,
      sort,
    }),
    getFilterMeta(),
  ]);

  const currentView = view === "table" ? "table" : "card";

  const currentFilters = {
    keyword,
    groupset_brand,
    wheel_brand,
    cockpit_type,
    market_region,
    is_electronic_shifting,
    is_disc,
    min_price,
    max_price,
    sort,
    page_size: String(currentPageSize),
    page: String(currentPage),
    view: currentView,
    __sortOptions: "year_desc::年份新到旧||year_asc::年份旧到新||price_desc::价格高到低||price_asc::价格低到高||name_asc::名称 A-Z||name_desc::名称 Z-A",
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow="Builds"
          title="配置库"
          description="按套件、轮组、电变和价格区间筛选配置。"
          stats={[
            { label: "总配置数", value: data.pagination.total },
            { label: "当前页", value: `${data.pagination.page} / ${Math.max(data.pagination.total_pages, 1)}` },
          ]}
        />

        <div className="mt-5 grid gap-6 lg:grid-cols-[260px_1fr]">
          <FilterSidebar
            title="配置筛选"
            values={currentFilters}
            fields={[
              { type: "input", name: "keyword", label: "关键词", placeholder: "配置名" },
              { name: "groupset_brand", label: "套件品牌", options: toOptions(meta.data.groupset_brands) },
              { name: "wheel_brand", label: "轮组品牌", options: toOptions(meta.data.wheel_brands) },
              { name: "cockpit_type", label: "把组类型", options: toOptions(meta.data.cockpit_types) },
              { name: "market_region", label: "市场区域", options: toOptions(meta.data.market_regions) },
              {
                name: "is_electronic_shifting",
                label: "电子变速",
                options: meta.data.electronic_shifting_options.map((value) => ({
                  label: value === "true" ? "是" : "否",
                  value,
                })),
              },
              {
                name: "is_disc",
                label: "碟刹",
                options: meta.data.disc_options.map((value) => ({
                  label: value === "true" ? "是" : "否",
                  value,
                })),
              },
              { type: "input", name: "min_price", label: "最低价格", inputType: "number", placeholder: "例如 20000" },
              { type: "input", name: "max_price", label: "最高价格", inputType: "number", placeholder: "例如 60000" },
            ]}
          />

          <div>
            <ResultsToolbar
              title="配置结果"
              meta={`共 ${data.pagination.total} 条`}
              controls={<ViewModeSwitch pathname="/builds" currentSearchParams={currentFilters} mode={currentView} />}
            />
            <ActiveFilters
              currentSearchParams={currentFilters}
              labels={{
                keyword: "关键词",
                groupset_brand: "套件品牌",
                wheel_brand: "轮组品牌",
                cockpit_type: "把组类型",
                market_region: "市场区域",
                is_electronic_shifting: "电子变速",
                is_disc: "碟刹",
                min_price: "最低价格",
                max_price: "最高价格",
                sort: "排序",
              }}
            />
            {data.items.length === 0 ? (
              <EmptyResults
                title="没有找到匹配的配置"
                description="推荐先放宽价格、电变或碟刹筛选。"
                currentSearchParams={currentFilters}
                browseHref="/builds"
                browseLabel="浏览全部配置"
              />
            ) : currentView === "table" ? (
              <EntityTable
                items={data.items}
                href={(build) => `/builds/${build.build_id}`}
                columns={[
                  {
                    key: "name",
                    label: "配置",
                    render: (build) => (
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-stone-900">{build.build_name}</div>
                        <div className="truncate text-[11px] text-[color:var(--muted)]">{build.build_id}</div>
                      </div>
                    ),
                  },
                  { key: "groupset", label: "套件", render: (build) => [build.groupset_brand, build.groupset_series].filter(Boolean).join(" ") || "-" },
                  { key: "price", label: "价格", render: (build) => formatPrice(build.msrp_price, build.msrp_currency) },
                  { key: "year", label: "年份", render: (build) => formatYear(build.model_year) },
                ]}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.items.map((build) => (
                  <BuildCard key={build.build_id} build={build} />
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
