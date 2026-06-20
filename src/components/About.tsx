"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  
  // Parallaxe scroll avec framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const stats = [
    { target: 8, label: "Années d'expérience" },
    { target: 45, label: "Projets livrés" },
    { target: 12, label: "Récompenses & Mentions" },
  ];

  const skills = [
    "Next.js / React 19",
    "Tailwind CSS v4",
    "WebGL / Three.js",
    "TypeScript / Node.js",
    "GSAP / Framer Motion",
    "UI/UX Motion Design",
  ];

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-transparent border-t border-border-glow overflow-hidden isolate z-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Colonne Gauche : Portrait Parallaxe Géométrique */}
        <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
          <motion.div 
            style={{ y: yParallax }}
            className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] rounded-radius-card bg-surface border border-border-glow overflow-hidden flex items-center justify-center shadow-lg"
          >
            {/* Effets de fond internes pour simuler une sculpture 3D invisible */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-accent/20 flex items-center justify-center animate-spin-slow">
              <div className="w-[80%] h-[80%] rounded-full border border-dashed border-accent/30" />
            </div>
            
            <div className="absolute w-24 h-24 rounded-full bg-accent/10 blur-xl animate-pulse-slow" />

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
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="px-4 py-2 bg-surface text-xs font-mono text-txt border border-border-glow rounded-md hover:border-accent/30 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
