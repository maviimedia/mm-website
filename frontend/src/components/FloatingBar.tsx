"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ClipboardClock, UserRoundPlus } from "lucide-react";

export default function FloatingBar() {
  const [showLabel, setShowLabel] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (delta > 6 && currentScrollY > 40) {
        setShowLabel(true);
      } else if (delta < -6 || currentScrollY <= 15) {
        setShowLabel(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-50 flex flex-col items-end pointer-events-none w-[calc(100%-2rem)] max-w-[370px]"
    >
      <div className="w-full flex flex-col items-end gap-2.5">
        <div
          className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right ${
            showLabel
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-5 scale-90 pointer-events-none"
          }`}
        >
          <div className="rounded-full bg-white/90 backdrop-blur-xl px-4 py-1.5 text-[11px] font-medium tracking-wide text-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-white/60 select-none">
            Hey! lets connect.
          </div>
        </div>

        <div className="pointer-events-auto w-full flex items-center justify-between rounded-[32px] bg-white/80 backdrop-blur-2xl px-2.5 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.18),0_1px_1px_rgba(255,255,255,0.8)_inset] border border-white/50">
          <div className="flex items-center gap-1 sm:gap-1.5 pl-1">
            <Link
              href="tel:+919172354728"
              aria-label="Call Us"
              className="flex items-center justify-center w-10 h-10 rounded-full text-neutral-800 hover:bg-black/5 hover:text-black active:scale-90 transition-all duration-200 cursor-pointer"
            >
              <UserRoundPlus size={19} strokeWidth={2} />
            </Link>

            <Link
              href="/works"
              className="flex items-center justify-center h-9 px-3.5 rounded-full bg-black/[0.06] hover:bg-black/[0.1] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span className="text-[11px] font-semibold tracking-wider text-neutral-900 uppercase">
                Portfolio
              </span>
            </Link>

            <Link
              href="https://calendly.com/maviimedia/15min"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Schedule Meeting"
              className="flex items-center justify-center w-10 h-10 rounded-full text-neutral-800 hover:bg-black/5 hover:text-black active:scale-90 transition-all duration-200 cursor-pointer"
            >
              <ClipboardClock size={20} strokeWidth={2} />
            </Link>
          </div>

          <Link
            href="https://wa.me/+919172354728?text=Hey!%20I%20would%20like%20to%20connect."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center justify-center h-11 px-7 sm:px-8 rounded-full bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-black/95 backdrop-blur-md text-white shadow-[0_4px_18px_rgba(0,0,0,0.28),0_1px_0_rgba(255,255,255,0.15)_inset] active:scale-95 hover:brightness-110 transition-all duration-200 cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white drop-shadow-sm"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.36C16.31 14.23 15.1 13.64 14.88 13.56C14.65 13.48 14.49 13.44 14.32 13.68C14.16 13.93 13.69 14.49 13.55 14.65C13.41 14.81 13.27 14.83 13.02 14.71C12.77 14.58 11.98 14.32 11.04 13.48C10.31 12.83 9.81 12.03 9.67 11.78C9.53 11.53 9.65 11.4 9.78 11.27C9.89 11.16 10.03 10.98 10.15 10.84C10.27 10.7 10.31 10.6 10.39 10.43C10.47 10.27 10.43 10.13 10.37 10.01C10.31 9.89 9.82 8.68 9.61 8.18C9.41 7.69 9.21 7.76 9.06 7.75C8.92 7.74 8.75 7.74 8.59 7.74C8.42 7.74 8.16 7.8 7.93 8.05C7.71 8.3 7.08 8.89 7.08 10.09C7.08 11.29 7.95 12.45 8.08 12.61C8.2 12.78 9.8 15.22 12.24 16.27C12.82 16.52 13.27 16.67 13.62 16.78C14.2 16.97 14.73 16.94 15.15 16.88C15.62 16.81 16.59 16.29 16.79 15.72C17 15.14 17 14.65 16.94 14.55C16.88 14.44 16.72 14.38 16.47 14.25L16.56 14.36Z" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}