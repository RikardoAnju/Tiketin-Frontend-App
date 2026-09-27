# Struktur Folder Frontend Tiketin

```
frontend/
├── app/              # Routing Next.js App Router (page.tsx, layout.tsx, globals.css)
├── components/       # Komponen UI siap pakai (SiteHeader, SearchWidget, HomeApp)
│   └── ui/           # Komponen dasar/primitive (Button, Card, Input) - reusable & unstyled
├── features/         # Kode per-domain (hotel/, pesawat/, kereta/, dst) - types, logic khusus fitur
├── hooks/            # Custom React hooks
├── layouts/          # Kerangka halaman (MainLayout, DashboardLayout)
├── public/           # Aset statis (images, icons, fonts)
├── services/         # Komunikasi API (fetch wrapper, endpoint calls)
├── store/            # State management global (Zustand)
└── utils/            # Fungsi bantu (format currency, date, dll)
```

## Kapan pakai folder yang mana?

- **components/** → Komponen spesifik project, sudah lengkap styling-nya.
- **components/ui/** → Komponen generik (Button, Card, Input) yang dipakai ulang di banyak tempat, minim styling khusus.
- **features/{nama}/** → Semua yang berhubungan dengan satu fitur (types, hooks, service khusus fitur itu).
- **services/** → Semua pemanggilan API backend.
- **store/** → State yang dipakai lintas komponen (misal: filter pencarian aktif).
- **utils/** → Fungsi murni tanpa side-effect (format, validasi, dll).

## Import alias

Gunakan `@/` untuk import dari root frontend, contoh:

```ts
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search-store";
```
