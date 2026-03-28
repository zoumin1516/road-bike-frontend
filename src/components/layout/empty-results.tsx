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
    <div className="rounded-[1.2rem] border border-dashed border-[color:var(--line)] bg-white px-6 py-8 text-center shadow-[var(--shadow)] sm:px-8">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">No Results</p>
      <h3 className="text-data-heading mt-3 text-[1.75rem] font-semibold leading-none text-stone-900">{title}</h3>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">{description}</p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={buildClearHref(currentSearchParams)}
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white px-5 text-[13px] font-medium text-stone-700 transition hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
        >
          推荐清空筛选
        </a>
        <a
          href={browseHref}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--accent-strong)] px-5 text-[13px] font-medium text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--accent)]"
        >
          {browseLabel}
        </a>
      </div>
    </div>
  );
}
