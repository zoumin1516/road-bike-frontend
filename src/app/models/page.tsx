import { ActiveFilters } from "@/components/layout/active-filters";
import { EmptyResults } from "@/components/layout/empty-results";
import { FilterSidebar } from "@/components/layout/filter-sidebar";
import { PageIntro } from "@/components/layout/page-intro";
import { PaginationBar } from "@/components/layout/pagination-bar";
import { ModelCard } from "@/components/models/model-card";
import { getFilterMeta } from "@/lib/api/meta";
import { getModels } from "@/lib/api/models";
import { toOptions } from "@/lib/utils/options";

export default async function ModelsPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    brand_id?: string;
    bike_category?: string;
    frame_material?: string;
    brake_type?: string;
    is_active?: string;
    sort?: string;
    page?: string;
    page_size?: string;
  }>;
}) {
  const { keyword, brand_id, bike_category, frame_material, brake_type, is_active, sort, page, page_size } = await searchParams;
  const currentPage = Number(page || "1");
  const currentPageSize = Number(page_size || "12");

  const [data, meta] = await Promise.all([
    getModels({
      page: currentPage,
      page_size: currentPageSize,
      keyword,
      brand_id,
      bike_category,
      frame_material,
      brake_type,
      is_active,
      sort,
    }),
    getFilterMeta(),
  ]);

  const currentFilters = {
    keyword,
    brand_id,
    bike_category,
    frame_material,
    brake_type,
    is_active,
    sort,
    page_size: String(currentPageSize),
    page: String(currentPage),
    __sortOptions: "name_asc::名称 A-Z||name_desc::名称 Z-A||year_desc::首发年份新到旧||year_asc::首发年份旧到新||active_desc::在售优先||active_asc::归档优先",
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow="Models"
          title="车型库"
          description="按品牌、类别、材质和刹车类型快速筛选车型。"
          stats={[
            { label: "总车型数", value: data.pagination.total },
            { label: "当前页", value: `${data.pagination.page} / ${Math.max(data.pagination.total_pages, 1)}` },
          ]}
        />

        <div className="mt-7 grid gap-8 lg:grid-cols-[280px_1fr]">
          <FilterSidebar
            title="车型筛选"
            values={currentFilters}
            fields={[
              { type: "input", name: "keyword", label: "关键词", placeholder: "车型名 / 系列名" },
              { name: "brand_id", label: "所属品牌", options: meta.data.brand_names },
              { name: "bike_category", label: "车型类别", options: toOptions(meta.data.bike_categories) },
              { name: "frame_material", label: "车架材质", options: toOptions(meta.data.frame_materials) },
              { name: "brake_type", label: "刹车类型", options: toOptions(meta.data.brake_types) },
              {
                name: "is_active",
                label: "在售状态",
                options: meta.data.active_statuses.map((value) => ({
                  label: value === "true" ? "在售 / 活跃" : "非在售 / 归档",
                  value,
                })),
              },
            ]}
          />

          <div>
            <ActiveFilters
              currentSearchParams={currentFilters}
              labels={{
                keyword: "关键词",
                brand_id: "所属品牌",
                bike_category: "车型类别",
                frame_material: "车架材质",
                brake_type: "刹车类型",
                is_active: "在售状态",
                sort: "排序",
              }}
            />
            {data.items.length === 0 ? (
              <EmptyResults
                title="没有找到匹配的车型"
                description="建议先放宽品牌、类别或刹车筛选。"
                currentSearchParams={currentFilters}
                browseHref="/models"
                browseLabel="浏览全部车型"
              />
            ) : (
              <div className="grid gap-5 xl:grid-cols-2">
                {data.items.map((model) => (
                  <ModelCard key={model.model_id} model={model} />
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
