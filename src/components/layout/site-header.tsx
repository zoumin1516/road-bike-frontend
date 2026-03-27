import Link from "next/link";

const links = [
  { href: "/brands", label: "品牌库" },
  { href: "/models", label: "车型库" },
  { href: "/builds", label: "配置库" },
  { href: "/components", label: "零部件库" },
  { href: "/search", label: "搜索" },
  { href: "/admin", label: "后台" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(255,250,244,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="flex items-center gap-3 text-stone-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)] text-sm font-bold uppercase tracking-[0.22em] text-white shadow-[var(--shadow)]">
            RB
          </span>
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--accent)] text-data-meta">
              Road Bike Database
            </span>
            <span className="text-data-heading block text-[1.05rem] leading-none text-stone-900">公路车资料查询站</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] p-1.5 text-sm text-[color:var(--muted)] shadow-[var(--shadow)] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-data-meta rounded-full px-3.5 py-2 text-[12px] font-semibold tracking-[0.08em] transition hover:bg-[rgba(191,91,44,0.08)] hover:text-[color:var(--accent-strong)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
