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
  "h-8.5 w-full rounded-lg border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-2.5 text-[12px] font-medium text-stone-700 outline-none transition duration-200 placeholder:text-stone-400 hover:border-[rgba(143,63,28,0.22)] hover:bg-white focus:border-[color:var(--accent)] focus:bg-white focus-visible:ring-2 focus-visible:ring-[rgba(191,91,44,0.12)] disabled:cursor-not-allowed disabled:border-[rgba(114,80,47,0.08)] disabled:bg-[rgba(255,253,249,0.58)] disabled:text-stone-400 disabled:placeholder:text-stone-300";

const primaryButtonClassName =
  "group relative inline-flex h-9 flex-1 items-center justify-center overflow-hidden rounded-lg border border-[#8f3f1c] bg-[#9d4a24] px-3 text-[12px] font-semibold tracking-[0.03em] text-white shadow-[0_8px_16px_rgba(143,63,28,0.16)] transition duration-200 hover:border-[#bf5b2c] hover:bg-[#bf5b2c] hover:shadow-[0_10px_20px_rgba(191,91,44,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(191,91,44,0.2)] disabled:cursor-not-allowed disabled:border-[#c9b8ac] disabled:bg-[#d8cec6] disabled:text-[rgba(255,255,255,0.74)] disabled:shadow-none";

const secondaryButtonClassName =
  "inline-flex h-9 items-center justify-center rounded-lg border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 text-[12px] font-medium text-stone-700 transition duration-200 hover:border-[color:var(--accent)] hover:bg-white hover:text-[color:var(--accent-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(191,91,44,0.12)] disabled:cursor-not-allowed disabled:border-[rgba(114,80,47,0.08)] disabled:bg-[rgba(255,253,249,0.58)] disabled:text-stone-400";

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
    <aside className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-3.5 shadow-[var(--shadow)] lg:sticky lg:top-20 lg:h-fit">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Filters</p>
        <h2 className="mt-1 text-base font-semibold tracking-tight text-stone-900">{title}</h2>
        <p className="mt-1 text-[11px] leading-4.5 text-[color:var(--muted)]">按关键词、属性和价格快速收窄范围。</p>
      </div>

      <form className="mt-3 space-y-3" method="get">
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
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_42%,rgba(255,255,255,0.06))] opacity-100 transition duration-200 group-hover:opacity-90" />
            <span className="relative flex items-center gap-1.5 text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-[#ffd7b8] shadow-[0_0_0_3px_rgba(255,215,184,0.18)]" />
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
