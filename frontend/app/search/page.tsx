import Link from "next/link";

const labels: Record<string, string> = {
  hotel: "Hotel",
  pesawat: "Pesawat",
  kereta: "Kereta",
  bus: "Bus",
  kapal: "Kapal",
  bioskop: "Bioskop",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const type = labels[params.type ?? ""] ?? "Tiket";

  return (
    <main className="search-result-page">
      <span className="section-eyebrow">Hasil pencarian</span>
      <h1>Pilihan {type} untukmu</h1>
      <p>
        Pencarian berhasil diproses. Hasil dan filter akan tampil di halaman
        ini.
      </p>
      <Link href="/" className="search-back-link">
        Kembali ke beranda
      </Link>
    </main>
  );
}
