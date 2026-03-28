import type { ReactNode } from "react";

export function DetailShell({
  hero,
  aside,
  children,
}: {
  hero: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-10">
      <div className={aside ? "grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-start" : "space-y-6"}>
        <div className="rounded-[2rem] border border-[color:var(--line)] bg-white p-7 shadow-[var(--shadow)] sm:p-8">
          {hero}
        </div>
        {aside ? <div className="space-y-5">{aside}</div> : null}
      </div>
      {children}
    </div>
  );
}
