import type { PaginationMeta } from "@/types/api";

function buildPageHref(
  currentSearchParams: Record<string, string | undefined>,
  nextPage: number,
  pageSize: number,
) {
  const params = new URLSearchParams();

  Object.entries(currentSearchParams).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  params.set("page", String(nextPage));
  params.set("page_size", String(pageSize));

  const query = params.toString();
  return query ? `?${query}` : "?";
}

export function PaginationBar({
  pagination,
  currentSearchParams,
}: {
  pagination: PaginationMeta;
  currentSearchParams: Record<string, string | undefined>;
}) {
  if (pagination.total_pages <= 1) {
    return null;
  }

  const start = (pagination.page - 1) * pagination.page_size + 1;
  const end = Math.min(pagination.page * pagination.page_size, pagination.total);
  const pageNumbers = Array.from({ length: pagination.total_pages }, (_, index) => index + 1).slice(
    Math.max(0, pagination.page - 3),
    Math.min(pagination.total_pages, pagination.page + 2),
  );

  return (
    <div className="mt-7 rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--panel)] px-4 py-3 shadow-[var(--shadow)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Pagination</p>
          <p className="mt-1 text-[12px] leading-5 text-[color:var(--muted)]">
            {start}-{end} / 共 {pagination.total} 条
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <a
            aria-disabled={pagination.page <= 1}
            href={buildPageHref(currentSearchParams, Math.max(1, pagination.page - 1), pagination.page_size)}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-[color:var(--line)] px-3 text-[12px] font-medium text-stone-700 transition hover:border-[color:var(--accent)] hover:bg-white hover:text-[color:var(--accent-strong)] aria-disabled:pointer-events-none aria-disabled:opacity-40"
          >
            上一页
          </a>

          {pageNumbers.map((pageNumber) => {
            const active = pageNumber === pagination.page;
            return (
              <a
                key={pageNumber}
                href={buildPageHref(currentSearchParams, pageNumber, pagination.page_size)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-[12px] font-medium transition ${
                  active
                    ? "border border-[#7f3517] bg-[#8f3f1c] text-white shadow-[0_10px_20px_rgba(143,63,28,0.18)]"
                    : "border border-[color:var(--line)] text-stone-700 hover:border-[color:var(--accent)] hover:bg-white hover:text-[color:var(--accent-strong)]"
                }`}
              >
                {pageNumber}
              </a>
            );
          })}

          <a
            aria-disabled={pagination.page >= pagination.total_pages}
            href={buildPageHref(
              currentSearchParams,
              Math.min(pagination.total_pages, pagination.page + 1),
              pagination.page_size,
            )}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-[color:var(--line)] px-3 text-[12px] font-medium text-stone-700 transition hover:border-[color:var(--accent)] hover:bg-white hover:text-[color:var(--accent-strong)] aria-disabled:pointer-events-none aria-disabled:opacity-40"
          >
            下一页
          </a>
        </div>
      </div>
    </div>
  );
}
