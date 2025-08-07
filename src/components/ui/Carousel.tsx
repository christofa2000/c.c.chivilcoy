"use client";
import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface CarouselProps {
  slides: SlideData[];
  /** Tailwind classes para controlar ancho y alto de cada slide */
  slideClasses?: string;
}

export default function Carousel({
  slides,
  slideClasses = "w-80 h-48",
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    containerRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Flecha izquierda */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
        aria-label="Scroll left"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>

      {/* Contenedor de slides */}
      <div
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex-shrink-0 snap-center rounded-lg overflow-hidden bg-gray-200 ${slideClasses}`}
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-bold mb-2">{slide.title}</h3>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                {slide.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
        aria-label="Scroll right"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}