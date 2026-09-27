"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Clapperboard,
  Plane,
  TicketPercent,
} from "lucide-react";

const promos = [
  {
    eyebrow: "HOTEL FLASH SALE",
    title: "Diskon sampai 40% untuk liburan akhir pekan.",
    detail: "Pesan sebelum Minggu, 23.59",
    code: "HEMATIN",
    color: "from-blue-700 to-cyan-500",
    icon: BedDouble,
    target: "hotel",
  },
  {
    eyebrow: "TERBANG HEMAT",
    title: "Harga spesial rute pilihan mulai Rp599 ribu.",
    detail: "Jakarta, Bali, Surabaya, Medan",
    code: "TERBANG",
    color: "from-orange-500 to-rose-500",
    icon: Plane,
    target: "pesawat",
  },
  {
    eyebrow: "NONTON SERU",
    title: "Cashback Rp25 ribu untuk film pilihanmu.",
    detail: "Berlaku di bioskop partner",
    code: "NONTON",
    color: "from-fuchsia-600 to-pink-500",
    icon: Clapperboard,
    target: "bioskop",
  },
] as const;

export function PromoSlider({ onSelect }: { onSelect: (id: string) => void }) {
  const [active, setActive] = useState(0);
  const promo = promos[active];
  const Icon = promo.icon;

  const previous = () => {
    setActive((current) => (current - 1 + promos.length) % promos.length);
  };

  const next = () => {
    setActive((current) => (current + 1) % promos.length);
  };

  useEffect(() => {
    const timer = window.setInterval(next, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="promo" className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <div className="mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-orange-600">
          Promo pilihan
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          Lebih banyak jalan, lebih banyak hemat.
        </h2>
      </div>

      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${promo.color} p-7 text-white shadow-xl shadow-slate-900/15 transition-colors duration-500 sm:p-10`}
      >
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -right-8 -top-12 h-56 w-56 rounded-full border-[30px] border-white/15" />
        <div className="absolute -right-20 bottom-[-104px] h-72 w-72 rounded-full border border-dashed border-white/40" />
        <div className="absolute left-[46%] top-0 h-full w-24 -skew-x-12 bg-white/5" />
        <div className="absolute bottom-7 left-[44%] hidden h-16 w-40 rotate-[-12deg] rounded-2xl border border-white/30 bg-white/10 md:block" />
        <div className="absolute bottom-12 left-[52%] hidden items-center gap-2 text-[10px] font-bold tracking-[.2em] text-white/55 md:flex">
          <span className="h-px w-8 bg-white/50" />
          TIKETIN PASS
          <span className="h-px w-8 bg-white/50" />
        </div>

        <div className="absolute right-5 top-5 z-10 flex gap-2">
          <button
            aria-label="Promo sebelumnya"
            onClick={previous}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/30 bg-slate-950/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label="Promo berikutnya"
            onClick={next}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-950 shadow-lg transition hover:scale-105"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <p className="text-xs font-extrabold tracking-[.16em] text-white/75">
              {promo.eyebrow}
            </p>
            <h3 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              {promo.title}
            </h3>
            <p className="mt-4 text-sm text-white/85">{promo.detail}</p>
            <button
              onClick={() => onSelect(promo.target)}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 transition hover:-translate-y-0.5"
            >
              Pakai promo
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-dashed border-white/50 bg-slate-950/15 p-5 backdrop-blur">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
              <Icon size={28} />
            </span>
            <div>
              <span className="block text-xs text-white/70">Kode promo</span>
              <b className="mt-1 block text-xl tracking-[.14em]">
                {promo.code}
              </b>
            </div>
            <TicketPercent className="ml-3 opacity-70" size={24} />
          </div>
        </div>

        <div className="relative mt-8 flex gap-2">
          {promos.map((item, index) => (
            <button
              key={item.code}
              aria-label={`Tampilkan promo ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all ${
                index === active
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
