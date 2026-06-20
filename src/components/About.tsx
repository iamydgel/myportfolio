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

  const skills = [
    {
      name: "Next.js",
      icon: (
        <svg viewBox="0 0 180 180" className="w-4 h-4 text-accent fill-current">
          <path d="M180 90C180 139.706 139.706 180 90 180C40.2944 180 0 139.706 0 90C0 40.2944 40.2944 0 90 0C139.706 0 180 40.2944 180 90ZM116.141 126.969L67.1102 63.8569V126.969H55V53H68.8051L117.836 116.112V53H129.946V126.969H116.141Z" />
        </svg>
      ),
    },
    {
      name: "React 19",
      icon: (
        <svg viewBox="-11.5 -10.23 23 20.46" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1">
          <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
          <g stroke="currentColor" fill="none" strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      name: "Tailwind CSS v4",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-current">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      ),
    },
    {
      name: "TypeScript",
      icon: (
        <svg viewBox="0 0 100 100" className="w-4 h-4 text-accent fill-none">
          <rect width="100" height="100" fill="currentColor" rx="12" />
          <path fill="#0a0a0a" d="M37.9 66.2c-1.3-.9-2.4-2-3.1-3.5-.8-1.5-1.1-3.2-1.1-5.1h8.2c.1 1.2.4 2.2.9 2.9.5.7 1.3 1 2.4 1 1 0 1.8-.3 2.3-.8.5-.5.8-1.2.8-2 0-.8-.3-1.4-.8-1.9-.5-.5-1.4-.9-2.7-1.3l-3.9-1.2c-3-.9-5.1-2.1-6.4-3.7-1.3-1.6-1.9-3.7-1.9-6.3 0-2.8 1-5.1 3.1-6.9 2.1-1.8 4.9-2.6 8.5-2.6 3.3 0 6 1 8 2.9 2 1.9 3.1 4.5 3.3 7.7h-8.2c-.2-1.4-.7-2.4-1.5-3.1-.8-.7-1.9-1.1-3.3-1.1-1.1 0-1.9.3-2.4.8-.5.5-.7 1.1-.7 1.8 0 .7.3 1.2.8 1.6.5.4 1.5.8 2.8 1.2l3.9 1.2c3.2 1 5.5 2.3 6.9 4 1.4 1.7 2.1 3.9 2.1 6.7 0 3.2-1.1 5.8-3.3 7.8-2.2 2-5.3 3-9.3 3-3.9-.1-7.1-1.1-9.3-3zm18.3-33h32.5v7.4H74.3v42.2h-8.3V40.6H56.2v-7.4z" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-current">
          <path d="M12.002 21.996c-.246 0-.49-.063-.71-.19L3.53 17.22a1.417 1.417 0 01-.71-1.23V6.01a1.417 1.417 0 01.71-1.23L11.292 2.2a1.43 1.43 0 011.42 0l7.76 4.58c.44.26.71.73.71 1.23v9.98c0 .5-.27.97-.71 1.23l-7.76 4.58c-.22.126-.464.19-.71.196zm-7.05-6.31l7.05 4.16 7.05-4.16V6.82l-7.05-4.16-7.05 4.16v8.866zM11.29 15.93V10.1l-3.32 1.92v1.92l1.66-.96v1.92l-3.32 1.92v-5.76l5-2.88 4.98 2.88v3.84l-1.66.96v-1.92l-1.66.96v2.88l-1.68-.96z" />
        </svg>
      ),
    },
    {
      name: "Three.js",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1.5">
          <path d="m2 16 10 5 10-5M2 8l10 5 10-5M12 2v20M2 8v8M22 8v8" />
        </svg>
      ),
    },
    {
      name: "WebGL",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-current">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      name: "GSAP",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6a6 6 0 0 0-6 6c0 2.2.9 4.2 2.3 5.7" />
          <path d="M12 18a6 6 0 0 0 6-6c0-2.2-.9-4.2-2.3-5.7" />
          <path d="M8 12h8" />
        </svg>
      ),
    },
    {
      name: "Framer Motion",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-current">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM12 16h8v8z" />
        </svg>
      ),
    },
    {
      name: "Figma",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-current">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-4-4c0-2.21 1.79-4 4-4v8c-2.21 0-4-1.79-4-4zm0 8c0 2.21 1.79 4 4 4v-8c-2.21 0-4 1.79-4 4zm8-4c0-2.21-1.79-4-4-4v8c2.21 0 4-1.79 4-4z" />
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
