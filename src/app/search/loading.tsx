import { ListingSkeleton } from "@/components/layout/listing-skeleton";
import { PageIntro } from "@/components/layout/page-intro";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow="Search"
          title="全站搜索"
          description="正在整理搜索结果与结果分组。"
          stats={[
            { label: "关键词", value: "..." },
            { label: "结果数", value: "--" },
          ]}
        />
        <div className="mt-7 animate-pulse rounded-[1.8rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.82)] p-5 shadow-[var(--shadow)]">
          <div className="grid gap-3 lg:grid-cols-[1fr_200px_140px]">
            <div className="h-11 rounded-2xl bg-white/70" />
            <div className="h-11 rounded-2xl bg-white/70" />
            <div className="h-11 rounded-2xl bg-[rgba(191,91,44,0.16)]" />
          </div>
        </div>
        <div className="mt-7">
          <ListingSkeleton count={4} />
        </div>
      </section>
    </main>
  );
}
