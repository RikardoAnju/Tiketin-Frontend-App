"use client";

import Image from "next/image";
import Link from "next/link";
import { images } from "@/utils/images";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="brand-logo">
        <Image src={images.brand.logo} alt="Tiketin" width={190} height={66} />
      </div>
      <nav className="site-nav">
        <a
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Beranda
        </a>
        <Link href="#promo">Promo</Link>
        <Link href="/">Jadi Partner</Link>
      </nav>
      <Link href="/login" className="login-link">
        Masuk
      </Link>
    </header>
  );
}
