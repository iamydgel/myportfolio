"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap } from "gsap";

interface ProjectDetails {
  id: string;
  title: string;
  category: "web" | "mobile";
  stack: string[];
  description: string;
  visual: string;
  role: string;
  client: string;
  year: string;
  fullContent: string;
}

const projectsData: Record<string, ProjectDetails> = {
  "voltaic-engine": {
    id: "p1",
    title: "Voltaic Engine",
    category: "web",
    stack: ["Next.js 15", "WebGL", "Rust", "Tailwind v4"],
    description: "Moteur de rendu 3D haute performance pour architectures immersives.",
    visual: "from-amber-500/10 via-yellow-600/5 to-transparent",
    role: "Lead Creative Technologist",
    client: "Voltaic Labs",
    year: "2025",
    fullContent: "Voltaic Engine repousse les limites du rendu 3D dans le navigateur. En combinant la puissance de Rust compilé en WebAssembly pour les calculs physiques lourds et WebGL pour le pipeline graphique, ce projet permet de visualiser des maquettes architecturales complexes à 60fps constantes. Le design system s'appuie sur la nouvelle version de Tailwind CSS v4 pour une légèreté maximale.",
  },
  "aether-os": {
    id: "p2",
    title: "Aether OS",
    category: "mobile",
    stack: ["React Native", "Swift", "Kotlin", "WebRTC"],
    description: "Système de communication chiffré décentralisé de bout en bout.",
    visual: "from-blue-500/10 via-indigo-600/5 to-transparent",
    role: "Architecte Mobile Senior",
    client: "Aether Security",
    year: "2025",
    fullContent: "Aether OS est une solution mobile sécurisée permettant des communications vocales et textuelles décentralisées. En utilisant le protocole WebRTC et un chiffrement à double cliquet de bout en bout directement implémenté dans les couches natives (Swift/Kotlin), ce système garantit la souveraineté totale des métadonnées de l'utilisateur.",
  },
  "chronos-ai": {
    id: "p3",
    title: "Chronos AI",
    category: "web",
    stack: ["TypeScript", "Python", "PyTorch", "GSAP"],
    description: "Interface d'analyse prédictive temporelle en temps réel.",
    visual: "from-purple-500/10 via-pink-600/5 to-transparent",
    role: "Lead Frontend Developer",
    client: "Chronos Inc.",
    year: "2024",
    fullContent: "Chronos AI transforme la visualisation de séries temporelles de données de marché. En exploitant des modèles d'apprentissage profond PyTorch et en restituant les flux de prédiction en temps réel via une interface Web animée avec précision grâce à GSAP, l'application rend lisibles des millions de points de données pour les analystes financiers.",
  },
  "krypton-wallet": {
    id: "p4",
    title: "Krypton Wallet",
    category: "mobile",
    stack: ["Flutter", "Rust", "WASM", "Secp256k1"],
    description: "Portefeuille cryptographique matériel virtuel ultra-sécurisé.",
    visual: "from-emerald-500/10 via-teal-600/5 to-transparent",
    role: "Fullstack Developer",
    client: "Krypton Group",
    year: "2024",
    fullContent: "Krypton Wallet est un coffre-fort numérique virtuel s'adossant sur les puces d'enclave sécurisée des smartphones. L'implémentation de la cryptographie sur courbe elliptique (Secp256k1) est écrite en Rust pour son niveau d'assurance mémoire, garantissant une sécurité équivalente à celle d'un portefeuille physique tout en conservant une expérience fluide.",
  },
};

// Rendu du motif SVG
const renderVisual = (id: string) => {
  const commonClass = "w-[50%] h-[50%] text-accent/30";
  switch (id) {
    case "p1":
      return (
        <svg viewBox="0 0 100 100" className={commonClass}>
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <line x1="50" y1="15" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="15" y1="35" x2="85" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="85" y1="35" x2="15" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <circle cx="50" cy="55" r="28" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </svg>
      );
    case "p2":
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
    case "p3":
      return (
        <svg viewBox="0 0 100 100" className={commonClass}>
          <path d="M 10,50 Q 25,15 40,50 T 70,50 T 90,50" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 10,60 Q 30,30 50,60 T 90,60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <path d="M 10,40 Q 20,20 60,40 T 90,40" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4,4" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4,4" />
        </svg>
      );
    case "p4":
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

export default function CaseStudyPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [project, setProject] = useState<ProjectDetails | null>(null);

  useLayoutEffect(() => {
    if (slug && projectsData[slug]) {
      setProject(projectsData[slug]);
    }
  }, [slug]);

  useEffect(() => {
    // Remonter en haut de la page à l'affichage
    window.scrollTo(0, 0);

    // Faire briller l'Aura temporairement
    const auraBridge = document.getElementById("aura-bridge");
    if (auraBridge) {
      gsap.to(auraBridge, {
        "--op": "*=1.4",
        duration: 0.6,
      });
    }

    return () => {
      // Restaurer l'opacité d'origine
      if (auraBridge) {
        gsap.to(auraBridge, {
          "--op": "/=1.4",
          duration: 0.4,
        });
      }
    };
  }, []);

  const handleBack = () => {
    const navigate = () => router.push("/");

    if (
      typeof document !== "undefined" &&
      (document as any).startViewTransition &&
      !prefersReducedMotion
    ) {
      // Activer la transition de retour native
      const imageEl = document.getElementById("case-hero-image");
      const titleEl = document.getElementById("case-title-el");
      if (imageEl) imageEl.style.viewTransitionName = "project-image";
      if (titleEl) titleEl.style.viewTransitionName = "project-title";

      (document as any).startViewTransition(() => {
        navigate();
      });
    } else {
      navigate();
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg font-mono text-xs uppercase text-muted">
        Chargement...
      </div>
    );
  }

  const easeLuxury = [0.22, 0.9, 0.35, 1];

  return (
    <main className="min-h-screen bg-bg text-txt relative z-10 px-6 md:px-12 lg:px-24 py-20 flex flex-col items-center">
      <div className="max-w-[1000px] w-full">
        {/* Bouton de retour */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-accent mb-12 self-start cursor-pointer transition-colors duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300 fill-none stroke-current"
            strokeWidth="1.5"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Retour aux projets
        </button>

        {/* Hero de l'étude de cas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block">
              Étude de Cas · {project.category.toUpperCase()}
            </span>
            <h1
              id="case-title-el"
              className="font-serif text-5xl md:text-7xl lg:text-8xl italic text-txt leading-none tracking-tight"
              style={{ viewTransitionName: "project-title" }}
            >
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 bg-surface border border-border-glow text-muted rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Grande image héro / visual */}
        <div
          id="case-hero-image"
          className="w-full h-[300px] md:h-[450px] rounded-radius-card bg-surface border border-border-glow relative overflow-hidden flex items-center justify-center mb-16 shadow-2xl"
          style={{ viewTransitionName: "project-image" }}
        >
          <div className={`absolute inset-0 bg-gradient-to-tr ${project.visual} opacity-40`} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {renderVisual(project.id)}
          </div>
        </div>

        {/* Détails du projet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-border-glow">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-2">
              Rôle
            </span>
            <span className="font-serif text-lg italic text-txt">{project.role}</span>
          </div>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-2">
              Client
            </span>
            <span className="font-serif text-lg italic text-txt">{project.client}</span>
          </div>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-2">
              Année
            </span>
            <span className="font-serif text-lg italic text-txt">{project.year}</span>
          </div>
        </div>

        {/* Description détaillée */}
        <div className="mt-16 max-w-[700px]">
          <p className="font-sans text-base md:text-lg text-muted leading-relaxed mb-6">
            {project.fullContent}
          </p>
        </div>
      </div>
    </main>
  );
}
