import Image from "next/image";

import { CardMediaPlaceholder } from "@/components/layout/card-media-placeholder";

type CardMediaProps = {
  label: string;
  tone?: "brand" | "model" | "build" | "component" | "search";
  imageUrl?: string | null;
  alt: string;
};

const mediaConfig = {
  brand: {
    fit: "object-contain",
    frame: "bg-[linear-gradient(135deg,rgba(255,252,248,0.98),rgba(255,247,239,0.88))]",
    inner: "bg-white/88 p-5",
    badge: "Brand visual",
  },
  model: {
    fit: "object-cover",
    frame: "bg-[linear-gradient(135deg,rgba(255,251,245,0.98),rgba(255,244,232,0.88))]",
    inner: "bg-[rgba(255,255,255,0.46)]",
    badge: "Model visual",
  },
  build: {
    fit: "object-cover",
    frame: "bg-[linear-gradient(135deg,rgba(255,250,244,0.98),rgba(248,241,233,0.92))]",
    inner: "bg-[rgba(255,255,255,0.42)]",
    badge: "Build visual",
  },
  component: {
    fit: "object-cover",
    frame: "bg-[linear-gradient(135deg,rgba(255,252,248,0.98),rgba(245,241,236,0.92))]",
    inner: "bg-[rgba(255,255,255,0.44)]",
    badge: "Component visual",
  },
  search: {
    fit: "object-cover",
    frame: "bg-[linear-gradient(135deg,rgba(255,252,248,0.98),rgba(245,241,236,0.92))]",
    inner: "bg-[rgba(255,255,255,0.44)]",
    badge: "Preview",
  },
} as const;

export function CardMedia({ label, tone = "search", imageUrl, alt }: CardMediaProps) {
  if (!imageUrl) {
    return <CardMediaPlaceholder label={label} tone={tone} />;
  }

  const config = mediaConfig[tone];

  return (
    <div className={`relative overflow-hidden rounded-[1.35rem] border border-white/70 p-2 ${config.frame}`}>
      <div className={`relative min-h-[134px] overflow-hidden rounded-[1.1rem] ${config.inner}`}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 220px"
          className={`${config.fit} transition duration-500 group-hover:scale-[1.04]`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(30,24,18,0.18)] via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-3 top-3 inline-flex rounded-full border border-white/65 bg-[rgba(255,255,255,0.72)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-700 backdrop-blur-sm">
          {config.badge}
        </div>
      </div>
    </div>
  );
}
