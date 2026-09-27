import Image from "next/image";
import {
  ArrowRight,
  BedDouble,
  Bus,
  Clapperboard,
  Flame,
  MapPin,
  Plane,
  ShieldCheck,
  Ship,
  Sparkles,
  Train,
} from "lucide-react";
import { images } from "@/utils/images";
import { trendingMovies } from "@/utils/images/posters";
import { PromoSlider } from "./promo-slider";
import { CinemaCarousel } from "./cinema-carousel";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

const services = [
  [
    "hotel",
    "Hotel",
    "Mulai Rp250 ribu",
    BedDouble,
    "from-blue-500 to-indigo-600",
  ],
  [
    "pesawat",
    "Pesawat",
    "Promo tiap hari",
    Plane,
    "from-orange-400 to-rose-500",
  ],
  [
    "kereta",
    "Kereta",
    "Jadwal real-time",
    Train,
    "from-violet-500 to-purple-600",
  ],
  ["bus", "Bus", "Rute seluruh Indonesia", Bus, "from-teal-500 to-emerald-600"],
  ["kapal", "Kapal", "Jelajah kepulauan", Ship, "from-slate-600 to-slate-800"],
  [
    "bioskop",
    "Bioskop",
    "Pilih kursi sekarang",
    Clapperboard,
    "from-pink-500 to-fuchsia-600",
  ],
] as const;

export function HomeLanding({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f6f8fc] pb-20">
      <section className="relative isolate overflow-hidden bg-[#071a3d] px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="absolute inset-0 opacity-40">
          <Image
            src={images.banner.heroIllustration}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,19,48,.98)_0%,rgba(7,26,61,.92)_48%,rgba(7,26,61,.48)_100%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-blue-100 backdrop-blur">
              <ShieldCheck size={15} /> Tiket aman, perjalanan nyaman
            </span>
            <h1 className="mt-5 font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              Pergi ke mana pun,{" "}
              <span className="text-amber-300">semua tiketnya di sini.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              Dari liburan dadakan sampai nonton malam ini. Pesan hotel,
              transportasi, dan hiburan dalam satu perjalanan yang mudah.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onSelect("pesawat")}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
              >
                Mulai cari tiket <ArrowRight size={17} />
              </button>
              <button
                onClick={() => onSelect("bioskop")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Film hari ini <Clapperboard size={17} />
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-blue-100">
              <span>
                <b className="mr-1 text-white">2 juta+</b> tiket terjual
              </span>
              <span>
                <b className="mr-1 text-white">24/7</b> bantuan siap
              </span>
              <span>
                <b className="mr-1 text-white">100%</b> e-ticket instan
              </span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">
                Paling dicari minggu ini
              </span>
              <Sparkles size={18} className="text-amber-300" />
            </div>
            <div className="mt-5 space-y-3">
              <QuickPick
                icon={BedDouble}
                title="Hotel untuk akhir pekan"
                subtitle="Diskon hingga 40%"
                solid
                onClick={() => onSelect("hotel")}
              />
              <QuickPick
                icon={Plane}
                title="Jakarta ke Bali"
                subtitle="Mulai Rp599.000"
                onClick={() => onSelect("pesawat")}
              />
              <QuickPick
                icon={Clapperboard}
                title="Film tayang hari ini"
                subtitle="Pilih kursi favoritmu"
                onClick={() => onSelect("bioskop")}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <RevealOnScroll>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-blue-600">
                Pilih kebutuhanmu
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                Satu aplikasi untuk setiap rencana.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Mulai dari perjalanan harian sampai liburan panjang, pilih layanan
              yang kamu butuhkan.
            </p>
          </div>
        </RevealOnScroll>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([id, title, subtitle, Icon, gradient], index) => (
            <RevealOnScroll key={id} delay={index * 70}>
              <button
                onClick={() => onSelect(id)}
                className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}
                  >
                    <Icon size={22} strokeWidth={2.35} />
                  </span>
                  <span className="rounded-full border border-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Pesan
                  </span>
                </div>
                <span className="mt-6 block font-[family-name:var(--font-display)] text-xl font-bold text-slate-900">
                  {title}
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {subtitle}
                </span>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-blue-700 opacity-0 transition group-hover:opacity-100">
                  Lihat pilihan <ArrowRight size={14} />
                </span>
              </button>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <RevealOnScroll>
        <PromoSlider onSelect={onSelect} />
      </RevealOnScroll>

      <section className="mx-auto mt-16 max-w-6xl px-5 sm:px-8 lg:px-12">
        <RevealOnScroll>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-rose-600">
              <span className="relative grid h-5 w-5 place-items-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-orange-400/70" />
                <Flame
                  size={16}
                  fill="currentColor"
                  className="relative animate-pulse text-orange-500"
                />
              </span>
              Sedang trending
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                Yang ramai dipesan minggu ini.
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />{" "}
              Update hari ini
            </span>
          </div>
          <p className="mt-3 max-w-xl text-sm text-slate-500">
            Film pilihan yang sedang banyak dicari. Pesan kursi sebelum jam
            tayang favorit habis.
          </p>
        </RevealOnScroll>
        <CinemaCarousel movies={trendingMovies} />
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-blue-100 bg-white px-6 py-6 shadow-sm sm:px-8">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <MapPin size={23} />
            </span>
            <div>
              <b className="block text-slate-900">Belum tahu mau ke mana?</b>
              <span className="text-sm text-slate-500">
                Mulai dari tiket dan biarkan perjalananmu berkembang.
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelect("hotel")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Cari inspirasi <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}

function QuickPick({
  icon: Icon,
  title,
  subtitle,
  onClick,
  solid = false,
}: {
  icon: typeof BedDouble;
  title: string;
  subtitle: string;
  onClick: () => void;
  solid?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition hover:translate-x-1 ${solid ? "bg-white text-slate-900" : "bg-white/10 hover:bg-white/15"}`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl text-white ${solid ? "bg-blue-600" : title.includes("Bali") ? "bg-orange-400" : "bg-pink-500"}`}
      >
        <Icon size={20} />
      </span>
      <span className="flex-1">
        <b className="block text-sm">{title}</b>
        <small className={solid ? "text-slate-500" : "text-blue-100"}>
          {subtitle}
        </small>
      </span>
      <ArrowRight size={18} />
    </button>
  );
}
