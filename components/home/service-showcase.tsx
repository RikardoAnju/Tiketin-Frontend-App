import {
  BedDouble,
  Plane,
  Train,
  Bus,
  Ship,
  Clapperboard,
  ArrowUpRight,
} from "lucide-react";

const services = [
  [
    "hotel",
    BedDouble,
    "Hotel",
    "Menginap nyaman di kota tujuan",
    "Mulai Rp250 ribu",
    "blue",
  ],
  [
    "pesawat",
    Plane,
    "Pesawat",
    "Terbang lebih mudah dan hemat",
    "Promo setiap hari",
    "orange",
  ],
  [
    "kereta",
    Train,
    "Kereta",
    "Perjalanan antarkota tanpa ribet",
    "Jadwal real-time",
    "violet",
  ],
  [
    "bus",
    Bus,
    "Bus",
    "Rute lengkap ke seluruh Indonesia",
    "Pesan kursi favorit",
    "teal",
  ],
  [
    "kapal",
    Ship,
    "Kapal",
    "Jelajah kepulauan Indonesia",
    "Pelabuhan pilihan",
    "navy",
  ],
  [
    "bioskop",
    Clapperboard,
    "Bioskop",
    "Film favorit, tiket instan",
    "Pilih kursi sekarang",
    "pink",
  ],
] as const;

export function ServiceShowcase({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <section className="mx-auto mt-14 max-w-[1040px] px-3">
      <div className="mb-6 max-w-xl">
        <span className="section-eyebrow">Satu platform, semua tujuan</span>
        <h2>Semua tiket yang kamu butuhkan.</h2>
        <p>
          Mulai dari liburan, perjalanan bisnis, sampai hiburan akhir
          pekan—pesan semuanya dalam satu tempat.
        </p>
      </div>

      <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
        {services.map(([id, Icon, title, text, meta, tone]) => (
          <button
            className={`group relative flex min-h-[104px] items-center gap-3 overflow-hidden rounded-[18px] border border-slate-200 bg-white p-4 text-left shadow-[0_10px_24px_rgba(24,55,103,.04)] transition hover:-translate-y-1 hover:border-[var(--service-color)] hover:shadow-[0_18px_30px_rgba(24,55,103,.09)] ${tone === "blue" ? "[--service-color:#2563eb]" : tone === "orange" ? "[--service-color:#f97316]" : tone === "violet" ? "[--service-color:#7c3aed]" : tone === "teal" ? "[--service-color:#0d9488]" : tone === "navy" ? "[--service-color:#334155]" : "[--service-color:#db2777]"}`}
            key={id}
            type="button"
            onClick={() => onSelect(id)}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--service-color)] text-white">
              <Icon size={22} />
            </span>
            <span className="grid min-w-0 gap-0.5">
              <strong className="text-[15px] text-slate-900">{title}</strong>
              <small className="text-[11px] leading-snug text-slate-500">
                {text}
              </small>
              <em className="text-[10px] font-extrabold not-italic text-[var(--service-color)]">
                {meta}
              </em>
            </span>
            <ArrowUpRight
              className="ml-auto text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--service-color)]"
              size={18}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
