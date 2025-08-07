'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuItems = ['Inicio', 'Clases', 'Talleres', 'Kids', 'Colonia', 'Contacto'];
  const leftItems = menuItems.slice(0, 3);
  const rightItems = menuItems.slice(3);

  return (
    <header className="relative w-full bg-[#7D3C98] shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-center p-4 text-white">
        {/* Navegación izquierda (desktop) */}
        <ul className="hidden lg:flex flex-col items-center space-y-6 mr-16">
          {leftItems.map((section) => (
            <li key={section} className="group">
              <Link
                href={`#${section.toLowerCase()}`}
                className="block px-8 py-6 rounded bg-transparent group-hover:bg-white/10 transform transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-2 group-hover:shadow-2xl text-2xl font-semibold text-center"
              >
                {section}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo centrado */}
        <Link href="/" className="flex-shrink-0 mx-8">
          <Image
            src="/events/fondo-arbol4.png"
            alt="Espacio de Arte Chivilcoy"
            width={400}
            height={150}
            priority
          />
        </Link>

        {/* Navegación derecha (desktop) */}
        <ul className="hidden lg:flex flex-col items-center space-y-6 ml-16">
          {rightItems.map((section) => (
            <li key={section} className="group">
              <Link
                href={`#${section.toLowerCase()}`}
                className="block px-8 py-6 rounded bg-transparent group-hover:bg-white/10 transform transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-2 group-hover:shadow-2xl text-2xl font-semibold text-center"
              >
                {section}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón menú (móvil) */}
        <button
          className="lg:hidden focus:outline-none ml-auto"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? 'M6 18L18 6 M6 6l12 12' : 'M4 6h16 M4 12h16 M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Navegación (móvil) */}
      <nav
        className={`lg:hidden absolute top-full w-full bg-[#7D3C98] text-white transition-transform duration-300 ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 p-6">
          {menuItems.map((section) => (
            <li key={section} className="w-full group">
              <Link
                href={`#${section.toLowerCase()}`}
                className="block w-full px-6 py-4 rounded bg-transparent hover:bg-white/10 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl text-center text-xl font-semibold"
                onClick={() => setOpen(false)}
              >
                {section}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}