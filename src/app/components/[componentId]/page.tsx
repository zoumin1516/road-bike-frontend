import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContextLinks } from "@/components/layout/context-links";
import { DetailBadges } from "@/components/layout/detail-badges";
import { DetailSection } from "@/components/layout/detail-section";
import { DetailShell } from "@/components/layout/detail-shell";
import { getComponentDetail } from "@/lib/api/components";

export default async function ComponentDetailPage({ params }: { params: Promise<{ componentId: string }> }) {
  const { componentId } = await params;
  const component = await getComponentDetail(componentId).catch(() => null);

  if (!component) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "零部件库", href: "/components" }, { label: component.component_name }]} />

        <div className="mt-6">
          <DetailShell
            hero={
              <>
                <p className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">Component Detail</p>
                <h1 className="text-data-heading mt-3 text-[2.7rem] leading-none text-stone-900 sm:text-[3.2rem]">{component.component_name}</h1>
                <p className="mt-2 text-base text-[color:var(--muted)] sm:text-lg">{component.brand_name}</p>
                <DetailBadges items={[component.component_category, component.series || ""]} />
                {component.notes ? (
                  <div className="mt-7 rounded-[1.4rem] bg-[rgba(255,255,255,0.64)] p-4">
                    <h2 className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">备注</h2>
                    <p className="mt-2.5 text-sm leading-6 text-stone-700 sm:text-[0.95rem]">{component.notes}</p>
                  </div>
                ) : null}
                {component.official_url ? (
                  <div className="mt-7">
                    <a
                      href={component.official_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-[color:var(--accent-strong)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[color:var(--accent)]"
                    >
                      访问组件官网
                    </a>
                  </div>
                ) : null}
              </>
            }
            aside={
              <ContextLinks
                title="上下文跳转"
                items={[
                  { label: "返回零部件列表", href: "/components" },
                  { label: `搜索同品牌：${component.brand_name}`, href: `/search?q=${encodeURIComponent(component.brand_name)}&type=component` },
                  { label: "前往搜索页", href: `/search?q=${encodeURIComponent(component.component_name)}` },
                ]}
              />
            }
          >
            <DetailSection eyebrow="Specs" title="组件资料">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.4rem] bg-[rgba(255,255,255,0.66)] p-5">
                  <h3 className="text-data-heading text-[1.45rem] leading-none text-stone-900">价格与参数</h3>
                  <dl className="mt-4 space-y-3 text-sm text-stone-700">
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">重量</dt>
                      <dd className="text-data-number mt-1 text-[1.2rem] font-bold leading-none text-stone-900">{component.weight_g ? `${component.weight_g} g` : "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">价格</dt>
                      <dd className="text-data-number mt-1 text-[1.25rem] font-bold leading-none text-stone-900">
                        {component.msrp_price ? `${component.msrp_currency || "USD"} ${component.msrp_price}` : "-"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-[1.4rem] bg-[rgba(255,255,255,0.66)] p-5">
                  <h3 className="text-data-heading text-[1.45rem] leading-none text-stone-900">组件信息</h3>
                  <dl className="mt-4 space-y-3 text-sm text-stone-700">
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">组件 ID</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{component.component_id}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">类别</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{component.component_category}</dd>
                    </div>
                    <div>
                      <dt className="text-data-meta text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">品牌</dt>
                      <dd className="mt-1 text-sm font-semibold text-stone-900">{component.brand_name}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </DetailSection>
          </DetailShell>
        </div>
      </section>
    </main>
  );
}
