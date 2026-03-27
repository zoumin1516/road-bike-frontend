import { ListingSkeleton } from "@/components/layout/listing-skeleton";
import { PageIntro } from "@/components/layout/page-intro";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow="Builds"
          title="配置库"
          description="正在加载配置列表与筛选条件。"
          stats={[
            { label: "总配置数", value: "--" },
            { label: "当前页", value: "--" },
          ]}
        />
        <div className="mt-7 grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="hidden rounded-[1.8rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.82)] p-5 shadow-[var(--shadow)] lg:block">
            <div className="space-y-3 animate-pulse">
              <div className="h-4 w-24 rounded-full bg-[rgba(191,91,44,0.16)]" />
              <div className="h-10 rounded-2xl bg-white/70" />
              <div className="h-10 rounded-2xl bg-white/70" />
              <div className="h-10 rounded-2xl bg-white/70" />
              <div className="h-10 rounded-2xl bg-white/70" />
              <div className="h-10 rounded-2xl bg-white/70" />
            </div>
          </div>
          <ListingSkeleton />
        </div>
      </section>
    </main>
  );
}
