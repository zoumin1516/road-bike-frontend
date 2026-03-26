import Link from "next/link";

interface ContextLinkItem {
  label: string;
  href: string;
}

export function ContextLinks({ title, items }: { title: string; items: ContextLinkItem[] }) {
  return (
    <aside className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Navigation</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">{title}</h2>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-2xl border border-stone-200 px-4 py-3 text-sm text-stone-700 transition hover:border-orange-300 hover:text-orange-700"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
