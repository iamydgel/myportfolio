# Direction de Production — Chorégraphie, Transitions & Système du Plan-Séquence
## Portfolio Emmanuel · *"Architecte de l'invisible"*

> **Statut :** Document de production. Complète `motion-direction-portfolio-emmanuel.md`.
> **Rôle de ce document :** combler ce qui manquait — les choix figés (un seul par animation), la chorégraphie entre les quatre sections, et le système technique qui fait tenir le tout comme un seul geste continu.
> **Lecture :** chaque animation listée ici est une décision, pas une proposition. La justification tient en une ligne ; le reste est spécification.

---

## 0. Doctrine de Production

Trois règles gouvernent ce document :

1. **Une animation = un choix.** Si deux techniques étaient viables, celle retenue est celle qui sert le mieux *"Architecte de l'invisible"* avec le moins de poids technique. L'autre n'est pas mentionnée.
2. **Toute sortie a le même soin que toute entrée.** Le document précédent décrivait bien les arrivées. Voici la loi qui manquait :

   > **Loi 4 — Le Poids du Départ.** Rien ne sort en s'effaçant simplement. Tout s'enfonce légèrement avant de disparaître — le miroir temporel de la Loi 1. Un élément qui arrivait en `y:24px→0` repart en `y:0→+12px`. Il ne remonte jamais en sortant : la gravité dorée s'applique aussi au départ.
   >
   > `--ease-depart: cubic-bezier(.4, 0, .68, .06)` — miroir exact de `--ease-luxury`. Ce qui s'installait lentement repart vite. `--dur-exit: 500ms` (plus court que `--dur-section: 700ms` — un départ est toujours plus bref qu'une arrivée).

3. **La continuité n'est pas une métaphore, c'est un objet.** Le portfolio paraît être un seul plan-séquence parce qu'un seul objet — l'Aura — traverse littéralement les quatre sections sans jamais être détruit ni recréé. Tout le reste (caméra, masques, lumière) est subordonné à cet objet. C'est la décision la plus importante de ce document — voir §1.

---

## 1. Le Système Unique du Plan-Séquence

> Répond directement au besoin de **liaison / scroll transitions**.

### Décision

L'Aura n'est pas réinitialisée à chaque section. **Une seule instance Three.js, montée une fois au chargement, jamais démontée**, voyage le long d'un **chemin SVG unique** dessiné à la main, qui traverse les quatre sections de haut en bas. C'est ce chemin — pas une succession de fade-in/fade-out — qui produit la sensation de plan-séquence.

**Pourquoi ce choix et pas un Aura par section :** quatre instances indépendantes, même bien synchronisées, créent toujours une micro-rupture au moment du relais (l'œil détecte la coupure même si les valeurs sont continues). Un seul objet qui se déplace ne peut pas trahir de coupure, par construction.

### Architecture des couches

| Couche | Z | Persistance | Piloté par |
|--------|---|--------------|------------|
| Aura WebGL (`#aura`) | -2 | Montée une fois, jamais démontée | Position : chemin SVG · Couleur/opacité : checkpoints |
| Voile de profondeur (grain + DoF) | -1 | Persistant | `filter: blur()` scrubbé |
| Contenu (sections) | 0 | Scroll normal | DOM standard |

### Les deux minuteries — ne pas les confondre

Le piège technique classique : vouloir tout piloter par un seul pourcentage de scroll global. **Décision : deux mécanismes séparés, avec des rôles distincts.**

- **Minuterie globale (la colonne vertébrale)** — un `ScrollTrigger` unique sur `document.documentElement`, `start: "top top"`, `end: "bottom bottom"`, `scrub: 0.3`. Pilote *uniquement* le chemin et la couleur de l'Aura. Robuste à n'importe quelle longueur de contenu.
- **Minuteries locales (la chorégraphie)** — un `ScrollTrigger` par frontière de section (`trigger: '#hero'`, etc.). Pilotent l'entrée/sortie du contenu, les masques, la profondeur de champ. Indépendantes de la hauteur totale de la page.

```typescript
// stage-controller.ts — la colonne vertébrale, montée une seule fois
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Le chemin est dessiné une fois (Figma → export SVG → <path id="aura-spine">),
// positionné en position:fixed, dimensions 100vw × hauteur totale du document.
gsap.to("#aura", {
  motionPath: { path: "#aura-spine", align: "#aura-spine", alignOrigin: [0.5, 0.5] },
  ease: "none",
  scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
});

// La couleur ne vit pas dans Three.js directement : GSAP anime une custom
// property CSS sur un nœud invisible (seule source de vérité du temps),
// un ticker RAF lit la valeur calculée et la pousse dans l'uniform du shader.
// Ça garde GSAP comme unique horloge, même pour des valeurs consommées en WebGL.
gsap.timeline({
  scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
})
  .to("#aura-bridge", { "--hue": 38, "--op": 0.13 }, 0)     // Hero
  .to("#aura-bridge", { "--hue": 38, "--op": 0.08 }, 0.22)  // Works
  .to("#aura-bridge", { "--hue": 32, "--op": 0.10 }, 0.55)  // About (orbe)
  .to("#aura-bridge", { "--hue": 205, "--op": 0.07 }, 0.82); // Contact (ice)
```

### Les quatre ancrages du chemin

Reprend exactement les positions déjà fixées dans `motion-direction-portfolio-emmanuel.md` §13 — ce chemin les relie littéralement.

| Point | Section | Position | Température |
|-------|---------|----------|-------------|
| P0 | Hero | Haut-droite | Gold chaud |
| P1 | Works | Suit le curseur (le chemin n'impose qu'une zone de repos, le pointer-physics prend le relais en idle) | Neutre |
| P2 | About | Centre-gauche — l'orbe | Gold centré |
| P3 | Contact | Centrée basse | Ice froid |

---

## 2. HERO — Plan de Production

| Catégorie | Décision | Durée / Easing | Techno | Justification |
|-----------|----------|-----------------|--------|----------------|
| **Entrée** | Séquence figée en `motion-direction-portfolio-emmanuel.md` §5 (Aura → label → tagline clip-path → sous-titre → CTA → nav). Aucun changement. | 0→2400ms, `--ease-luxury` | CSS + WebGL + Framer | Déjà optimal — l'Aura précède toujours le texte. |
| **Sortie** | La tagline ne "sort" pas sur son propre timer : elle est ré-attachée au scroll (`clip-path` scrubbé en sens inverse de son entrée) dès que `#hero` quitte le viewport. Elle redescend sous son masque exactement comme elle est montée. | Scrubbé, 0 ms fixe | GSAP ScrollTrigger (`scrub: 0.3`) | Une sortie sur un timer fixe désynchronise la vitesse de scroll de l'utilisateur ; scrubber la sortie la rend réversible (remonter = la tagline revient), preuve silencieuse de continuité. |
| **Révélation contenu** | Inchangée — `clip-path: inset(100%→0)`, bas→haut. | 900ms par ligne, `--ease-luxury` | CSS | Identité typographique déjà juste. |
| **Micro-interactions** | CTA magnétique (lerp 0.2, rayon 8px max) — déjà spécifié. | 100ms lerp + 500ms retour `--ease-pop` | RAF custom | Conservé tel quel. |
| **Cursor + Aura** | État *idle* (oscillation 20px/8s) jusqu'au premier `pointermove` ; bascule alors en état *pointer actif* (friction .08). Le cursor dot apparaît avec 300ms de retard sur l'Aura — jamais avant elle. | Continu | RAF | L'Aura précède toujours le curseur dans l'ordre d'apparition — règle de hiérarchie visuelle du concept. |

---

## 3. WORKS — Plan de Production

| Catégorie | Décision | Durée / Easing | Techno | Justification |
|-----------|----------|-----------------|--------|----------------|
| **Entrée** | Cards `y:40→0 + opacity`, stagger +80ms/card, déclenché une seule fois par `ScrollTrigger` (`once: true`). | 800ms, `power3.out` | GSAP ScrollTrigger | Le `once` évite que les cards se ré-animent au scroll-back — un re-jeu casserait l'illusion de continuité. |
| **Sortie** | Sortie traitée dans la transition Works→About (§7.2) — pas de sortie indépendante : les cards ne "partent" jamais sans raison narrative. | — | — | Une section ne sort que parce qu'une autre arrive — jamais en isolation. |
| **Révélation contenu** | Titre `clip-path`, filter bar glide-in. Inchangé. | 800ms / 500ms | GSAP ST / Framer | Conservé. |
| **Micro-interactions** | Détail complet en §6 (projets). | — | — | — |
| **Cursor + Aura** | Au survol d'une card : Aura dérive de max 40px vers la card (lerp ×0.04, plus lent que son lerp pointer normal — elle "remarque" la card sans s'y précipiter) + hue-shift 15° vers la teinte dominante du visuel. Cursor → ring "VOIR" 56px en 200ms. | 200–400ms | RAF + Framer | Le ralentissement du lerp (0.04 vs 0.06 par défaut) signale que ce mouvement est une *réaction*, pas un réflexe — cohérent avec la personnalité de l'Aura définie en §11 du doc Motion Direction. |

---

## 4. ABOUT — Plan de Production

| Catégorie | Décision | Durée / Easing | Techno | Justification |
|-----------|----------|-----------------|--------|----------------|
| **Entrée** | Pas d'entrée au sens classique : l'orbe **est** l'Aura arrivée (voir §7.2). Seul le texte manifeste s'anime, stagger 80ms ligne par ligne, déclenché après que l'orbe a fini son atterrissage (chaînage explicite, pas un délai arbitraire). | 700ms, `power2.out`, chaîné après le spring d'atterrissage | GSAP ScrollTrigger | Le texte ne doit jamais arriver avant que l'orbe soit stable — sinon le regard est divisé entre deux mouvements actifs (viole la "règle des deux animations simultanées" déjà posée §14 du doc Motion Direction). |
| **Sortie** | Voir §7.3 — le manifeste sombre (`y:0→+12px`, Loi 4) pendant que l'orbe entame son "exhalation". | 500ms, `--ease-depart` | GSAP ScrollTrigger | Cohérence avec Loi 4. |
| **Révélation contenu** | Compteurs count-up `easeOutExpo`, badges stagger. Inchangé. | 1200ms / 500ms | RAF / GSAP | Conservé. |
| **Micro-interactions** | Aucune nouvelle — section volontairement pauvre en interactions (énergie 1/10, doctrine déjà fixée). | — | — | — |
| **Cursor + Aura** | Le curseur redevient un simple dot 8px sans ring — aucune card à survoler ici. L'Aura, désormais "orbe", n'est plus pilotée par lerp pointer mais par son cycle `pulse` GSAP (voir §1 et §7.3) ; le pointer du visiteur n'a plus d'effet sur sa position — seulement sur une très légère réfraction de teinte (+5° de hue max) au survol direct de l'orbe. | Continu | GSAP yoyo tween | Détacher l'orbe du pointer marque, sans l'expliquer, que l'on est entré dans un espace contemplatif — le contraste avec Hero/Works (où l'Aura *suit*) est la preuve sensorielle qu'on a changé de mode. |

---

## 5. CONTACT — Plan de Production

| Catégorie | Décision | Durée / Easing | Techno | Justification |
|-----------|----------|-----------------|--------|----------------|
| **Entrée** | Titre clip lent (1000ms), body fade (600ms, delay 200ms), mail shimmer (delay 600ms). Démarre seulement **après** les 10vh de silence qui suivent la transition §7.3 — jamais immédiatement. | 1000ms `--ease-luxury` | CSS + GSAP | Le silence avant l'entrée est ce qui rend l'arrivée du mail "méritée" plutôt que mécanique. |
| **Sortie** | Le footer se dissout (`opacity` seule, 600ms, `--ease-smooth`) — c'est la seule sortie du site qui n'est *pas* suivie d'une autre section. Elle utilise une courbe différente (`--ease-smooth`, pas `--ease-depart`) car il n'y a rien après : ce n'est pas un départ vers, c'est une fermeture. | 600ms, `--ease-smooth` | CSS | Distinction volontaire : Loi 4 régit les transitions internes au site, pas la fermeture finale — qui doit se sentir *terminale*, pas *transitoire*. |
| **Révélation contenu** | Inchangé. | — | — | Conservé. |
| **Micro-interactions** | Mail shimmer (déjà spécifié), icônes réseaux `y:-3px + rotate -5°` au survol. | 2500ms loop / 160ms | CSS / Framer | Conservé. |
| **Cursor + Aura** | L'Aura (P3, ice, opacity 0.07) entre en oscillation finale très lente (amplitude 10px, période 10s — la plus lente du site) puis, après 30s d'inactivité, applique l'état "sommeil" déjà défini (§11 du doc Motion Direction). Le curseur garde son comportement standard, sans état spécial — Contact ne doit *rien* demander à l'utilisateur. | Continu | RAF | La dernière chose que l'utilisateur perçoit doit être la plus lente du site — c'est la "respiration qui s'éteint" évoquée dans la courbe émotionnelle. |

---

## 6. Animations des Projets — Spécification Complète

> Couvre explicitement : apparition, focus, ouverture, fermeture, changement de projet, retour.

### 6.1 Apparition (grille)

Décision déjà fixée (§3) : stagger 80ms, `y:40→0+opacity`, `once: true`. **Ajout de production :** à mi-grille, le stagger s'inverse droite→gauche (variation rythmique déjà actée dans le doc Motion Direction §8) — implémenté en calculant l'index depuis le centre de la grille plutôt que depuis le DOM order :

```typescript
const center = cards.length / 2;
cards.forEach((card, i) => {
  const delay = i < center ? i * 80 : (cards.length - 1 - i) * 80;
  gsap.from(card, { y: 40, opacity: 0, duration: 0.8, delay: delay / 1000, ease: "power3.out" });
});
```

### 6.2 Focus (hover souris **et** focus clavier — traités séparément, jamais confondus)

| État | Card | Visuel | Overlay | Cursor | Aura |
|------|------|--------|---------|--------|------|
| **Hover souris** | `scale 1.02` + tilt 3D `rotateX ±4° / rotateY ±6°` (perspective 800px) | `filter: sepia(.4) hue-rotate(340deg) saturate(1.5)` | `opacity 0→1`, 250ms | Ring 56px "VOIR" | Dérive 40px max vers la card |
| **Focus clavier** (`:focus-visible`) | Aucun tilt (pas de position de pointeur réelle à suivre) — `scale 1.02` seul | Identique | Identique | **Inchangé** — pas de ring sans pointeur physique | **Inchangé** — l'Aura ne réagit qu'au pointeur réel |
| **Sortie (les deux cas)** | Spring `stiffness:200 damping:22`, overshoot `scale:1.005` 80ms | `opacity 1→0`, 200ms | — | Retour dot 8px, 200ms | Retour lerp standard |

**Justification de la séparation hover/focus :** un ring de curseur ou une dérive d'Aura déclenchés par `Tab` créeraient un mouvement sans cause visible pour l'utilisateur clavier — un signal *en plus*, pas un signal cohérent. On garde le feedback visuel essentiel (overlay, scale) et on retire ce qui présuppose une souris.

### 6.3 Ouverture (clic → étude de cas)

**Décision : View Transitions API native, avec repli GSAP Flip.** C'est le seul mécanisme qui produit un morph image-vers-image *et* layout-vers-layout sans code de calcul de bounds à la main pour le cas nominal.

```tsx
// WorkCard.tsx
function handleOpen(slug: string, cardEl: HTMLElement) {
  cardEl.style.viewTransitionName = "project-image";
  cardEl.querySelector("h3")!.style.viewTransitionName = "project-title";

  const navigate = () => router.push(`/works/${slug}`);

  if (document.startViewTransition && !prefersReducedMotion()) {
    document.startViewTransition(navigate);
  } else {
    navigate(); // GSAP Flip prend le relais via le hook de route (voir 6.6)
  }
}
```

```css
/* Calibrage sur les tokens du design system — sinon le navigateur applique
   sa courbe par défaut (ease), incohérente avec le reste du site */
::view-transition-group(project-image) {
  animation-duration: 500ms;
  animation-timing-function: cubic-bezier(.22, .9, .35, 1); /* --ease-luxury */
}
::view-transition-group(project-title) {
  animation-duration: 420ms;
  animation-timing-function: cubic-bezier(.2, 1, .3, 1); /* --ease-pop */
}
```

**Point technique critique :** `viewTransitionName` doit être retiré (`cardEl.style.viewTransitionName = ""`) immédiatement après le déclenchement de la transition, sinon toutes les cards de la grille partagent virtuellement le même nom au prochain rendu et le navigateur lève une erreur silencieuse (transition annulée).

**Aura pendant l'ouverture :** +40% opacity sur 600ms, dérive vers le centre du viewport (`gsap.to('#aura-bridge', {'--op': '*=1.4', duration: 0.6})`).
**Cursor pendant l'ouverture :** disparaît en 150ms (navigation de route = nouveau contexte, pas de feedback de survol pertinent).

### 6.4 Changement de projet (navigation suivant/précédent dans l'étude de cas)

Contexte différent du 6.3 : on reste sur le même type de page (`/works/[slug]` → `/works/[autre-slug]`), une morph positionnelle n'a pas de sens puisque les deux images sont déjà plein cadre. **Décision : cross-dissolve avec glissement, pas de morph de position.**

```css
::view-transition-old(case-hero) {
  animation: case-exit 450ms cubic-bezier(.4,0,.2,1) forwards; /* --ease-smooth */
}
::view-transition-new(case-hero) {
  animation: case-enter 450ms cubic-bezier(.4,0,.2,1) forwards;
}
@keyframes case-exit { to { opacity: 0; transform: translateY(-12px); } }
@keyframes case-enter { from { opacity: 0; transform: translateY(12px); } }
```

Le titre suit avec un `clip-path` reveal indépendant (900ms, `--ease-luxury`), volontairement plus lent que l'image — il ne doit jamais sembler être un sous-élément de la photo, mais une annonce qui la suit.

### 6.5 Fermeture / retour à la grille

Même mécanisme que 6.3, inversé, avec deux décisions de production supplémentaires :

1. **Durée asymétrique :** ouverture 500ms, fermeture 420ms. Le retour est toujours plus rapide — loi déjà posée dans le doc Motion Direction pour le case study, reconduite ici.
2. **Restauration de scroll obligatoire :** la position de scroll de la grille au moment du clic est stockée (`sessionStorage`, clé `worksScrollY`) avant la navigation et restaurée avant que le `viewTransitionName` soit ré-appliqué à la card de destination. Sans ce détail, le navigateur ne trouve pas la card à la bonne position et remplace le morph par un simple fade — la continuité casse silencieusement.

```typescript
// avant navigation vers la case study
sessionStorage.setItem("worksScrollY", String(window.scrollY));

// au retour, dans le composant grille, avant le paint
useLayoutEffect(() => {
  const y = sessionStorage.getItem("worksScrollY");
  if (y) window.scrollTo(0, Number(y));
}, []);
```

### 6.6 Repli sans View Transitions API (Safari < 18, navigateurs non supportés)

```typescript
import { Flip } from "gsap/Flip";

function flipFallback(cardEl: HTMLElement, targetEl: HTMLElement) {
  const state = Flip.getState(cardEl);
  targetEl.appendChild(cardEl);
  Flip.from(state, { duration: 0.5, ease: "power3.inOut", absolute: true });
}
```

GSAP Flip est gratuit (Webflow/GreenSock, depuis l'intégration de GSAP au catalogue Webflow) — aucun coût de licence à prévoir pour ce repli.

---

## 7. Les Trois Transitions — Chorégraphie Inter-Sections

> C'est la partie qui manquait. Chaque section n'est plus indépendante : chaque frontière est un événement chorégraphié et nommé.

### 7.1 🏆 Signature — Hero → Works : *"Le Voile qui se Lève"*

| Paramètre | Décision |
|-----------|----------|
| **Déclencheur** | `ScrollTrigger(trigger:'#hero', start:'bottom 75%', end:'bottom 15%', scrub:0.3)` — zone scrubbée ≈ 60vh |
| **Sortants** | Tagline (clip-path inversé, scrubbé) · CTA pill (FLIP unique, déclenché une fois au franchissement, pas scrubbé en continu — voir note perf ci-dessous) |
| **Entrants** | Eyebrow "02 — TRAVAUX" · titre `clip-path` · filter bar · première rangée de cards |
| **Caméra implicite** | Conteneur Hero `scale 100%→92%` scrubbé (recul) + midground `translateZ -40px→0` |
| **Aura** | Trajet P0→P1 sur le chemin · opacity 0.13→0.08 scrubbée · pulse ponctuel +20% sur 300ms au franchissement exact (`onEnter`) — "elle éclaire le nouveau terrain avant de se calmer" |
| **Profondeur / lumière** | Voile WebGL en dissolution (bruit simplex, seuil scrubbé) — *voir code ci-dessous* |
| **Durée** | Zone scrubbée 60vh · flourish ponctuel 600ms |
| **Easing** | Scrub : `ease:none` (la fluidité vient de Lenis, pas d'une courbe) · Flourish : `--ease-luxury` |
| **Techno** | GSAP ScrollTrigger + MotionPathPlugin + ShaderMaterial Three.js custom + GSAP Flip (ponctuel) |

**Note de performance — pourquoi le FLIP n'est pas scrubbé :** recalculer un FLIP à chaque frame de scroll (potentiellement 60×/seconde sur 60vh) est le genre de décision qui fait chuter un site sous 60fps sur du matériel moyen. Le morph CTA→eyebrow se déclenche donc **une seule fois**, exactement au franchissement, et joue son tween de 600ms indépendamment de la vitesse de scroll restante. C'est un choix de robustesse, pas un compromis esthétique — l'œil ne distingue pas un FLIP scrubbé d'un FLIP déclenché pile au bon moment.

```glsl
// fragment shader — voile de transition Hero→Works
uniform float uProgress;   // 0→1, piloté par ScrollTrigger
uniform sampler2D uNoise;  // texture de bruit simplex précalculée
varying vec2 vUv;

void main() {
  float n = texture2D(uNoise, vUv * 1.4).r;
  float threshold = uProgress * 1.15 - 0.075; // marge pour un bord doux, non linéaire
  float edge = smoothstep(threshold - 0.08, threshold + 0.08, n);
  vec3 base = vec3(0.039, 0.035, 0.031); // #0A0908
  gl_FragColor = vec4(base, 1.0 - edge);
}
```

---

### 7.2 🏆 Signature — Works → About : *"La Bascule vers l'Intime — l'Aura se pose"*

| Paramètre | Décision |
|-----------|----------|
| **Déclencheur** | `ScrollTrigger(trigger:'#works', start:'bottom 70%', end:'bottom 10%', scrub:0.3)` — zone ≈ 60vh |
| **Sortants** | Dernières cards visibles (`opacity 1→0, scale 1→0.97`, scrubbé, sans stagger — continu) · filter bar (sticky release) |
| **Entrants** | Titre About (déclenché une fois à 80% de la zone, **pas** scrubbé — voir justification) · manifeste stagger |
| **Caméra implicite** | Profondeur de champ : `filter: blur()` sur la couche de grain `0px→6px`, scrubbé — effet de "point fait" (rack focus) vers l'orbe |
| **Aura → Orbe** | Décision centrale du document : **l'orbe n'est pas un nouvel élément, c'est l'Aura qui atterrit.** À l'arrivée en P2, le contrôleur bascule de mode (`auraController.setMode('orbit')`) : elle quitte la physique spring libre pour un atterrissage `spring(stiffness:120, damping:18)` de 700ms, **découplé du scroll** — il peut se terminer même si l'utilisateur a cessé de scroller. |
| **Profondeur / masque** | `clip-path: circle()` centré sur l'ancrage de l'orbe, `0%→150vmax`, scrubbé — révèle le manifeste "depuis l'orbe vers l'extérieur" |
| **Durée** | Zone 60vh scrubbée · titre flourish 900ms (une fois) · atterrissage spring 700ms (une fois, découplé) |
| **Easing** | Scrub : `none` · Titre : `--ease-luxury` · Atterrissage : spring(120,18) |
| **Techno** | GSAP ScrollTrigger + MotionPathPlugin (suite) + state machine custom (Aura) + Framer Motion spring + CSS `clip-path: circle()` |

**Pourquoi le titre n'est pas scrubbé alors que tout le reste l'est :** un titre de section qui se dévoile au rythme exact du doigt sur le trackpad perd toute intentionnalité — il devient un sous-produit du geste de l'utilisateur plutôt qu'une déclaration. Le contenu d'ambiance (cards, flou, masque) peut être scrubbé sans dommage ; le contenu de sens (un titre) a besoin d'un déclenchement franc pour garder son autorité.

**Pourquoi `clip-path: circle()` et pas `mask-image: radial-gradient()` :** support navigateur plus large sans préfixe, accélération GPU équivalente, et `clip-path` évite le repaint du `mask-image` sur certains moteurs Chromium en scroll rapide.

---

### 7.3 🏆 Signature — About → Contact : *"Le Souffle qui s'Échappe"*

| Paramètre | Décision |
|-----------|----------|
| **Déclencheur** | `ScrollTrigger(trigger:'#about', start:'bottom 65%', end:'bottom 5%', scrub:0.3)` — zone 50vh, **suivie d'un silence pur de 10vh** (aucune animation) avant que Contact démarre sa propre entrée |
| **Sortants** | Manifeste + compteurs + badges : `y:0→+12px, opacity 1→0`, scrubbé — conforme à la Loi 4 |
| **Entrants** | Gérés par l'entrée propre de Contact (§5), après le silence |
| **Caméra implicite** | Profondeur de champ inverse : flou `6px→0px` — l'image "s'ouvre" (l'exhalation) |
| **Aura** | Trajet P2→P3 · crossfade couleur Gold `#C8A96E` → Ice `#E8ECF0`, scrubbé · **le cycle de pulse change de nature ici** — voir note technique |
| **Profondeur / lumière / distorsion** | Filtre SVG `feDisplacementMap` appliqué à l'Aura seule, `scale 0→3→0` sur 1.5s, déclenché une fois au point médian du crossfade (≈50% de la zone) — un tremblement de chaleur contrôlé, signe que la lumière "se dissout" plutôt que de simplement s'éteindre |
| **Durée** | Zone scrubbée 50vh + silence 10vh + distorsion ponctuelle 1.5s |
| **Easing** | Scrub : `none` · Crossfade couleur : lié au scrub (volontairement linéaire — *"le refroidissement, c'est l'utilisateur qui le cause en scrollant, pas quelque chose qui lui arrive"*) |
| **Techno** | GSAP ScrollTrigger + MotionPathPlugin + interpolation couleur (uniform Three.js) + GSAP yoyo tween + filtre SVG `feDisplacementMap` |

**Note technique — pourquoi le pulse de l'orbe change d'implémentation ici :** dans le doc Motion Direction, le pulse de l'orbe est en CSS `@keyframes` (période fixe 3.5s). Une période CSS ne se ré-étire pas en douceur — on ne peut pas tweenwer la `animation-duration` d'un `@keyframes` sans relancer le cycle (saut visible). Pour cette transition spécifique, où le pulse doit s'allonger de 3.5s à 5s en s'éloignant, **le pulse passe en tween GSAP yoyo** (`gsap.to(aura.scale, {value:1.08, duration:2.5, ease:'sine.inOut', yoyo:true, repeat:-1})`), dont le `timeScale` peut être animé en continu. C'est une mise à niveau délibérée par rapport au document précédent, nécessaire uniquement à cet endroit — le reste du cycle de vie de l'orbe (About, idle) reste en CSS, plus léger.

---

## 8. L'Aura pendant les Transitions — Tableau de Synchronisation

| Transition | Position | Opacity | Couleur | Comportement spécifique |
|------------|----------|---------|---------|--------------------------|
| Hero → Works | P0→P1 (chemin) | 0.13→0.08 | Gold constant | Pulse +20%/300ms au franchissement |
| Works → About | P1→P2 (chemin) | 0.08→0.10 | Gold→Gold centré | Bascule de mode : spring libre → atterrissage spring(120,18) |
| About → Contact | P2→P3 (chemin) | 0.10→0.07 | Gold→Ice | Pulse CSS→GSAP yoyo · distorsion `feDisplacementMap` au point médian |

---

## 9. Le Curseur pendant les Transitions — Tableau de Synchronisation

| Transition | Comportement |
|------------|--------------|
| Hero → Works | Aucun changement d'état — le curseur reste en mode standard, la transition est une affaire de fond, pas d'interaction |
| Works → About | Si une card était survolée au moment du franchissement, le ring "VOIR" se rétracte en 200ms (`--ease-depart`) — jamais maintenu au-delà de sa section |
| About → Contact | Aucun changement — pas d'élément interactif dans la zone de transition |
| Ouverture étude de cas | Disparaît en 150ms (changement de route = nouveau contexte) |
| Retour à la grille | Réapparaît en mode standard dès le premier `pointermove` post-navigation, sans transition spéciale |

---

## 10. Tableau Maître — Référence Développeur Unique

| # | Animation | Déclencheur | Durée | Easing | Techno |
|---|-----------|-------------|-------|--------|--------|
| 1 | Hero load sequence | Mount | 0–2400ms | `--ease-luxury` | CSS/WebGL/Framer |
| 2 | Hero sortie (tagline) | Scroll `#hero` bottom 75–15% | Scrubbé | `none` | GSAP ST |
| 3 | Works apparition cards | ScrollTrigger `once` | 800ms +80ms/card | `power3.out` | GSAP ST |
| 4 | Works focus hover | `pointerenter` | 200–400ms | `--ease-pop` | Framer + RAF |
| 5 | Works focus clavier | `:focus-visible` | 200ms | `--ease-pop` | CSS |
| 6 | Ouverture étude de cas | `click` | 500ms (image) / 420ms (titre) | `--ease-luxury` / `--ease-pop` | View Transitions API |
| 7 | Changement de projet | `click` next/prev | 450ms | `--ease-smooth` | View Transitions API |
| 8 | Fermeture / retour | `click` retour ou navigation arrière | 420ms | `--ease-luxury` | View Transitions API + scroll restore |
| 9 | **Transition Hero→Works** | Scroll `#hero` bottom 75–15% | 60vh scrub + 600ms flourish | `none` + `--ease-luxury` | GSAP ST + Shader + Flip ponctuel |
| 10 | **Transition Works→About** | Scroll `#works` bottom 70–10% | 60vh scrub + 700ms atterrissage | `none` + spring(120,18) | GSAP ST + clip-path + state machine |
| 11 | **Transition About→Contact** | Scroll `#about` bottom 65–5% | 50vh scrub + 10vh silence + 1.5s distorsion | `none` (linéaire) | GSAP ST + feDisplacementMap |
| 12 | About sortie manifeste | Voir #11 | 500ms | `--ease-depart` | GSAP ST |
| 13 | Contact entrée | Après silence post-#11 | 1000ms | `--ease-luxury` | CSS + GSAP |
| 14 | Footer fermeture finale | ScrollTrigger fin de page | 600ms | `--ease-smooth` | CSS |
| 15 | Aura — chemin global | Scroll document entier | Scrub continu | `none` | MotionPathPlugin |
| 16 | Aura — couleur globale | Scroll document entier (checkpoints) | Scrub continu | `none` | GSAP timeline + uniform bridge |

---

## 11. Stack Technique Final — Décisions Sans Alternative

| Besoin | Techno retenue | Pourquoi *celle-ci et pas une autre* |
|--------|-----------------|----------------------------------------|
| Trajet continu de l'Aura | GSAP `MotionPathPlugin` | Seul outil qui anime un point le long d'un `<path>` SVG arbitraire avec un easing/scrub propre — refaire ça à la main en RAF serait plus de code pour moins de précision. |
| Morph de l'ouverture projet | View Transitions API native | C'est la seule techno qui gère le morph position+taille+image en zéro ligne de calcul de bounds. GSAP Flip reste nécessaire en repli, mais pas en cas nominal. |
| Filter Works (changement de filtre) | GSAP Flip | View Transitions est pensé pour la navigation de route, pas pour un changement de layout intra-page — Flip reste le bon outil ici, inchangé du doc précédent. |
| Masque de révélation About | CSS `clip-path: circle()` | Support large, GPU-accéléré, pas de repaint comme `mask-image` sur certains moteurs. |
| Distorsion Aura (transition finale) | Filtre SVG `feDisplacementMap` | Seule techno qui déforme un calque WebGL/CSS sans repasser par un second pass shader dédié — réutilise un mécanisme natif du navigateur. |
| Pulse orbe en transition | GSAP yoyo tween (remplace CSS `@keyframes` *à cet endroit seulement*) | Seule façon de tweenwer la période d'un cycle sans saut visible — CSS garde sa place partout où la période ne varie pas (About idle). |
| Voile Hero→Works | `ShaderMaterial` Three.js custom | Réutilise le renderer déjà chargé pour l'Aura — pas de second contexte WebGL, pas de coût d'init supplémentaire. |

---

## 12. Reduced Motion — Comportement du Système Unique

Le système entier — chemin, voile, masques, distorsions, View Transitions — est subordonné à une seule vérification, faite une fois au montage :

```typescript
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

| Si `reduced === true` | Comportement de repli |
|------------------------|------------------------|
| Chemin Aura (`MotionPathPlugin`) | Désactivé — l'Aura devient un `radial-gradient` CSS statique positionné par section (pas de trajet) |
| Voile shader Hero→Works | Désactivé — remplacé par un simple `opacity` crossfade 300ms |
| Masque `clip-path` About | Désactivé — contenu visible immédiatement, pas d'iris |
| `feDisplacementMap` | Jamais appliqué |
| View Transitions API | `document.startViewTransition` n'est jamais appelé — navigation directe via `router.push` |
| Toutes les transitions inter-sections | Réduites à un `opacity 0→1`, 300ms, `--ease-smooth` |

Aucune branche conditionnelle dispersée dans le code des composants : un seul flag lu une fois, propagé par un contexte React (`<MotionPreferenceProvider>`), qui court-circuite chaque mécanisme listé ci-dessus à la source.

---

## 13. Critères d'Acceptation — La Continuité

Spécifiques à ce document (en complément des critères déjà posés dans `portfolio-awwwards-spec.md` §9).

- [ ] En scrollant **lentement** d'une section à l'autre, aucun moment où l'Aura disparaît puis réapparaît (vérifier visuellement à 0.25× la vitesse normale)
- [ ] En remontant le scroll juste après une transition, le contenu sorti revient dans son état exact (preuve de la non-destruction des éléments — pas de ré-animation depuis zéro)
- [ ] Le FLIP/View Transition de l'ouverture projet fonctionne identiquement que la grille soit scrollée de 0px ou de 4000px (test de robustesse de la restauration de scroll, §6.5)
- [ ] Sous `prefers-reduced-motion: reduce`, le site reste navigable et compréhensible sans qu'aucun élément du §1 à §9 ne s'exécute
- [ ] Aucune transition scrubbée ne dépasse 60vh de zone (vérifier que l'utilisateur n'a jamais l'impression de "scroller dans le vide" en attendant qu'une transition se termine)
- [ ] Le budget GPU de l'Aura reste sous 2ms/frame même pendant une transition (shader + motion path + color tween simultanés) — profiler avec Chrome Performance pendant un scroll rapide sur toute la page

---

## 14. Priorisation d'Implémentation

Cette couche se construit **après** la Phase 2 du document Motion Direction (Aura WebGL + ScrollTrigger de base déjà en place) et **avant** sa Phase 3.

### Phase 2.5 — Le Système Unique *(2–3 jours, condition pour tout le reste)*

- Chemin SVG unique (`#aura-spine`) + `MotionPathPlugin`
- Timeline de couleur globale (checkpoints P0→P3)
- Pont CSS custom property → uniform Three.js

**Sans cette phase, aucune des trois transitions ci-dessous n'a de fondation.**

### Phase 3 (révisée) — Les Trois Transitions

- Voile shader Hero→Works
- Bascule de mode Aura→Orbe (Works→About) + state machine
- `feDisplacementMap` + crossfade couleur (About→Contact)
- `clip-path: circle()` reveal

### Phase 3.5 — Projets (View Transitions)

- Mise en place `viewTransitionName` dynamique + nettoyage post-trigger
- Repli GSAP Flip pour navigateurs non supportés
- Restauration de scroll `sessionStorage`

**Score estimé après cette couche complète :** la chorégraphie inter-sections et le View Transitions sur les projets sont précisément ce que le document précédent identifiait comme manquant pour viser Site of the Day plutôt que Honorable Mention seule — c'est la condition posée en §24 du doc Motion Direction ("l'Aura n'a pas encore de surprise") qui se trouve résolue ici par l'atterrissage Aura→Orbe.

---

*Document rédigé par Claude, Motion Director session — Portfolio Emmanuel · Production Edition*
*Complète : `motion-direction-portfolio-emmanuel.md` · Référence : `portfolio-awwwards-spec.md`*
