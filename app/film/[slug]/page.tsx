import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Play,
  Star,
  Ticket,
} from "lucide-react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { FilmReviews } from "@/components/film-reviews";
import { filmDetails } from "@/utils/images/posters";

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const movie = filmDetails[slug];
  if (!movie) notFound();

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <SiteHeader />
      <main className="relative isolate mx-auto max-w-6xl overflow-hidden px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -left-40 top-16 -z-10 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute -right-44 top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="absolute right-0 top-0 -z-10 h-72 w-72 rotate-12 rounded-[4rem] border-[28px] border-blue-200/40" />
        <section className="relative z-10 border-y border-slate-200/80 py-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[.2em] text-blue-700">
              <Play size={15} fill="currentColor" /> NOW PLAYING
            </span>
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[290px_1fr]">
            <div className="group mx-auto w-full max-w-[280px] [perspective:1000px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-8 ring-white/70 shadow-2xl shadow-slate-950/25 transition duration-500 ease-out motion-safe:group-hover:-translate-y-3 motion-safe:group-hover:rotate-[1.5deg] motion-safe:group-hover:scale-[1.025] group-hover:shadow-blue-950/40">
            <Image src={movie.src} alt={"Poster " + movie.title} fill priority className="object-cover" />
            </div>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3.5 font-extrabold text-slate-950 shadow-lg shadow-amber-300/20 transition hover:-translate-y-0.5 hover:bg-amber-200">
              <Ticket size={18} /> Pesan tiket
            </button>
            </div>
            <div className="relative min-w-0 pt-2">
              <div className="pr-0 sm:pr-40">
                <span className="w-fit rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-600">{movie.genre}</span>
                <h1 className="mt-4 border-l-4 border-amber-400 pl-4 text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">{movie.title}</h1>
              </div>
              <div className="mt-5 flex gap-2 sm:absolute sm:right-0 sm:top-0 sm:mt-0">
                <span className="inline-flex items-center gap-1 rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700"><Star size={16} fill="currentColor" /> {movie.rating}</span>
                <span className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700"><Clock3 size={16} /> {movie.duration}</span>
              </div>
            <dl className="mt-8 grid gap-x-8 gap-y-4 border-y border-slate-200 py-6 text-sm sm:grid-cols-2">
              <div><dt className="text-slate-400">Jenis film</dt><dd className="mt-1 font-bold text-slate-800">{movie.genre}</dd></div>
              <div><dt className="text-slate-400">Sutradara</dt><dd className="mt-1 font-bold text-slate-800">{movie.director}</dd></div>
              <div><dt className="text-slate-400">Produksi</dt><dd className="mt-1 font-bold text-slate-800">Tiketin Pictures</dd></div>
              <div><dt className="text-slate-400">Klasifikasi usia</dt><dd className="mt-1 font-bold text-slate-800">13 tahun ke atas</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"><Play size={16} fill="currentColor" /> Lihat trailer</button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"><MapPin size={16} /> Pilih bioskop</button>
              <span className="inline-flex items-center gap-2 px-2 py-3 text-sm text-slate-500"><CalendarDays size={16} /> Tayang hari ini</span>
            </div>
            <div className="mt-9 border-t border-slate-200 pt-6"><h2 className="text-lg font-extrabold text-slate-950">Sinopsis</h2><p className="mt-3 max-w-2xl leading-7 text-slate-600">{movie.synopsis}</p></div>
            </div>
          </div>
        </section>
        <div className="relative z-10"><FilmReviews title={movie.title} rating={movie.rating} /></div>
      </main>
    </div>
  );
}
