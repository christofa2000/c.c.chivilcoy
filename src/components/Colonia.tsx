"use client";
import React, { useState } from "react";

const opciones = [
  {
    id: "verano",
    title: "Verano",
    img: "/images/colonia/verano.jpg",
    info: "Detalles de la Colonia de Verano: actividades al aire libre, pileta, juegos y mucho más.",
  },
  {
    id: "invierno",
    title: "Invierno",
    img: "/images/colonia/invierno.jpg",
    info: "Detalles de la Colonia de Invierno: talleres creativos, espectáculos, manualidades y diversión bajo techo.",
  },
];

export default function ColoniaToggle() {
  const [selected, setSelected] = useState<string>("verano");
  const current = opciones.find((o) => o.id === selected)!;

  return (
    <section id="colonia" className="py-16">
      <div className="max-w-6xl mx-auto px-4 py-6 rounded-2xl shadow-2xl">
        {/* Título */}
        <h2 className="text-5xl font-extrabold text-center text-white mb-8 uppercase tracking-wide">
          Colonia
        </h2>

        {/* Toggle Pills */}
        <div className="flex justify-center mb-8 space-x-4">
          {opciones.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                selected === o.id
                  ? "bg-violet-700/60 text-amber-50 shadow-lg scale-105"
                  : "bg-transparent text-white hover:bg-white/20"
              }`}
            >
              {o.title}
            </button>
          ))}
        </div>

        {/* Contenido Seleccionado */}
        <div className="max-w-sm mx-auto p-6 rounded-2xl shadow-lg bg-white">
          <img
            src={current.img}
            alt={current.title}
            className="w-full h-44 object-cover rounded-lg mb-4"
          />
          <h3 className="text-3xl font-semibold mb-2 text-center text-gray-800">
            {current.title}
          </h3>
          <p className="leading-relaxed text-gray-700">{current.info}</p>
        </div>
      </div>
    </section>
  );
}