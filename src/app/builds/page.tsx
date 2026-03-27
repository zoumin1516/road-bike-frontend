import { BuildCard } from "@/components/builds/build-card";
import { ActiveFilters } from "@/components/layout/active-filters";
import { EmptyResults } from "@/components/layout/empty-results";
import { FilterSidebar } from "@/components/layout/filter-sidebar";
import { PageIntro } from "@/components/layout/page-intro";
import { PaginationBar } from "@/components/layout/pagination-bar";
import { getBuilds } from "@/lib/api/builds";
import { getFilterMeta } from "@/lib/api/meta";
import { toOptions } from "@/lib/utils/options";

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

        <div className="mt-7 grid gap-8 lg:grid-cols-[280px_1fr]">
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
            ) : (
              <div className="grid gap-5 xl:grid-cols-2">
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
