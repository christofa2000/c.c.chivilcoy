"use client";
import React from "react";
import Carousel, { SlideData } from "./ui/Carousel";

const talleresData: SlideData[] = [
  { title: "Teatro", button: "Más info", src: "/images/talleres/teatro.jpg" },
  { title: "Arte", button: "Más info", src: "/images/talleres/arte.jpg" },
  { title: "Dibujo", button: "Más info", src: "/images/talleres/dibujo.jpg" },
  { title: "Hatha Yoga", button: "Más info", src: "/images/talleres/hathayoga.jpg" },
  { title: "Canto", button: "Más info", src: "/images/talleres/canto.jpg" },
];

export default function TalleresCarousel() {
  return (
    <section id="talleres" className="py-16">
      <div className="max-w-6xl mx-auto px-4 py-6 rounded-2xl shadow-2xl">
        <h2 className="text-5xl font-extrabold text-center mb-8 uppercase tracking-wide">
          Talleres
        </h2>
        <Carousel slides={talleresData} />
      </div>
    </section>
  );
}