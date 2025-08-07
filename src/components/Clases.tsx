"use client";
import React from "react";
import Carousel, { SlideData } from "./ui/Carousel";

const clasesData: SlideData[] = [
  { title: "Bachata", button: "Más info", src: "/images/clases/bachata.jpg" },
  { title: "Folclore", button: "Más info", src: "/images/clases/folklore.jpg" },
  { title: "Salsa", button: "Más info", src: "/images/clases/salsa.jpg" },
  { title: "Artes Marciales", button: "Más info", src: "/images/clases/artes-marciales.jpg" },
  { title: "Baile y Movimiento", button: "Más info", src: "/images/clases/baile-movimiento.jpg" },
];

export default function ClasesCarousel() {
  return (
    <section id="clases" className="py-8">
      <div className="max-w-4xl mx-auto px-4 py-4 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-4 uppercase tracking-wide">
          Clases
        </h2>
        <Carousel slides={clasesData} slideClasses="w-64 h-36" />
      </div>
    </section>
  );
}
