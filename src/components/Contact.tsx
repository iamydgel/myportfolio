"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Contact() {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = usePrefersReducedMotion();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/iamydgel", icon: <Github size={20} />, label: "Visiter mon profil GitHub" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin size={20} />, label: "Se connecter sur LinkedIn" },
    { name: "Twitter", href: "https://twitter.com", icon: <Twitter size={20} />, label: "Me suivre sur Twitter" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  const titleVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" },
    visible: prefersReducedMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" },
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section id="contact" className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-transparent border-t border-border-glow isolate z-10 flex flex-col justify-between min-h-[60vh]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-[1440px] mx-auto w-full flex-grow flex flex-col justify-center my-auto"
      >
        <motion.p variants={itemVariants} className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-6 text-center md:text-left">
          03 — Lancer une conversation
        </motion.p>

        <div className="max-w-[800px] text-center md:text-left">
          <div className="overflow-hidden">
            <motion.h2 
              variants={titleVariants}
              transition={{ duration: 1.0, ease: [0.22, 0.9, 0.35, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-txt italic leading-tight mb-8"
            >
              Créons ensemble.
            </motion.h2>
          </div>

          <motion.p variants={itemVariants} className="text-muted text-base md:text-lg mb-10 max-w-[500px] leading-relaxed">
            Vous avez un projet hors du commun ou souhaitez échanger sur les nouvelles frontières du web ? Écrivez-moi.
          </motion.p>

          {/* Mailto CTA interactif pour l'Aura avec shimmer doré */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <a
              href="mailto:iamydgel@gmail.com"
              className="interactive inline-flex items-center gap-3 text-lg md:text-2xl font-mono text-accent hover:text-txt transition-colors group"
            >
              <Mail size={24} className="group-hover:scale-110 transition-transform duration-300 text-accent" />
              <span className="email-shimmer">iamydgel@gmail.com</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer minimaliste */}
      <motion.div 
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto w-full border-t border-border-glow mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <p className="text-xs text-muted">
          © {currentYear} Emmanuel. Tous droits réservés.
        </p>

        {/* Liens Réseaux Sociaux */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <motion.a
              variants={itemVariants}
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors p-2"
              aria-label={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
