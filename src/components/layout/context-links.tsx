import Link from "next/link";

interface ContextLinkItem {
  label: string;
  href: string;
}

export function ContextLinks({ title, items }: { title: string; items: ContextLinkItem[] }) {
  return (
    <aside>
      <div className="mb-2 flex items-center gap-3">
        <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">Navigation</p>
        <p className="text-[12px] font-medium text-stone-900">{title}</p>
      </div>
      <div className="inline-flex flex-wrap gap-2 rounded-full border border-[color:var(--line)] bg-white p-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-600 transition hover:bg-stone-900 hover:text-white"
            title={item.label}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
