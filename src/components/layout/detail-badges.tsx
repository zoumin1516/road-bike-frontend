export function DetailBadges({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 text-sm text-stone-700">
      {items.filter(Boolean).map((item) => (
        <span
          key={item}
          className="rounded-full border border-[color:var(--line)] bg-stone-50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-stone-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
