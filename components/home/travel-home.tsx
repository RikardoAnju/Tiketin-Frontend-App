import Image from "next/image";
import { BadgeCheck, ShieldCheck, Ticket, ArrowUpRight } from "lucide-react";
import { SearchWidget } from "@/components/search-widget";
import { SidebarNav } from "@/components/sidebar-nav";
import { images } from "@/utils/images";
import { promos } from "./home-data";

export function TravelHome({
  activeTab,
  sidebarActive,
  onTabChange,
  onSearch,
  collapsed,
  onToggle,
  showSearch,
}: {
  activeTab: string;
  sidebarActive: string;
  onTabChange: (tab: string) => void;
  onSearch: () => void;
  collapsed: boolean;
  onToggle: () => void;
  showSearch: boolean;
}) {
  return (
    <>
      <SidebarNav
        active={sidebarActive}
        onSelect={onTabChange}
        collapsed={collapsed}
        onToggleCollapse={onToggle}
      />
      <section
        className={`trip-hero ${showSearch ? "with-search" : "overview-hero"}`}
      >
        <div className="trip-hero-content">
          <span className="hero-kicker">
            Platform tiket #1 untuk semua perjalananmu
          </span>
          <h1>
            Satu Aplikasi,
            <br />
            <span className="hero-accent">Segala Perjalanan.</span>
          </h1>
          <div className="trust-badges">
            <span>
              <ShieldCheck size={15} /> Harga terbaik terjamin
            </span>
            <span>
              <BadgeCheck size={15} /> Tiket terkonfirmasi instan
            </span>
            <span>
              <Ticket size={15} /> Refund mudah & cepat
            </span>
          </div>
        </div>
        {showSearch && (
          <SearchWidget
            activeTab={activeTab}
            onTabChange={onTabChange}
            onSearch={onSearch}
          />
        )}
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
            <span className="promo-icon" style={{ background: gradient }}>
              <Icon size={22} color="#fff" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <ArrowUpRight className="promo-arrow" size={18} />
          </article>
        ))}
      </section>
    </>
  );
}
