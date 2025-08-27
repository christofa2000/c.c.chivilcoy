// components/Background.tsx
"use client";

import dynamic from "next/dynamic";

// Cargamos el canvas solo en cliente
const Particles = dynamic(() => import("./Particles"), { ssr: false });

export default function Background() {
  // 🌌 Fondo más oscuro y saturado (rosa/violeta predominan)
  const gradient =
    "radial-gradient(1200px 700px at 50% 15%, rgba(236,72,153,0.65), transparent 70%), " + // rosa oscuro
    "radial-gradient(1000px 600px at 70% 25%, rgba(217,70,239,0.60), transparent 70%), " + // fucsia profundo
    "radial-gradient(900px 550px at 20% 85%, rgba(124,58,237,0.55), transparent 65%), " + // violeta intenso
    "linear-gradient(180deg, #732a8b 0%, #5b1e70 45%, #3a1152 100%)"; // base violeta/rosa oscura

  return (
    <>
      {/* 🎨 Fondo fijo con tonos rosas/violetas más oscuros */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          pointerEvents: "none",
          background: gradient,
          backgroundRepeat: "no-repeat",
          backgroundSize: "120% 120%, 120% 120%, 120% 120%, 100% 100%",
        }}
      />
      {/* ✨ Partículas rosas/violetas */}
      <Particles />
    </>
  );
}
