"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const step = prev < 30 ? 4 : prev < 70 ? 2 : 0.5;
        return Math.min(prev + step, 90);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formattedProgress = `${Math.round(progress)}%`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#000000",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "clamp(240px, 72vw, 420px)",
          height: "44px",
          borderRadius: "9999px",
          border: "4px solid #ffffff",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/loading-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
            transition: "clip-path 0.15s ease-out",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.5px",
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.9)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {formattedProgress}
        </div>
      </div>
    </div>
  );
}