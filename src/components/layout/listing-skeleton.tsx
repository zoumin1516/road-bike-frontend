type ListingSkeletonProps = {
  count?: number;
};

export function ListingSkeleton({ count = 6 }: ListingSkeletonProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="grid min-h-[220px] animate-pulse gap-5 rounded-[1.8rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,252,248,0.96),rgba(255,247,239,0.84))] p-5 shadow-[var(--shadow)] sm:grid-cols-[minmax(0,1.35fr)_220px] sm:p-6"
        >
          <div className="space-y-4">
            <div className="h-3 w-18 rounded-full bg-[rgba(191,91,44,0.16)]" />
            <div className="h-8 w-3/4 rounded-2xl bg-[rgba(143,63,28,0.12)]" />
            <div className="h-4 w-1/3 rounded-full bg-[rgba(114,80,47,0.1)]" />
            <div className="flex flex-wrap gap-2">
              <div className="h-7 w-22 rounded-full bg-white/75" />
              <div className="h-7 w-24 rounded-full bg-white/75" />
              <div className="h-7 w-20 rounded-full bg-white/75" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded-full bg-[rgba(114,80,47,0.1)]" />
              <div className="h-3 w-5/6 rounded-full bg-[rgba(114,80,47,0.1)]" />
              <div className="h-3 w-2/3 rounded-full bg-[rgba(114,80,47,0.1)]" />
            </div>
          </div>
          <div className="rounded-[1.35rem] border border-white/65 bg-white/70 p-4">
            <div className="h-full min-h-[122px] rounded-[1.1rem] border border-dashed border-[rgba(143,63,28,0.16)] bg-[linear-gradient(135deg,rgba(255,247,239,0.72),rgba(255,255,255,0.85))]" />
          </div>
        </div>
      ))}
    </div>
  );
}
