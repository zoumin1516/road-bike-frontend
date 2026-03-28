import type { ReactNode } from "react";

export function DetailHeroHeader({
  eyebrow,
  title,
  subtitle,
  badges,
  kpis,
  extra,
  cta,
}: {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  badges?: ReactNode;
  kpis?: ReactNode;
  extra?: ReactNode;
  cta?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">{eyebrow}</p>
      <h1 className="text-data-heading mt-2 text-[2.15rem] font-semibold leading-[0.96] text-stone-900 sm:text-[2.55rem]">{title}</h1>
      {subtitle ? <div className="mt-2 min-w-0 text-[14px] text-[color:var(--muted)] sm:text-[15px]">{subtitle}</div> : null}
      {badges ? <div className="mt-4">{badges}</div> : null}
      {kpis ? <div className="mt-4">{kpis}</div> : null}
      {extra ? <div className="mt-5">{extra}</div> : null}
      {cta ? <div className="mt-6">{cta}</div> : null}
    </div>
  );
}
