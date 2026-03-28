import Link from "next/link";

export function ViewModeSwitch({
  pathname,
  currentSearchParams,
  mode,
}: {
  pathname: string;
  currentSearchParams: Record<string, string | undefined>;
  mode: "card" | "table";
}) {
  const createHref = (nextMode: "card" | "table") => {
    const searchParams = new URLSearchParams();

    Object.entries({ ...currentSearchParams, view: nextMode }).forEach(([key, value]) => {
      if (!value || key.startsWith("__")) return;
      searchParams.set(key, value);
    });

    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <div className="inline-flex rounded-full border border-[color:var(--line)] bg-white p-0.5">
      <Link
        href={createHref("card")}
        className={`inline-flex rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
          mode === "card" ? "bg-stone-900 text-white" : "text-stone-600 hover:text-stone-900"
        }`}
      >
        Cards
      </Link>
      <Link
        href={createHref("table")}
        className={`inline-flex rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
          mode === "table" ? "bg-stone-900 text-white" : "text-stone-600 hover:text-stone-900"
        }`}
      >
        Table
      </Link>
    </div>
  );
}
