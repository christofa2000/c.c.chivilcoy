import React from 'react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center py-12 "
    >
      <img
        src="/events/fondo-arbol4.png"
        alt="Fondo"
        className="w-3/4 max-w-md h-auto z-10 "
      />

      {/* Overlay u otros elementos debajo */}
      <div className="absolute inset-0 z-0"></div>
    </section>
  );
}
