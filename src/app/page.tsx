import Link from "next/link";

const quickLinks = [
  { href: "/brands", title: "品牌库", desc: "按国家、定位、销售模式浏览主流公路车品牌。", accent: "from-orange-200 via-orange-50 to-white" },
  { href: "/models", title: "车型库", desc: "按 race、aero、endurance 等维度查车型平台。", accent: "from-amber-200 via-amber-50 to-white" },
  { href: "/builds", title: "配置库", desc: "按套件、价格、是否电变查看整车 build。", accent: "from-stone-200 via-white to-white" },
  { href: "/components", title: "零部件库", desc: "查看套件、轮组、轮胎、功率计等核心零部件。", accent: "from-orange-100 via-white to-amber-50" },
];

const topActions = [
  { href: "/search?q=Shimano", label: "搜 Shimano" },
  { href: "/search?q=Aero", label: "搜 Aero 车型" },
  { href: "/builds?is_electronic_shifting=true", label: "看电变配置" },
];

const scopeSummary = {
  brands: 30,
  models: 60,
  builds: 30,
  components: 45,
};

export default function Home() {
  const totalEntries = scopeSummary.brands + scopeSummary.models + scopeSummary.builds + scopeSummary.components;
  const kpiCards = [
    { label: "品牌", value: String(scopeSummary.brands), hint: "已收录" },
    { label: "车型", value: String(scopeSummary.models), hint: "已收录" },
    { label: "配置", value: String(scopeSummary.builds), hint: "已收录" },
    { label: "零部件", value: String(scopeSummary.components), hint: "已收录" },
    { label: "总条目", value: String(totalEntries), hint: "全库规模" },
    { label: "查询模式", value: "搜索 + 筛选", hint: "双路径" },
  ];

  return (
    <main className="min-h-screen text-stone-900">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.82)] p-6 shadow-[var(--shadow)] sm:p-7 lg:h-full">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
              Road Bike Database
            </p>
            <h1 className="max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              一站式查询公路车品牌、车型、配置与零部件。
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)] sm:text-base">
              先搜索，再按条件筛选，快速定位目标车型与配置。
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                href="/brands"
                className="inline-flex rounded-full bg-[color:var(--accent-strong)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[color:var(--accent)]"
              >
                进入品牌库
              </Link>
              <Link
                href="/search"
                className="inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
              >
                进入搜索
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">快速入口</span>
              {topActions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-[color:var(--line)] bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:h-full">
            <div className="rounded-[2rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.82)] p-6 shadow-[var(--shadow)] lg:h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">Current Scope</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {kpiCards.map((item) => (
                  <div key={item.label} className="rounded-[1rem] border border-[color:var(--line)] bg-white/70 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">{item.label}</p>
                    <p className="mt-1 text-base font-semibold leading-none text-stone-900">{item.value}</p>
                    <p className="mt-1 text-[11px] text-[color:var(--muted)]">{item.hint}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group rounded-[2rem] border border-[color:var(--line)] bg-linear-to-br ${item.accent} p-6 shadow-[var(--shadow)] transition hover:-translate-y-1 sm:p-7 xl:min-h-[220px]`}
            >
              <h2 className="text-xl font-semibold text-stone-900 group-hover:text-[color:var(--accent-strong)]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{item.desc}</p>
              <div className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">View collection</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
