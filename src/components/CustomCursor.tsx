"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 1. Ne pas activer sur mobile (uniquement les appareils avec pointeur de précision)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    // Respecter prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsVisible(true);

    // Positions physiques
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    const LERP_FACTOR = 0.15; // Latence de ~80ms

    const handleMouseMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Loop de rendu RAF
    let rafId: number;
    const render = () => {
      // Lerp physique
      cx += (tx - cx) * LERP_FACTOR;
      cy += (ty - cy) * LERP_FACTOR;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
        isHovered ? "scale-[3.5] bg-transparent border border-accent" : ""
      }`}
      style={{
        willChange: "transform",
      }}
    />
  );
}
