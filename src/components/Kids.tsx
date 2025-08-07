"use client";
import React from "react";
import Carousel, { SlideData } from "./ui/Carousel";

const kidsData: SlideData[] = [
  { title: "Yoga Infantil", button: "Más info", src: "/images/kids/yoga-infantil.jpg" },
  { title: "Pintura Creativa", button: "Más info", src: "/images/kids/pintura-creativa.jpg" },
  { title: "Manualidades", button: "Más info", src: "/images/kids/manualidades.jpg" },
  { title: "Teatro para Niños", button: "Más info", src: "/images/kids/teatro-ninos.jpg" },
  { title: "Música y Ritmo", button: "Más info", src: "/images/kids/musica-ritmo.jpg" },
];

export default function KidsCarousel() {
  return (
    <section id="kids" className="py-16">
      <div className="max-w-6xl mx-auto px-4 py-6 rounded-2xl shadow-2xl">
        <h2 className="text-5xl font-extrabold text-center mb-8 uppercase tracking-wide">
          Kids
        </h2>
        <Carousel slides={kidsData} />
      </div>
    </section>
  );
}
