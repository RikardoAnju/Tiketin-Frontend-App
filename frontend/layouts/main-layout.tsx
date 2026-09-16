import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <SiteHeader />
      {children}
    </div>
  );
}
