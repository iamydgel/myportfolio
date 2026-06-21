# Motion Direction — Portfolio Emmanuel
## *"Architecte de l'invisible"* — Direction cinématographique complète

> **Rôles :** Motion Director · Creative Technologist · Lead Interaction Designer · Cinematic Experience Designer  
> **Référence :** Awwwards · FWA · CSS Design Awards  
> **Stack :** Next.js 15 · React 19 · TypeScript · GSAP · Framer Motion · Three.js · Lenis

---

## 1. Vision Artistique Globale

Ce portfolio ne s'anime pas. Il **respire**.

La métaphore fondatrice : une architecture que l'on découvre dans l'obscurité, une lampe à la main. La lumière (l'Aura) précède toujours le regard. Le contenu se révèle — il ne surgit jamais. Tout ce qui arrive doit sembler avoir toujours été là, simplement invisible jusqu'à maintenant.

Le **tempo** est lent au départ, presque contemplatif. Il s'intensifie légèrement dans Works — le seul moment où l'énergie monte — puis se dissout en silence dans Contact. Comme une respiration complète : inspiration longue, apogée discret, expiration douce.

La **personnalité du mouvement** : fluide, précis, conscient de lui-même. Jamais pressé. Jamais spectaculaire pour rien. Chaque déplacement a la dignité d'un geste étudié.

---

## 2. Signature Motion — Les Trois Lois

### Loi 1 — La Gravité Dorée

Tous les éléments ont un poids. Rien ne pop, rien ne bounce. Tout descend légèrement avant de se stabiliser, comme si la gravité les attirait vers leur position finale. Courbe systématique : `cubic-bezier(.22, .9, .35, 1)` — départ lent, arrivée très douce.

### Loi 2 — L'Inertie de la Lumière

L'Aura ne suit pas le curseur. Elle est *attirée* par lui, avec résistance. Cette physique s'applique aussi aux cartes Works et au cursor dot. Il y a toujours un léger décalage entre l'intention et la réponse — comme une matière lumineuse qui a sa propre masse.

### Loi 3 — Le Silence Habité

Entre chaque animation, il y a un instant de repos. Aucune transition ne commence immédiatement après une autre. Le site respire entre ses mouvements. Ces silences de 200–400ms sont aussi importants que les animations elles-mêmes.

### Familles de Mouvement

| Famille | Comportement | Exemples |
|---------|-------------|---------|
| **Révélation** | `clip-path` vertical, bas → haut | Taglines, titres de section |
| **Émergence** | `y + opacity`, gravité dorée | Sous-titres, paragraphes |
| **Respiration** | `scale + opacity`, cycle infini | Aura, orbe About |
| **Attraction** | `lerp` spring, inertie physique | Cursor, Aura, cartes magnétiques |
| **Dissolution** | `opacity` seule, très lente | Transitions entre sections |

---

## 3. Courbe Émotionnelle

```
Émotion
│
│  Curiosité                    Désir        Confiance
│     ╭──╮           ╭────────────╮     ╭──────────╮
│     │  │           │            │     │          │
│  ───╯  ╰──────────╯            ╰─────╯          ╰────→ Temps
│
│ [Attente] [Hero] [1er scroll] [Works] [About] [Contact] [Après]
```

**Avant le chargement** — Anticipation neutre. L'utilisateur ne sait pas ce qu'il va trouver.

**Pendant le Hero (0→2.4s)** — Surprise progressive. Le fond s'éclaire imperceptiblement. La tagline arrive avec une lenteur qui force l'attention. L'utilisateur ressent : *"ce site est différent"*.

**Premier scroll** — Légère accélération du cœur. L'Aura commence à dériver. Le mouvement donne envie de continuer.

**Works** — Curiosité active. Les cartes arrivent avec une énergie légèrement plus vive. L'utilisateur veut cliquer.

**About** — Ralentissement, contemplation. L'orbe pulse. Le manifeste se révèle ligne par ligne. C'est le moment le plus intime du site.

**Contact** — Apaisement. L'Aura s'étire vers le bas. L'atmosphère est ouverte, invitante. L'utilisateur veut écrire.

**Après** — Il se souvient de la lumière. Pas du contenu — de la *sensation*.

---

## 4. Partition du Mouvement — Les Quatre Actes

### Acte I — L'Éveil (Hero)

| Paramètre | Valeur |
|-----------|--------|
| **Intention** | Installer l'univers. Faire sentir la maîtrise avant même de lire un mot. |
| **Émotion** | Surprise → Respect |
| **Rythme** | Lento. Très lent. Presque trop lent — puis on comprend que c'était juste. |
| **Énergie** | 2/10. Rien ne crie. Tout murmure. |
| **Tension** | Monte progressivement jusqu'au CTA |
| **Respiration** | Une grande inspiration de 2.4 secondes |
| **Climax** | La tagline complète à l'écran, avec l'Aura en mouvement |
| **Résolution** | Le scroll indicator pulse. Invitation silencieuse. |

### Acte II — La Démonstration (Works)

| Paramètre | Valeur |
|-----------|--------|
| **Intention** | Prouver. Montrer sans expliquer. |
| **Émotion** | Curiosité → Désir |
| **Rythme** | Andante. Un peu plus vif, toujours contrôlé. |
| **Énergie** | 5/10. Les cartes ont du caractère. |
| **Tension** | Chaque hover augmente légèrement la tension |
| **Respiration** | Entre chaque card, 80ms de silence |
| **Climax** | L'overlay d'une card au hover révèle le titre en grand |
| **Résolution** | Le filtre change. Les cards non-sélectionnées s'effacent doucement. |

### Acte III — La Confession (About)

| Paramètre | Valeur |
|-----------|--------|
| **Intention** | Humaniser. Créer une connexion. |
| **Émotion** | Contemplation → Confiance |
| **Rythme** | Largo. Le plus lent du site. |
| **Énergie** | 1/10. Presque immobile. Seulement l'orbe qui respire. |
| **Tension** | Zéro tension. C'est voulu. |
| **Respiration** | L'orbe EST la respiration. |
| **Climax** | Les compteurs qui s'incrémentent — seul moment de dynamisme |
| **Résolution** | Les badges technos arrivent un par un, paisiblement. |

### Acte IV — L'Ouverture (Contact)

| Paramètre | Valeur |
|-----------|--------|
| **Intention** | Inviter. Laisser un espace pour le visiteur. |
| **Émotion** | Sérénité → Envie d'agir |
| **Rythme** | Adagio |
| **Énergie** | 1/10. L'espace négatif est intentionnel. |
| **Tension** | Aucune. C'est un espace de repos. |
| **Respiration** | Toute la section |
| **Climax** | L'adresse mail gold qui apparaît avec un léger shimmer |
| **Résolution** | Le footer se dissout. Le site se ferme comme un livre. |

---

## 5. Timeline Complète

### Acte I — L'Éveil · Hero (0ms → 2 400ms)

| Temps | Élément | Durée | Easing | Techno | Émotion |
|-------|---------|-------|--------|--------|---------|
| `0ms` | Background `#0A0908` | immédiat | — | CSS | Noir. Silence. |
| `0–200ms` | Aura init (opacity 0) | — | — | WebGL | Anticipation |
| `200–700ms` | Aura fade-in gold | 500ms | `.4,0,.2,1` | WebGL | Lumière naît |
| `400–700ms` | Fond : warmth subtile | 300ms | `linear` | CSS | Profondeur |
| `600ms` | Label `VIBE DEVELOPER` | 600ms | `.22,.9,.35,1` | Framer | Identité posée |
| `700ms` | Tagline `clip-path` ligne 1 | 900ms | `.22,.9,.35,1` | CSS | Le mot arrive |
| `900ms` | Tagline `clip-path` ligne 2 | 900ms | `.22,.9,.35,1` | CSS | Impact total |
| `1 200ms` | Sous-titre (`y + opacity`) | 700ms | `power3.out` | GSAP | Clarté |
| `1 500ms` | CTA Ghost pill | 500ms | `.2,1,.3,1` | Framer | Invitation |
| `1 700ms` | Nav bar (`y:-100%→0`) | 400ms | `.22,.9,.35,1` | GSAP | Repères |
| `1 900ms` | Cursor dot gold init | 300ms | `ease` | RAF | Premium signal |
| `2 000ms` | Stat droite (`y + opacity`) | 600ms | `power2.out` | GSAP | Légitimité |
| `2 200ms` | Scroll indicator pulse | ∞ 2s | `ease-in-out` | CSS | Curiosité |
| `2 400ms` | Lenis activé | — | `t→1-2^(-10t)` | Lenis | Fluidité totale |

### Acte II — La Démonstration · Works (scroll 0→100vh)

| Scroll | Élément | Durée | Easing | Techno | Émotion |
|--------|---------|-------|--------|--------|---------|
| `+0px` | Titre section `clip-path` | 800ms | `.22,.9,.35,1` | GSAP ST | Annonce |
| `+80px` | Filter bar glide-in | 500ms | `.2,1,.3,1` | Framer | Contrôle |
| `+160px` | Card 1 (`y:50→0`) | 800ms | `power3.out` | GSAP ST | Premier projet |
| `+240px` | Card 2 (delay +80ms) | 800ms | `power3.out` | GSAP ST | Rythme |
| `hover` | Tilt 3D léger | 400ms | `st:200 dp:22` | Framer | Matière |
| `hover` | SVG color-grade gold | 300ms | `.2,1,.3,1` | CSS filter | Désir |
| `hover` | Overlay ↗ (`opacity`) | 250ms | `ease-out` | CSS | Invitation |
| `hover` | Cursor → ring "VOIR" | 200ms | `.2,1,.3,1` | RAF | Premium++ |
| `filter click` | FLIP cards layout | 500ms | `st:200 dp:22` | Framer | Maîtrise |

### Acte III — La Confession · About (scroll 100→180vh)

| Scroll | Élément | Durée | Easing | Techno | Émotion |
|--------|---------|-------|--------|--------|---------|
| `+0px` | Orbe parallax (lent) | ∞ scroll | `lerp ×0.15` | RAF | Contemplation |
| `+40px` | Titre "Concevoir" `clip-path` | 900ms | `.22,.9,.35,1` | GSAP ST | Ralentissement |
| `+100px` | Texte manifeste stagger | 700ms | `power2.out` | GSAP ST | Humanité |
| `+200px` | Compteurs count-up | 1 200ms | `easeOutExpo` | RAF | Légitimité |
| `+300px` | Badge stack stagger | 500ms | `power2.out` | GSAP | Précision |
| `idle` | Orbe pulse (3.5s ∞) | 3 500ms | `ease-in-out` | CSS | Vie organique |
| `idle` | Ring rotate (25s ∞) | 25 000ms | `linear` | CSS | Temps qui passe |

### Acte IV — L'Ouverture · Contact (scroll 180→240vh)

| Scroll | Élément | Durée | Easing | Techno | Émotion |
|--------|---------|-------|--------|--------|---------|
| `+0px` | Aura ice dérive bas | ∞ scroll | `lerp ×0.08` | WebGL | Dissolution |
| `+40px` | Titre "Créons" `clip-path` | 1 000ms | `.22,.9,.35,1` | CSS | Ouverture |
| `+120px` | Texte body (`y + opacity`) | 600ms | `power2.out` | GSAP | Invitation |
| `+200px` | Mail shimmer gold | ∞ 2.5s | `linear` | CSS | Désir de contact |
| `+300px` | Badge "Disponible" | 400ms | `.2,1,.3,1` | Framer | Confiance |
| `+380px` | Footer icons (stagger) | 300ms | `ease-out` | GSAP | Clôture douce |

---

## 6. Storyboard Cinématographique

### Scène 1 — Le Noir Habité *(0→400ms)*

**Objectif :** Installer le mystère avant le contenu. Le fond noir n'est pas vide — l'Aura est en train de naître, invisible encore. L'utilisateur attend sans savoir pourquoi.  
**Mouvement dominant :** Rien. C'est le silence avant la note.  
**Respiration :** Une suspension totale.  
**Transition :** L'Aura commence à naître.

### Scène 2 — La Lumière Précède *(400→700ms)*

**Objectif :** La première chose visible n'est pas du texte — c'est de la lumière.  
**Élément focal :** L'Aura gold en haut-droite.  
**Mouvement dominant :** `opacity 0→1` sur l'Aura. Rien d'autre.  
**Respiration :** L'espace s'ouvre.  
**Transition :** La lumière devient le fond sur lequel le contenu peut arriver.

### Scène 3 — Le Nom, Discret *(600→1 100ms)*

**Objectif :** Annoncer l'identité avant la tagline.  
**Élément focal :** `EMMANUEL · VIBE DEVELOPER` uppercase 12px gold.  
**Mouvement dominant :** `opacity 0→1` + `y: 8px→0`.  
**Note :** Sa modestie est calculée. Ce n'est pas le héros — c'est l'annonce du héros.  
**Transition :** Le regard est positionné pour accueillir la tagline.

### Scène 4 — La Révélation *(700→1 600ms)*

**Objectif :** Le climax typographique du site.  
**Élément focal :** `Architecte de l'invisible.` en deux vagues.  
**Mouvement dominant :** `clip-path: inset(100%→0)` ligne par ligne, décalé de 200ms.  
**Note :** Le `.` final arrive seul — une ponctuation comme une respiration.  
**Respiration :** 200ms de silence entre les deux lignes.  
**Transition :** La tagline est là. Complète. Immobile. Le sous-titre peut maintenant arriver.

### Scène 5 — L'Invitation *(1 200→2 000ms)*

**Objectif :** Donner les outils de navigation sans les imposer.  
**Éléments focaux :** Sous-titre → CTA → Nav (séquence).  
**Mouvement dominant :** Chaque élément avec son propre poids, son propre timing.  
**Note :** La nav glisse depuis le haut comme si elle prenait sa place naturelle.  
**Transition :** Le CTA est là, disponible. Pas urgent.

### Scène 6 — L'Organisme Vivant *(2 000ms→∞)*

**Objectif :** Faire comprendre que le site est vivant.  
**Éléments focaux :** Aura qui suit le curseur + scroll indicator qui pulse.  
**Mouvement dominant :** Physique spring sur l'Aura. Lerp RAF.  
**Note :** Le visiteur comprend qu'il n'est plus sur une page — il est dans un espace.

### Scène 7 — La Façade *(scroll Works)*

**Objectif :** Montrer la maîtrise technique sans l'expliquer.  
**Mouvement dominant :** Cards qui arrivent staggerées, comme une façade architecturale qui se construit.  
**Élément focal :** La grille qui prend forme.  
**Respiration :** 80ms entre chaque card.  
**Transition :** Le hover crée un micro-monde privé dans chaque carte.

### Scène 8 — Le Murmure *(scroll About)*

**Objectif :** Humaniser. Créer un moment intime.  
**Mouvement dominant :** L'orbe pulse. Le texte arrive ligne par ligne.  
**Élément focal :** L'orbe lumineux avec son ring pointillé.  
**Note :** Les compteurs s'incrémentent — seul moment de dynamisme dans cet acte.  
**Respiration :** Toute la section respire lentement.

### Scène 9 — L'Espace Ouvert *(scroll Contact)*

**Objectif :** Inviter sans presser.  
**Mouvement dominant :** Animations moins denses. Le site respire plus lentement.  
**Élément focal :** Le mail gold qui shimmer doucement.  
**Note :** Comme une invitation laissée sur une table.  
**Transition :** Le footer se dissout. Le site se ferme comme un livre.

---

## 7. Hero — Description Technique Détaillée

### L'Arrivée du Fond

`#0A0908` CSS immédiat. Aucune transition. Le noir doit être instantané pour éviter le flash blanc du navigateur.

### L'Aura Hero

Deux instances WebGL superposées :

- **Gold** : `rgba(200,169,110,0.13)` — positionné haut-droite à `translate(-10%, -15%)`
- **Ice** : `rgba(90,100,200,0.07)` — positionné bas-gauche, beaucoup plus faible

`mix-blend-mode: screen` sur les deux. L'Aura gold est la "source de chaleur" narrative du site.

### Lumière et Profondeur

La différence de `filter: blur()` entre les deux Auras crée une perception de profondeur. Le gold (80px) semble plus proche que l'ice (90px). L'œil perçoit une couche sans qu'aucune couche réelle n'existe.

### Mouvement de Caméra Implicite

En activant un très léger parallax entre le texte (`z: 0`) et l'Aura (`z: -1`) via `transform: translateZ`, on crée une illusion de plan séquence. Quand l'utilisateur bouge le curseur, l'Aura se décale légèrement différemment du texte — comme si les couches avaient une profondeur réelle.

### Révélation du Texte

Toutes les lignes utilisent `overflow: hidden` sur leur conteneur + `clip-path: inset(100% 0 0 0) → inset(0)`. L'animation part du bas du texte, remonte — comme si les lettres *montaient en surface* plutôt que d'apparaître.

### Respiration du Hero

Une fois toutes les animations terminées, l'Aura entre en mode idle : très légère oscillation sinusoïdale (amplitude 15px, période 6s). Imperceptible consciemment, ressentie inconsciemment.

### Le Premier Scroll

Lenis transforme le scroll natif brutal en quelque chose d'organique. Les premières 100px de scroll font légèrement translater l'Aura hero vers le bas (parallax rate 0.3) — elle "reste" dans le Hero visuellement tandis que le contenu avance.

---

## 8. Scroll Storytelling

### La Loi du Tempo Variable

Le scroll ne doit jamais avoir le même "poids" d'une section à l'autre.

**Hero → Works :** Accélération légère. Le visiteur a attendu — maintenant le contenu arrive avec plus d'énergie. ScrollTrigger `start: "top 85%"` — les cards entrent dans le champ tôt.

**Works → About :** Décélération marquée. ScrollTrigger `start: "top 70%"` — les animations démarrent tard. Cela force l'utilisateur à ralentir pour "gagner" le contenu.

**About → Contact :** Silence. 40–60px de vide intentionnel sans aucune animation entre les deux sections.

### La Surprise Rythmique

À mi-chemin de la grille Works, la seconde ligne de cards arrive avec un stagger inversé — de droite à gauche au lieu de gauche à droite. Imperceptible intentionnellement, ressenti comme une "variation rythmique".

### Le Pinch de l'Orbe

Quand le visiteur scroll vers l'About, l'Aura dérive vers le centre de la page (au lieu de rester en haut-droite) — comme attirée vers l'orbe. Cet effet est obtenu en interpolant la position cible selon le `scrollProgress` via GSAP ScrollTrigger.

---

## 9. Chorégraphie Section par Section

### 01 — Hero

| Phase | Comportement | Technologie |
|-------|-------------|-------------|
| **Entrée** | Séquence 0→2.4s, Aura précède le texte. `clip-path` staggered. | CSS + WebGL |
| **Vie** | Aura idle oscillation ±15px / 6s. Cursor magnetism actif. | RAF spring |
| **Sortie** | Aura se décale (parallax 0.3) au scroll | Lenis + ScrollTrigger |
| **Reduced Motion** | `opacity` fade uniquement, aucune aura, tagline statique | `@media prefers-reduced-motion` |

### 02 — Works

| Phase | Comportement | Technologie |
|-------|-------------|-------------|
| **Entrée** | Cards `y:50→0` stagger +80ms/card. Titre clip depuis le bas. | GSAP ScrollTrigger `once` |
| **Hover card** | `scale(1.02)` + tilt 3D ±6° + SVG color-grade gold + overlay ↗ | Framer `rotateX/Y` |
| **Filter** | FLIP layout animation | Framer `layout` prop |
| **Reduced Motion** | Cards apparaissent immédiatement, no stagger, no tilt | `@media prefers-reduced-motion` |

### 03 — About

| Phase | Comportement | Technologie |
|-------|-------------|-------------|
| **Entrée** | Orbe déjà en place (pas d'animation d'entrée). Texte ligne par ligne stagger 80ms. | GSAP `power2.out` |
| **Vie** | `orbePulse` 3.5s `ease-in-out` infinite. Ring rotate 25s `linear`. Parallax ×0.15. | CSS `@keyframes` + RAF |
| **Compteurs** | Count-up `easeOutExpo` 1.2s | RAF custom |
| **Reduced Motion** | Valeurs finales directes, no pulse, no rotate | `@media prefers-reduced-motion` |

### 04 — Contact

| Phase | Comportement | Technologie |
|-------|-------------|-------------|
| **Entrée** | Titre clip lent (1s). Body fade. Mail shimmer après 600ms delay. | CSS + GSAP |
| **Atmosphère** | Aura ice centrée, opacity 0.07. Badge disponibilité pop spring. | WebGL + Framer spring |
| **Hover mail** | Underline `scaleX 0→1` + cursor → ring gold | CSS `transform-origin: left` |
| **Reduced Motion** | Pas d'animation mail, shimmer désactivé | `@media prefers-reduced-motion` |

---

## 10. Animation des Projets (Works)

### Arrivée des Cartes

Stagger de bas en haut, 80ms entre chaque carte, `y:50→0 + opacity`. À mi-grille, le stagger s'inverse (droite vers gauche) — variation rythmique imperceptible mais ressentie.

### Profondeur (Tilt 3D)

```
perspective: 800px
rotateX: ±4° selon Y du curseur dans la card
rotateY: ±6° selon X du curseur dans la card
transition sortie : spring stiffness:200 damping:22
```

### Hover — 5 systèmes coordonnés en <400ms

1. Card : `scale(1.02)` + tilt 3D
2. SVG preview : color-grade gold (`filter: sepia + hue-rotate + saturate`)
3. Overlay : `opacity 0→1` fond `rgba(0,0,0,0.4)` + flèche ↗
4. Cursor : transition vers ring "VOIR" 56px
5. Aura : légère dérive vers la card + hue-shift 15°

### FLIP Filter

```
Cartes non-sélectionnées : opacity 1→0.3 + scale 1→0.96 (300ms)
Cartes sélectionnées : repositionnement FLIP automatique
Nouvelles cartes : y:20→0 + opacity (entrée)
Total : ≤500ms
```

### Ouverture Case Study (future)

La card cliquée se dilate en FLIP depuis sa position dans la grille vers plein écran. L'Aura suit, s'intensifiant. Durée 500ms `spring stiffness:120 damping:20`.

---

## 11. L'Aura — Un Personnage

### Personnalité

L'Aura n'est pas un effet — c'est un personnage. Elle a une humeur, une résistance, une mémoire de l'inactivité. Le visiteur ne doit jamais la percevoir comme une animation CSS. Il doit avoir l'impression qu'elle *réagit*.

### États Comportementaux

| État | Comportement |
|------|-------------|
| **Idle** | Oscillation douce sin/cos, amplitude 20px, période 8s. Elle vit même quand personne ne bouge. |
| **Pointer actif** | Suit le curseur avec friction 0.08, attraction 0.06, masse 1.0. Elle résiste, puis cède. |
| **Hover sur CTA** | Attirée vers le bouton (attraction ×2 pendant 600ms). Scale ×1.15. Saturation +20%. |
| **Scroll actif** | Parallax rate 0.3 — reste derrière le contenu. En approchant l'About, dérive vers l'orbe. |
| **Inactivité >4s** | Revient au centre, opacity +15%. Oscillation ×1.5. Elle cherche l'utilisateur. |
| **Hover card Work** | Dérive légèrement vers la card. Shift de hue de 15° vers la card survolée. |
| **Inactivité >30s** | Opacity -15% sur 2s. Comme si elle se reposait. Au retour : "réveil" opacity +20% pendant 300ms. |

### Paramètres Physiques

```typescript
const FRICTION   = 0.08;   // Inertie — plus petit = plus luxueux
const ATTRACTION = 0.06;   // Force d'attraction vers le pointer
const MASS       = 1.0;    // Résistance au changement de direction
const IDLE_AMP   = 20;     // Amplitude oscillation idle (px)
const IDLE_PERIOD = 8000;  // Période oscillation idle (ms)
```

---

## 12. Mise en Scène de la Caméra

Aucune caméra réelle n'existe. Trois couches de parallax créent l'illusion.

| Couche | Z | Vitesse parallax |
|--------|---|-----------------|
| Aura (background) | -2 | scroll × 0.10 |
| Fond texturé subtil | -1 | scroll × 0.05 |
| Contenu texte | 0 | scroll × 1.00 |

**Pour le Hero :** Un très léger `perspective: 1000px` sur le container avec `rotateX(0.5deg)` au chargement — presque imperceptible, mais il crée un "sol" virtuel sous le texte.

**Travelling implicite :** En faisant légèrement grossir la taille de police du titre (100% → 101%) lors du load initial sur 600ms, on simule un léger zoom avant. Imperceptible, mais la tagline semble "s'approcher".

---

## 13. Direction de la Lumière

### Progression Narrative de la Lumière

| Section | Température | Position | Signification |
|---------|------------|----------|---------------|
| **Hero** | Chaude (gold #C8A96E) | Haut-droite | Autorité, confiance |
| **Works** | Neutre | Suit le curseur | Réactivité, maîtrise |
| **About** | Chaude centrée | Centre gauche (orbe) | Intimité, humanité |
| **Contact** | Froide (ice #E8ECF0) | Centrée basse | Ouverture, espace |

La *température* de la lumière raconte la progression émotionnelle du site. Le visiteur ressent ce changement sans pouvoir l'expliquer.

### Halos et Variations

Chaque section possède sa propre **densité lumineuse** :
- Hero : Aura à pleine puissance (`opacity: 0.13`)
- Works : Aura réduite pour ne pas concurrencer les cards (`opacity: 0.08`)
- About : Orbe internal + Aura externe réduite (`opacity: 0.06`)
- Contact : Aura ice très douce (`opacity: 0.07`)

---

## 14. Respiration du Site

Le site ne respire pas de façon constante. Il a des **zones de tension** et des **zones de relâchement**.

```
Tension
│        ████
│     ██ ████ █
│  ██ ██ ████ █ ██ █
│──────────────────────→
   Hero Works About Contact
   [2]  [5]   [1]   [2]     /10
```

**Règle du silence entre actes :** 40–60px de vide sans aucune animation déclenchée entre la fin de Works et le début de About. Cet espace est intentionnel — il force la transition de rythme.

**Règle des deux animations simultanées :** Jamais plus de deux animations perçues en même temps. L'Aura + une animation de texte = limite acceptable. L'Aura + texte + cards = surcharge cognitive. Le stagger des cards respecte cette règle : une seule card est vraiment "en mouvement" à tout instant.

---

## 15. Gestion de l'Attention

### Vecteurs d'Attention

Chaque animation a une direction intentionnelle.

| Animation | Vecteur | Pourquoi |
|-----------|---------|----------|
| Clip-path bas→haut | Vers le texte | Attirer vers le contenu |
| Overlay hover ↗ | Vers la flèche et le titre | Invitation à cliquer |
| Aura idle oscillation | Vers le vide autour d'elle | Créer de la respiration |
| Orbe pulse About | Vers lui-même | Ancrer le regard |
| Mail shimmer | Vers l'adresse | Invitation à l'action |

### Ce qui ne distrait jamais

- L'Aura idle est trop lente pour capturer l'attention consciemment
- L'orbe rotation (25s) est imperceptible en temps réel
- Les micro-déformations de cards restent sous 1.005 de scale
- Le shimmer du mail est périphérique, jamais central

---

## 16. Micro-Interactions

### Navigation

Active state — underline `scaleX 0→1` depuis la gauche, 300ms `ease-pop`. Au hover : `opacity 0.6→1` sur le texte. La couleur ne change pas — seulement la présence.

### Boutons

Toute la surface est magnétique sur desktop — le bouton est attiré du curseur de maximum 8px (lerp 0.2). Séquence hover : remplissage gold 220ms `ease-pop`. Click : `scale 0.96` 80ms puis retour spring.

### Cards Works

```
Hover enter :
  card     → scale(1.02) + rotateX(±4°) + rotateY(±6°)
  SVG      → filter: sepia(.4) hue-rotate(340deg) saturate(1.5)
  overlay  → opacity 0→1 (250ms ease-out)
  cursor   → ring 56px + texte "VOIR"

Hover exit :
  card     → spring stiffness:200 damping:22 (légèrement élastique)
  SVG      → filter none (300ms)
  overlay  → opacity 1→0 (200ms)
  cursor   → dot 8px (200ms)
```

### Mail Contact

```css
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}

.mail-link::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(200, 169, 110, 0.4),
    transparent
  );
  animation: shimmer 2.5s linear infinite;
}
```

### Icônes Réseaux

Hover : `y: 0→-3px` spring 160ms + `rotate: 0→-5deg` simultané. Retour spring fluide.

### Focus Keyboard

```css
:focus-visible {
  outline: 2px solid rgba(200, 169, 110, 0.8);
  outline-offset: 3px;
  border-radius: 4px;
}
```

Jamais caché. Toujours visible. `focus-visible` pour ne pas l'afficher au click souris.

---

## 17. Grandes Transitions

### Hero → Works (scroll)

La nav fixe gagne un `backdrop-filter: blur(12px)` et une bordure bottom visible seulement après 80px de scroll. Transition 400ms ease. Signal que le Hero est "derrière" nous.

```typescript
// GSAP ScrollTrigger nav behavior
ScrollTrigger.create({
  start: 'top -80px',
  onEnter: () => nav.classList.add('scrolled'),
  onLeaveBack: () => nav.classList.remove('scrolled'),
});
```

### Ouverture Case Study (FLIP)

```
1. Click sur card → GSAP capture bounds (position dans grille)
2. Card se scale vers plein écran via FLIP
3. Content du case study fade-in par-dessus (opacity, 300ms delay)
4. Aura s'intensifie (+40% opacity, 600ms)
5. Durée totale : 500ms spring stiffness:120 damping:20
```

### Fermeture Case Study

La carte reprend sa position d'origine. L'Aura revient à son état Works. `spring stiffness:140 damping:22` — légèrement plus rapide que l'ouverture (sensation de "retour").

### Filter Works (FLIP automatique)

```
300ms : cartes non-sélectionnées opacity→0.3 + scale→0.96
400ms : cartes sélectionnées repositionnement FLIP
500ms : nouvelles cartes entrée y:20→0 + opacity
Total : ≤500ms — jamais plus
```

---

## 18. Moments Invisibles

Ces détails ne seront jamais vus. Ils seront **ressentis**.

### La Nav qui s'Alourdit

La navbar gagne imperceptiblement `letter-spacing: 0.5%` supplémentaire quand la page n'est pas au sommet. Personne ne le verra. L'espace général semble plus dense — signal subconscient que "nous sommes descendus".

### L'Aura qui Respire Seule

Même quand le curseur ne bouge pas pendant 8+ secondes, l'Aura a une variation d'opacité de ±3% sur un cycle de 12s. Elle n'est jamais complètement immobile.

```typescript
// Variation idle imperceptible
const idleOpacity = baseOpacity + Math.sin(Date.now() / 12000) * 0.03;
```

### Les Cards qui s'Ancrent

Quand une card Works sort du hover, son retour à `scale: 1` a un très léger overshoot de `scale: 1.005` pendant 80ms. La card semble "trouver sa place" plutôt que de simplement "redevenir normale".

### Le Texte qui a du Poids

Le `line-height` des paragraphes varie imperceptiblement de `1.60` (haut de section) à `1.65` (bas de section) via CSS custom properties et `@scroll-timeline`. La lecture semble "s'alourdir" — sensation de densité croissante.

### L'Aura qui Reconnaît l'Inactivité

```
30s sans interaction → Aura opacity -15% sur 2s (elle "dort")
Premier mouvement   → Opacity +20% sur 300ms (elle "se réveille")
Puis                → Retour à la normale sur 600ms
```

---

## 19. Cinq Moments Signature

### Signature 1 — "La Naissance de la Lumière" *(0→700ms)*

L'obscurité totale. Puis l'Aura gold apparaît progressivement dans le coin supérieur droit, comme une éclipse inverse. Le texte n'est pas encore là. Juste la lumière. Ce moment de 300ms où il n'y a que de la lumière sans texte est le plus différenciant du site.

> **Format :** GIF 3s · Parfait pour Dribbble/Behance

### Signature 2 — "La Tagline qui Monte" *(700→1 600ms)*

Le `clip-path` reveal de `Architecte de l'invisible.` en deux vagues. La police Cormorant en 96px sur fond noir, avec l'Aura derrière, en slow motion. Le `.` final arrive seul. C'est la signature typographique absolue.

> **Format :** Vidéo 4s silencieuse · Candidat à l'animation Awwwards

### Signature 3 — "Le Hover Magnétique" *(Works, any time)*

Le curseur s'approche d'une card. La card s'incline en 3D vers lui. L'Aura dérive légèrement dans la même direction. L'overlay gold s'allume. Le curseur change de forme. Cinq systèmes coordonnés en moins de 400ms, invisiblement.

> **Format :** Screen recording 2s · Signal le plus fort de la sophistication technique

### Signature 4 — "L'Orbe qui Respire" *(About, idle)*

L'orbe lumineux qui pulse lentement, le ring pointillé qui tourne imperceptiblement, le texte manifeste immobile autour de tout ça. C'est le moment le plus contemplatif. Une image fixe de cette section est déjà une œuvre.

> **Format :** Image statique pour press kit · Parfait pour les soumissions Awwwards

### Signature 5 — "Le FLIP des Projets" *(Works, filter click)*

Le filtre change. Les cards qui ne correspondent pas se floutent et rétrécissent. Les autres se repositionnent en FLIP — comme des personnages qui trouvent leur place sur une scène. En 500ms. Avec l'Aura qui accompagne le mouvement.

> **Format :** GIF 2s en boucle · Candidat FWA Interaction

---

## 20. Motion Grammar — Tableau de Référence Complet

| Élément | Comportement | Famille | Vitesse | Jamais |
|---------|-------------|---------|---------|--------|
| Titres `h1`, `h2` | `clip-path` bas→haut | Révélation | Lento 800–900ms | Pas de bounce |
| Body text | `y + opacity` | Émergence | Andante 600–700ms | Pas de scale |
| Cards | `y + opacity` + stagger | Émergence | Andante 800ms | Pas de rotation |
| Aura | Spring physics | Attraction | ∞ variable | Pas de transition CSS |
| Orbe About | `scale + opacity` | Respiration | Largo 3.5s | Pas de translate |
| Badges / pills | Scale pop | Révélation | Allegro 300ms | Pas de flip |
| Boutons | Fill + magnetic | Micro | Presto 200ms | Pas de bounce >1.02 |
| Cursor ring | Lerp lag | Attraction | ∞ 80ms | Pas de CSS transition |
| Compteurs | Count-up RAF | Émergence | Andante 1.2s | Pas de décimal affiché |
| Icônes réseaux | `y + rotate` spring | Micro | Allegro 160ms | Pas de scale |
| Nav underline | `scaleX` | Micro | Allegro 300ms | Pas d'opacity |
| Footer | `opacity` seule | Dissolution | Lento 600ms | Pas de translate |

**Règle universelle :** Aucune animation dans ce portfolio ne dépasse un overshoot de `scale: 1.03`. La sobriété est la signature.

---

## 21. Sound Design

**Recommandation : ne pas implémenter en v1.** L'absence de son est un choix premium en soi.

Si ajouté ultérieurement, un seul son : un très léger `tick` cristallin (220Hz, 40ms, gain 0.02) au clic du CTA. Format `.mp3` 2kb. **Désactivé par défaut.** Toggle dans la nav avec icône volume. Jamais autoplay.

```typescript
// Opt-in uniquement
const ctx = new AudioContext();
const osc = ctx.createOscillator();
osc.frequency.value = 220;
const gain = ctx.createGain();
gain.gain.value = 0.02;
gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.04);
osc.connect(gain).connect(ctx.destination);
osc.start(); osc.stop(ctx.currentTime + 0.04);
```

---

## 22. Faisabilité Technique — Matrice de Décision

| Animation | Technologie | Justification |
|-----------|-------------|---------------|
| Aura background | Three.js `ShaderMaterial` | GPU additive blend. Impossible en CSS pur à ce niveau de qualité. |
| Aura pointer physics | RAF TypeScript custom | GSAP trop lourd pour du per-frame. Lerp custom = ~2kb. |
| Clip-path reveals | CSS `@keyframes` | Aucun JS nécessaire. `clip-path` est GPU-accelerated. |
| Scroll orchestration | GSAP ScrollTrigger | Standard industrie. Lenis sync natif intégré. |
| Smooth scroll | Lenis | Plus léger que Locomotive. API plus propre. Compatible React. |
| Spring sur cards | Framer Motion | `layout` prop gère FLIP automatiquement. API spring intuitif. |
| Cursor custom | RAF TypeScript | Composant React léger + lerp double. Aucune dépendance externe. |
| Count-up | RAF TypeScript custom | `easeOutExpo` en 10 lignes. Aucune dépendance. |
| Tilt 3D cards | Framer `whileHover` | `rotateX/Y` natif. GPU `transform`. Pas de lib externe. |
| Orbe pulse/rotate | CSS `@keyframes` | GPU `transform`. Aucun JS. `prefers-reduced-motion` natif. |
| FLIP filter | Framer `layout` | `AnimatePresence` + `layout` prop = FLIP automatique sans calcul. |
| Mail shimmer | CSS `@keyframes` | Pure CSS. `background` + `transform`. Zéro JS. |
| Nav behavior | GSAP ScrollTrigger | `onEnter/onLeaveBack` pour class toggle. 5 lignes. |

### Budget Technique

```
Lenis         ~10kb gzip
GSAP Core     ~25kb gzip
ScrollTrigger ~15kb gzip
Framer Motion ~40kb gzip
Three.js Aura ~80kb gzip (chunk séparé, lazy load)
Custom RAF    ~2kb
─────────────────────
Total         ~172kb gzip (Three.js chargé après LCP)
```

---

## 23. Priorisation

### Phase 1 — Indispensables *(2 jours)*

Ces animations doivent exister avant toute soumission ou présentation.

- Aura CSS fallback (`radial-gradient`) dans le Hero
- Tagline `clip-path` reveal (2 lignes + delay)
- Cursor dot gold + lerp double (dot + ring)
- CTA Ghost pill avec hover fill
- Orbe `orbePulse` 3.5s + ring `orbeRotate` 25s

**Score estimé après Phase 1 :** 7.5/10 — "Bon portfolio" devient "Portfolio remarquable"

### Phase 2 — Premium *(3–4 jours)*

- Aura WebGL Three.js (remplace le CSS fallback)
- Aura pointer physics RAF (friction/mass/attraction)
- GSAP ScrollTrigger sur toutes les sections
- Cards tilt 3D (`Framer Motion rotateX/Y`)
- SVG preview animés dans les cards Works
- Count-up compteurs (`easeOutExpo` RAF)
- FLIP filter Works (`Framer layout`)

**Score estimé après Phase 2 :** 8.5/10 — Candidat "Honorable Mention"

### Phase 3 — Signature *(1 semaine)*

- Aura behavior states (idle/hover-CTA/scroll-drift/inactivité)
- Case study FLIP fullscreen (ouverture/fermeture)
- Mail shimmer CSS + cursor states complets
- Moments invisibles (nav weight, card overshoot, line-height drift)
- Aura hue-shift sur hover cards Works

**Score estimé après Phase 3 :** 9/10 — Candidat "Site of the Day"

### Phase 4 — Experimental *(si temps disponible)*

- Aura inactivité "réveil" (sleep/wake behavior)
- Son cristallin opt-in au CTA
- Parallax caméra implicite (`perspective + translateZ`)
- Curseur mode "VOIR" avec texte orbital rotatif
- `@scroll-timeline` pour line-height drift natif CSS

---

## 24. Auto-Évaluation — Jury Awwwards

### Scorecard

| Critère | Note /100 | Commentaire |
|---------|-----------|-------------|
| **Design** | 87 | Direction artistique solide. Manque encore des assets visuels réels pour les projets. |
| **Motion** | 91 | Orchestration cinématographique cohérente. Signature motion identifiable sur l'ensemble. |
| **UX** | 88 | Parcours clair, hiérarchie respectée. `prefers-reduced-motion` traité sérieusement. |
| **Creativity** | 85 | Concept "Architecte de l'invisible" bien traduit. L'Aura comme personnage est original. |
| **Storytelling** | 90 | Courbe émotionnelle en 4 actes. Chaque section a son intention narrative propre. |
| **Performance** | 83 | Budget théorique solide. À valider avec Lighthouse post-implémentation. |
| **Accessibility** | 86 | WCAG AA traité. Cursor custom avec fallback. Focus ring maintenu et visible. |
| **Innovation** | 84 | Pas révolutionnaire — mais niveau d'exécution supérieur à 95% des portfolios dev. |

### Ce qui peut prétendre au Developer Award

L'Aura WebGL avec physique spring custom, le FLIP des cards avec `Framer Motion layout`, le cursor à états multiples coordonné avec l'Aura. Ce sont des preuves de maîtrise technique front-end que le jury Developer Award reconnaît.

### Ce qui peut prétendre à une Honorable Mention

La cohérence de la direction artistique sur 4 sections + la signature motion identifiable + le concept "Architecte de l'invisible" bien exécuté sur l'ensemble du parcours.

### Ce qui peut prétendre au Site of the Day

Le moment Signature 2 (tagline reveal) + l'Aura comme personnage avec ses états comportementaux + l'About comme œuvre contemplative. **Condition :** les assets visuels Works doivent être réellement soignés.

### Ce qui empêche encore le niveau d'exception

1. **L'absence d'assets réels pour Works.** Sans images/vidéos de projets réels, les cards restent conceptuelles. C'est le blocage n°1.
2. **Pas de case study.** Les meilleurs portfolios Awwwards ont des pages de projet qui prolongent l'expérience avec la même qualité.
3. **L'Aura n'a pas encore de "surprise".** Un comportement inattendu qui marque les esprits — ex: l'Aura qui réagit à la position de la souris pour révéler un texte caché en `mix-blend-mode: difference`.

---

## Feuille de Route — Trois Étapes vers les Awards

### Quick Wins *(J1–J2)*

Aura CSS, `clip-path` hero, cursor gold, CTA ghost, orbe pulse.

**Résultat :** Le site passe de 6/10 à 8/10 visuellement. Sans toucher à l'architecture existante.

### Polish Premium *(J3–J7)*

Aura WebGL, ScrollTrigger orchestration complète, SVG previews animés, tilt 3D, FLIP filter, count-up, Lenis + GSAP sync.

**Résultat :** Le site atteint le niveau "Honorable Mention potentielle". Il peut être soumis.

### Signature Awards *(S2)*

Assets réels pour Works (photos/mockups soignés), case study page avec FLIP fullscreen, Aura états comportementaux complets, moments invisibles, Lighthouse >90 toutes catégories, optimisation bundle Three.js.

**Résultat :** Soumission Awwwards SOTD + Developer Award. Là, on soumet.

---

*Document rédigé par Claude, Motion Director session — Portfolio Emmanuel · Awwwards Edition*  
*Référence spec : `portfolio-awwwards-spec.md`*
