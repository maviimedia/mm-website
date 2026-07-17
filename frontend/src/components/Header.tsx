import Link from "next/link";
import Image from "next/image";

export default function Header() {
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
            <Link href="/" className="header__nav-link">
              WORK
            </Link>
            <Link href="/about" className="header__nav-link">
              ABOUT
            </Link>
            <Link href="/contact" className="header__nav-link">
              CONTACT
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}