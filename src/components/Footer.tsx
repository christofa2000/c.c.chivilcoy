import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>© {new Date().getFullYear()} Espacio de Arte Chivilcoy. Todos los derechos reservados.</p>
    </footer>
  );
}