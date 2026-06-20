"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Contact() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/iamydgel", icon: <Github size={20} />, label: "Visiter mon profil GitHub" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin size={20} />, label: "Se connecter sur LinkedIn" },
    { name: "Twitter", href: "https://twitter.com", icon: <Twitter size={20} />, label: "Me suivre sur Twitter" },
  ];

  return (
    <section id="contact" className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-bg border-t border-border-glow z-10 flex flex-col justify-between min-h-[60vh]">
      <div className="max-w-[1440px] mx-auto w-full flex-grow flex flex-col justify-center my-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-6 text-center md:text-left">
          03 — Lancer une conversation
        </p>

        <div className="max-w-[800px] text-center md:text-left">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-txt italic leading-tight mb-8">
            Créons ensemble.
          </h2>

          <p className="text-muted text-base md:text-lg mb-10 max-w-[500px] leading-relaxed">
            Vous avez un projet hors du commun ou souhaitez échanger sur les nouvelles frontières du web ? Écrivez-moi.
          </p>

          {/* Mailto CTA interactif pour l'Aura */}
          <a
            href="mailto:iamydgel@gmail.com"
            className="interactive inline-flex items-center gap-3 text-lg md:text-2xl font-mono text-accent hover:text-txt transition-colors group"
          >
            <Mail size={24} className="group-hover:scale-110 transition-transform duration-300" />
            <span>iamydgel@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Footer minimaliste */}
      <div className="max-w-[1440px] mx-auto w-full border-t border-border-glow mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-muted">
          © {currentYear} Emmanuel. Tous droits réservés.
        </p>

        {/* Liens Réseaux Sociaux */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors p-2"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
