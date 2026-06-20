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
        <svg viewBox="0 0 100 100" className="w-4 h-4 text-accent fill-none stroke-current" strokeWidth="6">
          <circle cx="50" cy="50" r="45" />
          <path d="M70.5 73.5L46 41v32.5h-7.5V26.5h7.5l24.5 32.5V26.5h7.5v47z" fill="currentColor" stroke="none" />
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
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent fill-current">
          <path d="M9.83,7.59C10.647,7.595 11.267,7.828 11.672,8.282C12.055,8.713 12.239,9.336 12.219,10.132L12.205,10.193C12.197,10.211 12.185,10.229 12.17,10.243C12.14,10.272 12.099,10.288 12.057,10.288L10.398,10.288C10.29,10.288 10.199,10.2 10.199,10.093C10.199,9.669 10.071,9.435 9.809,9.383L9.689,9.372C9.347,9.372 9.125,9.583 9.119,9.951C9.112,10.361 9.344,10.734 10.004,11.374C10.872,12.19 11.221,12.913 11.204,13.867C11.177,15.411 10.127,16.41 8.531,16.41C7.716,16.41 7.093,16.191 6.678,15.761C6.258,15.324 6.066,14.683 6.106,13.855C6.108,13.813 6.125,13.772 6.155,13.743C6.185,13.714 6.226,13.698 6.267,13.698L7.983,13.698C8.007,13.699 8.03,13.705 8.052,13.715C8.073,13.726 8.092,13.741 8.107,13.76C8.12,13.775 8.129,13.793 8.135,13.813C8.14,13.832 8.141,13.853 8.137,13.873C8.118,14.171 8.171,14.394 8.288,14.518C8.363,14.598 8.469,14.639 8.599,14.639C8.916,14.639 9.102,14.414 9.109,14.024C9.115,13.687 9.007,13.39 8.427,12.792C7.676,12.058 7.003,11.3 7.024,10.108C7.037,9.416 7.311,8.784 7.798,8.327C8.312,7.845 9.014,7.59 9.83,7.59ZM4.047,7.618C4.794,7.612 5.381,7.842 5.789,8.303C6.221,8.79 6.44,9.524 6.441,10.485C6.44,10.527 6.422,10.567 6.392,10.597C6.362,10.626 6.322,10.643 6.28,10.643L4.479,10.643C4.448,10.642 4.417,10.629 4.395,10.607C4.373,10.584 4.361,10.553 4.36,10.522C4.346,9.899 4.172,9.576 3.828,9.538L3.757,9.534C3.067,9.535 2.66,10.472 2.444,10.992C2.142,11.719 1.988,12.507 2.018,13.293C2.033,13.659 2.092,14.173 2.438,14.386C2.746,14.575 3.185,14.45 3.451,14.24C3.716,14.031 3.93,13.669 4.02,13.339C4.033,13.293 4.033,13.258 4.021,13.241C4.015,13.233 4.003,13.229 3.989,13.226L3.485,13.222C3.461,13.222 3.436,13.216 3.414,13.206C3.392,13.196 3.372,13.181 3.356,13.162C3.344,13.148 3.335,13.13 3.331,13.112C3.327,13.093 3.327,13.074 3.331,13.056L3.647,11.682C3.663,11.611 3.726,11.558 3.804,11.548L3.804,11.545L6.839,11.545C6.846,11.545 6.854,11.545 6.86,11.546C6.939,11.556 6.995,11.63 6.994,11.71L6.994,11.714L6.678,13.085C6.661,13.163 6.583,13.22 6.494,13.22L6.113,13.22C6.1,13.22 6.086,13.225 6.075,13.233C6.064,13.241 6.056,13.253 6.052,13.266C5.7,14.46 5.223,15.282 4.594,15.775C4.058,16.195 3.399,16.391 2.517,16.391C1.725,16.391 1.191,16.136 0.738,15.633C0.14,14.967 -0.107,13.879 0.043,12.566C0.313,10.103 1.589,7.618 4.047,7.618ZM21.016,7.75C23.026,7.75 24.03,8.662 23.999,10.461C23.962,12.569 22.678,14.119 20.745,14.477C20.47,14.527 20.191,14.547 19.912,14.545L18.978,14.541C18.963,14.541 18.948,14.547 18.937,14.558C18.926,14.568 18.92,14.583 18.92,14.598C18.92,14.608 18.922,14.618 18.928,14.627C18.933,14.636 18.941,14.643 18.95,14.648L19.744,15.062C19.809,15.096 19.835,15.153 19.82,15.226C19.815,15.249 19.618,16.139 19.613,16.159C19.596,16.237 19.533,16.282 19.442,16.282L17.739,16.282C17.715,16.282 17.69,16.277 17.668,16.267C17.646,16.257 17.626,16.241 17.61,16.223C17.598,16.208 17.589,16.191 17.585,16.173C17.58,16.155 17.581,16.135 17.585,16.116L19.481,7.875C19.5,7.789 19.581,7.751 19.653,7.751L21.016,7.75ZM17.273,7.762C17.292,7.77 17.31,7.781 17.324,7.795C17.338,7.81 17.351,7.828 17.358,7.847C17.366,7.866 17.369,7.886 17.369,7.906L17.358,16.119C17.361,16.138 17.36,16.158 17.355,16.177C17.35,16.196 17.34,16.213 17.328,16.228C17.313,16.245 17.295,16.259 17.274,16.268C17.254,16.277 17.232,16.282 17.21,16.281L15.397,16.281C15.377,16.282 15.356,16.277 15.337,16.27C15.318,16.262 15.3,16.25 15.286,16.236C15.272,16.221 15.26,16.204 15.253,16.185C15.245,16.166 15.241,16.146 15.241,16.125L15.28,15.328C15.282,15.241 15.28,15.217 15.229,15.211L15.161,15.209L13.447,15.209C13.323,15.209 13.314,15.22 13.27,15.334L12.914,16.191C12.882,16.252 12.818,16.281 12.722,16.281L10.927,16.281C10.818,16.281 10.74,16.173 10.781,16.072L14.499,7.873C14.524,7.824 14.562,7.75 14.648,7.75L17.214,7.75C17.234,7.75 17.254,7.754 17.273,7.762ZM15.5,9.985C15.492,9.953 15.466,9.956 15.445,9.998C15.43,10.028 15.416,10.06 15.405,10.091L14.121,13.274C14.114,13.294 14.109,13.31 14.105,13.322C14.104,13.328 14.103,13.335 14.104,13.341C14.105,13.347 14.108,13.353 14.111,13.358C14.115,13.363 14.12,13.367 14.126,13.37C14.131,13.373 14.137,13.376 14.143,13.376L15.215,13.39C15.334,13.38 15.34,13.374 15.352,13.253C15.354,13.21 15.506,10.022 15.5,9.985ZM20.112,9.582C20.097,9.582 20.083,9.588 20.072,9.599C20.061,9.609 20.055,9.624 20.054,9.639C20.054,9.649 20.057,9.659 20.062,9.668C20.068,9.677 20.075,9.685 20.084,9.69C20.097,9.697 20.869,10.104 20.926,10.135C20.968,10.158 20.969,10.198 20.955,10.267C20.948,10.298 20.415,12.642 20.416,12.644C20.419,12.647 20.435,12.655 20.515,12.655L20.551,12.655C21.446,12.619 21.934,11.561 21.952,10.534C21.961,9.979 21.772,9.638 21.429,9.588L21.358,9.582L20.112,9.582Z" />
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
          <path d="M8 2c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4h4V2H8zm0 8c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4h4v-8H8zm0 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-4H8zm8-8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4v8h4zm0 0c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4v-8h4z" />
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
