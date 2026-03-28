function buildHref(
  currentSearchParams: Record<string, string | undefined>,
  options?: { removeKey?: string; clearAll?: boolean },
) {
  const params = new URLSearchParams();
  const removeKey = options?.removeKey;
  const clearAll = options?.clearAll;

  Object.entries(currentSearchParams).forEach(([key, value]) => {
    if (!value || key === removeKey || key === "page" || key === "view" || key === "__sortOptions") return;
    if (clearAll && key !== "page_size") return;
    params.set(key, value);
  });

  const query = params.toString();
  return query ? `?${query}` : "?";
}

export function ActiveFilters({
  title = "已生效筛选",
  currentSearchParams,
  labels,
}: {
  title?: string;
  currentSearchParams: Record<string, string | undefined>;
  labels: Record<string, string>;
}) {
  const items = Object.entries(currentSearchParams).filter(
    ([key, value]) => value && key !== "page" && key !== "page_size" && key !== "view" && key !== "__sortOptions",
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mb-2 rounded-[0.8rem] border border-[color:var(--line)] bg-white px-2.5 py-1.5 shadow-[var(--shadow)]">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-data-meta text-[8px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent)]">Filters Active</p>
          <p className="mt-0.5 text-[10px] font-medium text-stone-700">{title}</p>
        </div>

        <a
          href={buildHref(currentSearchParams, { clearAll: true })}
          className="inline-flex h-6.5 items-center justify-center rounded-md border border-[color:var(--line)] px-2 text-[9px] font-medium text-stone-700 transition hover:border-[color:var(--accent)] hover:bg-white hover:text-[color:var(--accent-strong)]"
        >
          清空筛选
        </a>
      </div>

      <div className="mt-1.5 flex flex-wrap gap-1">
        {items.map(([key, value]) => (
          <a
            key={key}
            href={buildHref(currentSearchParams, { removeKey: key })}
            className="inline-flex items-center gap-1 rounded-full border border-[rgba(17,17,17,0.1)] bg-stone-50 px-2 py-1 text-[9px] font-medium text-stone-700 transition hover:border-stone-400 hover:bg-white"
            title={`移除筛选：${labels[key] || key}`}
          >
            <span className="text-data-meta text-[9px] uppercase tracking-[0.04em] text-stone-500">{labels[key] || key}</span>
            <span className="max-w-[140px] truncate text-stone-800">{value}</span>
            <span aria-hidden="true">×</span>
          </a>
        ))}
      </div>
    </div>
  );
}
