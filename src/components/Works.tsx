"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

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
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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

  const handleOpen = () => {
    const slug = project.title.toLowerCase().replace(" ", "-");
    sessionStorage.setItem("worksScrollY", String(window.scrollY));

    const navigate = () => router.push(`/works/${slug}`);

    // Si supporté, on utilise la View Transitions API native
    if (
      typeof document !== "undefined" &&
      (document as any).startViewTransition &&
      !prefersReducedMotion
    ) {
      if (cardRef.current) cardRef.current.style.viewTransitionName = "project-image";
      if (titleRef.current) titleRef.current.style.viewTransitionName = "project-title";

      (document as any).startViewTransition(() => {
        navigate();
      });

      // Nettoyage immédiat post-trigger pour éviter les conflits au prochain rendu
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.viewTransitionName = "";
        if (titleRef.current) titleRef.current.style.viewTransitionName = "";
      }, 50);
    } else if (cardRef.current && !prefersReducedMotion) {
      // Repli GSAP Flip pour navigateurs non supportés
      const state = Flip.getState(cardRef.current);
      
      // Simuler l'expansion vers le plein écran
      gsap.to(cardRef.current, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999,
        borderRadius: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: navigate,
      });
    } else {
      navigate();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 0.9, 0.35, 1],
        delay: index === 2 ? 0.24 : index === 3 ? 0.16 : index * 0.08,
      }}
      animate={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleOpen}
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
      <div className="absolute inset-0 transition-all duration-700 flex items-center justify-center pointer-events-none work-card-svg">
        {renderVisual(project.id, prefersReducedMotion)}
      </div>

      {/* Overlay sombre avec flèche ↗ */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-out flex items-start justify-end p-8 pointer-events-none z-10">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-accent transform translate-x-2 -translate-y-2 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-pop">
          <path d="M5 19L19 5M19 5H10M19 5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Contenu textuel */}
      <div className="relative z-20" style={{ transform: "translateZ(30px)" }}>
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

        <h3 ref={titleRef} className="font-serif text-2xl md:text-3xl lg:text-4xl text-txt italic mb-3">
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

  useLayoutEffect(() => {
    const y = sessionStorage.getItem("worksScrollY");
    if (y) {
      // Attendre un court instant que le layout de la page soit stable
      setTimeout(() => {
        window.scrollTo(0, Number(y));
        sessionStorage.removeItem("worksScrollY");
      }, 50);
    }
  }, []);

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
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 0.9, 0.35, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4"
            >
              01 — Projets Sélectionnés
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={prefersReducedMotion ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.22, 0.9, 0.35, 1], delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-txt italic"
              >
                Expériences numériques.
              </motion.h2>
            </div>
          </div>

          {/* Filtres avec animation de fond FLIP et glide-in */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center gap-2 bg-surface/50 p-1 rounded-full border border-border-glow self-start"
          >
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
          </motion.div>
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
