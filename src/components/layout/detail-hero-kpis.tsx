export function DetailHeroKpis({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  const visibleItems = items.filter((item) => item.value && item.value !== "-");

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 grid gap-3 border-y border-[color:var(--line)] py-4 sm:grid-cols-2 xl:grid-cols-4">
      {visibleItems.map((item) => (
        <div key={item.label} className="min-w-0 border-l border-[color:var(--line)] pl-3 first:border-l-0 first:pl-0 sm:first:border-l-0 sm:first:pl-0 xl:nth-[5n]:border-l-0">
          <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{item.label}</p>
          <p className="mt-1 truncate text-[13px] font-medium leading-6 text-stone-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
