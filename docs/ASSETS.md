# Struktur Aset Tiketin

Aset tidak digabung menjadi satu folder runtime karena Flutter dan Next.js mempunyai cara build berbeda.

## Aset mobile

Lokasi: `mobile/frontend/assets/`

```text
assets/
└── images/
    ├── logo/          # logo yang digunakan Flutter
    ├── icons/         # ikon kategori/fitur Flutter
    ├── banners/       # banner aplikasi
    └── placeholders/  # gambar ketika data belum tersedia
```

Semua file yang digunakan Flutter harus didaftarkan pada `mobile/frontend/pubspec.yaml`.

## Aset website

Lokasi: `web/frontend/public/`

```text
public/
├── images/
│   ├── brand/
│   ├── icons/
│   ├── banners/
│   └── placeholders/
├── favicon.ico
└── manifest.webmanifest
```

File dalam `public` dipanggil dari Next.js menggunakan path mulai dari `/`, misalnya `/images/brand/logo.svg`.

## Aset brand master

Lokasi: `assets/brand/`

Folder ini menyimpan file sumber resmi seperti logo SVG master, panduan warna, font berlisensi, atau file desain. Jangan mengimpor file dari folder ini langsung ke aplikasi. Salin versi yang sudah dioptimalkan ke aset mobile atau website.

## Aset dari backend

API tidak menyimpan upload pengguna di repository. Gambar hotel, poster film, dokumen partner, dan e-ticket harus disimpan di object storage seperti Supabase Storage. Database hanya menyimpan URL/path, metadata, pemilik, dan status file.

Bucket yang disarankan:

```text
public-assets       # gambar produk yang boleh dilihat publik
partner-documents   # dokumen legal, akses privat
user-documents      # identitas penumpang, akses privat dan terenkripsi
tickets             # PDF/QR e-ticket, akses privat atau signed URL
```

Jangan memasukkan password, token, dokumen identitas, atau upload pengguna ke `assets/` maupun `public/`.
