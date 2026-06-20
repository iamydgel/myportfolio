"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SectionTransitionProps {
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

export function SectionTransition({ children, isFirst = false, isLast = false }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const opacity = useMotionValue(1);

  useEffect(() => {
    if (prefersReducedMotion) {
      opacity.set(1);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let currentOpacity = 1;

      // 1. Fondu à l'entrée (en bas) : sur 200px d'apparition
      if (!isFirst && rect.top > viewportHeight - 200) {
        currentOpacity = Math.max(0, (viewportHeight - rect.top) / 200);
      }
      // 2. Fondu à la sortie (en haut) : sur 200px avant de quitter l'écran
      else if (!isLast && rect.bottom < 200) {
        currentOpacity = Math.max(0, rect.bottom / 200);
      }

      // Limitation entre 0 et 1
      currentOpacity = Math.min(1, Math.max(0, currentOpacity));

      opacity.set(currentOpacity);
    };

    // Initialisation immédiate au montage
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isFirst, isLast, prefersReducedMotion, opacity]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
