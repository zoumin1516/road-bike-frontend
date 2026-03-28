import type { ReactNode } from "react";

export function DetailSection({
  eyebrow,
  title,
  children,
  first = false,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  first?: boolean;
}) {
  return (
    <section className={first ? "pt-1" : "border-t border-[color:var(--line)] pt-6"}>
      <p className="text-data-meta text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">{eyebrow}</p>
      <h2 className="text-data-heading mt-2 text-[1.38rem] font-semibold leading-tight text-stone-900 sm:text-[1.58rem]">{title}</h2>
      <div className="mt-4.5">{children}</div>
    </section>
  );
}
