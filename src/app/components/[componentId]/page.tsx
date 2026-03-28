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
import { getComponentDetail } from "@/lib/api/components";
import { formatPrice, formatWeightG } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, detailPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ componentId: string }> }) {
  const { componentId } = await params;
  const component = await getComponentDetail(componentId).catch(() => null);

  if (!component) {
    return buildMetadata({
      title: "零部件详情",
      description: "公路车零部件详情页",
      path: `/components/${componentId}`,
    });
  }

  return buildMetadata({
    title: `${component.component_name} 零部件详情`,
    description: `${component.brand_name} ${component.component_name} 的重量、价格、系列和规格信息。`,
    path: `/components/${componentId}`,
  });
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ componentId: string }> }) {
  const { componentId } = await params;
  const component = await getComponentDetail(componentId).catch(() => null);

  if (!component) {
    notFound();
  }

  const structuredData = [
    breadcrumbSchema([
      { name: "首页", path: "/" },
      { name: "零部件库", path: "/components" },
      { name: component.component_name, path: `/components/${componentId}` },
    ]),
    detailPageSchema({
      title: `${component.component_name} 零部件详情`,
      description: `${component.brand_name} ${component.component_name} 的重量、价格、系列和规格信息。`,
      path: `/components/${componentId}`,
    }),
  ];

  return (
    <main className="min-h-screen">
      <JsonLd data={structuredData} />
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "零部件库", href: "/components" }, { label: component.component_name }]} />

        <div className="mt-6 space-y-4">
          <ContextLinks
            title="组件导航"
            items={[
              { label: "零部件列表", href: "/components" },
              { label: `搜索 ${component.brand_name}`, href: `/search?q=${encodeURIComponent(component.brand_name)}&type=component` },
              { label: "搜索页", href: `/search?q=${encodeURIComponent(component.component_name)}` },
            ]}
          />
          <DetailShell
            hero={
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] xl:items-start">
                <DetailHeroHeader
                  eyebrow="Component Detail"
                  title={component.component_name}
                  subtitle={<span className="block truncate" title={component.brand_name}>{component.brand_name}</span>}
                  badges={<DetailBadges items={[component.component_category, component.series || ""]} />}
                  kpis={<DetailHeroKpis items={[
                    { label: "品牌", value: component.brand_name },
                    { label: "类别", value: component.component_category },
                    { label: "重量", value: formatWeightG(component.weight_g) },
                    { label: "价格", value: formatPrice(component.msrp_price, component.msrp_currency) },
                  ]} />}
                  extra={component.notes ? <p className="max-w-2xl text-[14px] leading-7 text-stone-600">{component.notes}</p> : undefined}
                  cta={component.official_url ? (
                    <a
                      href={component.official_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
                    >
                      访问组件官网
                    </a>
                  ) : undefined}
                />
                <DetailHeroProfileCard
                  title="Component Profile"
                  items={[
                    { label: "品牌", value: component.brand_name, featured: true },
                    { label: "系列", value: component.series || "-" },
                    { label: "类别", value: component.component_category },
                    { label: "组件 ID", value: component.component_id },
                  ]}
                />
              </div>
            }
            aside={undefined}
          >
            {component.notes ? (
              <DetailSection eyebrow="Overview" title="组件概述" first>
                <InlineExpandableText label="组件说明" text={component.notes} />
              </DetailSection>
            ) : null}

            <DetailSection eyebrow="Specifications" title="组件资料" first={!component.notes}>
              <div className="grid gap-5 xl:grid-cols-2">
                <SpecTable
                  title="价格与参数"
                  rows={[
                    { label: "价格", value: formatPrice(component.msrp_price, component.msrp_currency) },
                    { label: "重量", value: formatWeightG(component.weight_g) },
                    { label: "系列", value: component.series || "-" },
                  ]}
                />
                <SpecTable
                  title="组件信息"
                  rows={[
                    { label: "组件 ID", value: component.component_id },
                    { label: "类别", value: component.component_category },
                    { label: "品牌", value: component.brand_name },
                    { label: "官网", value: component.official_url ? <a href={component.official_url} target="_blank" rel="noreferrer" className="text-stone-900 underline-offset-4 hover:underline">访问链接</a> : "-" },
                  ]}
                />
              </div>
            </DetailSection>
          </DetailShell>
        </div>
      </section>
    </main>
  );
}
