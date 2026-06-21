"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Courbe d'animation luxury
  const easeLuxury = [0.22, 0.9, 0.35, 1] as const;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to("#hero-tagline-1, #hero-tagline-2", {
        clipPath: "inset(100% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "bottom 75%",
          end: "bottom 15%",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-transparent isolate z-10">
      {/* Contenu principal */}
      <div className="max-w-[1000px] mt-16">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeLuxury, delay: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6"
        >
          Emmanuel · Vibe Developer
        </motion.p>

        {/* Tagline principale avec clip-path en deux vagues */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl italic text-txt leading-[1.1] tracking-tight mb-6 flex flex-col">
          <span className="overflow-hidden block">
            <motion.span
              id="hero-tagline-1"
              className="block"
              initial={prefersReducedMotion ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={prefersReducedMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.9, ease: easeLuxury, delay: 0.7 }}
            >
              Architecte
            </motion.span>
          </span>
          <span className="overflow-hidden block">
            <motion.span
              id="hero-tagline-2"
              className="block"
              initial={prefersReducedMotion ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={prefersReducedMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.9, ease: easeLuxury, delay: 0.9 }}
            >
              de l'invisible.
            </motion.span>
          </span>
        </h1>

        {/* Sous-titre descriptif */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.2 }}
          className="text-muted text-base md:text-lg lg:text-xl max-w-[600px] leading-relaxed mb-10"
        >
          Je ne montre pas simplement du code. Je façonne des espaces numériques interactifs à forte intensité émotionnelle.
        </motion.p>

        {/* CTA bouton magnétique */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1], delay: 1.5 }}
        >
          <MagneticButton
            onClick={() => {
              document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 text-xs uppercase font-semibold tracking-widest text-accent bg-transparent border-[1.5px] border-accent rounded-full hover:bg-accent hover:text-bg transition-all duration-300 cursor-pointer"
          >
            Découvrir les projets
          </MagneticButton>
        </motion.div>
      </div>

      {/* Indicateur de défilement (Scroll indicator) */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Faire défiler
          </span>
          <div className="w-[1px] h-12 bg-border-glow relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-4 bg-accent"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
