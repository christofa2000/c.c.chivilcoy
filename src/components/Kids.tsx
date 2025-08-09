"use client";
import React, { useEffect, useMemo, useState } from "react";
import Carousel, { SlideData } from "./ui/Carousel";
import { IconX, IconArrowRight } from "@tabler/icons-react";

const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo sit amet magna semper pretium. Nulla facilisi. Fusce et mauris ac eros pharetra luctus. Cras fringilla, nunc sit amet luctus porta, augue odio efficitur nibh, ac congue mauris magna nec justo. Integer in sapien vitae neque posuere pulvinar. Proin non justo id neque iaculis accumsan.`;

const baseSlides: SlideData[] = [
  { title: "Yoga Infantil", button: "Más info", src: "/images/kids/yoga-infantil.jpg" },
  { title: "Pintura Creativa", button: "Más info", src: "/images/kids/pintura.jpg" },
  { title: "Manualidades", button: "Más info", src: "/images/kids/manualidades.jpg" },
  { title: "Teatro para Niños", button: "Más info", src: "/images/kids/teatro-infantil.jpg" },
  { title: "Música y Ritmo", button: "Más info", src: "/images/kids/danza-expresion.jpg" },
];

export default function KidsCarousel() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SlideData | null>(null);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Inyecta onClick en el botón del slide
  const slides: SlideData[] = useMemo(() => (
    baseSlides.map((s) => ({
      ...s,
      href: undefined,
      onClick: () => { setSelected(s); setOpen(true); },
    }))
  ), []);

  return (
    <section id="kids" className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-6 uppercase tracking-wide text-neutral-900">
          Kids
        </h2>
        <Carousel
          slides={slides}
          autoPlay={false}
          maxWidth="xl"            // más contenido sin ocupar todo
          height="comfortable"     // menos alto que "tall"
          className="[&>div]:rounded-2xl [&>div]:shadow-lg"
        />
      </div>

      {/* Modal compacto con efecto en la imagen */}
      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            className="relative w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-xl bg-white text-neutral-900 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen con hover scale */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <img
                src={selected.src}
                alt={selected.title}
                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
            </div>

            {/* Contenido */}
            <div className="p-5 md:p-6">
              <h3 id="modal-title" className="text-2xl font-bold tracking-tight">
                {selected.title}
              </h3>
              <p id="modal-desc" className="mt-3 leading-relaxed text-neutral-700">
                {lipsum}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" /> Edad recomendada: 5 a 12 años
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" /> Cupos limitados
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" /> Material incluido
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 ring-1 ring-black/10 bg-white shadow hover:shadow-md active:translate-y-px transition"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
                <a
                  href="#inscripcion"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-neutral-900 text-white shadow hover:shadow-md active:translate-y-px transition"
                >
                  Inscribirme <IconArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* Botón cerrar */}
            <button
              aria-label="Cerrar"
              className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 shadow ring-1 ring-black/10 hover:bg-white transition"
              onClick={() => setOpen(false)}
            >
              <IconX size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Animaciones */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fadeIn { animation: fadeIn .25s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn .25s ease-out forwards; }
      `}</style>
    </section>
  );
}
