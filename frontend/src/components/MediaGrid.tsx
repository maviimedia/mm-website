"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
        <figure key={work.id} className="media__item image">
          <Link
            className="media__link"
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
          </Link>
        </figure>
      ))}
    </div>
  );
}