"use client";

import { BedDouble, Plane, Train, Bus, Ship, Clapperboard, Calendar, Tag } from "lucide-react";

interface SidebarNavProps {
  active: string;
  onSelect: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const items = [
  { id: "hotel", icon: BedDouble, label: "Hotel" },
  { id: "pesawat", icon: Plane, label: "Pesawat" },
  { id: "kereta", icon: Train, label: "Kereta" },
  { id: "bus", icon: Bus, label: "Bus" },
  { id: "kapal", icon: Ship, label: "Kapal" },
  { id: "bioskop", icon: Clapperboard, label: "Bioskop" },
  { id: "event", icon: Calendar, label: "Event" },
  { id: "promo", icon: Tag, label: "Promo" },
];

export function SidebarNav({ active, onSelect, collapsed, onToggleCollapse }: SidebarNavProps) {
  return (
    <aside className={collapsed ? "sidebar-nav collapsed" : "sidebar-nav"}>
      <button className="sidebar-toggle" onClick={onToggleCollapse}>☰</button>
      <nav>
        {items.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            className={`sidebar-item ${active === id ? "active" : ""}`}
            onClick={() => onSelect(id)}
          >
            <Icon className="sidebar-icon" size={24} />
            <span className="sidebar-label">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
