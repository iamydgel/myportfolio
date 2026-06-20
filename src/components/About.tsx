"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Composant CountUp réutilisable avec RAF et respect de prefers-reduced-motion
function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, hasStarted]);

  return <span ref={elementRef} aria-label={`${target}`}>{value}</span>;
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Parallaxe scroll avec framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-50, 50]);

  const stats = [
    { target: 8, label: "Années d'expérience" },
    { target: 45, label: "Projets livrés" },
    { target: 12, label: "Récompenses & Mentions" },
  ];

  // Logos vectoriels (SVG) intégrés pour chaque technologie
  const skills = [
    {
      name: "Next.js / React 19",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS v4",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1.5">
          <path d="M12 3c-1.2 0-2.4.6-3.1 1.7L4 12.3c-.6 1-.6 2.4 0 3.4l4.9 7.6c.7 1.1 1.9 1.7 3.1 1.7s2.4-.6 3.1-1.7l4.9-7.6c.6-1 .6-2.4 0-3.4L15.1 4.7C14.4 3.6 13.2 3 12 3z" />
          <path d="M9 12h6" />
        </svg>
      ),
    },
    {
      name: "WebGL / Three.js",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1.5">
          <polygon points="12,2 2,22 22,22" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      ),
    },
    {
      name: "TypeScript / Node.js",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 17v-8h4" />
          <path d="M9 13h2" />
          <path d="M14 9h4" strokeDasharray="2,2" />
          <path d="M16 9v8" />
        </svg>
      ),
    },
    {
      name: "GSAP / Framer Motion",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1.5">
          <path d="M5 3h14l-7 8 7 8H5l7-8z" />
        </svg>
      ),
    },
    {
      name: "UI/UX Motion Design",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-transparent border-t border-border-glow overflow-hidden isolate z-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Colonne Gauche : Portrait Parallaxe Géométrique */}
        <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
          <motion.div 
            style={{ y: yParallax }}
            className={`relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] rounded-radius-card bg-surface border border-border-glow overflow-hidden flex items-center justify-center shadow-lg ${
              prefersReducedMotion ? "" : "animate-orbe-pulse"
            }`}
          >
            {/* Effets de fond internes pour simuler une sculpture 3D invisible */}
            <div className={`absolute w-[80%] h-[80%] rounded-full border border-accent/20 flex items-center justify-center ${
              prefersReducedMotion ? "" : "animate-spin-slow"
            }`}>
              <div className="w-[80%] h-[80%] rounded-full border border-dashed border-accent/30" />
            </div>
            
            <div className={`absolute w-24 h-24 rounded-full bg-accent/10 blur-xl ${
              prefersReducedMotion ? "" : "animate-pulse-slow"
            }`} />

            {/* Superposition de verre translucide */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80 z-10" />

            {/* Signature minimaliste */}
            <span className="absolute bottom-8 font-serif text-lg italic text-txt z-20">
              L'invisible prend forme.
            </span>
          </motion.div>
          
          {/* Cadre flottant extérieur */}
          <div className="absolute w-[320px] h-[420px] md:w-[370px] md:h-[470px] border border-accent/10 rounded-radius-card pointer-events-none -z-10" />
        </div>

        {/* Colonne Droite : Manifeste & Stack & Chiffres */}
        <div className="flex flex-col">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
            02 — Philosophie & Manifeste
          </p>
          
          <h2 className="font-serif text-4xl md:text-5xl text-txt italic mb-8">
            Concevoir l'invisible.
          </h2>

          {/* Manifeste (environ 80 mots) */}
          <p className="text-muted text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">
            Pour moi, le développement n'est pas une simple écriture de lignes de code. C'est l'art de façonner des espaces émotionnels, d'orchestrer la lumière, le mouvement et la matière numérique. Chaque pixel doit avoir une intention, chaque transition doit raconter une histoire silencieuse. Je traduis l'invisible en expériences interactives d'exception, alliant rigueur algorithmique et sensibilité esthétique pour marquer les esprits.
          </p>

          {/* Compteurs animés */}
          <div className="grid grid-cols-3 gap-6 mb-12 border-t border-b border-border-glow py-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="font-serif text-3xl md:text-5xl text-accent italic mb-2">
                  <CountUp target={stat.target} />+
                </div>
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Stack technique */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
              Technologies maîtrisées
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface text-xs font-mono text-txt border border-border-glow rounded-md hover:border-accent/30 transition-colors"
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
