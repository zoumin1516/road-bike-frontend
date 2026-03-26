import { notFound } from "next/navigation";

import { BuildCard } from "@/components/builds/build-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContextLinks } from "@/components/layout/context-links";
import { DetailBadges } from "@/components/layout/detail-badges";
import { DetailFacts } from "@/components/layout/detail-facts";
import { DetailSection } from "@/components/layout/detail-section";
import { DetailShell } from "@/components/layout/detail-shell";
import { getModelBuilds, getModelDetail } from "@/lib/api/models";

export default async function ModelDetailPage({ params }: { params: Promise<{ modelId: string }> }) {
  const { modelId } = await params;

  const [model, builds] = await Promise.all([
    getModelDetail(modelId).catch(() => null),
    getModelBuilds(modelId, { page: 1, page_size: 50 }).catch(() => null),
  ]);

  if (!model || !builds) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "车型库", href: "/models" }, { label: model.model_name }]} />

        <div className="mt-6">
          <DetailShell
            hero={
              <>
                <p className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">Model Detail</p>
                <h1 className="text-data-heading mt-3 text-[2.7rem] leading-none text-stone-900 sm:text-[3.2rem]">{model.model_name}</h1>
                {model.series_name ? <p className="mt-2 text-base text-[color:var(--muted)] sm:text-lg">{model.series_name}</p> : null}
                <DetailBadges items={[model.bike_category || "", model.frame_material || "", model.brake_type || ""]} />
                {model.notes ? (
                  <div className="mt-7 rounded-[1.4rem] bg-[rgba(255,255,255,0.64)] p-4">
                    <h2 className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">车型说明</h2>
                    <p className="mt-2.5 text-sm leading-6 text-stone-700 sm:text-[0.95rem]">{model.notes}</p>
                  </div>
                ) : null}
                {model.official_model_url ? (
                  <div className="mt-7">
                    <a
                      href={model.official_model_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-[color:var(--accent-strong)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[color:var(--accent)]"
                    >
                      访问车型官网
                    </a>
                  </div>
                ) : null}
              </>
            }
            aside={
              <>
                <DetailFacts title="车型速览">
                  <dl className="space-y-4 text-sm text-stone-700">
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">车型 ID</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{model.model_id}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">品牌 ID</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{model.brand_id}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">首发年份</dt>
                      <dd className="text-data-number mt-1 text-[1.15rem] font-bold leading-none text-stone-900">{model.release_year_first || "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">当前代际</dt>
                      <dd className="text-data-number mt-1 text-[1.15rem] font-bold leading-none text-stone-900">{model.current_generation_year || "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">胎宽容纳</dt>
                      <dd className="text-data-number mt-1 text-[1.15rem] font-bold leading-none text-stone-900">
                        {typeof model.tire_clearance_mm === "number" ? `${model.tire_clearance_mm} mm` : "-"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">配置数量</dt>
                      <dd className="text-data-number mt-1 text-[1.3rem] font-bold leading-none text-stone-900">{builds.pagination.total}</dd>
                    </div>
                  </dl>
                </DetailFacts>

                <ContextLinks
                  title="上下文跳转"
                  items={[
                    { label: "返回车型列表", href: "/models" },
                    { label: "前往品牌库", href: "/brands" },
                    { label: "前往配置库", href: "/builds" },
                  ]}
                />
              </>
            }
          >
            <DetailSection eyebrow="Builds" title="配置版本">
              <div className="mb-5 flex items-end justify-between gap-6">
                <p className="text-sm leading-6 text-[color:var(--muted)]">继续往下看这个车型当前已经整理好的具体 build。</p>
                <p className="text-data-number text-sm text-[color:var(--muted)]">共 {builds.pagination.total} 个配置</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
