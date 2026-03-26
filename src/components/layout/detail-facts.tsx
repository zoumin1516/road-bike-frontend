import type { ReactNode } from "react";

export function DetailFacts({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.65rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(191,91,44,0.08),rgba(255,255,255,0.86))] p-6 shadow-[var(--shadow)]">
      <p className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Quick Facts</p>
      <h2 className="text-data-heading mt-2 text-[1.65rem] leading-none text-stone-900">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
