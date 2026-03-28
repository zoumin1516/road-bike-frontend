import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContextLinks } from "@/components/layout/context-links";
import { DetailBadges } from "@/components/layout/detail-badges";
import { DetailHeroHeader } from "@/components/layout/detail-hero-header";
import { DetailHeroKpis } from "@/components/layout/detail-hero-kpis";
import { DetailHeroProfileCard } from "@/components/layout/detail-hero-profile-card";
import { DetailSection } from "@/components/layout/detail-section";
import { DetailShell } from "@/components/layout/detail-shell";
import { InlineExpandableText } from "@/components/layout/inline-expandable-text";
import { JsonLd } from "@/components/layout/json-ld";
import { SpecTable } from "@/components/layout/spec-table";
import { ModelCard } from "@/components/models/model-card";
import { getBrandDetail, getBrands } from "@/lib/api/brands";
import { getModels } from "@/lib/api/models";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, detailPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params;
  const brandsData = await getBrands({ page: 1, page_size: 100 }).catch(() => null);
  const brand = brandsData?.items.find((item) => item.brand_id === brandId);

  if (!brand) {
    return buildMetadata({
      title: "品牌详情",
      description: "公路车品牌详情页",
      path: `/brands/${brandId}`,
    });
  }

  return buildMetadata({
    title: `${brand.brand_name_en} 品牌详情`,
    description: `${brand.brand_name_en} 的地区、定位、销售模式与主打赛道信息。`,
    path: `/brands/${brandId}`,
  });
}

export default async function BrandDetailPage({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params;
  const [brandsData, brand, modelsData] = await Promise.all([
    getBrands({ page: 1, page_size: 100 }),
    getBrandDetail(brandId).catch(() => null),
    getModels({ page: 1, page_size: 100, brand_id: brandId }),
  ]);

  if (!brand) {
    notFound();
  }

  const companyRows = [
    { label: "总部", value: brand.headquarters || "-" },
    { label: "创立年份", value: brand.founded_year || "-" },
    { label: "创始人", value: brand.founder || "-" },
    { label: "母公司", value: brand.parent_company || "-" },
    { label: "公司类型", value: brand.company_type || "-" },
    { label: "所有权", value: brand.ownership_type || "-" },
  ];

  const marketRows = [
    { label: "市场定位", value: brand.market_positioning || "-" },
    { label: "目标用户", value: brand.target_audience || "-" },
    { label: "价格带", value: brand.price_tier || "-" },
    { label: "销售模式", value: brand.sales_model || "-" },
    { label: "品牌口号", value: brand.brand_slogan || "-" },
  ];

  const businessRows = [
    { label: "员工规模", value: brand.employee_count_range || "-" },
    { label: "营收区间", value: brand.annual_revenue_range || "-" },
    { label: "已收录车型", value: modelsData.pagination.total },
  ];

  const technologyRows = [
    { label: "旗舰平台", value: brand.flagship_platforms || "-" },
    { label: "核心价值", value: brand.core_values || "-" },
  ];

  const structuredData = [
    breadcrumbSchema([
      { name: "首页", path: "/" },
      { name: "品牌库", path: "/brands" },
      { name: brand.brand_name_en, path: `/brands/${brandId}` },
    ]),
    detailPageSchema({
      title: `${brand.brand_name_en} 品牌详情`,
      description: `${brand.brand_name_en} 的地区、定位、销售模式与主打赛道信息。`,
      path: `/brands/${brandId}`,
    }),
  ];

  return (
    <main className="min-h-screen">
      <JsonLd data={structuredData} />
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "品牌库", href: "/brands" }, { label: brand.brand_name_en }]} />

        <div className="mt-6 space-y-4">
          <ContextLinks
            title="品牌导航"
            items={[
              { label: "返回品牌列表", href: "/brands" },
              { label: "前往车型库", href: "/models" },
              { label: "前往搜索页", href: `/search?q=${encodeURIComponent(brand.brand_name_en)}` },
            ]}
          />
          <DetailShell
            hero={
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] xl:items-start">
                <DetailHeroHeader
                  eyebrow="Brand Detail"
                  title={brand.brand_name_en}
                  subtitle={brand.brand_name_cn ? <span className="block truncate" title={brand.brand_name_cn}>{brand.brand_name_cn}</span> : undefined}
                  badges={<DetailBadges items={[brand.country_region || "", brand.market_positioning || "", brand.price_tier || "", brand.sales_model || ""]} />}
                  kpis={<DetailHeroKpis items={[
                    { label: "国家 / 地区", value: brand.country_region || "-" },
                    { label: "创立年份", value: brand.founded_year || "-" },
                    { label: "车型数量", value: String(modelsData.pagination.total) },
                    { label: "价格带", value: brand.price_tier || "-" },
                  ]} />}
                  extra={brand.notes ? <p className="max-w-2xl text-[14px] leading-7 text-stone-600">{brand.notes}</p> : undefined}
                  cta={brand.official_website ? (
                    <a
                      href={brand.official_website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
                    >
                      访问品牌官网
                    </a>
                  ) : undefined}
                />
                <DetailHeroProfileCard
                  title="Brand Profile"
                  items={[
                    { label: "英文名", value: brand.brand_name_en, featured: true },
                    ...(brand.brand_name_cn ? [{ label: "中文名", value: brand.brand_name_cn }] : []),
                    { label: "总部", value: brand.headquarters || "-" },
                    { label: "品牌口号", value: brand.brand_slogan || "-" },
                    { label: "主打赛道", value: brand.main_road_categories || "-" },
                  ]}
                />
              </div>
            }
            aside={undefined}
          >
            <DetailSection eyebrow="Profile" title="品牌资料" first>
              <SpecTable rows={companyRows} />
            </DetailSection>

            <DetailSection eyebrow="Positioning" title="定位与市场角色">
              <SpecTable rows={marketRows} />
              {brand.brand_slogan ? <InlineExpandableText label="品牌口号" text={brand.brand_slogan} /> : null}
              {brand.road_cycling_positioning ? <InlineExpandableText label="公路定位" text={brand.road_cycling_positioning} /> : null}
            </DetailSection>

            {(brand.brand_story || brand.mission) ? (
              <DetailSection eyebrow="Story" title="品牌故事与理念">
                <div className="space-y-4">
                  {brand.brand_story ? <InlineExpandableText label="品牌故事" text={brand.brand_story} /> : null}
                  {brand.mission ? <InlineExpandableText label="品牌使命" text={brand.mission} /> : null}
                </div>
              </DetailSection>
            ) : null}

            <DetailSection eyebrow="Technology" title="技术与研发能力">
              <SpecTable rows={technologyRows} />
              {brand.core_technologies ? <InlineExpandableText label="核心技术" text={brand.core_technologies} /> : null}
              {brand.r_and_d_capabilities ? <InlineExpandableText label="研发能力" text={brand.r_and_d_capabilities} /> : null}
            </DetailSection>

            <DetailSection eyebrow="Business" title="经营与产品线">
              <SpecTable rows={businessRows} />
              {brand.notes ? <InlineExpandableText label="品牌摘要" text={brand.notes} /> : null}
              {brand.main_road_categories ? <InlineExpandableText label="主打赛道" text={brand.main_road_categories} /> : null}
              {brand.road_product_lines ? <InlineExpandableText label="公路产品线" text={brand.road_product_lines} /> : null}
              {brand.product_lines ? <InlineExpandableText label="完整产品线" text={brand.product_lines} /> : null}
            </DetailSection>

            {brand.data_sources ? (
              <DetailSection eyebrow="Sources" title="资料来源">
                <InlineExpandableText label="参考来源" text={brand.data_sources} />
              </DetailSection>
            ) : null}

            <DetailSection eyebrow="Models" title="旗下车型">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <p className="text-sm leading-6 text-[color:var(--muted)]">继续往下看这个品牌目前已收录的主力公路车型。</p>
                <p className="text-data-number text-sm text-[color:var(--muted)]">共 {modelsData.pagination.total} 个车型</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
