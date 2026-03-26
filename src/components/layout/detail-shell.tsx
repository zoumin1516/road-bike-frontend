import type { ReactNode } from "react";

export function DetailShell({
  hero,
  aside,
  children,
}: {
  hero: ReactNode;
  aside: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-10">
      <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="rounded-[2rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.84)] p-7 shadow-[var(--shadow)] sm:p-8">
          {hero}
        </div>
        <div className="space-y-5">{aside}</div>
      </div>
      {children}
    </div>
  );
}
