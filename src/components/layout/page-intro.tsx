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
    <div className="rounded-[1.8rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,252,248,0.96),rgba(255,247,239,0.84))] p-5 shadow-[var(--shadow)] sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">{eyebrow}</p>
          <h1 className="text-data-heading mt-2 text-[1.9rem] leading-none text-stone-900 sm:text-[2.25rem]">{title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--muted)] sm:text-[15px]">{description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.25rem] border border-white/65 bg-white/72 px-4 py-3.5 backdrop-blur-sm">
              <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">{stat.label}</p>
              <p className="text-data-number mt-2 text-xl font-bold leading-none text-stone-900 sm:text-2xl">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
