"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const talleres = [
  { id: 1, name: 'Teatro', img: '/images/talleres/teatro.jpg', info: 'Descripción y más información sobre Teatro.' },
  { id: 2, name: 'Arte', img: '/images/talleres/arte.jpg', info: 'Descripción y más información sobre Arte.' },
  { id: 3, name: 'Dibujo', img: '/images/talleres/dibujo.jpg', info: 'Descripción y más información sobre Dibujo.' },
  { id: 4, name: 'Hatha Yoga', img: '/images/talleres/hathayoga.jpg', info: 'Descripción y más información sobre Hatha Yoga.' },
  { id: 5, name: 'Canto', img: '/images/talleres/canto.jpg', info: 'Descripción y más información sobre Canto.' },
];

export default function TalleresCarousel() {
  const [selected, setSelected] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = container.clientWidth;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    if (direction === 'right') {
      container.scrollLeft >= maxScrollLeft - 5
        ? container.scrollTo({ left: 0, behavior: 'smooth' })
        : container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollLeft <= 5
        ? container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' })
        : container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelect = (id: number, idx: number) => {
    setSelected(id);
    const el = itemRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <section
      id="talleres"
      className="py-16 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/patio3.jpg')" }}
    >
      <div className="max-w-6xl mx-auto px-4 bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl py-6">
        <h2 className="text-5xl font-extrabold text-center mb-8 uppercase tracking-wide text-amber-50">
          Talleres
        </h2>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/70 p-3 rounded-full shadow-lg hover:bg-white transition"
            aria-label="Anterior"
          >
            <span className="text-gray-900 text-2xl">&#10094;</span>
          </button>

          <motion.div
            ref={carouselRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth py-4 px-6"
          >
            {talleres.map((taller, idx) => (
              <motion.div
                key={taller.id}
                ref={el => { itemRefs.current[idx] = el; }}
                onClick={() => handleSelect(taller.id, idx)}
                animate={{ scale: selected === taller.id ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`cursor-pointer select-none ${
                  selected === taller.id ? 'min-w-[400px]' : 'min-w-[240px]'
                } flex-shrink-0 bg-gradient-to-br from-white/80 to-white/50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
              >
                <img
                  src={taller.img}
                  alt={taller.name}
                  className="w-full h-36 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                  {taller.name}
                </h3>
                <button
                  onClick={() => handleSelect(taller.id, idx)}
                  className="mt-auto text-purple-700 font-medium hover:underline"
                >
                  Más info
                </button>
                {selected === taller.id && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-gray-800 leading-relaxed"
                  >
                    {taller.info}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/70 p-3 rounded-full shadow-lg hover:bg-white transition"
            aria-label="Siguiente"
          >
            <span className="text-gray-900 text-2xl">&#10095;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
