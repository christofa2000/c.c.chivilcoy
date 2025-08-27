"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function NavLinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
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
        focus:outline-none focus-visible:ring-2 ring-white ring-offset-2 ring-offset-transparent
      "
    >
      <span
        aria-hidden
        className="
          pointer-events-none absolute -inset-px rounded-full
          bg-gradient-to-r from-fuchsia-400/40 via-white/20 to-indigo-400/40
          blur-md opacity-0 transition duration-500
          group-hover:opacity-100
        "
      />
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
  const [hidden, setHidden] = useState(false);
  const menuItems = [
    "Inicio",
    "Clases",
    "Talleres",
    "Kids",
    "Colonia",
    "Contacto",
  ];

  // detectar scroll hacia abajo/arriba
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currY = window.scrollY;
      if (currY > lastY && currY > 80) {
        setHidden(true); // bajando → esconder
      } else {
        setHidden(false); // subiendo → mostrar
      }
      lastY = currY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mid = Math.ceil(menuItems.length / 2);
  const leftItems = menuItems.slice(0, mid);
  const rightItems = menuItems.slice(mid);

  return (
    <header
      className={[
        "w-full z-50 transition-transform duration-500",
        hidden ? "-translate-y-full" : "translate-y-0",
        "bg-transparent backdrop-blur-md",
      ].join(" ")}
    >
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
        <nav aria-label="Principal izquierda">
          <ul className="flex items-center justify-start gap-x-5 xl:gap-x-7">
            {leftItems.map((section) => (
              <li key={`left-${section}`}>
                <NavLinkButton href={`#${section.toLowerCase()}`}>
                  {section}
                </NavLinkButton>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/" className="justify-self-center">
          <Image
            src="/events/fondo-arbol4.png"
            alt="Espacio de Arte Chivilcoy"
            width={200}
            height={80}
            priority
            className="w-40 md:w-48 lg:w-56 xl:w-64 h-auto"
            sizes="(max-width: 768px) 10rem, (max-width: 1024px) 12rem, 16rem"
          />
        </Link>

        <nav aria-label="Principal derecha" className="justify-self-end">
          <ul className="flex items-center justify-end gap-x-5 xl:gap-x-7">
            {rightItems.map((section) => (
              <li key={`right-${section}`}>
                <NavLinkButton href={`#${section.toLowerCase()}`}>
                  {section}
                </NavLinkButton>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Móvil */}
      <div className="lg:hidden relative flex items-center justify-center px-4 sm:px-6 py-2.5">
        <Link href="/" className="block">
          <Image
            src="/events/fondo-arbol4.png"
            alt="Espacio de Arte Chivilcoy"
            width={160}
            height={64}
            priority
            className="w-32 sm:w-36 md:w-40 h-auto"
            sizes="(max-width: 768px) 8rem, (max-width: 1024px) 9rem, 10rem"
          />
        </Link>

        <button
          className="absolute right-3 top-2.5 focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <svg
            className="w-9 h-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? "M6 18L18 6 M6 6l12 12" : "M4 6h16 M4 12h16 M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Menú móvil centrado */}
      <nav
        id="mobile-nav"
        className={[
          "lg:hidden fixed left-0 right-0 z-40",
          "top-[64px]",
          "backdrop-blur-md bg-black/40",
          "max-h-[calc(100vh-64px)] overflow-y-auto",
          "transform transition-all duration-300",
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <ul className="flex flex-col items-center justify-center gap-3 p-6 text-center">
          {menuItems.map((section) => (
            <li
              key={`mobile-${section}`}
              className="w-full flex justify-center"
            >
              <NavLinkButton href={`#${section.toLowerCase()}`}>
                {section}
              </NavLinkButton>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
