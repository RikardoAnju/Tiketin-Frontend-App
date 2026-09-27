import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollFade } from "@/components/scroll-fade";
import { HomeApp } from "@/components/home-app";

export default function HomePage() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <HomeApp />

      <ScrollFade animation="slideLeft">
        <SiteFooter />
      </ScrollFade>
    </div>
  );
}
