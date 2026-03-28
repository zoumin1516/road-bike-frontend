import type { ReactNode } from "react";

export function DetailFacts({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-[color:var(--line)] pb-5">
      <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">Quick Facts</p>
      <h2 className="text-data-heading mt-2 text-[1.2rem] font-semibold leading-none text-stone-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
