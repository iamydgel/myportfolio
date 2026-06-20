# Portfolio Awwwards — Spécification Complète
> **Emmanuel · Vibe Developer · "Architecte de l'invisible"**  
> Stack : Next.js 15 · React 19 · TypeScript · Tailwind v4 · GSAP · Framer Motion · Three.js · Lenis

---

## 1. Concept Narratif

**"Architecte de l'invisible"** — Le portfolio ne montre pas du code, il révèle une *intelligence qui façonne des espaces numériques*. L'émotion cible : la sensation de découvrir quelque chose que tu ne savais pas chercher — surprise, désir, conviction. Le visiteur ne lit pas un CV, il traverse une expérience sensorielle qui lui dit : *ce développeur pense différemment*.

**Ton :** silencieux, confiant, légèrement mystérieux. Aucun mot superflu. Chaque pixel intentionnel.

---

## 2. Moodboard & Design System

### Palette — "Obsidian Forge"

| Nom | Hex | Usage |
|-----|-----|-------|
| Forge Black | `#0A0908` | Background principal |
| Space | `#1A1916` | Surfaces / cards |
| Lux Gold | `#C8A96E` | Accent · Aura · CTA |
| Ash White | `#F0EDE8` | Texte principal |
| Mid Gray | `#7C7A74` | Texte secondaire / muted |
| Ice | `#E8ECF0` | Aura secondaire froide |

**Contraste principal :** `#F0EDE8` sur `#0A0908` = **17.8:1** ✓ (WCAG AAA)

---

### Typographie

| Rôle | Famille | Variante | Usage |
|------|---------|----------|-------|
| Display | Cormorant Garamond | Italic 400 | Hero tagline, titres éditoriaux |
| Heading | Satoshi / Inter | 500 | Sections, labels, nav |
| Body | Inter | 400 | Texte courant, descriptions |
| Mono | JetBrains Mono | 400 | Code callouts, tokens affichés |

**Rendu cible :**
```
Cormorant Italic 64–96px → "Architecte de l'invisible"
Inter 500 18px → Emmanuel — Vibe Developer
Inter 400 14px → Motion as a core UI language.
```

---

### Motion Tokens

| Token | Valeur | Usage |
|-------|--------|-------|
| `--ease-luxury` | `cubic-bezier(.22, .9, .35, 1)` | Révélations hero, transitions |
| `--ease-pop` | `cubic-bezier(.2, 1, .3, 1)` | Hover, micro-interactions |
| `--ease-smooth` | `cubic-bezier(.4, 0, .2, 1)` | Scroll, dissolves |
| `--spring-reveal` | `stiffness:160 / damping:18` | Cards, sections (Framer) |
| `--dur-hero` | `900ms` | Animations de chargement |
| `--dur-section` | `700ms` | ScrollTrigger reveals |
| `--dur-micro` | `220ms` | Hover, focus |

---

## 3. Architecture de la Page d'Accueil

```
┌─────────────────────────────────────────┐
│  NAV (fixed · backdrop-blur · spy scroll)│
├─────────────────────────────────────────┤
│  01 — HERO (100vh)                      │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │ Aura WebGL   │  │ Tagline serif    │ │
│  │ (background) │  │ italic           │ │
│  │              │  │ Sous-titre       │ │
│  │              │  │ CTA → "Projets"  │ │
│  └──────────────┘  └──────────────────┘ │
│  scroll indicator ↓                     │
├─────────────────────────────────────────┤
│  02 — WORKS (masonry 2×N)               │
│  ┌────┐ ┌────┐   Filter: All/Web/Mobile │
│  │ P1 │ │ P2 │   Hover → title + stack  │
│  └────┘ └────┘   Click → case study     │
│  ┌────┐ ┌────┐                          │
│  │ P3 │ │ P4 │                          │
│  └────┘ └────┘                          │
├─────────────────────────────────────────┤
│  03 — ABOUT (2 colonnes)                │
│  ┌──────────┐  ┌────────────────────┐   │
│  │ Portrait │  │ Manifeste (80 mots)│   │
│  │ parallax │  │ Stack animée       │   │
│  └──────────┘  │ Compteurs count-up │   │
│                └────────────────────┘   │
├─────────────────────────────────────────┤
│  04 — CONTACT (minimal)                 │
│  Phrase + mailto: · Réseaux · Aura amb. │
├─────────────────────────────────────────┤
│  FOOTER minimal · © année auto · Langue │
└─────────────────────────────────────────┘
```

**Règles de navigation :**
- Logo + 3 liens (Works / About / Contact) + CTA "Travaillons ensemble"
- Active state par IntersectionObserver spy
- Mobile : hamburger → drawer overlay
- Premier lien : `<a href="#main">Skip to content</a>` (visually hidden)

---

## 4. Storyboard / Timeline de Chargement

| Temps | Élément | Comportement |
|-------|---------|--------------|
| `0 – 100ms` | Background `#0A0908` | CSS statique, immédiat |
| `0 – 400ms` | Fonts + Hero image WebP | Preload `<link rel="preload">`, priority |
| `400 – 700ms` | Aura init | Three.js context · opacity `0→1` · 300ms ease |
| `700 – 1100ms` | Tagline reveal | `clip-path: inset(100%→0)` · luxury 900ms |
| `900 – 1300ms` | Sous-titre | `y: 24→0 + opacity` · delay 200ms après tagline |
| `1300 – 1600ms` | CTA + Nav | Fade-in bouton · nav slide depuis le haut |
| `1600 – 2400ms` | Aura idle + Cursor | Aura suit le pointer · Lenis activé · scroll pulse |
| `2400ms+` | Sections on scroll | GSAP ScrollTrigger par section |

---

## 5. Spécifications d'Animation

### Hero — Load Sequence

| Élément | Durée | Delay | Courbe | Propriété | Reduced-motion |
|---------|-------|-------|--------|-----------|----------------|
| Background wash | 400ms | 0ms | `linear` | `opacity` | Statique |
| Aura fade-in | 600ms | 300ms | `cubic-bezier(.4,0,.2,1)` | `opacity` | Aucune aura |
| Tagline clip reveal | 900ms | 600ms | `cubic-bezier(.22,.9,.35,1)` | `clip-path` | `opacity` seul |
| Sous-titre | 700ms | 850ms | `power3.out` | `y + opacity` | `opacity` seul |
| CTA bouton | 500ms | 1100ms | `ease` | `opacity + scale 0.94→1` | `opacity` seul |
| Nav bar | 400ms | 1300ms | `cubic-bezier(.22,.9,.35,1)` | `y: -100%→0` | `opacity` seul |
| Scroll indicator | ∞ pulse | 2000ms | `ease-in-out 2s infinite` | `opacity 1→0.3` | Masqué |

### Works — Scroll Reveal

| Élément | Durée | Delay | Courbe | Propriété | Reduced-motion |
|---------|-------|-------|--------|-----------|----------------|
| Card reveal (stagger) | 800ms | +80ms/card | `power3.out` | `y:40→0 + opacity` | `opacity` seul |
| Card hover scale | 300ms | 0ms | `cubic-bezier(.2,1,.3,1)` | `scale 1→1.03` | Aucun |
| Card hover info | 250ms | 0ms | `ease-out` | `y:8→0 + opacity` | `opacity` seul |
| Filter switch (FLIP) | 400ms | 0ms | `stiffness:200 damping:22` | Layout FLIP | Instantané |
| Cursor magnétisme | ~120ms | 0ms | `lerp × 0.15` | `x/y transform` | Désactivé |

### About — Compteurs + Stack

| Élément | Durée | Delay | Courbe | Propriété | Reduced-motion |
|---------|-------|-------|--------|-----------|----------------|
| Count-up chiffres | 1200ms | 0ms | `easeOutExpo` (RAF) | Valeur numérique | Valeur finale directe |
| Stack item stagger | 500ms | +60ms/item | `power2.out` | `x:-20→0 + opacity` | `opacity` seul |
| Portrait parallax | ∞ scroll | — | `lerp × 0.15` | `y: scrollY × 0.15` | Désactivé |

### Micro-Interactions Globales

| Élément | Durée | Courbe | Reduced-motion |
|---------|-------|--------|----------------|
| Bouton hover | 200ms | `cubic-bezier(.2,1,.3,1)` | Aucun |
| Lien nav underline | 300ms | `scaleX 0→1` (transform-origin:left) | Aucun |
| Page transition | 600ms | `clip-path slide · power3.inOut` | `opacity 0→1` |
| Cursor dot custom | ~80ms | `lerp × 0.20` | Curseur natif |

---

## 6. Spécification Aura (Physique)

### Paramètres physiques

| Paramètre | Valeur | Rôle |
|-----------|--------|------|
| `friction` | `0.08` | Inertie du déplacement (plus petit = plus luxueux) |
| `mass` | `1.0` | Résistance au changement de direction |
| `attraction` | `0.06` | Force d'attraction vers le pointer |
| `--aura-size` | `520px` | Diamètre de la particule Aura |
| `--aura-blur` | `90px` | Flou radial CSS |
| `--aura-opacity` | `0.13` | Opacité de base |

### Couleurs Aura

```css
--aura-color-1: rgba(200, 169, 110, 0.13);   /* Gold chaud */
--aura-color-2: rgba(90, 100, 200, 0.08);    /* Ice froid */
```

### Interactions

- **Pointermove :** l'Aura suit le curseur avec inertie spring
- **Touch (mobile) :** Aura se déplace vers le centre tactile, `touchmove`
- **Idle (>3s sans mouvement) :** drift lent autonome (sin/cos oscillation)
- **Hover sur CTA :** Aura attirée vers le bouton, `scale` × 1.2, saturation +20%

### Limites de performance

- WebGL : résolution `/2` sur mobile (`pixelRatio: 1`)
- Fallback : `radial-gradient` CSS si WebGL non supporté ou `saveData: true`
- Désactivé si `prefers-reduced-motion: reduce`
- Budget GPU : < 2ms/frame sur la RAF Aura

---

## 7. Extraits de Code

### Design Tokens CSS

```scss
/* ─── DESIGN TOKENS ─── */
:root {
  /* Couleurs */
  --clr-bg:        #0A0908;
  --clr-surface:   #1A1916;
  --clr-accent:    #C8A96E;
  --clr-text:      #F0EDE8;
  --clr-muted:     #7C7A74;
  --clr-border:    rgba(240, 237, 232, 0.08);

  /* Aura */
  --aura-size:     520px;
  --aura-blur:     90px;
  --aura-opacity:  0.13;
  --aura-color-1:  rgba(200, 169, 110, var(--aura-opacity));
  --aura-color-2:  rgba(90, 100, 200, calc(var(--aura-opacity) * 0.6));

  /* Motion */
  --ease-luxury:   cubic-bezier(.22, .9, .35, 1);
  --ease-pop:      cubic-bezier(.2, 1, .3, 1);
  --ease-smooth:   cubic-bezier(.4, 0, .2, 1);
  --dur-hero:      900ms;
  --dur-section:   700ms;
  --dur-micro:     220ms;

  /* Layout */
  --radius-card:   20px;
  --max-width:     1440px;
}
```

---

### Aura CSS (Fallback sans WebGL)

```css
/* ─── AURA CSS FALLBACK ─── */
.aura {
  position: absolute;
  width: var(--aura-size);
  height: var(--aura-size);
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    var(--aura-color-1) 0%,
    var(--aura-color-2) 40%,
    transparent 70%
  );
  filter: blur(var(--aura-blur));
  mix-blend-mode: screen;
  pointer-events: none;
  will-change: transform;
  transition:
    transform 0.9s var(--ease-luxury),
    opacity   0.6s ease;
}

/* Tagline clip reveal */
.hero__title {
  clip-path: inset(100% 0 0 0);
  animation: revealClip var(--dur-hero) var(--ease-luxury) 600ms forwards;
}

@keyframes revealClip {
  to { clip-path: inset(0% 0 0 0); }
}

/* Reduced-motion overrides */
@media (prefers-reduced-motion: reduce) {
  .aura {
    transition: none;
    animation: none;
  }
  .hero__title {
    clip-path: none;
    opacity: 0;
    animation: fadeIn 400ms ease 300ms forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
}
```

---

### Aura — Physique Pointer (TypeScript)

```typescript
// ─── AURA POINTER PHYSICS ───
// masse=1.0 · friction=0.08 · attraction=0.06
// Un seul RAF, aucun listener inutile

const aura = document.querySelector<HTMLElement>('.aura')!;
const AURA_HALF = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue('--aura-size')
) / 2;

let ax = window.innerWidth / 2 - AURA_HALF;
let ay = window.innerHeight / 2 - AURA_HALF;
let tx = ax, ty = ay;
let vx = 0, vy = 0;

const FRICTION   = 0.08;
const ATTRACTION = 0.06;
const MASS       = 1.0;

document.addEventListener('pointermove', (e) => {
  tx = e.clientX - AURA_HALF;
  ty = e.clientY - AURA_HALF;
});

function auraLoop() {
  // Spring physics : F = attraction × (target − pos) / mass
  const fx = (tx - ax) * ATTRACTION / MASS;
  const fy = (ty - ay) * ATTRACTION / MASS;
  vx = (vx + fx) * (1 - FRICTION);
  vy = (vy + fy) * (1 - FRICTION);
  ax += vx;
  ay += vy;

  aura.style.transform = `translate3d(${ax}px, ${ay}px, 0)`;
  requestAnimationFrame(auraLoop);
}

// Respect prefers-reduced-motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  auraLoop();
}
```

---

### GSAP ScrollTrigger — Works Cards

```typescript
// ─── GSAP SCROLLTRIGGER — WORKS CARDS ───
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Lenis + GSAP sync (requis)
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Cards reveal avec stagger
gsap.utils.toArray<HTMLElement>('.work-card').forEach((card, i) => {
  gsap.from(card, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.08,        // stagger 80ms entre cards
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 88%',
      once: true,           // ne rejoue pas au scroll retour
    },
  });
});

// IntersectionObserver alternatif (sans GSAP)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      gsap.to(e.target, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
```

---

### Framer Motion — Section Reveal (React)

```tsx
// ─── FRAMER MOTION — SECTION REVEAL ───
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 160,
      damping: 18,
      delay: i * 0.06,    // stagger par enfant
    },
  }),
};

interface RevealSectionProps {
  children: React.ReactNode;
  index?: number;
}

export function RevealSection({ children, index = 0 }: RevealSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      variants={sectionVariants}
    >
      {children}
    </motion.div>
  );
}

// Utilisation
// <RevealSection index={0}><HeroContent /></RevealSection>
// <RevealSection index={1}><WorksGrid /></RevealSection>
```

---

### Three.js / WebGL — Aura Shader (Hint)

```typescript
// ─── THREE.JS AURA SHADER ───
// ShaderMaterial · AdditiveBlending · PlaneGeometry fullscreen
// Resolution /2 sur mobile, fallback canvas2D sur saveData

/*
VERTEX SHADER (standard passthrough) :
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }

FRAGMENT SHADER :
  uniform vec2  uMouse;    // coordonnées normalisées [0..1]
  uniform float uTime;
  varying vec2  vUv;

  void main() {
    vec2  d    = vUv - uMouse;
    float r    = length(d);
    float glow = exp(-r * r * 3.5) * 0.4;
    vec3  warm = vec3(0.78, 0.66, 0.43);   // Lux Gold
    vec3  cool = vec3(0.35, 0.39, 0.78);   // Ice Blue
    vec3  col  = mix(warm, cool, smoothstep(0.0, 0.6, r));
    gl_FragColor = vec4(col * glow, glow);
  }
*/

// Config renderer :
// renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
// material.blending    = THREE.AdditiveBlending;
// material.transparent = true;
// material.depthWrite  = false;

// Fallback si WebGL non supporté :
function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch { return false; }
}

// Désactiver sur saveData
const saveData = (navigator as any).connection?.saveData ?? false;
const useWebGL = isWebGLSupported() && !saveData;
```

---

## 8. Design System Minimal — Composants Réutilisables

### Composant : `<RevealText>`

```tsx
// Révèle le texte ligne par ligne avec clip-path
import { motion } from 'framer-motion';

export function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.p
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 0.9, 0.35, 1], delay }}
      >
        {text}
      </motion.p>
    </div>
  );
}
```

### Composant : `<MagneticButton>`

```tsx
// Bouton avec effet magnétique sur hover
import { useRef, MouseEvent } from 'react';

export function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (e.clientX - left - width  / 2) * 0.35;
    const y = (e.clientY - top  - height / 2) * 0.35;
    ref.current!.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    ref.current!.style.transform = 'translate(0, 0)';
    ref.current!.style.transition = 'transform 0.5s cubic-bezier(.2,1,.3,1)';
  };

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease' }}
    >
      {children}
    </button>
  );
}
```

### Composant : `<CountUp>`

```tsx
// Compteur animé (About section)
import { useEffect, useRef, useState } from 'react';

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (prefersReducedMotion.current) { setValue(target); return; }
    const start = performance.now();
    const raf = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration]);

  return <span aria-label={`${target}`}>{value}</span>;
}
```

---

## 9. Critères d'Acceptation

### Émotion
- [ ] Prototype visionné par 3 personnes extérieures → réaction "wow" au cold load
- [ ] Tagline mémorisée après 1 seule lecture
- [ ] Aucun élément ne semble issu d'un template

### Motion
- [ ] Toutes les animations ont durée + delay + courbe chiffrés (cf. § 5)
- [ ] `prefers-reduced-motion` testé (Chrome DevTools → Emulate CSS media)
- [ ] 60 FPS vérifié via Chrome Performance panel sur scroll rapide
- [ ] Aucune animation ne bloque le thread principal (pas de JS lourd dans RAF)

### Performance
- [ ] **LCP < 2.5s** (Lighthouse, réseau 4G simulé)
- [ ] **CLS < 0.1** (`aspect-ratio` CSS réservé sur toutes les images)
- [ ] **TTFB < 800ms** (Next.js Static Export ou ISR)
- [ ] Images : WebP + LQIP blur placeholder + `loading="lazy"` (sauf hero)
- [ ] Fonts : `font-display: swap` + `<link rel="preload">` Cormorant + Inter (subset latin)
- [ ] Three.js bundle : code-split dynamique (`next/dynamic`)

### Accessibilité (WCAG AA)
- [ ] Contraste texte principal ≥ 4.5:1 (`#F0EDE8` / `#0A0908` = 17.8:1 ✓)
- [ ] Focus ring visible sur tous les éléments interactifs
- [ ] `<a href="#main" class="skip-link">Skip to content</a>` en premier enfant `<body>`
- [ ] `aria-label` sur liens icônes (GitHub, LinkedIn…)
- [ ] `role="img"` + `alt` descriptif sur toutes les images works
- [ ] Navigation clavier complète (Tab, Enter, Escape pour modales/overlays)
- [ ] Pas de `tabindex` > 0

### Cross-Device
- [ ] Mobile 375px : nav hamburger, grid 1 colonne, Aura désactivée / radial-gradient CSS
- [ ] Tablette 768px : grid 2 colonnes
- [ ] Desktop 1440px : layout nominal
- [ ] Testé : Safari 17 · Chrome 125 · Firefox 127 · Chrome Android

---

## 10. Handoff — Assets & Exports

### Assets à exporter

| Fichier | Format | Dimensions |
|---------|--------|------------|
| `logo.svg` | SVG | Vectoriel |
| `logo-white.svg` | SVG | Vectoriel |
| `favicon.ico` | ICO | 32×32 |
| `apple-touch-icon.png` | PNG | 180×180 |
| `og-emmanuel.webp` | WebP | 1200×630 |
| `portrait.webp` | WebP | 600×600 min (1:1) |
| `portrait-lqip.webp` | WebP | 20×20 (blur placeholder) |
| `work-{slug}-thumb.webp` | WebP | 1200×675 (16:9) |
| `work-{slug}-lqip.webp` | WebP | 32×18 |

### Naming Convention

```
kebab-case · lowercase · pas d'espaces
Exemples :
  work-thumb-projet-alpha.webp
  work-lqip-projet-alpha.webp
  portrait.webp
  og-emmanuel.webp
```

### Tokens — Export Style Dictionary

```json
// tokens.json (compatible Style Dictionary / Theo)
{
  "color": {
    "bg":      { "value": "#0A0908" },
    "surface": { "value": "#1A1916" },
    "accent":  { "value": "#C8A96E" },
    "text":    { "value": "#F0EDE8" },
    "muted":   { "value": "#7C7A74" }
  },
  "motion": {
    "easing": {
      "luxury": { "value": "cubic-bezier(.22,.9,.35,1)" },
      "pop":    { "value": "cubic-bezier(.2,1,.3,1)" }
    },
    "duration": {
      "hero":    { "value": "900" },
      "section": { "value": "700" },
      "micro":   { "value": "220" }
    }
  },
  "size": {
    "aura":       { "value": "520" },
    "aura-blur":  { "value": "90" },
    "radius-card":{ "value": "20" }
  }
}
```

### Instructions pour les Devs

1. Cloner le repo → `pnpm install`
2. Copier `tokens.json` dans `/src/styles/tokens/`
3. Assets visuels dans `/public/images/` (portraits, works, og)
4. Fonts en local dans `/public/fonts/` (Cormorant WOFF2 + Inter WOFF2)
5. Variables CSS générées automatiquement via `style-dictionary build`
6. Three.js Aura : chargement dynamique (`next/dynamic({ ssr: false })`)
7. Test reduced-motion : Chrome DevTools → Rendering → Emulate CSS prefers-reduced-motion

---

## 11. Workflow Recommandé (6 jours)

| Jour | Tâche | Livrable |
|------|-------|----------|
| **J1** | Moodboard validé · tokens CSS figés · Figma hero frame | Fichier Figma partagé |
| **J2** | Hero Next.js : Lenis + tagline reveal + Aura CSS fallback | Hero live sur Vercel preview |
| **J3** | Aura WebGL (Three.js shader) + cursor magnétisme + Works grid | LCP testé < 2.5s |
| **J4** | Sections About + Contact + ScrollTrigger GSAP | Site complet non-polished |
| **J5** | Polish : page transitions, micro-interactions, mobile QA | Tous breakpoints OK |
| **J6** | Lighthouse audit · accessibilité · handoff ZIP | Score Lighthouse > 90 toutes catégories |

---

*Document généré par Claude · Portfolio Emmanuel — Awwwards Edition*
