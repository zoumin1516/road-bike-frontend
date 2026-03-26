function buildClearHref(currentSearchParams: Record<string, string | undefined>) {
  const params = new URLSearchParams();

  Object.entries(currentSearchParams).forEach(([key, value]) => {
    if (!value || key === "page_size" || key === "__sortOptions") return;
  });

  const pageSize = currentSearchParams.page_size;
  if (pageSize) params.set("page_size", pageSize);

  const query = params.toString();
  return query ? `?${query}` : "?";
}

export function EmptyResults({
  title,
  description,
  currentSearchParams,
  browseHref,
  browseLabel,
}: {
  title: string;
  description: string;
  currentSearchParams: Record<string, string | undefined>;
  browseHref: string;
  browseLabel: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-[rgba(143,63,28,0.26)] bg-[rgba(255,250,244,0.88)] px-6 py-8 text-center shadow-[var(--shadow)]">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">No Results</p>
      <h3 className="text-data-heading mt-2 text-[1.8rem] leading-none text-stone-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[color:var(--muted)]">{description}</p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <a
          href={buildClearHref(currentSearchParams)}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white px-4 text-[13px] font-medium text-stone-700 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
        >
          推荐清空筛选
        </a>
        <a
          href={browseHref}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-[color:var(--accent-strong)] px-4 text-[13px] font-medium text-white transition hover:bg-[color:var(--accent)]"
        >
          {browseLabel}
        </a>
      </div>
    </div>
  );
}
