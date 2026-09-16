import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiketin - Pesan Tiket Perjalanan dan Hiburan",
  description: "Platform perjalanan all-in-one untuk semua kebutuhan tiket pesawat, kereta, bus, kapal, event, dan wisata.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
