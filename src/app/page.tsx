import Link from "next/link";

import { getBrands } from "@/lib/api/brands";
import { getBuilds } from "@/lib/api/builds";
import { getComponents } from "@/lib/api/components";
import { getModels } from "@/lib/api/models";

const trendingSearches = [
  { label: "Shimano", href: "/search?q=Shimano" },
  { label: "Aero", href: "/search?q=Aero" },
  { label: "Endurance", href: "/search?q=Endurance" },
  { label: "Carbon", href: "/search?q=Carbon" },
  { label: "电变", href: "/search?q=%E7%94%B5%E5%8F%98" },
  { label: "功率计", href: "/search?q=%E5%8A%9F%E7%8E%87%E8%AE%A1" },
];

function SearchHero() {
  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,#ffffff_0%,#fbfbf9_46%,#f1efe8_100%)] px-5 py-5 shadow-[var(--shadow)] sm:rounded-[2rem] sm:px-7 sm:py-6 lg:px-8 lg:py-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(24,24,24,0.06),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(167,139,91,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">Road Bike Database</p>
        <form action="/search" className="mx-auto mt-4 max-w-3xl">
          <div className="group flex flex-col gap-3 rounded-[1.3rem] border border-stone-200 bg-white/96 p-2.5 shadow-[0_16px_48px_rgba(28,28,28,0.08)] transition duration-200 hover:border-stone-300 hover:shadow-[0_20px_56px_rgba(28,28,28,0.1)] focus-within:border-stone-400 focus-within:shadow-[0_22px_64px_rgba(28,28,28,0.12)] sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[1rem] bg-stone-50 px-4 py-2.5 transition group-focus-within:bg-white">
              <span className="text-lg text-stone-400 transition group-focus-within:text-stone-700">⌕</span>
              <input
                type="search"
                name="q"
                placeholder="搜索品牌、车型、套件、轮组、功率计..."
                autoFocus
                className="w-full border-0 bg-transparent text-[15px] text-stone-900 outline-none placeholder:text-stone-400"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-[46px] shrink-0 items-center justify-center rounded-[1rem] bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              立即搜索
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-stone-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">Trending</span>
          {trendingSearches.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-stone-400 hover:bg-white hover:text-stone-900"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const [brandsData, modelsData, buildsData, componentsData] = await Promise.all([
    getBrands({ page: 1, page_size: 1 }).catch(() => null),
    getModels({ page: 1, page_size: 1 }).catch(() => null),
    getBuilds({ page: 1, page_size: 1 }).catch(() => null),
    getComponents({ page: 1, page_size: 1 }).catch(() => null),
  ]);

  const scopeSummary = {
    brands: brandsData?.pagination.total ?? 0,
    models: modelsData?.pagination.total ?? 0,
    builds: buildsData?.pagination.total ?? 0,
    components: componentsData?.pagination.total ?? 0,
  };

  const totalEntries = scopeSummary.brands + scopeSummary.models + scopeSummary.builds + scopeSummary.components;

  const scopeCards = [
    { label: "品牌", value: String(scopeSummary.brands), hint: "Brand records", href: "/brands" },
    { label: "车型", value: String(scopeSummary.models), hint: "Model platforms", href: "/models" },
    { label: "配置", value: String(scopeSummary.builds), hint: "Build specs", href: "/builds" },
    { label: "零部件", value: String(scopeSummary.components), hint: "Component items", href: "/components" },
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fbfbf8_0%,#f5f3ed_45%,#ffffff_100%)] text-stone-900">
      <section className="mx-auto max-w-6xl px-5 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-6">
        <SearchHero />

        <div className="mt-4 rounded-[1.8rem] border border-[color:var(--line)] bg-white/92 p-4.5 shadow-[var(--shadow)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">Current Scope</p>
              <h2 className="mt-2 text-[1.35rem] font-semibold tracking-tight text-stone-900 sm:text-[1.6rem]">当前收录范围</h2>
            </div>
            <div className="rounded-[1.1rem] border border-stone-200 bg-stone-50 px-4 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">Database Footprint</p>
              <p className="mt-1 text-2xl font-semibold leading-none text-stone-900">{totalEntries}</p>
              <p className="mt-1 text-xs text-stone-500">total indexed records</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {scopeCards.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group rounded-[1.35rem] border border-stone-200 bg-[linear-gradient(180deg,#ffffff_0%,#faf8f3_100%)] px-4 py-4 transition hover:-translate-y-0.5 hover:border-stone-400"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">{item.label}</p>
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-stone-400">scope</span>
                </div>
                <p className="mt-4 text-[2rem] font-semibold leading-none text-stone-900 sm:text-[2.2rem]">{item.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-stone-500">{item.hint}</p>
                <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600 transition group-hover:text-stone-900">View scope</span>
                  <span className="text-sm text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-stone-700">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
