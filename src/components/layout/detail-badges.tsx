export function DetailBadges({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-700">
      {items.filter(Boolean).map((item) => (
        <span
          key={item}
          className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-4 py-2 text-sm font-medium text-stone-800"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
