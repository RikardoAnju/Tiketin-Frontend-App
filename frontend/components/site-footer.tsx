import Image from "next/image";
import Link from "next/link";
import { Globe2, MessageCircle, Play, Send } from "lucide-react";
import { images } from "@/utils/images";

const footerGroups = [
  { title: "Tautan", links: ["Tentang TIKETIN", "Fitur", "Partner", "Blog"] },
  { title: "Perusahaan", links: ["Karier", "Kebijakan Privasi", "Syarat & Ketentuan"] },
  { title: "Bantuan", links: ["Pusat Bantuan", "Hubungi Kami", "Status Layanan"] },
];

export function SiteFooter() {
  return (
    <footer id="bantuan" className="relative mt-8 overflow-hidden bg-[linear-gradient(135deg,#1747a3_0%,#123985_52%,#0d2d70_100%)] pt-36 text-blue-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[#f6f8fc] [clip-path:polygon(0_0,8%_18%,27%_56%,38%_30%,58%_72%,67%_42%,80%_68%,100%_24%,100%_0)]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-10 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.55fr_repeat(4,1fr)] lg:px-12">
        <div className="max-w-xs">
          <div className="inline-flex rounded-2xl bg-white/95 px-4 py-3 shadow-xl shadow-blue-950/20">
            <Image src={images.brand.logo} alt="Tiketin" width={148} height={52} />
          </div>
          <p className="mt-5 text-sm leading-6 text-blue-100">
            Platform perjalanan all-in-one untuk hotel, transportasi, event,
            dan hiburan.
          </p>
          <div className="mt-5 flex gap-2">
            {[Globe2, MessageCircle, Play, Send].map((Icon, index) => (
              <Link key={index} href="#" aria-label="Media sosial" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-blue-500">
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-extrabold text-white">{group.title}</h2>
            <div className="mt-4 grid gap-3">
              {group.links.map((link) => (
                <Link key={link} href="#" className="text-sm text-blue-100 transition hover:translate-x-1 hover:text-white">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-extrabold text-white">Kontak Kami</h2>
          <div className="mt-4 grid gap-3 text-sm text-blue-100">
            <span>info@tiketin.id</span>
            <span>021-1234-5678</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/15 px-5 py-5 text-center text-xs text-blue-100 sm:px-8 lg:px-12">
        © 2026 TIKETIN. All rights reserved.
      </div>
    </footer>
  );
}
