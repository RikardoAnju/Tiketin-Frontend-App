"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

type Movie = {
  slug: string;
  title: string;
  src: string;
  genre: string;
};

export function CinemaCarousel({ movies }: { movies: readonly Movie[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  function move(direction: -1 | 1) {
    setActiveIndex((current) =>
      (current + direction + movies.length) % movies.length,
    );
  }

  function getOffset(index: number) {
    let offset = index - activeIndex;
    if (offset > movies.length / 2) offset -= movies.length;
    if (offset < -movies.length / 2) offset += movies.length;
    return offset;
  }

  return (
    <div className="mt-8">
      <div
        className="relative h-[380px] touch-pan-y overflow-hidden sm:h-[440px]"
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.clientX - pointerStart.current;
          if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
          pointerStart.current = null;
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-blue-100/50 to-transparent" />
        {movies.map((movie, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const position = `calc(-50% + ${offset * 270}px)`;
          const content = (
            <>
              <Image
                src={movie.src}
                alt={`Poster ${movie.title}`}
                fill
                className="object-cover transition duration-700 ease-out motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-[1.5deg]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold text-slate-900 shadow-sm">
                {movie.genre}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <b className="line-clamp-2 block font-[family-name:var(--font-display)] text-xl leading-tight">
                  {movie.title}
                </b>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-amber-300">
                  {isActive ? "Pilih jadwal" : "Tampilkan film"} <ArrowRight size={15} />
                </span>
              </div>
            </>
          );

          const cardClass = `group absolute left-1/2 top-5 aspect-[2/3] w-[210px] overflow-hidden rounded-[1.75rem] bg-slate-950 text-left shadow-xl transition-[transform,opacity,filter,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:w-[240px] ${
            isActive
              ? "z-20 opacity-100 shadow-2xl shadow-blue-950/35 ring-2 ring-blue-400/70"
              : "z-10 opacity-65 grayscale-[.15] hover:opacity-95 hover:grayscale-0"
          }`;

          const style = {
            transform: `translateX(${position}) scale(${isActive ? 1 : 0.84})`,
            opacity: isVisible ? undefined : 0,
            pointerEvents: isVisible ? undefined : "none",
          } as const;

          return (
            <Link
              key={movie.slug}
              href={`/film/${movie.slug}`}
              className={cardClass}
              style={style}
              aria-label={`Buka detail ${movie.title}`}
            >
              {content}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Film sebelumnya"
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
        >
          <ArrowLeft size={19} />
        </button>
        <div className="flex gap-1.5" aria-hidden="true">
          {movies.map((movie, index) => (
            <span
              key={movie.slug}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === index ? "w-7 bg-blue-600" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Film berikutnya"
          className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
}
