import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContextLinks } from "@/components/layout/context-links";
import { DetailBadges } from "@/components/layout/detail-badges";
import { DetailSection } from "@/components/layout/detail-section";
import { DetailShell } from "@/components/layout/detail-shell";
import { getBuildDetail } from "@/lib/api/builds";

export default async function BuildDetailPage({ params }: { params: Promise<{ buildId: string }> }) {
  const { buildId } = await params;
  const build = await getBuildDetail(buildId).catch(() => null);

  if (!build) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "配置库", href: "/builds" }, { label: build.build_name }]} />

        <div className="mt-6">
          <DetailShell
            hero={
              <>
                <p className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">Build Detail</p>
                <h1 className="text-data-heading mt-3 text-[2.7rem] leading-none text-stone-900 sm:text-[3.2rem]">{build.build_name}</h1>
                <p className="text-data-meta mt-2 text-[13px] font-semibold tracking-[0.06em] text-[color:var(--muted)]">车型 ID：{build.model_id}</p>
                <DetailBadges items={[build.groupset_brand || "", build.groupset_series || "", build.cockpit_type || ""]} />
                {build.notes ? (
                  <div className="mt-7 rounded-[1.4rem] bg-[rgba(255,255,255,0.64)] p-4">
                    <h2 className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">备注</h2>
                    <p className="mt-2.5 text-sm leading-6 text-stone-700 sm:text-[0.95rem]">{build.notes}</p>
                  </div>
                ) : null}
                {build.official_build_url ? (
                  <div className="mt-7">
                    <a
                      href={build.official_build_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-[color:var(--accent-strong)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[color:var(--accent)]"
                    >
                      访问配置官网
                    </a>
                  </div>
                ) : null}
              </>
            }
            aside={
              <ContextLinks
                title="上下文跳转"
                items={[
                  { label: "返回配置列表", href: "/builds" },
                  { label: `前往车型详情：${build.model_id}`, href: `/models/${build.model_id}` },
                  {
                    label: `搜索同套件：${build.groupset_brand || "套件"}`,
                    href: `/search?q=${encodeURIComponent(build.groupset_brand || build.groupset_series || build.build_name)}`,
                  },
                ]}
              />
            }
          >
            <DetailSection eyebrow="Specs" title="配置参数">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.4rem] bg-[rgba(255,255,255,0.66)] p-5">
                  <h3 className="text-data-heading text-[1.45rem] leading-none text-stone-900">价格与年份</h3>
                  <dl className="mt-4 space-y-3 text-sm text-stone-700">
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">年份</dt>
                      <dd className="text-data-number mt-1 text-[1.2rem] font-bold leading-none text-stone-900">{build.model_year || "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">地区</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{build.market_region || "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">价格</dt>
                      <dd className="text-data-number mt-1 text-[1.25rem] font-bold leading-none text-stone-900">
                        {build.msrp_price ? `${build.msrp_currency || "USD"} ${build.msrp_price}` : "-"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-[1.4rem] bg-[rgba(255,255,255,0.66)] p-5">
                  <h3 className="text-data-heading text-[1.45rem] leading-none text-stone-900">传动与轮组</h3>
                  <dl className="mt-4 space-y-3 text-sm text-stone-700">
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">套件</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">
                        {[build.groupset_brand, build.groupset_series].filter(Boolean).join(" ") || "-"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">轮组</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">
                        {[build.wheel_brand, build.wheel_model].filter(Boolean).join(" ") || "-"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">功率计</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{build.power_meter || "-"}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4">
                  <p className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">电子变速</p>
                  <p className="text-data-number mt-2 text-[1.2rem] font-bold leading-none text-stone-900">{build.is_electronic_shifting ? "是" : "否"}</p>
                </div>
                <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4">
                  <p className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">碟刹</p>
                  <p className="text-data-number mt-2 text-[1.2rem] font-bold leading-none text-stone-900">{build.is_disc ? "是" : "否"}</p>
                </div>
                <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4">
                  <p className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">标称重量</p>
                  <p className="text-data-number mt-2 text-[1.2rem] font-bold leading-none text-stone-900">
                    {build.claimed_weight_kg ? `${build.claimed_weight_kg} kg` : "-"}
                  </p>
                </div>
              </div>
            </DetailSection>
          </DetailShell>
        </div>
      </section>
    </main>
  );
}
