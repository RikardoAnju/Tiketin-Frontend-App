import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Clock3,
  Play,
  Sparkles,
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
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeGenre, setActiveGenre] = useState("Semua");
  const genres = ["Semua", "Horror", "Adventure", "Fantasy", "Now Playing"];
  const filteredMovies = cinemaPosters.filter(
    (movie) => activeGenre === "Semua" || movie.genre === activeGenre,
  );
  const shownMovies = filteredMovies.slice(0, visibleCount);
  const featuredMovie = cinemaPosters[2];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-7 text-white shadow-2xl shadow-blue-950/20 sm:px-9 sm:py-9">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(42,123,255,.5),transparent_36%),linear-gradient(115deg,#071534_0%,#102d68_58%,#0a1a3d_100%)]" />
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[28px] border-blue-300/10" />
        <div className="relative grid items-center gap-8 sm:grid-cols-[1fr_190px]">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100 backdrop-blur">
              <Sparkles size={14} className="text-amber-300" /> PILIHAN MINGGU INI
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight sm:text-4xl">
              {featuredMovie.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100">
              Masuki dunia baru yang memukau. Jadwal tayang terbaik tersedia
              hari ini untuk pengalaman layar lebar yang lebih seru.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-300"><Star size={15} fill="currentColor" /> {featuredMovie.rating}</span>
              <span className="inline-flex items-center gap-1.5 text-blue-100"><Clock3 size={15} /> 3j 12m</span>
              <button type="button" onClick={onSearch} className="ml-1 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300">
                Pesan sekarang <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
          <div className="relative mx-auto w-40 rotate-3 overflow-hidden rounded-2xl ring-4 ring-white/15 shadow-2xl transition duration-500 hover:rotate-0 hover:scale-105 sm:w-44">
            <Image src={featuredMovie.src} alt={`Poster ${featuredMovie.title}`} width={352} height={528} className="h-auto w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="mt-14">
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

        <span className="rounded-full bg-pink-50 px-4 py-2 text-xs font-bold text-pink-600">{filteredMovies.length} film tersedia</span>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => {
              setActiveGenre(genre);
              setVisibleCount(8);
            }}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${activeGenre === genre ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20" : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"}`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shownMovies.map((movie) => (
            <article
              className="group relative aspect-[2/3] overflow-hidden rounded-3xl bg-slate-950 shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
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
      {visibleCount < cinemaPosters.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + 4, cinemaPosters.length))}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50"
          >
            Tampilkan film lainnya <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
