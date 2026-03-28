export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-[color:var(--muted)] sm:px-10 lg:px-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-stone-900">Road Bike Database</p>
          <p className="mt-1">公路车品牌、车型、配置、套件的数据查询展示网站</p>
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--accent)]">FastAPI × Next.js</p>
      </div>
    </footer>
  );
}
