"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const DOCK_ITEMS = [
  { id: 1, label: "ABOUT", icon: "/about.svg", href: "/about" },
  { id: 2, label: "PHONE", icon: "/phone.svg", href: "tel:+919619431065" },
  { id: 3, label: "WORKS", icon: "/works.svg", href: "/" },
  { id: 4, label: "CONTACT", icon: "/contact.svg", href: "/contact" },
  { id: 5, label: "EMAIL", icon: "/email.svg", href: "mailto:info@example.com" },
];

export default function GlobalDock() {
  const dockRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = itemsRef.current;
    const min = 48;
    const max = 120;
    const bound = min * Math.PI;

    gsap.set(icons, {
      transformOrigin: "50% 120%",
      height: 40,
    });

    const handleMouseMove = (event: MouseEvent) => {
      const firstIcon = icons[0];
      if (!firstIcon) return;

      const offset = dock.getBoundingClientRect().left + firstIcon.offsetLeft;
      const pointer = event.clientX - offset;

      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        if (!icon) continue;

        const distance = i * min + min / 2 - pointer;
        let x = 0;
        let scale = 1;

        if (-bound < distance && distance < bound) {
          const rad = (distance / min) * 0.5;
          scale = 1 + (max / min - 1) * Math.cos(rad);
          x = 2 * (max - min) * Math.sin(rad);
        } else {
          x = (-bound < distance ? 2 : -2) * (max - min);
        }

        gsap.to(icon, {
          duration: 0.3,
          x: x,
          scale: scale,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(icons, {
        duration: 0.3,
        scale: 1,
        x: 0,
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: dockRef });

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex justify-center pointer-events-auto">
      <ul
        ref={dockRef}
        className="flex justify-center items-end h-[60px] rounded-xl m-0 px-[10px] pb-[10px] bg-[#181A1C]/80 backdrop-blur-xl  shadow-2xl list-none"
      >
        {DOCK_ITEMS.map((item, index) => (
          <li
            key={item.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="relative w-[40px] h-[40px] mx-[4px] group"
          >
            <div 
              className="absolute -top-4 left-1/2 -translate-x-1/2 px-1 py-[2px] bg-[#181A1C] text-[#ffffff] text-[5px] tracking-[0.1em] uppercase font-normal rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
              style={{ fontFamily: "var(--ff-label)" }}
            >
              {item.label}
            </div>
            <Link href={item.href} className="block h-full w-full outline-none">
              <img
                src={item.icon}
                alt={item.label}
                className="block w-full h-full object-contain rounded-xl group-hover:opacity-100 transition-opacity drop-shadow-md"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}