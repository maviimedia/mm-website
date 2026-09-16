"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TopAnnouncement() {
  return (
    <aside className="fixed top-0 inset-x-0 z-[9999] h-9 w-full bg-[#0022FF]/90 backdrop-blur-xs border-b border-white/15 text-white lg:hidden">
      <style>{`
        @keyframes directSlide {
          0% {
            transform: translateX(0);
          }
          28% {
            transform: translateX(180%);
          }
          28.001% {
            transform: translateX(-180%);
          }
          56%, 100% {
            transform: translateX(0);
          }
        }
        .animate-direct-slide {
          animation: directSlide 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <Link
        href="https://calendly.com/maviimedia/15min"
        className="flex h-full w-full items-center justify-center gap-2 px-4 text-[11px] font-semibold tracking-wider text-white select-none"
      >
        <span className="leading-none">BOOK APPOINTMENT / 15 MINUTES</span>
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center overflow-hidden">
          <ArrowRight size={13} className="animate-direct-slide shrink-0 text-white" />
        </span>
      </Link>
    </aside>
  );
}