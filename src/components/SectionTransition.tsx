"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SectionTransitionProps {
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

export function SectionTransition({ children, isFirst = false, isLast = false }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Configuration des offsets de scroll
  const offset = isFirst
    ? (["start start", "end start"] as const)
    : isLast
    ? (["start end", "start start"] as const)
    : (["start end", "end start"] as const);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });

  // Interpolation de l'opacité :
  // - Première section (Hero) : Reste à 1 en haut, descend vers 0 en quittant l'écran.
  // - Dernière section (Contact) : Entre à 0, monte à 1 et y reste.
  // - Sections intermédiaires : Entre à 0, reste à 1 au milieu, descend à 0 en sortant.
  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.8, 1]
      : isLast
      ? [0, 0.8, 1]
      : [0, 0.25, 0.75, 1],
    isFirst
      ? [1, 1, 0]
      : isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0]
  );

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
