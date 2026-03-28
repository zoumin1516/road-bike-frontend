import { notFound } from "next/navigation";

import { BuildCard } from "@/components/builds/build-card";
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
import { getModelBuilds, getModelDetail } from "@/lib/api/models";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, detailPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ modelId: string }> }) {
  const { modelId } = await params;
  const model = await getModelDetail(modelId).catch(() => null);

  if (!model) {
    return buildMetadata({
      title: "车型详情",
      description: "公路车车型详情页",
      path: `/models/${modelId}`,
    });
  }

  return buildMetadata({
    title: `${model.model_name} 车型详情`,
    description: `${model.model_name} 的类别、材质、刹车、代际与配置信息。`,
    path: `/models/${modelId}`,
  });
}

export default async function ModelDetailPage({ params }: { params: Promise<{ modelId: string }> }) {
  const { modelId } = await params;

  const [model, builds] = await Promise.all([
    getModelDetail(modelId).catch(() => null),
    getModelBuilds(modelId, { page: 1, page_size: 50 }).catch(() => null),
  ]);

  if (!model || !builds) {
    notFound();
  }

  const structuredData = [
    breadcrumbSchema([
      { name: "首页", path: "/" },
      { name: "车型库", path: "/models" },
      { name: model.model_name, path: `/models/${modelId}` },
    ]),
    detailPageSchema({
      title: `${model.model_name} 车型详情`,
      description: `${model.model_name} 的类别、材质、刹车、代际与配置信息。`,
      path: `/models/${modelId}`,
    }),
  ];

  const modelInfoRows = [
    { label: "品牌 ID", value: model.brand_id },
    { label: "类别", value: model.bike_category || "-" },
    { label: "材质", value: model.frame_material || "-" },
    { label: "刹车", value: model.brake_type || "-" },
    { label: "当前代际", value: model.current_generation_year || "-" },
    { label: "胎宽容纳", value: typeof model.tire_clearance_mm === "number" ? `${model.tire_clearance_mm} mm` : "-" },
    { label: "配置数量", value: builds.pagination.total },
  ];

  return (
    <main className="min-h-screen">
      <JsonLd data={structuredData} />
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "车型库", href: "/models" }, { label: model.model_name }]} />

        <div className="mt-6 space-y-4">
          <ContextLinks
            title="车型导航"
            items={[
              { label: "车型列表", href: "/models" },
              { label: "品牌库", href: "/brands" },
              { label: "配置库", href: "/builds" },
            ]}
          />
          <DetailShell
            hero={
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] xl:items-start">
                <DetailHeroHeader
                  eyebrow="Model Detail"
                  title={model.model_name}
                  subtitle={model.series_name ? <span className="block truncate" title={model.series_name}>{model.series_name}</span> : undefined}
                  badges={<DetailBadges items={[model.bike_category || "", model.frame_material || "", model.brake_type || ""]} />}
                  kpis={<DetailHeroKpis items={[
                    { label: "类别", value: model.bike_category || "-" },
                    { label: "首发年份", value: model.release_year_first ? String(model.release_year_first) : "-" },
                    { label: "材质", value: model.frame_material || "-" },
                    { label: "配置数量", value: String(builds.pagination.total) },
                  ]} />}
                  extra={model.notes ? <p className="max-w-2xl text-[14px] leading-7 text-stone-600">{model.notes}</p> : undefined}
                  cta={model.official_model_url ? (
                    <a
                      href={model.official_model_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
                    >
                      访问车型官网
                    </a>
                  ) : undefined}
                />
                <DetailHeroProfileCard
                  title="Model Profile"
                  items={[
                    { label: "系列", value: model.series_name || model.model_name, featured: true },
                    { label: "品牌 ID", value: model.brand_id },
                    { label: "当前代际", value: model.current_generation_year || "-" },
                    { label: "胎宽容纳", value: typeof model.tire_clearance_mm === "number" ? `${model.tire_clearance_mm} mm` : "-" },
                  ]}
                />
              </div>
            }
            aside={undefined}
          >
            {model.notes ? (
              <DetailSection eyebrow="Overview" title="车型概述" first>
                <InlineExpandableText label="车型说明" text={model.notes} />
              </DetailSection>
            ) : null}

            <DetailSection eyebrow="Specifications" title="车型参数" first={!model.notes}>
              <SpecTable rows={modelInfoRows} />
            </DetailSection>

            <DetailSection eyebrow="Builds" title="配置版本">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <p className="text-sm leading-6 text-[color:var(--muted)]">继续往下看这个车型当前已经整理好的具体 build。</p>
                <p className="text-data-number text-sm text-[color:var(--muted)]">共 {builds.pagination.total} 个配置</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {builds.items.map((build) => (
                  <BuildCard key={build.build_id} build={build} />
                ))}
              </div>
            </DetailSection>
          </DetailShell>
        </div>
      </section>
    </main>
  );
}
