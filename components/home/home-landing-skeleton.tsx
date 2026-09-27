import Loading from "@/utils/loading";

export function HomeLandingSkeleton() {
  return (
    <div
      className="min-h-screen animate-pulse overflow-hidden bg-[#f6f8fc] pb-20"
      aria-label="Memuat beranda"
      role="status"
    >
      <section className="bg-[#071a3d] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 inline-flex rounded-2xl border border-white/10 bg-white/10 px-5 py-3">
            <Loading size={28} label="Menyiapkan Tiketin..." />
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="h-8 w-52 rounded-full bg-white/15" />
              <div className="mt-6 h-14 max-w-xl rounded-xl bg-white/20 sm:h-20" />
              <div className="mt-3 h-14 max-w-lg rounded-xl bg-white/15" />
              <div className="mt-7 h-5 max-w-xl rounded bg-white/10" />
              <div className="mt-3 h-5 max-w-md rounded bg-white/10" />
              <div className="mt-8 flex gap-3">
                <div className="h-12 w-40 rounded-xl bg-white/20" />
                <div className="h-12 w-32 rounded-xl bg-white/10" />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <div className="h-5 w-44 rounded bg-white/20" />
              <div className="mt-5 space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-20 rounded-2xl bg-white/15" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="mt-3 h-9 w-96 max-w-full rounded bg-slate-200" />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-44 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="h-11 w-11 rounded-xl bg-slate-100" />
              <div className="mt-7 h-5 w-24 rounded bg-slate-100" />
              <div className="mt-3 h-4 w-36 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="h-64 rounded-3xl bg-slate-200" />
      </section>
    </div>
  );
}
