import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Clapperboard,
  Play,
  Star,
  Ticket,
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
  const [activeGenre, setActiveGenre] = useState("Semua");
  const genres = ["Semua", "Horror", "Adventure", "Fantasy", "Now Playing"];
  const filteredMovies = cinemaPosters.filter(
    (movie) => activeGenre === "Semua" || movie.genre === activeGenre,
  );
  const featuredMovie = cinemaPosters[2];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8">
        <div className="absolute -right-12 -top-16 -z-10 h-48 w-48 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute -left-10 bottom-0 -z-10 h-32 w-32 rounded-full bg-blue-200/40 blur-2xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-pink-600">
              <Clapperboard size={15} /> Rekomendasi bioskop
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Film yang sedang tayang
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Pilih film favoritmu dan pesan kursi bioskop dengan cepat.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-4 py-2 text-xs font-bold text-pink-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-500" />
            {filteredMovies.length} film tersedia
          </span>
        </div>

        <div className="relative mt-7 flex gap-2 overflow-x-auto rounded-2xl bg-slate-950 p-2 shadow-inner [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setActiveGenre(genre)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition ${activeGenre === genre ? "bg-amber-300 text-slate-950 shadow-lg shadow-amber-300/20" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredMovies.map((movie) => (
            <article
              className={`group relative aspect-[2/3] overflow-hidden rounded-3xl bg-slate-950 shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${movie === featuredMovie ? "ring-2 ring-amber-300 shadow-xl shadow-amber-400/30" : ""}`}
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
              {movie === featuredMovie && (
                <>
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-amber-300 px-3 py-1.5 text-[10px] font-extrabold text-slate-950 shadow-lg shadow-amber-500/40">
                    Pilihan minggu ini
                  </span>
                </>
              )}
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
    </section>
  );
}
