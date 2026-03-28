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
    <div className="rounded-[1.1rem] border border-[color:var(--line)] bg-white p-3.5 shadow-[var(--shadow)]">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
        <div className="max-w-2xl">
          <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">{eyebrow}</p>
          <h1 className="text-data-heading mt-1.5 text-[1.35rem] font-semibold leading-none text-stone-900 sm:text-[1.5rem]">{title}</h1>
          <p className="mt-1.5 max-w-xl text-[12px] leading-4.5 text-[color:var(--muted)]">{description}</p>
        </div>

        <div className="grid gap-1.5 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[0.85rem] border border-[color:var(--line)] bg-stone-50 px-3 py-2">
              <p className="text-data-meta text-[8px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent)]">{stat.label}</p>
              <p className="text-data-number mt-1 text-[15px] font-bold leading-none text-stone-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
