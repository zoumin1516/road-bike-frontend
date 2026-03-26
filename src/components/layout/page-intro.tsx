export function PageIntro({
  eyebrow,
  title,
  description,
  stats,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats: { label: string; value: string | number }[];
}) {
  return (
    <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.82)] p-4 shadow-[var(--shadow)] sm:p-4.5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
        <div className="max-w-xl">
          <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">{eyebrow}</p>
          <h1 className="text-data-heading mt-1.5 text-[1.55rem] leading-none text-stone-900 sm:text-[1.85rem]">{title}</h1>
          <p className="mt-2 text-[13px] leading-5 text-[color:var(--muted)] sm:text-sm">{description}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-2.5">
              <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">{stat.label}</p>
              <p className="text-data-number mt-1 text-lg font-bold leading-none text-stone-900 sm:text-xl">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
