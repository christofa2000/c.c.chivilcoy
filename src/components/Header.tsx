"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuItems = ['Inicio', 'Eventos', 'Clases', 'Talleres', 'Colonias', 'Contacto'];

  return (
    <header className="fixed w-full bg-violet-600 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 text-white">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-pink-300">
          Espacio de Arte Chivilcoy
        </Link>

        {/* Botón menú (móvil) */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                open
                  ? 'M6 18L18 6 M6 6l12 12'
                  : 'M4 6h16 M4 12h16 M4 18h16'
              }
            />
          </svg>
        </button>

        {/* Navegación */}
        <nav
          className={`flex flex-col lg:flex-row lg:items-center lg:static absolute w-full lg:w-auto left-0 lg:left-auto bg-violet-600 transition-all duration-300
            ${open ? 'top-16 opacity-100' : 'top-[-490px] opacity-0 lg:opacity-100'}`}
        >
          {menuItems.map((section) => (
            <Link
              key={section}
              href={`#${section.toLowerCase()}`}
              className="block px-4 py-2 lg:py-0 lg:px-3 hover:text-pink-300"
              onClick={() => setOpen(false)}
            >
              {section}
            </Link>
          ))}
          <Link
            href="#eventos"
            className="mt-2 lg:mt-0 lg:ml-4 inline-block px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Próximo Evento
          </Link>
        </nav>
      </div>
    </header>
  );
}
