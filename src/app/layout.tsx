import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Emmanuel · Vibe Developer · Architecte de l'invisible",
  description: "Portfolio de développeur de haut niveau axé sur le design, l'esthétique et les interactions immersives.",
  authors: [{ name: "Emmanuel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu principal (Skip to content)
        </a>
        <svg
          id="aura-spine-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: -10,
            visibility: "hidden",
          }}
          viewBox="0 0 100 400"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="displacement-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" id="displacement-map" />
            </filter>
          </defs>
          <path
            id="aura-spine"
            d="M 85 15 C 80 80, 55 120, 50 150 C 45 180, 30 220, 25 250 C 20 280, 45 350, 50 380"
          />
        </svg>
        {children}
      </body>
    </html>
  );
}
