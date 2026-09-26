"use client";

import { useState } from "react";
import { MessageCircle, Star } from "lucide-react";

const reviews = [
  { name: "Nadia P.", score: 5, text: "Ceritanya menegangkan dan suasananya kuat. Cocok ditonton bareng teman." },
  { name: "Raka A.", score: 4, text: "Visual dan musiknya bagus. Jadwal bioskopnya juga mudah dipilih." },
  { name: "Salsa K.", score: 5, text: "Pengalaman pesan tiketnya cepat, kursi favorit masih tersedia." },
];

export function FilmReviews({ title, rating }: { title: string; rating: string }) {
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <section className="mt-16 border-t border-slate-200 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-blue-600">
            Ulasan penonton
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">
            Apa kata mereka tentang {title}?
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold text-slate-950">{rating}</span>
          <span className="text-sm text-slate-500">dari 10<br />penilaian penonton</span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <div className="rounded-2xl bg-slate-950 p-6 text-white">
            <p className="font-bold">Sudah menonton film ini?</p>
            <p className="mt-1 text-sm text-slate-300">Beri rating untuk membantu penonton lain.</p>
            <div className="mt-5 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  aria-label={"Beri " + star + " bintang"}
                  onClick={() => setSelectedRating(star)}
                  className="text-amber-300 transition hover:scale-110"
                >
                  <Star size={26} fill={selectedRating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
            {selectedRating > 0 && <p className="mt-4 text-sm text-amber-200">Terima kasih atas rating kamu!</p>}
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <article key={review.name} className="border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-xs font-extrabold text-blue-700">{review.name.slice(0, 1)}</span><b className="text-sm text-slate-900">{review.name}</b></div>
                <span className="flex items-center gap-1 text-sm font-bold text-amber-600"><Star size={14} fill="currentColor" /> {review.score}.0</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{review.text}</p>
            </article>
          ))}
          <button className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><MessageCircle size={16} /> Lihat semua ulasan</button>
        </div>
      </div>
    </section>
  );
}
