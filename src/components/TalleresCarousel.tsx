"use client";
import React, { useEffect, useMemo, useState } from "react";
import Carousel, { SlideData } from "./ui/Carousel";
import { IconX, IconArrowRight } from "@tabler/icons-react";

const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo sit amet magna semper pretium. Nulla facilisi. Fusce et mauris ac eros pharetra luctus. Cras fringilla, nunc sit amet luctus porta, augue odio efficitur nibh, ac congue mauris magna nec justo. Integer in sapien vitae neque posuere pulvinar. Proin non justo id neque iaculis accumsan.`;

const baseSlides: SlideData[] = [
  { title: "Teatro", button: "Más info", src: "/images/talleres/teatro.jpg" },
  { title: "Arte", button: "Más info", src: "/images/talleres/arte.jpg" },
  { title: "Dibujo", button: "Más info", src: "/images/talleres/dibujo.jpg" },
  {
    title: "Hatha Yoga",
    button: "Más info",
    src: "/images/talleres/hathayoga.jpg",
  },
  { title: "Canto", button: "Más info", src: "/images/talleres/canto.jpg" },
];

export default function TalleresCarousel() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SlideData | null>(null);

  // Bloqueo de scroll al abrir modal
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape para cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Inyectar onClick en cada slide
  const slides: SlideData[] = useMemo(
    () =>
      baseSlides.map((s) => ({
        ...s,
        href: undefined,
        onClick: () => {
          setSelected(s);
          setOpen(true);
        },
      })),
    []
  );

  return (
    <section id="talleres" className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Encabezado unificado: blanco + Raleway */}
        <h2
          className="text-3xl text-center mb-6 tracking-wide text-white"
          style={{ fontFamily: "var(--font-raleway), system-ui, sans-serif" }}
        >
          Talleres
        </h2>

        <Carousel
          slides={slides}
          autoPlay={false}
          maxWidth="lg" // más contenido sin ocupar todo
          height="compact" // más bajo por defecto
          className="[&>div]:rounded-xl [&>div]:shadow-md"
        />
      </div>

      {/* Modal súper compacto en móvil */}
      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            onClick={(e) => e.stopPropagation()}
            className={`
              relative w-[88vw] max-w-md sm:max-w-lg md:max-w-3xl
              max-h-[78vh] overflow-hidden
              grid grid-cols-1 md:grid-cols-2
              rounded-xl md:rounded-3xl shadow-2xl bg-white text-neutral-900
            `}
          >
            {/* Imagen más baja en mobile */}
            <div className="relative h-[160px] sm:h-[200px] md:h-full md:min-h-[100%]">
              <img
                src={selected.src}
                alt={selected.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
            </div>

            {/* Contenido con scroll interno */}
            <div className="p-3 sm:p-4 md:p-6 overflow-y-auto">
              <h3
                id="modal-title"
                className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-raleway), system-ui, sans-serif",
                }}
              >
                {selected.title}
              </h3>

              <p
                id="modal-desc"
                className="mt-2 sm:mt-3 leading-relaxed text-[14px] sm:text-[15px] md:text-base text-neutral-800"
                style={{
                  fontFamily: "var(--font-raleway), system-ui, sans-serif",
                }}
              >
                {lipsum}
              </p>

              <ul
                className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-[13px] sm:text-[14px] text-neutral-700"
                style={{
                  fontFamily: "var(--font-raleway), system-ui, sans-serif",
                }}
              >
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" />{" "}
                  Nivel: Inicial / Intermedio
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" />{" "}
                  Cupos limitados
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" />{" "}
                  Material incluido (según taller)
                </li>
              </ul>

              <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-black/10 bg-white shadow hover:shadow-md active:translate-y-px transition text-[15px]"
                  style={{
                    fontFamily: "var(--font-raleway), system-ui, sans-serif",
                  }}
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
                <a
                  href="#inscripcion"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-neutral-900 text-white shadow hover:shadow-md active:translate-y-px transition text-[15px]"
                  style={{
                    fontFamily: "var(--font-raleway), system-ui, sans-serif",
                  }}
                >
                  Inscribirme <IconArrowRight size={18} />
                </a>
              </div>

              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              <p
                className="mt-2 text-xs text-neutral-500"
                style={{
                  fontFamily: "var(--font-raleway), system-ui, sans-serif",
                }}
              >
                Consultas: info@centrocultural.test
              </p>
            </div>

            {/* Botón cerrar */}
            <button
              aria-label="Cerrar"
              className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 shadow ring-1 ring-black/10 hover:bg-white transition"
              onClick={() => setOpen(false)}
            >
              <IconX size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Animación de entrada (suave y corta) */}
      <style jsx>{`
        [role="dialog"] {
          transform: translateY(8px) scale(0.985);
          opacity: 0;
          animation: in 0.18s ease-out forwards;
        }
        @keyframes in {
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* iOS: evitar zoom por fonts < 16px en elementos interactivos */}
      <style jsx global>{`
        @supports (-webkit-touch-callout: none) {
          a,
          button,
          select,
          input,
          textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
