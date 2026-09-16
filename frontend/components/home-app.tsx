"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, ShieldCheck, Ticket, BedDouble, Plane, Clapperboard, ArrowUpRight } from "lucide-react";
import { SidebarNav } from "@/components/sidebar-nav";
import { SearchWidget } from "@/components/search-widget";
import { images } from "@/utils/images";
import { gradients } from "@/utils/colors";

const promos = [
  { icon: BedDouble, gradient: gradients.hotel, title: "Diskon Hotel hingga 40%", text: "Nikmati liburan lebih hemat di ribuan hotel pilihan." },
  { icon: Plane, gradient: gradients.pesawat, title: "Tiket Pesawat Promo", text: "Terbang ke seluruh Indonesia dengan harga spesial." },
  { icon: Clapperboard, gradient: gradients.bioskop, title: "Nonton Jadi Murah", text: "Dapatkan cashback tiket bioskop setiap akhir pekan." },
];

export function HomeApp() {
  const [activeSidebar, setActiveSidebar] = useState("hotel");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={collapsed ? "app-body sidebar-collapsed" : "app-body"}>
      <SidebarNav active={activeSidebar} onSelect={setActiveSidebar} collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} />

      <main className="app-main">
        <section className="trip-hero">
          <div className="trip-hero-content">
            <span className="hero-kicker">Platform tiket #1 untuk semua perjalananmu</span>
            <h1>Satu Aplikasi,<br /><span className="hero-accent">Segala Perjalanan.</span></h1>

            <div className="trust-badges">
              <span><ShieldCheck size={15} strokeWidth={2.3} /> Harga terbaik terjamin</span>
              <span><BadgeCheck size={15} strokeWidth={2.3} /> Tiket terkonfirmasi instan</span>
              <span><Ticket size={15} strokeWidth={2.3} /> Refund mudah & cepat</span>
            </div>
          </div>

          <SearchWidget activeTab="hotel" onTabChange={setActiveSidebar} />

          <div className="hero-travel-full">
            <Image
              src={images.banner.heroIllustration}
              alt="Pesawat, kereta, bus, dan kapal sebagai layanan Tiketin"
              width={1359}
              height={492}
              priority
            />
          </div>
        </section>

        <section className="promo-strip">
          {promos.map(({ icon: Icon, gradient, title, text }) => (
            <article className="promo-card" key={title}>
              <span className="promo-icon" style={{ background: gradient }}><Icon size={22} strokeWidth={2.2} color="#fff" /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <ArrowUpRight className="promo-arrow" size={18} strokeWidth={2.2} />
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
