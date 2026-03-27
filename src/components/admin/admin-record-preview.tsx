"use client";

import Image from "next/image";

export function AdminRecordPreview({
  record,
}: {
  record?: { type: string; id: string; title: string; imageUrl?: string | null; subtitle?: string | null; meta?: string | null; facts?: string[] } | null;
}) {
  return (
    <section className="rounded-[1.8rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-5 shadow-[var(--shadow)] sm:p-6">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Preview</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">当前记录预览</h2>

      {record ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-start">
          <div className="relative h-[140px] overflow-hidden rounded-[1.4rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,250,244,0.96),rgba(255,255,255,0.92))]">
            {record.imageUrl ? (
              <Image src={record.imageUrl} alt={record.title} fill sizes="140px" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                No Image
              </div>
            )}
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">{record.type}</p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900">{record.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{record.id}</p>
            {record.subtitle ? <p className="mt-3 text-sm leading-6 text-stone-700">{record.subtitle}</p> : null}
            {record.meta ? <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">{record.meta}</p> : null}
            <div className="mt-4 grid gap-2 rounded-[1.2rem] border border-[color:var(--line)] bg-white/70 p-4 text-sm text-stone-700">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">Record ID</span>
                <span className="truncate text-right text-xs text-[color:var(--muted)]">{record.id}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">Type</span>
                <span className="text-xs text-[color:var(--muted)]">{record.type}</span>
              </div>
            </div>
            {record.facts?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {record.facts.map((fact) => (
                  <span key={fact} className="rounded-full border border-[color:var(--line)] bg-[rgba(255,248,240,0.92)] px-3 py-1 text-[11px] font-medium text-stone-700">
                    {fact}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="mt-4 text-sm leading-6 text-stone-700">右侧媒体编辑区保存成功后，这里的预览图会同步更新，方便你确认当前修改结果。</p>
          </div>
        </div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">先从左侧搜索并选择一条品牌、车型、配置或零部件记录。</p>
      )}
    </section>
  );
}
