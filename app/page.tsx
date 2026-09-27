import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ScrollFade } from "@/components/scroll-fade";
import { HomeApp } from "@/components/home-app";
import { images } from "@/utils/images";

export default function HomePage() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <HomeApp />

      <ScrollFade animation="slideLeft">
        <footer className="site-footer" id="bantuan">
          <div className="footer-grid">
            <div className="footer-about">
              <Image
                src={images.brand.logo}
                alt="Tiketin"
                width={148}
                height={52}
              />
              <p>
                Platform perjalanan all-in-one untuk semua kebutuhan tiket
                pesawat, kereta, bus, kapal, event, dan wisata.
              </p>
              <div className="socials">
                <a href="#">◎</a>
                <a href="#">f</a>
                <a href="#">▶</a>
                <a href="#">in</a>
              </div>
            </div>
            <FooterLinks
              title="Tautan"
              links={["Tentang TIKETIN", "Fitur", "Partner", "Blog"]}
            />
            <FooterLinks
              title="Perusahaan"
              links={["Karier", "Kebijakan Privasi", "Syarat & Ketentuan"]}
            />
            <FooterLinks
              title="Bantuan"
              links={["Pusat Bantuan", "Hubungi Kami", "Status Layanan"]}
            />
            <div>
              <h3>Kontak Kami</h3>
              <p>info@tiketin.id</p>
              <p>021-1234-5678</p>
              <p>Jakarta, Indonesia</p>
            </div>
          </div>
          <div className="copyright">© 2026 TIKETIN. All rights reserved.</div>
        </footer>
      </ScrollFade>
    </div>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3>{title}</h3>
      {links.map((link) => (
        <Link href="#" key={link}>
          {link}
        </Link>
      ))}
    </div>
  );
}
