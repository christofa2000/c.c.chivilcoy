import React from 'react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center h-screen bg-black bg-no-repeat bg-center bg-auto"
      style={{
        backgroundImage: "url('/events/fondo2.jpg')",
      }}
    >
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
    </section>
  );
}
