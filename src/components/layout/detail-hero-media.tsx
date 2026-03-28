import Image from "next/image";

export function DetailHeroMedia({
  imageUrl,
  label,
  alt,
  tone,
  title,
  subtitle,
}: {
  imageUrl?: string | null;
  label?: string;
  alt?: string;
  tone?: "brand" | "model" | "build" | "component";
  title?: string;
  subtitle?: string;
}) {
  const fallbackTone = tone === "brand" ? "bg-stone-100" : "bg-stone-50";
  const initial = (title || alt || label || "?").trim().charAt(0).toUpperCase() || "?";

  return (
    <div className={`overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] ${fallbackTone} min-h-[320px]`}>
      {imageUrl ? (
        <div className="relative h-full min-h-[320px] w-full bg-white">
          <Image src={imageUrl} alt={alt || title || label || "detail image"} fill className="object-contain p-8" sizes="(min-width: 1280px) 32vw, 100vw" />
          {label ? <div className="absolute left-5 top-5 rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-600">{label}</div> : null}
        </div>
      ) : (
        <div className="flex h-full min-h-[320px] flex-col justify-between p-8">
          <div>
            {label ? <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</p> : null}
            <div className="mt-6 text-[5rem] font-semibold leading-none text-stone-300 sm:text-[6rem]">{initial}</div>
          </div>
          <div className="border-t border-[color:var(--line)] pt-5">
            {title ? <h3 className="text-[1.35rem] font-semibold leading-tight text-stone-900">{title}</h3> : null}
            {subtitle ? <p className="mt-2 text-[13px] leading-6 text-stone-600">{subtitle}</p> : null}
          </div>
        </div>
      )}
    </div>
  );
}
