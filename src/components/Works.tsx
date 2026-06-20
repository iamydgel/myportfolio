"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: "web" | "mobile";
  stack: string[];
  description: string;
  visual: string; // Style CSS pour le fond abstrait de la carte
}

export function Works() {
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");

  const projects: Project[] = [
    {
      id: "p1",
      title: "Voltaic Engine",
      category: "web",
      stack: ["Next.js 15", "WebGL", "Rust", "Tailwind v4"],
      description: "Moteur de rendu 3D haute performance pour architectures immersives.",
      visual: "from-amber-500/10 via-yellow-600/5 to-transparent",
    },
    {
      id: "p2",
      title: "Aether OS",
      category: "mobile",
      stack: ["React Native", "Swift", "Kotlin", "WebRTC"],
      description: "Système de communication chiffré décentralisé de bout en bout.",
      visual: "from-blue-500/10 via-indigo-600/5 to-transparent",
    },
    {
      id: "p3",
      title: "Chronos AI",
      category: "web",
      stack: ["TypeScript", "Python", "PyTorch", "GSAP"],
      description: "Interface d'analyse prédictive temporelle en temps réel.",
      visual: "from-purple-500/10 via-pink-600/5 to-transparent",
    },
    {
      id: "p4",
      title: "Krypton Wallet",
      category: "mobile",
      stack: ["Flutter", "Rust", "WASM", "Secp256k1"],
      description: "Portefeuille cryptographique matériel virtuel ultra-sécurisé.",
      visual: "from-emerald-500/10 via-teal-600/5 to-transparent",
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="works" className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-bg border-t border-border-glow z-10">
      <div className="max-w-[1440px] mx-auto">
        {/* Header de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
              01 — Projets Sélectionnés
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-txt italic">
              Expériences numériques.
            </h2>
          </div>

          {/* Filtres avec animation de fond FLIP */}
          <div className="flex items-center gap-2 bg-surface/50 p-1 rounded-full border border-border-glow self-start">
            {(["all", "web", "mobile"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`relative px-6 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors cursor-pointer z-10 ${
                  filter === type ? "text-bg" : "text-muted hover:text-txt"
                }`}
              >
                {type === "all" ? "Tous" : type}
                {filter === type && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-accent rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de projets Masonry-like 2x2 */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 0.9, 0.35, 1],
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col justify-end min-h-[400px] md:min-h-[500px] p-8 rounded-radius-card bg-surface border border-border-glow overflow-hidden cursor-pointer"
              >
                {/* Dégradé visuel abstrait en fond */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${project.visual} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
                />

                {/* Motif géométrique minimaliste en arrière-plan */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                  <div className="w-[80%] h-[80%] rounded-full border border-txt border-dashed animate-spin-slow" />
                </div>

                {/* Contenu textuel */}
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 bg-bg/60 backdrop-blur-md rounded-full border border-border-glow text-muted group-hover:text-accent group-hover:border-accent/30 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-txt italic mb-3">
                    {project.title}
                  </h3>

                  <p className="text-muted text-sm max-w-[400px] group-hover:text-txt transition-colors duration-300">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
