"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function Aura() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Détection de reduced-motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      if (fallbackRef.current) fallbackRef.current.style.opacity = "0";
      return;
    }

    // 2. Détection de WebGL et saveData
    const isWebGLSupported = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
      } catch {
        return false;
      }
    };

    const saveData = (navigator as any).connection?.saveData ?? false;
    const useWebGL = isWebGLSupported() && !saveData;

    // Dimensions
    const AURA_SIZE = 520;
    const AURA_HALF = AURA_SIZE / 2;

    // Physique
    let ax = typeof window !== "undefined" ? window.innerWidth / 2 - AURA_HALF : 0;
    let ay = typeof window !== "undefined" ? window.innerHeight / 2 - AURA_HALF : 0;
    let vx = 0;
    let vy = 0;
    let scale = 1.0;
    let targetScale = 1.0;
    const MASS = 1.0;

    let mouseX = ax;
    let mouseY = ay;
    let lastMoveTime = Date.now();
    let angle = 0;

    // Trackers pour Works
    let hoveredCardCenter = { x: 0, y: 0 };
    let isCardHovered = false;

    // Mettre à jour la position du pointeur
    const updateTarget = (clientX: number, clientY: number) => {
      mouseX = clientX;
      mouseY = clientY;
      lastMoveTime = Date.now();
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateTarget(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Gestion du hover sur les éléments interactifs et les cartes Works
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = !!(
        target.closest("button") ||
        target.closest("a") ||
        (target.classList && target.classList.contains("interactive"))
      );
      targetScale = isInteractive ? 1.25 : 1.0;

      const card = target.closest(".work-card") as HTMLElement;
      if (card) {
        const cardRect = card.getBoundingClientRect();
        hoveredCardCenter.x = cardRect.left + cardRect.width / 2;
        hoveredCardCenter.y = cardRect.top + cardRect.height / 2;
        isCardHovered = true;
      } else {
        isCardHovered = false;
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("mouseover", handleMouseOver);

    // Initialisation WebGL
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let mesh: THREE.Mesh | null = null;

    if (useWebGL && containerRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      const isMobile = width < 768;
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.zIndex = "0";
      containerRef.current.appendChild(renderer.domElement);

      const uniforms = {
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0.0 },
        uScale: { value: 1.0 },
        uGlow: { value: 0.13 },
        uColorMix: { value: 0.0 },
      };

      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec2 uMouse;
          uniform float uTime;
          uniform float uScale;
          uniform float uGlow;
          uniform float uColorMix;
          varying vec2 vUv;

          void main() {
            vec2 d = vUv - uMouse;
            float r = length(d) / (0.26 * uScale);
            float glow = exp(-r * r * 3.5) * uGlow;
            
            vec3 warm = vec3(0.78, 0.66, 0.43);   // Lux Gold
            vec3 cool = vec3(0.35, 0.39, 0.78);   // Ice Blue
            
            vec3 baseColor = mix(warm, cool, uColorMix);
            vec3 col = mix(baseColor, cool, smoothstep(0.0, 0.8, r));
            
            gl_FragColor = vec4(col * glow, glow);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        mesh: null,
      } as any);

      const geometry = new THREE.PlaneGeometry(2, 2);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const handleResize = () => {
        if (!renderer) return;
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
    }

    // 3. Configuration GSAP (MotionPath & Pont variables CSS)
    const auraTarget = document.getElementById("aura-target-node");
    const auraBridge = document.getElementById("aura-bridge");

    let pulseTween: gsap.core.Tween | null = null;
    let gsapCtx: any = null;

    if (auraTarget && auraBridge) {
      pulseTween = gsap.to(auraBridge, {
        "--pulse-scale": 1.08,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
      });

      gsapCtx = gsap.context(() => {
        // Animation de la cible sur le chemin SVG spine
        gsap.to(auraTarget, {
          motionPath: {
            path: "#aura-spine",
            align: "#aura-spine",
            alignOrigin: [0.5, 0.5],
          },
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });

        // Timeline de teinte et intensité selon les checkpoints du scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });

        tl.to(auraBridge, { "--hue": 38, "--op": 0.13 }, 0)
          .to(auraBridge, { "--hue": 38, "--op": 0.08 }, 0.25)
          .to(auraBridge, { "--hue": 32, "--op": 0.10 }, 0.55)
          .to(auraBridge, { "--hue": 205, "--op": 0.07 }, 0.85);

        // Déclencher le pulse dans la section About
        ScrollTrigger.create({
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          onEnter: () => pulseTween?.play(),
          onEnterBack: () => pulseTween?.play(),
          onLeave: () => pulseTween?.pause(),
          onLeaveBack: () => pulseTween?.pause(),
        });

        // Déclencher la distorsion feDisplacementMap au milieu de la transition About -> Contact
        ScrollTrigger.create({
          trigger: "#about",
          start: "bottom 35%",
          onEnter: () => {
            gsap.fromTo("#displacement-map", {
              attr: { scale: 0 }
            }, {
              attr: { scale: 30 },
              duration: 0.75,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
            });
          },
          onEnterBack: () => {
            gsap.fromTo("#displacement-map", {
              attr: { scale: 0 }
            }, {
              attr: { scale: 30 },
              duration: 0.75,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
            });
          }
        });
      });
    }

    // Boucle d'animation principale (RAF)
    const tick = () => {
      // Lire les variables CSS calculées par GSAP
      let hue = 38;
      let op = 0.13;
      let pulseScale = 1.0;

      if (auraBridge) {
        const computed = window.getComputedStyle(auraBridge);
        hue = parseFloat(computed.getPropertyValue("--hue") || "38");
        op = parseFloat(computed.getPropertyValue("--op") || "0.13");
        pulseScale = parseFloat(computed.getPropertyValue("--pulse-scale") || "1.0");
      }

      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      const scrollProgress = scrollY / (viewportHeight || 1);

      // Calcul des coordonnées cibles de l'Aura sur le tracé SVG
      let pathX = window.innerWidth / 2 - AURA_HALF;
      let pathY = window.innerHeight / 2 - AURA_HALF;

      if (auraTarget) {
        const rect = auraTarget.getBoundingClientRect();
        pathX = rect.left + rect.width / 2 - AURA_HALF;
        pathY = rect.top + rect.height / 2 - AURA_HALF;
      }

      let finalTx = pathX;
      let finalTy = pathY;

      let attractionRate = 0.06;
      let frictionRate = 0.08;

      if (scrollProgress < 1.0) {
        // --- HERO : Mix souris + chemin ---
        const biasMix = 0.7; // 70% chemin, 30% souris
        const rawTx = mouseX - AURA_HALF;
        const rawTy = mouseY - AURA_HALF;
        finalTx = rawTx * (1.0 - biasMix) + pathX * biasMix;
        finalTy = rawTy * (1.0 - biasMix) + pathY * biasMix;
      } else if (scrollProgress >= 1.0 && scrollProgress < 2.0) {
        // --- WORKS : Souris + dérive sur carte ---
        if (isCardHovered) {
          const dx = hoveredCardCenter.x - mouseX;
          const dy = hoveredCardCenter.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const driftX = dist > 0 ? (dx / dist) * Math.min(40, dist) : 0;
          const driftY = dist > 0 ? (dy / dist) * Math.min(40, dist) : 0;
          finalTx = mouseX + driftX - AURA_HALF;
          finalTy = mouseY + driftY - AURA_HALF;
          attractionRate = 0.04;
        } else {
          finalTx = mouseX - AURA_HALF;
          finalTy = mouseY - AURA_HALF;
        }
      } else {
        // --- ABOUT & CONTACT : Ancrage pur sur chemin ---
        finalTx = pathX;
        finalTy = pathY;

        if (scrollProgress >= 2.0 && scrollProgress < 3.0) {
          // Atterrissage spring (stiffness: 120, damping: 18)
          attractionRate = 0.12;
          frictionRate = 0.18;
        }
      }

      // Spring physics
      const fx = (finalTx - ax) * attractionRate / MASS;
      const fy = (finalTy - ay) * attractionRate / MASS;
      vx = (vx + fx) * (1 - frictionRate);
      vy = (vy + fy) * (1 - frictionRate);
      ax += vx;
      ay += vy;

      // Inertie pour le scale
      scale += (targetScale - scale) * 0.1;
      const finalScale = scale * pulseScale;

      // Drift autonome idle (seulement avant About)
      if (scrollProgress < 2.0 && Date.now() - lastMoveTime > 3000) {
        angle += 0.005;
        ax += Math.sin(angle) * 0.5;
        ay += Math.cos(angle) * 0.5;
      }

      const uColorMix = Math.max(0.0, Math.min(1.0, (hue - 38) / (205 - 38)));

      if (useWebGL && renderer && scene && camera && material) {
        const normX = (ax + AURA_HALF) / window.innerWidth;
        const normY = 1.0 - (ay + AURA_HALF) / window.innerHeight;

        material.uniforms.uMouse.value.set(normX, normY);
        material.uniforms.uTime.value += 0.01;
        material.uniforms.uScale.value = finalScale;
        material.uniforms.uGlow.value = op;
        material.uniforms.uColorMix.value = uColorMix;
        renderer.render(scene, camera);
      } else if (fallbackRef.current) {
        const baseColor1 = `rgba(200, 169, 110, ${op})`;
        const baseColor2 = `rgba(90, 100, 200, ${op * 0.6})`;
        fallbackRef.current.style.background = `radial-gradient(circle at 30% 30%, ${baseColor1} 0%, ${baseColor2} 40%, transparent 70%)`;
        fallbackRef.current.style.transform = `translate3d(${ax}px, ${ay}px, 0) scale(${finalScale})`;
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseover", handleMouseOver);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (renderer && renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (gsapCtx) {
        gsapCtx.revert();
      }
      if (pulseTween) {
        pulseTween.kill();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="aura-container" style={{ filter: "url(#displacement-filter)" }}>
      {/* Nœuds de contrôle techniques pour le plan-séquence */}
      <div id="aura-bridge" style={{ display: "none", "--hue": "38", "--op": "0.13", "--pulse-scale": "1.0" } as any} />
      <div id="aura-target-node" style={{ position: "absolute", width: "1px", height: "1px", visibility: "hidden", pointerEvents: "none" }} />
      {/* Fallback CSS radial-gradient */}
      <div ref={fallbackRef} className="aura" />
    </div>
  );
}
