"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Project {
  id: string;
  title: string;
  category: "web" | "mobile";
  stack: string[];
  description: string;
  visual: string; // Style CSS pour le fond abstrait de la carte
}

// Génération du visuel vectoriel abstrait
const renderVisual = (id: string, prefersReducedMotion: boolean) => {
  const commonClass = `w-[65%] h-[65%] text-accent/15 group-hover:text-accent/35 transition-all duration-700 ease-luxury ${
    prefersReducedMotion ? "" : "group-hover:scale-105"
  }`;
  switch (id) {
    case "p1": // Voltaic Engine: Mesh 3D
      return (
        <svg viewBox="0 0 100 100" className={commonClass}>
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <line x1="50" y1="15" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="15" y1="35" x2="85" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="85" y1="35" x2="15" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <circle cx="50" cy="55" r="28" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </svg>
      );
    case "p2": // Aether OS: Graph de Nœuds
      return (
        <svg viewBox="0 0 100 100" className={commonClass}>
          <circle cx="30" cy="30" r="3.5" fill="currentColor" />
          <circle cx="70" cy="30" r="3.5" fill="currentColor" />
          <circle cx="50" cy="70" r="4.5" fill="currentColor" />
          <circle cx="25" cy="65" r="2.5" fill="currentColor" />
          <circle cx="75" cy="65" r="2.5" fill="currentColor" />
          <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="0.6" />
          <line x1="30" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="0.6" />
          <line x1="70" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="0.6" />
          <line x1="25" y1="65" x2="50" y2="70" stroke="currentColor" strokeWidth="0.6" />
          <line x1="75" y1="65" x2="50" y2="70" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="50" cy="70" r="18" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3,3" />
        </svg>
      );
    case "p3": // Chronos AI: Formes d'ondes
      return (
        <svg viewBox="0 0 100 100" className={commonClass}>
          <path d="M 10,50 Q 25,15 40,50 T 70,50 T 90,50" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 10,60 Q 30,30 50,60 T 90,60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <path d="M 10,40 Q 20,20 60,40 T 90,40" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4,4" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4,4" />
        </svg>
      );
    case "p4": // Krypton Wallet: Circuit Imprimé / Clé
      return (
        <svg viewBox="0 0 100 100" className={commonClass}>
          <rect x="28" y="22" width="44" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 50,32 L 50,68 M 38,50 L 62,50" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <line x1="28" y1="35" x2="12" y2="35" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="12" cy="35" r="2.5" fill="currentColor" />
          <line x1="72" y1="65" x2="88" y2="65" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="88" cy="65" r="2.5" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

function ProjectCard({
  project,
  index,
  prefersReducedMotion,
}: {
  project: Project;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;

    // Règle spec : rotateX entre -4° et +4°, rotateY entre -6° et +6°
    const calcX = ((yc - y) / yc) * 4;
    const calcY = ((x - xc) / xc) * 6;

    setRotateX(calcX);
    setRotateY(calcY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 0.9, 0.35, 1],
        delay: index * 0.08,
      }}
      animate={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="group work-card relative flex flex-col justify-end min-h-[400px] md:min-h-[500px] p-8 rounded-radius-card bg-surface border border-border-glow overflow-hidden cursor-pointer"
    >
      {/* Dégradé visuel abstrait en fond */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${project.visual} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
      />

      {/* Motif géométrique minimaliste en arrière-plan */}
      <div className="absolute inset-0 transition-all duration-700 flex items-center justify-center pointer-events-none">
        {renderVisual(project.id, prefersReducedMotion)}
      </div>

      {/* Contenu textuel */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
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
  );
}

export function Works() {
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");
  const prefersReducedMotion = usePrefersReducedMotion();

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
    <section id="works" className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-transparent border-t border-border-glow isolate z-10">
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
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
