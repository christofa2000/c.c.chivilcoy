'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function NavLinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        group relative inline-flex items-center justify-center
        px-6 py-3 rounded-full font-semibold text-base xl:text-lg tracking-wide
        border-2 border-white/90 bg-white/10 text-white
        shadow-lg transition-all duration-300
        hover:bg-white hover:text-[#44209F]
        hover:scale-105 active:scale-95
        focus:outline-none focus-visible:ring-2 ring-white ring-offset-2 ring-offset-[#44209F]
        "
    >
      {/* Glow suave alrededor */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute -inset-px rounded-full
          bg-gradient-to-r from-fuchsia-400/40 via-white/20 to-indigo-400/40
          blur-md opacity-0 transition duration-500
          group-hover:opacity-100
        "
      />
      {/* Shine diagonal que cruza el botón */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-full
          translate-x-[-150%] group-hover:translate-x-[150%]
          opacity-0 group-hover:opacity-100
          transition-transform duration-700 ease-out
          skew-x-12
          bg-gradient-to-r from-white/0 via-white/40 to-white/0
        "
      />
      <span className="relative drop-shadow-sm">{children}</span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuItems = ['Inicio', 'Clases', 'Talleres', 'Kids', 'Colonia', 'Contacto'];

  // Menú dividido a los costados
  const mid = Math.ceil(menuItems.length / 2);
  const leftItems = menuItems.slice(0, mid);
  const rightItems = menuItems.slice(mid);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#44209F] text-white shadow-lg">
      {/* Desktop: grid 3 columnas (izq · logo · der) */}
      <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
        {/* Menú izquierdo */}
        <nav aria-label="Principal izquierda">
          <ul className="flex items-center justify-start gap-x-5 xl:gap-x-7">
            {leftItems.map((section) => (
              <li key={`left-${section}`}>
                <NavLinkButton href={`#${section.toLowerCase()}`}>{section}</NavLinkButton>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo centrado (más chico) */}
        <Link href="/" className="justify-self-center">
          <Image
            src="/events/fondo-arbol4.png"
            alt="Espacio de Arte Chivilcoy"
            width={200}
            height={80}
            priority
            className="w-20 md:w-24 lg:w-24 xl:w-28 h-auto"
            sizes="(max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7rem"
          />
        </Link>

        {/* Menú derecho */}
        <nav aria-label="Principal derecha" className="justify-self-end">
          <ul className="flex items-center justify-end gap-x-5 xl:gap-x-7">
            {rightItems.map((section) => (
              <li key={`right-${section}`}>
                <NavLinkButton href={`#${section.toLowerCase()}`}>{section}</NavLinkButton>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Móvil: logo centrado + hamburguesa */}
      <div className="lg:hidden relative flex items-center justify-center px-4 sm:px-6 py-2.5">
        <Link href="/" className="block">
          <Image
            src="/events/fondo-arbol4.png"
            alt="Espacio de Arte Chivilcoy"
            width={160}
            height={64}
            priority
            className="w-20 h-auto"
            sizes="(max-width: 768px) 5rem, 5rem"
          />
        </Link>

        <button
          className="absolute right-3 top-2.5 focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={open ? 'M6 18L18 6 M6 6l12 12' : 'M4 6h16 M4 12h16 M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable (debajo de la barra fija) */}
      <nav
        id="mobile-nav"
        className={[
          'lg:hidden fixed left-0 right-0 z-40',
          'top-[64px]',
          'bg-[#44209F] max-h-[calc(100vh-64px)] overflow-y-auto',
          'transform transition-all duration-300',
          open ? 'translate-y-0 opacity-100 pointer-events-auto'
               : '-translate-y-4 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <ul className="flex flex-col items-center gap-2 p-4">
          {menuItems.map((section) => (
            <li key={`mobile-${section}`} className="w-full">
              <NavLinkButton href={`#${section.toLowerCase()}`}>{section}</NavLinkButton>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
