import { BrandCard } from "@/components/brands/brand-card";
import { ActiveFilters } from "@/components/layout/active-filters";
import { EmptyResults } from "@/components/layout/empty-results";
import { EntityTable } from "@/components/layout/entity-table";
import { FilterSidebar } from "@/components/layout/filter-sidebar";
import { PageIntro } from "@/components/layout/page-intro";
import { PaginationBar } from "@/components/layout/pagination-bar";
import { ResultsToolbar } from "@/components/layout/results-toolbar";
import { ViewModeSwitch } from "@/components/layout/view-mode-switch";
import { getBrands } from "@/lib/api/brands";
import { getFilterMeta } from "@/lib/api/meta";
import { buildMetadata } from "@/lib/seo";
import { toOptions } from "@/lib/utils/options";

export const metadata = buildMetadata({
  title: "品牌库",
  description: "按国家、定位和销售模式浏览主流公路车品牌。",
  path: "/brands",
});

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    country_region?: string;
    market_positioning?: string;
    sales_model?: string;
    brand_type?: string;
    sort?: string;
    page?: string;
    page_size?: string;
    view?: string;
  }>;
}) {
  const { keyword, country_region, market_positioning, sales_model, brand_type, sort, page, page_size, view } = await searchParams;
  const currentPage = Number(page || "1");
  const currentPageSize = Number(page_size || "12");

  const [data, meta] = await Promise.all([
    getBrands({ page: currentPage, page_size: currentPageSize, keyword, country_region, market_positioning, sales_model, brand_type, sort }),
    getFilterMeta(),
  ]);

  const currentView = view === "table" ? "table" : "card";

  const currentFilters = {
    keyword,
    country_region,
    market_positioning,
    sales_model,
    brand_type,
    sort,
    page_size: String(currentPageSize),
    page: String(currentPage),
    view: currentView,
    __sortOptions: "name_asc::名称 A-Z||name_desc::名称 Z-A||country_asc::地区 A-Z||country_desc::地区 Z-A",
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow="Brands"
          title="品牌库"
          description="按地区、定位和销售模式快速筛选品牌。"
          stats={[
            { label: "总品牌数", value: data.pagination.total },
            { label: "当前页", value: `${data.pagination.page} / ${Math.max(data.pagination.total_pages, 1)}` },
          ]}
        />

        <div className="mt-5 grid gap-6 lg:grid-cols-[260px_1fr]">
          <FilterSidebar
            title="品牌筛选"
            values={currentFilters}
            fields={[
              { type: "input", name: "keyword", label: "关键词", placeholder: "品牌中英文名" },
              { name: "country_region", label: "国家 / 地区", options: toOptions(meta.data.country_regions) },
              { name: "market_positioning", label: "市场定位", options: toOptions(meta.data.market_positionings) },
              { name: "sales_model", label: "销售模式", options: toOptions(meta.data.sales_models) },
              { name: "brand_type", label: "品牌类型", options: toOptions(meta.data.brand_types) },
            ]}
          />

          <div>
            <ResultsToolbar
              title="品牌结果"
              meta={`共 ${data.pagination.total} 条`}
              controls={<ViewModeSwitch pathname="/brands" currentSearchParams={currentFilters} mode={currentView} />}
            />
            <ActiveFilters
              currentSearchParams={currentFilters}
              labels={{
                keyword: "关键词",
                country_region: "国家 / 地区",
                market_positioning: "市场定位",
                sales_model: "销售模式",
                brand_type: "品牌类型",
                sort: "排序",
              }}
            />
            {data.items.length === 0 ? (
              <EmptyResults
                title="没有找到匹配的品牌"
                description="可以先清空筛选，或直接浏览全部品牌。"
                currentSearchParams={currentFilters}
                browseHref="/brands"
                browseLabel="浏览全部品牌"
              />
            ) : currentView === "table" ? (
              <EntityTable
                items={data.items}
                href={(brand) => `/brands/${brand.brand_id}`}
                columns={[
                  {
                    key: "name",
                    label: "品牌",
                    render: (brand) => (
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-stone-900">{brand.brand_name_en}</div>
                        <div className="truncate text-[11px] text-[color:var(--muted)]">{brand.brand_name_cn || brand.brand_id}</div>
                      </div>
                    ),
                  },
                  { key: "country", label: "国家 / 地区", render: (brand) => brand.country_region || "-" },
                  { key: "position", label: "市场定位", render: (brand) => brand.market_positioning || "-" },
                  { key: "sales", label: "销售模式", render: (brand) => brand.sales_model || "-" },
                ]}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.items.map((brand) => (
                  <BrandCard key={brand.brand_id} brand={brand} />
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
