import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContextLinks } from "@/components/layout/context-links";
import { DetailBadges } from "@/components/layout/detail-badges";
import { DetailFacts } from "@/components/layout/detail-facts";
import { DetailSection } from "@/components/layout/detail-section";
import { DetailShell } from "@/components/layout/detail-shell";
import { ModelCard } from "@/components/models/model-card";
import { getBrands } from "@/lib/api/brands";
import { getModels } from "@/lib/api/models";

export default async function BrandDetailPage({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params;
  const [brandsData, modelsData] = await Promise.all([
    getBrands({ page: 1, page_size: 100 }),
    getModels({ page: 1, page_size: 100, brand_id: brandId }),
  ]);

  const brand = brandsData.items.find((item) => item.brand_id === brandId);

  if (!brand) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "品牌库", href: "/brands" }, { label: brand.brand_name_en }]} />

        <div className="mt-6">
          <DetailShell
            hero={
              <>
                <p className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">Brand Detail</p>
                <h1 className="text-data-heading mt-3 text-[2.7rem] leading-none text-stone-900 sm:text-[3.2rem]">{brand.brand_name_en}</h1>
                {brand.brand_name_cn ? <p className="mt-2 text-base text-[color:var(--muted)] sm:text-lg">{brand.brand_name_cn}</p> : null}
                <DetailBadges items={[brand.country_region || "", brand.market_positioning || "", brand.sales_model || ""]} />
                {brand.main_road_categories ? (
                  <div className="mt-7 rounded-[1.4rem] bg-[rgba(255,255,255,0.64)] p-4">
                    <h2 className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">主打赛道</h2>
                    <p className="mt-2.5 text-sm leading-6 text-stone-700 sm:text-[0.95rem]">{brand.main_road_categories}</p>
                  </div>
                ) : null}
                {brand.notes ? (
                  <div className="mt-5 rounded-[1.4rem] bg-[rgba(255,255,255,0.64)] p-4">
                    <h2 className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">品牌简介</h2>
                    <p className="mt-2.5 text-sm leading-6 text-stone-700 sm:text-[0.95rem]">{brand.notes}</p>
                  </div>
                ) : null}
                {brand.official_website ? (
                  <div className="mt-7">
                    <a
                      href={brand.official_website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-[color:var(--accent-strong)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[color:var(--accent)]"
                    >
                      访问品牌官网
                    </a>
                  </div>
                ) : null}
              </>
            }
            aside={
              <>
                <DetailFacts title="品牌速览">
                  <dl className="space-y-4 text-sm text-stone-700">
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">英文名</dt>
                      <dd className="text-data-heading mt-1 text-[1.15rem] leading-none text-stone-900">{brand.brand_name_en}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">中文名</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{brand.brand_name_cn || "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">国家 / 地区</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{brand.country_region || "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">销售模式</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{brand.sales_model || "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">车型数量</dt>
                      <dd className="text-data-number mt-1 text-[1.3rem] font-bold leading-none text-stone-900">{modelsData.pagination.total}</dd>
                    </div>
                  </dl>
                </DetailFacts>

                <ContextLinks
                  title="上下文跳转"
                  items={[
                    { label: "返回品牌列表", href: "/brands" },
                    { label: "前往车型库", href: "/models" },
                    { label: "前往搜索页", href: `/search?q=${encodeURIComponent(brand.brand_name_en)}` },
                  ]}
                />
              </>
            }
          >
            <DetailSection eyebrow="Models" title="旗下车型">
              <div className="mb-5 flex items-end justify-between gap-6">
                <p className="text-sm leading-6 text-[color:var(--muted)]">继续往下看这个品牌目前已收录的主力公路车型。</p>
                <p className="text-data-number text-sm text-[color:var(--muted)]">共 {modelsData.pagination.total} 个车型</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {modelsData.items.map((item) => (
                  <ModelCard key={item.model_id} model={item} />
                ))}
              </div>
            </DetailSection>
          </DetailShell>
        </div>
      </section>
    </main>
  );
}
