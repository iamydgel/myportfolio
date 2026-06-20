"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  // Courbe d'animation luxury
  const easeLuxury = [0.22, 0.9, 0.35, 1];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-bg z-10">
      {/* Contenu principal */}
      <div className="max-w-[1000px] mt-16">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeLuxury, delay: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6"
        >
          Emmanuel · Vibe Developer
        </motion.p>

        {/* Tagline principale avec clip-path */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.9, ease: easeLuxury, delay: 0.7 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl italic text-txt leading-[1.1] tracking-tight"
          >
            Architecte de l'invisible.
          </motion.h1>
        </div>

        {/* Sous-titre descriptif */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
          className="text-muted text-base md:text-lg lg:text-xl max-w-[600px] leading-relaxed mb-10"
        >
          Je ne montre pas simplement du code. Je façonne des espaces numériques interactifs à forte intensité émotionnelle.
        </motion.p>

        {/* CTA bouton magnétique */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1.3 }}
        >
          <MagneticButton
            onClick={() => {
              document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 text-xs uppercase font-semibold tracking-widest text-bg bg-accent rounded-full hover:bg-white transition-colors cursor-pointer"
          >
            Découvrir les projets
          </MagneticButton>
        </motion.div>
      </div>

      {/* Indicateur de défilement (Scroll indicator) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.0 }}
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
    </section>
  );
}
