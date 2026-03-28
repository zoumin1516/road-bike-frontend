interface Option {
  label: string;
  value: string;
}

interface SelectFilterField {
  type?: "select";
  name: string;
  label: string;
  options: Option[];
  disabled?: boolean;
}

interface InputFilterField {
  type: "input";
  name: string;
  label: string;
  inputType?: "text" | "number";
  placeholder?: string;
  disabled?: boolean;
}

type FilterField = SelectFilterField | InputFilterField;

const fieldClassName =
  "h-8 w-full rounded-lg border border-[color:var(--line)] bg-white px-2.5 text-[11px] font-medium text-stone-700 outline-none transition duration-200 placeholder:text-stone-400 hover:border-stone-400 focus:border-stone-900 focus:bg-white focus-visible:ring-2 focus-visible:ring-[rgba(17,17,17,0.08)] disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-50 disabled:text-stone-400 disabled:placeholder:text-stone-300";

const primaryButtonClassName =
  "group relative inline-flex h-8.5 flex-1 items-center justify-center overflow-hidden rounded-lg border border-stone-900 bg-stone-900 px-3 text-[11px] font-semibold tracking-[0.03em] text-white shadow-[0_8px_16px_rgba(17,17,17,0.12)] transition duration-200 hover:border-stone-700 hover:bg-stone-700 hover:shadow-[0_10px_20px_rgba(17,17,17,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(17,17,17,0.12)] disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-300 disabled:text-[rgba(255,255,255,0.74)] disabled:shadow-none";

const secondaryButtonClassName =
  "inline-flex h-8.5 items-center justify-center rounded-lg border border-[color:var(--line)] bg-white px-3 text-[11px] font-medium text-stone-700 transition duration-200 hover:border-stone-400 hover:bg-stone-50 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(17,17,17,0.08)] disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-50 disabled:text-stone-400";

export function FilterSidebar({
  title,
  values = {},
  fields,
  submitLabel = "应用筛选",
}: {
  title: string;
  fields: FilterField[];
  values?: Record<string, string | undefined>;
  submitLabel?: string;
}) {
  return (
    <aside className="rounded-[0.95rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-3 shadow-[var(--shadow)] lg:sticky lg:top-20 lg:h-fit">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">Filters</p>
        <h2 className="mt-1 text-[14px] font-semibold tracking-tight text-stone-900">{title}</h2>
        <p className="mt-1 text-[10px] leading-4 text-[color:var(--muted)]">按关键词、属性和价格快速收窄范围。</p>
      </div>

      <form className="mt-2.5 space-y-2.5" method="get">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-1 block text-[11px] font-medium text-stone-700">
              {field.label}
            </label>
            {field.type === "input" ? (
              <input
                id={field.name}
                name={field.name}
                type={field.inputType ?? "text"}
                defaultValue={values[field.name] || ""}
                placeholder={field.placeholder}
                disabled={field.disabled}
                className={fieldClassName}
              />
            ) : (
              <select
                id={field.name}
                name={field.name}
                defaultValue={values[field.name] || ""}
                disabled={field.disabled}
                className={fieldClassName}
              >
                <option value="">全部</option>
                {field.options.map((option) => (
                  <option key={`${field.name}-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="sort" className="mb-1 block text-[11px] font-medium text-stone-700">
            排序方式
          </label>
          <select id="sort" name="sort" defaultValue={values.sort || ""} className={fieldClassName}>
            <option value="">默认排序</option>
            {(values.__sortOptions || "")
              .split("||")
              .filter(Boolean)
              .map((pair) => {
                const [value, label] = pair.split("::");
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
          </select>
        </div>

        <div>
          <label htmlFor="page_size" className="mb-1 block text-[11px] font-medium text-stone-700">
            每页数量
          </label>
          <select id="page_size" name="page_size" defaultValue={values.page_size || "12"} className={fieldClassName}>
            {[12, 24, 36, 48].map((size) => (
              <option key={size} value={size}>
                {size} 条 / 页
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-0.5">
          <button type="submit" className={primaryButtonClassName}>
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%,rgba(255,255,255,0.04))] opacity-100 transition duration-200 group-hover:opacity-90" />
            <span className="relative flex items-center gap-1.5 text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-white/80 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
              {submitLabel}
            </span>
          </button>
          <a href="?" className={secondaryButtonClassName}>
            重置
          </a>
        </div>
      </form>
    </aside>
  );
}
