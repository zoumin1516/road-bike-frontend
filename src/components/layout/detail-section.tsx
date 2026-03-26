import type { ReactNode } from "react";

export function DetailSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-6 shadow-[var(--shadow)] sm:p-7">
      <p className="text-data-meta text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">{eyebrow}</p>
      <h2 className="text-data-heading mt-2.5 text-[2rem] leading-none text-stone-900 sm:text-[2.2rem]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
