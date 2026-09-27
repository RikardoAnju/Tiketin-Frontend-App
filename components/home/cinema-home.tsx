import { useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Play,
  Star,
  Ticket,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cinemaPosters } from "./home-data";

export function CinemaHome({ onSearch }: { onSearch: () => void }) {
  return (
    <>
      <section className="cinema-hero">
        <div className="cinema-hero-copy">
          <span className="cinema-kicker">
            <Play size={13} fill="currentColor" /> NOW PLAYING
          </span>
          <h2>
            Film bagus. Kursi terbaik. <em>Sekarang.</em>
          </h2>
          <p>
            Pesan tiket bioskop tanpa antre, pilih kursi favoritmu, dan simpan
            tiket langsung di aplikasi.
          </p>
          <button className="cinema-hero-cta" onClick={onSearch}>
            Cari film favorit <ArrowUpRight size={17} />
          </button>
          <div className="cinema-trust">
            <span>
              <Ticket size={15} /> E-ticket instan
            </span>
            <span>
              <Star size={15} /> Harga transparan
            </span>
          </div>
        </div>
        <div className="cinema-hero-orb" aria-hidden="true">
          <span>
            FILM
            <br />
            <b>
              OF THE
              <br />
              WEEK
            </b>
          </span>
        </div>
      </section>
      <MovieShelf onSearch={onSearch} />
    </>
  );
}

export function MovieShelf({ onSearch }: { onSearch: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const maxSlide = Math.max(0, cinemaPosters.length - 4);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[.16em] text-pink-600">
            Rekomendasi bioskop
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
            Film yang sedang tayang
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Pilih film favoritmu dan pesan kursi bioskop dengan cepat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            aria-label="Film sebelumnya"
            disabled={activeSlide === 0}
            onClick={() => setActiveSlide((slide) => Math.max(0, slide - 1))}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            aria-label="Film berikutnya"
            disabled={activeSlide === maxSlide}
            onClick={() =>
              setActiveSlide((slide) => Math.min(maxSlide, slide + 1))
            }
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeSlide * 230}px)` }}
        >
          {cinemaPosters.map((movie) => (
            <article
              className="group relative aspect-[2/3] w-[210px] shrink-0 overflow-hidden rounded-3xl bg-slate-950 shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              key={movie.src}
            >
              <div className="absolute inset-0">
                <Image
                  src={movie.src}
                  alt={`Poster film ${movie.title}`}
                  fill
                  sizes="(max-width: 680px) 62vw, 210px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold text-slate-900">
                {movie.genre}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="line-clamp-2 text-lg font-extrabold leading-tight">
                  {movie.title}
                </h3>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 text-xs text-amber-300">
                    <Star size={14} fill="currentColor" />
                    {movie.rating}
                  </span>
                  <strong className="text-sm">{movie.price}</strong>
                </div>
                <button
                  type="button"
                  onClick={onSearch}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                >
                  Pesan tiket
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
