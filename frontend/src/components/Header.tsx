"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <section id="header" className="header pt-9 lg:pt-0">
      <style>{`
        @keyframes arrowBounceLoop {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(3px, -3px);
          }
        }
        .animate-arrow-loop {
          animation: arrowBounceLoop 1.4s ease-in-out infinite;
        }
      `}</style>

      <div className="mavii_wrap">
        <div className="header__bar">
          <p className="header__tagline lg:inline-flex lg:items-center lg:gap-3">
            <span>Brand Talk | Market Walk</span>
            <Link
              href="https://wa.me/+919172354728"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0022FF] px-3.5 py-1 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              <span className="leading-none">Start Chat</span>
              <ArrowUpRight size={13} className="shrink-0 animate-arrow-loop" />
            </Link>
          </p>

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