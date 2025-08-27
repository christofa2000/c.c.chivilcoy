"use client";
import React, { useEffect, useMemo, useState } from "react";
import Carousel, { SlideData } from "./ui/Carousel";
import { IconX, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";

const lipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo sit amet magna semper pretium. Nulla facilisi. Fusce et mauris ac eros pharetra luctus. Cras fringilla, nunc sit amet luctus porta, augue odio efficitur nibh, ac congue mauris magna nec justo. Integer in sapien vitae neque posuere pulvinar. Proin non justo id neque iaculis accumsan.";

const baseSlides: SlideData[] = [
  { title: "Bachata", button: "Más info", src: "/images/clases/bachata.jpg" },
  { title: "Folclore", button: "Más info", src: "/images/clases/folklore.jpg" },
  { title: "Salsa", button: "Más info", src: "/images/clases/salsa.jpg" },
  {
    title: "Artes Marciales",
    button: "Más info",
    src: "/images/clases/artes-marciales.jpg",
  },
  {
    title: "Baile y Movimiento",
    button: "Más info",
    src: "/images/clases/baile-movimiento.jpg",
  },
];

export default function ClasesCarousel() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SlideData | null>(null);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <section id="clases" className="py-8">
      <div className="max-w-5xl mx-auto px-4 py-4">
        {/* Encabezado en blanco */}
        <h2 className="text-3xl text-center mb-4 tracking-wide text-white">
          Clases
        </h2>

        <Carousel
          slides={slides}
          autoPlay={false}
          maxWidth="2xl"
          height="comfortable"
        />
      </div>

      {/* Modal con imagen + texto (compacto en móvil) */}
      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            // 👇 Más chico en móvil: 92vw pero con tope de 360px; en md crece
            className="relative grid w-[92vw] max-w-[360px] md:max-w-3xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-white text-neutral-900"
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
          >
            {/* Imagen: altura estable; en móvil se mantiene compacta */}
            <div className="relative w-full aspect-[4/3] md:aspect-[4/3]">
              <Image
                src={selected.src}
                alt={selected.title ?? "Clase"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 50vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
            </div>

            {/* Contenido con tipografías más pequeñas en móvil */}
            <div className="p-5 sm:p-6 md:p-7 overflow-y-auto">
              <h3
                id="modal-title"
                className="text-xl md:text-2xl tracking-tight"
              >
                {selected.title}
              </h3>
              <p
                id="modal-desc"
                className="mt-3 leading-relaxed text-black text-sm md:text-base"
              >
                {lipsum}
              </p>

              <ul className="mt-4 space-y-2 text-xs md:text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" />
                  Nivel: Inicial / Intermedio
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" />
                  Cupos limitados
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" />
                  Traer ropa cómoda
                </li>
              </ul>

              <div className="mt-5 md:mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 ring-1 ring-black/10 shadow hover:shadow-md active:translate-y-px transition text-sm md:text-base"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
                <a
                  href="#inscripcion"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-neutral-900 text-white shadow hover:shadow-md active:translate-y-px transition text-sm md:text-base"
                >
                  Inscribirme <IconArrowRight size={18} />
                </a>
              </div>

              <div className="mt-5 md:mt-6 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              <p className="mt-3 text-[11px] md:text-xs text-neutral-500">
                Consultas: info@centrocultural.test
              </p>
            </div>

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
    </section>
  );
}
