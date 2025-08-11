"use client";
import React from "react";

const datos = [
  {
    id: "invierno",
    title: "Invierno",
    img: "/images/colonia/invierno.jpg",
    info: "Detalles de la Colonia de Invierno: talleres creativos, espectáculos, manualidades y diversión bajo techo.",
  },
  {
    id: "verano",
    title: "Verano",
    img: "/images/colonia/verano.jpg",
    info: "Detalles de la Colonia de Verano: actividades al aire libre, pileta, juegos y mucho más.",
  },
];

export default function ColoniaSection() {
  return (
    <section id="colonia" className="py-12 px-4">
      {/* Título centrado */}
      <h2 className="text-4xl sm:text-5xl  text-center text-white mb-8  tracking-wide">
        Colonia
      </h2>

      {/* Contenedor lado a lado, responsive */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-24">
        {datos.map(({ id, title, img, info }) => (
          <div key={id} className="flex-1 flex flex-col items-center text-center">
            <img
              src={img}
              alt={title}
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl  text-white mb-2">{title}</h3>
            <p className="text-base text-white max-w-prose">
              {info}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}