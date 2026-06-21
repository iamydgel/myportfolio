"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function NavBar() {
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détection du scroll pour la navbar progressive
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    // Exécuter immédiatement pour le cas où la page est déjà défilée au chargement
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détection de la section active
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // centré pour détecter proprement la section principale
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // Fermer le menu mobile avec la touche Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: "Projets", href: "#works", id: "works" },
    { name: "À propos", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.nav
      initial={prefersReducedMotion ? { y: 0 } : { y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.9, 0.35, 1], delay: 1.7 }}
      className={`fixed top-0 left-0 w-full h-16 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border-glow shadow-md"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-serif text-xl italic tracking-wide text-txt hover:text-accent transition-colors duration-200">
          Emmanuel
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm relative py-2 transition-colors duration-200 ${
                  activeSection === link.id ? "text-accent" : "text-muted hover:text-txt"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1px] bg-accent transition-transform duration-300 origin-left ${
                    activeSection === link.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-bg bg-accent rounded-full hover:scale-105 hover:bg-white transition-all duration-200"
          >
            Travaillons ensemble
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-txt hover:text-accent transition-colors"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 top-16 w-full bg-bg/95 backdrop-blur-lg z-40 transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-serif italic transition-colors ${
                activeSection === link.id ? "text-accent" : "text-txt hover:text-accent"
              }`}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-bg bg-accent rounded-full hover:bg-white transition-colors"
          >
            Travaillons ensemble
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
