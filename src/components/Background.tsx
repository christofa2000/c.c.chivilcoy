// components/Background.tsx
"use client";

import dynamic from "next/dynamic";

// Cargamos el canvas solo en cliente
const Particles = dynamic(() => import("./Particles"), { ssr: false });

export default function Background() {
  // 🌌 Violeta arriba → Rosa abajo
  const gradient =
    // violetas en la parte superior
    "radial-gradient(1000px 600px at 50% 10%, rgba(124,58,237,0.55), transparent 70%), " + // violeta intenso arriba
    "radial-gradient(900px 550px at 30% 20%, rgba(91,30,112,0.6), transparent 70%), " + // violeta profundo
    // rosas/fucsias en la parte inferior
    "radial-gradient(1200px 700px at 50% 85%, rgba(236,72,153,0.65), transparent 70%), " + // rosa oscuro abajo
    "radial-gradient(1000px 600px at 70% 80%, rgba(217,70,239,0.60), transparent 70%), " + // fucsia profundo abajo
    // degradé base invertido: violeta → rosa
    "linear-gradient(180deg, #5b1e70 0%, #732a8b 50%, #ec4899 100%)";

  return (
    <>
      {/* 🎨 Fondo fijo con violeta arriba y rosa abajo */}
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
