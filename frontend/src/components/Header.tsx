"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <section id="header" className="header">
      <div className="mavii_wrap">
        <div className="header__bar">
          <p className="header__tagline">Brand Talk | Market Walk</p>
          <div className="header__logo" aria-label="Maviimedia Logo">
            <img
              className="header__logo-img spin"
              src="/assets/MAVIIMEDIA.svg"
              alt="Maviimedia logo"
              width="84"
              height="84"
              decoding="async"
              loading="eager"
            />
          </div>
          <nav className="header__nav" aria-label="Primary">
            <Link
              href="/"
              className={`header__nav-link ${pathname === "/" ? "active" : ""}`}
            >
              WORK
            </Link>
            <Link
              href="/about"
              className={`header__nav-link ${pathname === "/about" ? "active" : ""}`}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className={`header__nav-link ${pathname === "/contact" ? "active" : ""}`}
            >
              CONTACT
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}