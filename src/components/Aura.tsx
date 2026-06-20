"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

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
    let tx = ax;
    let ty = ay;
    let vx = 0;
    let vy = 0;
    let scale = 1.0;
    let targetScale = 1.0;

    const FRICTION = 0.08;
    const ATTRACTION = 0.06;
    const MASS = 1.0;

    // Drift idle
    let lastMoveTime = Date.now();
    let angle = 0;

    // Mettre à jour la cible
    const updateTarget = (clientX: number, clientY: number) => {
      tx = clientX - AURA_HALF;
      ty = clientY - AURA_HALF;
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

    // Gestion du hover sur les CTA
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.classList.contains("interactive")) {
        targetScale = 1.25;
      } else {
        targetScale = 1.0;
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
      // Résolution réduite par 2 sur mobile pour les performances
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
          varying vec2 vUv;

          void main() {
            // Ajustement du ratio d'aspect pour garder l'aura circulaire
            vec2 d = vUv - uMouse;
            float r = length(d) / (0.26 * uScale);
            float glow = exp(-r * r * 3.5) * 0.16;
            
            vec3 warm = vec3(0.78, 0.66, 0.43);   // Lux Gold
            vec3 cool = vec3(0.35, 0.39, 0.78);   // Ice Blue
            vec3 col = mix(warm, cool, smoothstep(0.0, 0.8, r));
            
            gl_FragColor = vec4(col * glow, glow);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const handleResize = () => {
        if (!renderer) return;
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
    }

    // Boucle d'animation principale (RAF)
    const tick = () => {
      // 1. Spring Physics pour l'Aura
      const fx = (tx - ax) * ATTRACTION / MASS;
      const fy = (ty - ay) * ATTRACTION / MASS;
      vx = (vx + fx) * (1 - FRICTION);
      vy = (vy + fy) * (1 - FRICTION);
      ax += vx;
      ay += vy;

      // Inertie pour le scale
      scale += (targetScale - scale) * 0.1;

      // 2. Drift autonome si inactif (>3s)
      if (Date.now() - lastMoveTime > 3000) {
        angle += 0.005;
        tx += Math.sin(angle) * 0.8;
        ty += Math.cos(angle) * 0.8;
      }

      // 3. Rendu
      if (useWebGL && renderer && scene && camera && material) {
        // Normaliser les coordonnées physiques pour le Shader [0..1]
        const normX = (ax + AURA_HALF) / window.innerWidth;
        const normY = 1.0 - (ay + AURA_HALF) / window.innerHeight; // Inverser l'axe Y pour Three.js

        material.uniforms.uMouse.value.set(normX, normY);
        material.uniforms.uTime.value += 0.01;
        material.uniforms.uScale.value = scale;
        renderer.render(scene, camera);
      } else if (fallbackRef.current) {
        // Fallback CSS
        fallbackRef.current.style.transform = `translate3d(${ax}px, ${ay}px, 0) scale(${scale})`;
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
    };
  }, []);

  return (
    <div ref={containerRef} className="aura-container">
      {/* Fallback CSS radial-gradient (utilisé si pas de WebGL ou sur mobile/saveData) */}
      <div ref={fallbackRef} className="aura" />
    </div>
  );
}
