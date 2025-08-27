// components/Particles.tsx
"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
  a: number;
};

// 🎨 Colores intensos (rosa/violeta)
const COLORS = ["#db2777", "#d946ef", "#9333ea", "#7e22ce"]; // rose-600, fuchsia-500, violet-600, purple-700

export default function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let dpr = 1;
    let w = 0,
      h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 🔑 Canvas transparente: NO pintamos fondo aquí
    };

    resize();
    window.addEventListener("resize", resize);

    // Densidad adaptativa (según tamaño de pantalla)
    const targetCount = Math.floor((w * h) / 16000);
    const count = Math.max(60, Math.min(160, targetCount));

    // Partículas intensas
    const parts: Particle[] = prefersReduced
      ? []
      : Array.from({ length: count }).map(() => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25, // velocidad suave
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 3 + 1.5, // 1.5–4.5 px (más grandes)
          c: COLORS[(Math.random() * COLORS.length) | 0],
          a: Math.random() * 0.4 + 0.5, // 0.5–0.9 (más opacas)
        }));

    const step = () => {
      // 🔑 Limpieza transparente (no oscurece el gradiente)
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];

        // Movimiento
        p.x += p.vx;
        p.y += p.vy;

        // Wrap en bordes (sale por un lado, entra por el opuesto)
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Dibujo con glow
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 18; // glow fuerte

        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      ctx.clearRect(0, 0, w, h);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1, // debajo del contenido, encima del gradiente de Background
        pointerEvents: "none",
      }}
    />
  );
}
