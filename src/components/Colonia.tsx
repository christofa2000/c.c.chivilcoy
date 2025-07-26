"use client";
import React, { useState } from 'react';

const opciones = [
  {
    id: 'verano',
    title: 'Verano',
    img: '/images/colonia/verano.jpg',
    info: 'Detalles de la Colonia de Verano: actividades al aire libre, pileta, juegos y mucho más.',
  },
  {
    id: 'invierno',
    title: 'Invierno',
    img: '/images/colonia/invierno.jpg',
    info: 'Detalles de la Colonia de Invierno: talleres creativos, espectáculos, manualidades y diversión bajo techo.',
  },
];

export default function ColoniaToggle() {
  const [selected, setSelected] = useState<string>('verano');
  const current = opciones.find(o => o.id === selected)!;

  return (
    <section
      id="colonia"
      className="py-16 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/patio3.jpg')" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6 bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl">
        <h2 className="text-5xl font-extrabold text-center text-amber-50 mb-8 uppercase tracking-wide">
          Colonia
        </h2>

        {/* Toggle Pills */}
        <div className="flex justify-center mb-8 space-x-4">
          {opciones.map(o => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 
                ${selected === o.id ? ' bg-violet-700/60  text-amber-50 shadow-lg' : 'bg-white/50 text-gray-900 hover:bg-white/70'}`}
            >
              {o.title}
            </button>
          ))}
        </div>

        {/* Contenido Seleccionado */}
        <div className="max-w-sm mx-auto bg-gradient-to-br from-white/80 to-white/50 p-6 rounded-2xl shadow-lg">
          <img
            src={current.img}
            alt={current.title}
            className="w-full h-44 object-cover rounded-lg mb-4"
          />
          <h3 className="text-3xl font-semibold mb-2 text-center text-gray-900">
            {current.title}
          </h3>
          <p className="leading-relaxed text-gray-800">
            {current.info}
          </p>
        </div>
      </div>
    </section>
  );
}