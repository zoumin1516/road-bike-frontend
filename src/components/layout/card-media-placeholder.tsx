type CardMediaPlaceholderProps = {
  label: string;
  tone?: "brand" | "model" | "build" | "component" | "search";
};

const toneClassMap: Record<NonNullable<CardMediaPlaceholderProps["tone"]>, string> = {
  brand: "from-orange-100 via-white to-amber-50",
  model: "from-amber-100 via-white to-stone-50",
  build: "from-stone-200 via-white to-orange-50",
  component: "from-orange-50 via-white to-stone-100",
  search: "from-stone-100 via-white to-orange-50",
};

export function CardMediaPlaceholder({ label, tone = "search" }: CardMediaPlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.35rem] border border-dashed border-[rgba(143,63,28,0.18)] bg-linear-to-br ${toneClassMap[tone]} p-4`}
    >
      <div className="absolute inset-x-4 top-4 h-px bg-[rgba(191,91,44,0.12)]" />
      <div className="absolute inset-x-4 bottom-4 h-px bg-[rgba(191,91,44,0.12)]" />
      <div className="flex min-h-[122px] flex-col justify-between rounded-[1.1rem] border border-white/60 bg-white/55 px-4 py-3 backdrop-blur-sm">
        <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">Media Slot</p>
        <div>
          <div className="h-10 w-10 rounded-2xl border border-[rgba(143,63,28,0.14)] bg-[rgba(255,255,255,0.78)]" />
          <p className="mt-3 text-sm font-semibold text-stone-800">{label}</p>
          <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">后续可替换为 logo、车型图、整车配置图或零部件展示图。</p>
        </div>
      </div>
    </div>
  );
}
