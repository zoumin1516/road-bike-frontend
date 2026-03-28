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
import { getBuildDetail } from "@/lib/api/builds";
import { formatPrice, formatWeightKg, formatYear } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, detailPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ buildId: string }> }) {
  const { buildId } = await params;
  const build = await getBuildDetail(buildId).catch(() => null);

  if (!build) {
    return buildMetadata({
      title: "配置详情",
      description: "公路车配置详情页",
      path: `/builds/${buildId}`,
    });
  }

  return buildMetadata({
    title: `${build.build_name} 配置详情`,
    description: `${build.build_name} 的年份、价格、套件、轮组和传动参数。`,
    path: `/builds/${buildId}`,
  });
}

export default async function BuildDetailPage({ params }: { params: Promise<{ buildId: string }> }) {
  const { buildId } = await params;
  const build = await getBuildDetail(buildId).catch(() => null);

  if (!build) {
    notFound();
  }

  const structuredData = [
    breadcrumbSchema([
      { name: "首页", path: "/" },
      { name: "配置库", path: "/builds" },
      { name: build.build_name, path: `/builds/${buildId}` },
    ]),
    detailPageSchema({
      title: `${build.build_name} 配置详情`,
      description: `${build.build_name} 的年份、价格、套件、轮组和传动参数。`,
      path: `/builds/${buildId}`,
    }),
  ];

  const marketRows = [
    { label: "年份", value: formatYear(build.model_year) },
    { label: "价格", value: formatPrice(build.msrp_price, build.msrp_currency) },
    { label: "地区", value: build.market_region || "-" },
    { label: "整车在售", value: build.is_stock_complete_bike ? "是" : "否" },
  ];

  const drivetrainRows = [
    { label: "套件", value: [build.groupset_brand, build.groupset_series].filter(Boolean).join(" ") || "-" },
    { label: "轮组", value: [build.wheel_brand, build.wheel_model].filter(Boolean).join(" ") || "-" },
    { label: "功率计", value: build.power_meter || "-" },
    { label: "座舱类型", value: build.cockpit_type || "-" },
    { label: "电子变速", value: build.is_electronic_shifting ? "是" : "否" },
    { label: "碟刹", value: build.is_disc ? "是" : "否" },
    { label: "标称重量", value: formatWeightKg(build.claimed_weight_kg) },
  ];

  return (
    <main className="min-h-screen">
      <JsonLd data={structuredData} />
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "配置库", href: "/builds" }, { label: build.build_name }]} />

        <div className="mt-6 space-y-4">
          <ContextLinks
            title="配置导航"
            items={[
              { label: "配置列表", href: "/builds" },
              { label: `车型 ${build.model_id}`, href: `/models/${build.model_id}` },
              {
                label: `搜索 ${build.groupset_brand || "套件"}`,
                href: `/search?q=${encodeURIComponent(build.groupset_brand || build.groupset_series || build.build_name)}`,
              },
            ]}
          />
          <DetailShell
            hero={
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] xl:items-start">
                <DetailHeroHeader
                  eyebrow="Build Detail"
                  title={build.build_name}
                  subtitle={<span className="block truncate" title={build.model_id}>车型 ID：{build.model_id}</span>}
                  badges={<DetailBadges items={[build.groupset_brand || "", build.groupset_series || "", build.cockpit_type || ""]} />}
                  kpis={<DetailHeroKpis items={[
                    { label: "年份", value: formatYear(build.model_year) },
                    { label: "价格", value: formatPrice(build.msrp_price, build.msrp_currency) },
                    { label: "电子变速", value: build.is_electronic_shifting ? "是" : "否" },
                    { label: "碟刹", value: build.is_disc ? "是" : "否" },
                  ]} />}
                  extra={build.notes ? <p className="max-w-2xl text-[14px] leading-7 text-stone-600">{build.notes}</p> : undefined}
                  cta={build.official_build_url ? (
                    <a
                      href={build.official_build_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
                    >
                      访问配置官网
                    </a>
                  ) : undefined}
                />
                <DetailHeroProfileCard
                  title="Build Profile"
                  items={[
                    { label: "车型归属", value: build.model_id, featured: true },
                    { label: "地区", value: build.market_region || "-" },
                    { label: "套件", value: [build.groupset_brand, build.groupset_series].filter(Boolean).join(" ") || "-" },
                    { label: "轮组", value: [build.wheel_brand, build.wheel_model].filter(Boolean).join(" ") || "-" },
                  ]}
                />
              </div>
            }
            aside={undefined}
          >
            {build.notes ? (
              <DetailSection eyebrow="Overview" title="配置概述" first>
                <InlineExpandableText label="配置说明" text={build.notes} />
              </DetailSection>
            ) : null}

            <DetailSection eyebrow="Specifications" title="配置参数" first={!build.notes}>
              <div className="grid gap-5 xl:grid-cols-2">
                <SpecTable title="价格与市场" rows={marketRows} />
                <SpecTable title="传动与整备" rows={drivetrainRows} />
              </div>
            </DetailSection>
          </DetailShell>
        </div>
      </section>
    </main>
  );
}
