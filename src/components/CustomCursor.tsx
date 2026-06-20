"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWorkHovered, setIsWorkHovered] = useState(false);

  useEffect(() => {
    // 1. Ne pas activer sur mobile (uniquement les appareils avec pointeur de précision)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    // Respecter prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsVisible(true);

    // Positions physiques
    let rx = 0; // ring X
    let ry = 0; // ring Y
    let dx = 0; // dot X
    let dy = 0; // dot Y
    let tx = 0; // target X
    let ty = 0; // target Y

    const LERP_RING = 0.08;
    const LERP_DOT = 0.25;

    const handleMouseMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        (target.classList && target.classList.contains("interactive"))
      );
      
      const isWork = !!target.closest(".work-card");

      setIsHovered(isInteractive && !isWork);
      setIsWorkHovered(isWork);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Loop de rendu RAF
    let rafId: number;
    const render = () => {
      // Lerp physique séparé pour le point et l'anneau
      rx += (tx - rx) * LERP_RING;
      ry += (ty - ry) * LERP_RING;

      dx += (tx - dx) * LERP_DOT;
      dy += (ty - dy) * LERP_DOT;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
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
    <>
      {/* Anneau externe (Ring) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-all duration-300 ease-pop"
        style={{
          willChange: "transform, width, height, background-color, border-color",
          width: isWorkHovered ? "56px" : isHovered ? "40px" : "32px",
          height: isWorkHovered ? "56px" : isHovered ? "40px" : "32px",
          backgroundColor: isWorkHovered ? "rgba(200, 169, 110, 0.13)" : "transparent",
          borderColor: isWorkHovered || isHovered ? "rgba(200, 169, 110, 1)" : "rgba(200, 169, 110, 0.4)",
        }}
      >
        {isWorkHovered && (
          <span className="font-mono text-[9px] font-bold text-accent tracking-[0.1em] select-none">
            VOIR
          </span>
        )}
      </div>

      {/* Point central (Dot) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full transition-transform duration-200"
        style={{
          willChange: "transform",
          transform: `scale(${isHovered || isWorkHovered ? 0 : 1})`,
        }}
      />
    </>
  );
}
