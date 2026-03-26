import { BrandCard } from "@/components/brands/brand-card";
import { ActiveFilters } from "@/components/layout/active-filters";
import { EmptyResults } from "@/components/layout/empty-results";
import { FilterSidebar } from "@/components/layout/filter-sidebar";
import { PageIntro } from "@/components/layout/page-intro";
import { PaginationBar } from "@/components/layout/pagination-bar";
import { getBrands } from "@/lib/api/brands";
import { getFilterMeta } from "@/lib/api/meta";
import { toOptions } from "@/lib/utils/options";

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
  }>;
}) {
  const { keyword, country_region, market_positioning, sales_model, brand_type, sort, page, page_size } = await searchParams;
  const currentPage = Number(page || "1");
  const currentPageSize = Number(page_size || "12");

  const [data, meta] = await Promise.all([
    getBrands({ page: currentPage, page_size: currentPageSize, keyword, country_region, market_positioning, sales_model, brand_type, sort }),
    getFilterMeta(),
  ]);

  const currentFilters = {
    keyword,
    country_region,
    market_positioning,
    sales_model,
    brand_type,
    sort,
    page_size: String(currentPageSize),
    page: String(currentPage),
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

        <div className="mt-7 grid gap-8 lg:grid-cols-[280px_1fr]">
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
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
