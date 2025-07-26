"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const clases = [
  { id: 1, name: 'Bachata', img: '/images/clases/bachata.jpg', info: 'Descripción y más información sobre Bachata.' },
  { id: 2, name: 'Folclore', img: '/images/clases/folklore.jpg', info: 'Descripción y más información sobre Folclore.' },
  { id: 3, name: 'Salsa', img: '/images/clases/salsa.jpg', info: 'Descripción y más información sobre Salsa.' },
  { id: 4, name: 'Artes Marciales', img: '/images/clases/artes-marciales.jpg', info: 'Descripción y más información sobre Artes Marciales.' },
  { id: 5, name: 'Baile y Movimiento', img: '/images/clases/baile-movimiento.jpg', info: 'Descripción y más información sobre Baile y Movimiento.' },
];

export default function ClasesCarousel() {
  const [selected, setSelected] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const scroll = (direction: 'left' | 'right') => {
  if (!carouselRef.current) return;

  const container = carouselRef.current;
  const scrollAmount = container.clientWidth;

  if (direction === 'right') {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft >= maxScrollLeft - 5) {
      // Al final: volver al principio
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  } else {
    if (container.scrollLeft <= 5) {
      // Al inicio: ir al final
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
};


  const handleSelect = (id: number, index: number) => {
    setSelected(id);
    const item = itemRefs.current[index];
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <section
      id="clases"
      className="py-16 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/patio3.jpg')" }}
    >
      <div className="max-w-6xl mx-auto px-4 bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl py-6">
        <h2 className="text-5xl font-extrabold text-center text-amber-50 mb-8 uppercase tracking-wide">
          Clases
        </h2>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/70 p-3 rounded-full shadow-lg hover:bg-white transition"
            aria-label="Anterior"
          >
            &#10094;
          </button>

          <motion.div
            ref={carouselRef}
            className="flex gap-6 overflow-x-hidden overflow-y-hidden scroll-smooth py-4 px-6"
          >
            {clases.map((clase, index) => (
              <motion.div
                key={clase.id}
                ref={el => { itemRefs.current[index] = el; }}
                onClick={() => handleSelect(clase.id, index)}
                animate={{ scale: selected === clase.id ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`cursor-pointer select-none \
                  ${selected === clase.id ? 'min-w-[400px]' : 'min-w-[240px]'} \
                  flex-shrink-0 bg-gradient-to-br from-white/80 to-white/50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
              >
                <img
                  src={clase.img}
                  alt={clase.name}
                  className="w-full h-36 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                  {clase.name}
                </h3>
                <button
                  onClick={() => handleSelect(clase.id, index)}
                  className="mt-auto text-purple-700 font-medium hover:underline"
                >
                  Más info
                </button>
                {selected === clase.id && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-gray-800 leading-relaxed"
                  >
                    {clase.info}
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
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}
