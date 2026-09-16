"use client";

import { Plane, Train, Bus, Ship, Hotel, Clapperboard } from "lucide-react";

interface SearchWidgetProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "hotel", icon: Hotel, label: "Hotel" },
  { id: "pesawat", icon: Plane, label: "Pesawat" },
  { id: "kereta", icon: Train, label: "Kereta" },
  { id: "bus", icon: Bus, label: "Bus" },
  { id: "kapal", icon: Ship, label: "Kapal" },
  { id: "bioskop", icon: Clapperboard, label: "Bioskop" },
];

export function SearchWidget({ activeTab, onTabChange }: SearchWidgetProps) {
  return (
    <div className="search-widget">
      <div className="search-tabs">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            className={`search-tab ${activeTab === id ? "active" : ""}`}
            onClick={() => onTabChange(id)}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      <form className="search-form simple-grid">
        <div className="search-field">
          <span>DESTINASI</span>
          <input type="text" placeholder="Kota, hotel, atau area" defaultValue="Bali" />
        </div>
        <div className="search-field">
          <span>CHECK-IN</span>
          <input type="date" placeholder="mm/dd/yyyy" />
        </div>
        <div className="search-field">
          <span>CHECK-OUT</span>
          <input type="date" placeholder="mm/dd/yyyy" />
        </div>
        <div className="search-field">
          <span>KAMAR & TAMU</span>
          <input type="text" placeholder="1 kamar, 2 tamu" />
        </div>
        <button type="submit" className="search-submit">🔍 Cari Hotel</button>
      </form>
    </div>
  );
}
