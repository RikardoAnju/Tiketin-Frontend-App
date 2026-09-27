"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarNav } from "@/components/sidebar-nav";
import Loading from "@/utils/loading";
import { TravelHome } from "./home/travel-home";
import { CinemaHome, MovieShelf } from "./home/cinema-home";
import { ServiceShowcase } from "./home/service-showcase";
import { HomeLanding } from "./home/home-landing";
import { HomeLandingSkeleton } from "./home/home-landing-skeleton";

export function HomeApp() {
  const router = useRouter();
  const [activeSidebar, setActiveSidebar] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (navigation?.type !== "reload") return;
    setIsInitializing(true);
    const timer = window.setTimeout(() => setIsInitializing(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    window.setTimeout(
      () =>
        router.push(
          `/search?type=${activeSidebar === "home" ? "hotel" : activeSidebar}`,
        ),
      650,
    );
  };

  const isCinema = activeSidebar === "bioskop";
  return (
    <>
      {isSearching && (
        <Loading variant="overlay" label="Mencari pilihan terbaik..." />
      )}
      <div className={collapsed ? "app-body sidebar-collapsed" : "app-body"}>
        {activeSidebar === "home" && (
          <SidebarNav
            active={activeSidebar}
            onSelect={setActiveSidebar}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((value) => !value)}
          />
        )}
        {activeSidebar !== "home" && !isCinema && (
          <TravelHome
            activeTab={activeSidebar}
            sidebarActive={activeSidebar}
            onTabChange={setActiveSidebar}
            onSearch={handleSearch}
            collapsed={collapsed}
            onToggle={() => setCollapsed((value) => !value)}
            showSearch
          />
        )}
        {isCinema && (
          <SidebarNav
            active={activeSidebar}
            onSelect={setActiveSidebar}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((value) => !value)}
          />
        )}
        <main className={`app-main ${isCinema ? "cinema-mode" : ""}`}>
          {isInitializing ? (
            <HomeLandingSkeleton />
          ) : (
            <>
              {isCinema && <CinemaHome onSearch={handleSearch} />}
              {activeSidebar === "home" && (
                <HomeLanding onSelect={setActiveSidebar} />
              )}
              {!isCinema && activeSidebar !== "home" && (
                <>
                  <ServiceShowcase onSelect={setActiveSidebar} />
                  <MovieShelf
                    onSearch={() => {
                      setActiveSidebar("bioskop");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
