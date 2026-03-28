"use client";

import { useState } from "react";

export function InlineExpandableText({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-3 rounded-[0.95rem] border border-[color:var(--line)] bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="shrink-0 text-data-meta text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{label}</span>
        {text.length > 72 ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-600"
          >
            {expanded ? "收起" : "展开"}
          </button>
        ) : null}
      </div>
      <p className={expanded ? "mt-2 text-[13px] leading-6 text-stone-700" : "mt-2 line-clamp-3 text-[13px] leading-6 text-stone-700"}>
        {text}
      </p>
    </div>
  );
}
