import { HomeLandingSkeleton } from "@/components/home/home-landing-skeleton";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <header className="flex h-[84px] items-center justify-between border-b border-slate-200 bg-white px-7">
        <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-100" />
        <div className="hidden gap-10 md:flex">
          <span className="h-4 w-16 animate-pulse rounded bg-slate-100" />
          <span className="h-4 w-14 animate-pulse rounded bg-slate-100" />
          <span className="h-4 w-20 animate-pulse rounded bg-slate-100" />
        </div>
        <span className="h-11 w-24 animate-pulse -xl bg-blue-100" />
      </header>rounded
      <aside className="fixed bottom-0 left-0 top-[84px] w-24 border-r border-slate-200 bg-white p-4">
        <div className="space-y-6">
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className="mx-auto h-9 w-9 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>
      </aside>
      <main className="pl-24">
        <HomeLandingSkeleton />
      </main>
    </div>
  );
}
