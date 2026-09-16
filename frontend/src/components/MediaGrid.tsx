"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function MediaGrid({ works }: { works: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".image", { autoAlpha: 0 });

      ScrollTrigger.batch(".image", {
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            stagger: 0.2,
            duration: 1,
            ease: "sine.out",
            overwrite: true,
          });
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <div className="media__frame" aria-label="Media gallery" ref={containerRef}>
      {works?.map((work: any) => (
        <figure key={work.id} className="media__item image relative group">
          <Link
            className="media__link relative block"
            href={`/works/${work.slug}`}
            aria-label={`Open ${work.title} detail`}
          >
            <img
              src={work.thumbnail_url || work.banner_url}
              alt={`${work.title} branding preview`}
              width={1280}
              height={720}
              decoding="async"
            />
            <span className="media__overlay" aria-hidden="true">
              <span className="media__overlay-text">{work.title}</span>
            </span>

            <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-transform duration-200 group-hover:scale-105 active:scale-95">
              <span>Open</span>
              <ArrowUpRight size={13} strokeWidth={2.2} />
            </span>
          </Link>
        </figure>
      ))}
    </div>
  );
}