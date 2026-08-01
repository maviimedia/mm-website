"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

// Plugins register karna zaroori hai
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ScrollSmoother initialization
      ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.5, // Scroll kitna smooth hoga (seconds)
        effects: true, // Parallax aur baki effects enable karne ke liye
      });
    },
    { scope: wrapper }
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}