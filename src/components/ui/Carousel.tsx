"use client";
import { useEffect, useId, useRef, useState } from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export interface SlideData {
  title: string;
  button: string;
  src: string;
  href?: string;
  onClick?: () => void;
}

interface CarouselProps {
  slides: SlideData[];
  autoPlay?: boolean;
  autoPlayMs?: number; // default 6000
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"; // default "xl"
  height?: "compact" | "comfortable" | "tall"; // default "comfortable"
  fullBleed?: boolean; // default false
  onSlideChange?: (current: number, total: number) => void;
}

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Carousel({
  slides,
  autoPlay = false,
  autoPlayMs = 6000,
  className,
  maxWidth = "xl",
  height = "comfortable",
  fullBleed = false,
  onSlideChange,
}: CarouselProps) {
  const id = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);

  // Detectamos entorno táctil para desactivar parallax
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  // --- items por vista (1 / 2 / 3 responsivo) ---
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)"); // lg
    const mqSm = window.matchMedia("(min-width: 640px)"); // sm
    const update = () => setPerView(mqLg.matches ? 3 : mqSm.matches ? 2 : 1);
    update();
    mqLg.addEventListener("change", update);
    mqSm.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqSm.removeEventListener("change", update);
    };
  }, []);

  // Medimos el ancho del viewport para mover en px exactos
  const [viewportW, setViewportW] = useState(0);
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (viewportRef.current) setViewportW(viewportRef.current.clientWidth);
    });
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);
  const cardW = Math.max(1, viewportW / Math.max(perView, 1));

  // --- virtual track con clones = perView ---
  const clones = Math.max(perView, 1);
  const virtualSlides = [
    ...slides.slice(-clones),
    ...slides,
    ...slides.slice(0, clones),
  ];

  const [index, setIndex] = useState(clones);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reposicionar si cambia perView (evita saltos)
  useEffect(() => {
    setIndex(clones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clones, slides.length]);

  // Parallax sutil (solo traslación) — desactivado en touch
  const xyRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (isTouch) return; // no parallax en touch
    const loop = () => {
      const el = activeRef.current;
      if (el) {
        el.style.setProperty("--x", `${xyRef.current.x}px`);
        el.style.setProperty("--y", `${xyRef.current.y}px`);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  const goTo = (next: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(next);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    const lastVirtual = slides.length + clones;
    if (index >= lastVirtual) {
      noAnimate(() => setIndex(clones));
    } else if (index < clones) {
      noAnimate(() => setIndex(slides.length + clones - 1));
    }
  };

  const noAnimate = (fn: () => void) => {
    const track = trackRef.current;
    if (!track) return fn();
    const prev = track.style.transition;
    track.style.transition = "none";
    fn();
    void track.offsetHeight;
    track.style.transition = prev;
  };

  // AutoPlay
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (!autoPlay || pause) return;
    const t = setInterval(() => next(), autoPlayMs);
    return () => clearInterval(t);
  }, [autoPlay, autoPlayMs, pause, index]);

  // Teclado
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "Home") noAnimate(() => setIndex(clones));
    if (e.key === "End") noAnimate(() => setIndex(slides.length + clones - 1));
  };

  // Drag / Swipe (en px)
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
    draggingRef.current = true;
    setIsAnimating(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !trackRef.current || !startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const base = -index * cardW;
    trackRef.current!.style.transition = "none";
    trackRef.current!.style.transform = `translate3d(${base + dx}px,0,0)`;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current || !trackRef.current || !startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const threshold = Math.max(40, cardW * 0.2); // 20% de la tarjeta
    draggingRef.current = false;
    trackRef.current!.style.transition = "";
    if (Math.abs(dx) > threshold) {
      dx < 0 ? next() : prev();
    } else {
      setIndex((i) => i);
      setIsAnimating(false);
    }
    startRef.current = null;
  };

  // Parallax solo en el activo (no touch)
  const onMouseMoveActive = (e: React.MouseEvent) => {
    if (isTouch) return;
    const el = activeRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xyRef.current = {
      x: e.clientX - (r.left + r.width / 2),
      y: e.clientY - (r.top + r.height / 2),
    };
  };
  const onMouseLeaveActive = () => {
    xyRef.current = { x: 0, y: 0 };
  };

  const realCount = slides.length;
  const currentReal = ((index - clones + realCount) % realCount) + 1; // 1..n

  // Mapas de tamaño (ligero ajuste: menos alto en mobile)
  const heightMap: Record<NonNullable<CarouselProps["height"]>, string> = {
    compact: "h-[46vw] min-h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px]",
    comfortable:
      "h-[52vw] min-h-[200px] sm:h-[280px] md:h-[320px] lg:h-[340px]",
    tall: "h-[60vw] min-h-[220px] sm:h-[340px] md:h-[380px] lg:h-[420px]",
  };

  const maxWMap: Record<NonNullable<CarouselProps["maxWidth"]>, string> = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    "3xl": "max-w-[1600px]",
    full: "max-w-none",
  };

  const containerWidth = fullBleed ? "w-screen" : "w-full";
  const containerMax = fullBleed ? "max-w-none" : maxWMap[maxWidth];
  const translateX = -index * cardW;

  useEffect(() => {
    onSlideChange?.(currentReal, realCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentReal]);

  return (
    <section
      className={cn(
        `relative ${containerWidth} ${containerMax} mx-auto select-none`,
        className
      )}
      aria-roledescription="carousel"
      aria-labelledby={`carousel-heading-${id}`}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onFocusCapture={() => setPause(true)}
      onBlurCapture={() => setPause(false)}
    >
      <h2 id={`carousel-heading-${id}`} className="sr-only">
        Carousel de imágenes destacadas
      </h2>

      <div
        ref={viewportRef}
        className="relative overflow-hidden rounded-2xl shadow-lg bg-neutral-900/60"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="group"
        aria-label={`Slide ${currentReal} de ${realCount}`}
        style={{ touchAction: "pan-y" }}
      >
        {/* Track */}
        <ul
          ref={trackRef}
          className="flex items-stretch transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform"
          style={{ transform: `translate3d(${translateX}px,0,0)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {virtualSlides.map((s, i) => {
            const isActive = i === index;
            return (
              <li
                key={`${s.title}-${i}`}
                ref={isActive ? activeRef : undefined}
                className="relative shrink-0 px-2 sm:px-3 md:px-4 [perspective:1200px] [transform-style:preserve-3d]"
                style={{ width: `${100 / Math.max(perView, 1)}%` }}
              >
                <figure
                  className={cn(
                    `${heightMap[height]} overflow-hidden`,
                    "rounded-2xl bg-black text-white grid shadow-lg ring-1 ring-white/5"
                  )}
                  onMouseMove={isActive ? onMouseMoveActive : undefined}
                  onMouseLeave={isActive ? onMouseLeaveActive : undefined}
                >
                  {/* Imagen */}
                  <div className="absolute inset-0">
                    <img
                      src={s.src}
                      alt={s.title}
                      className={cn(
                        "w-full h-full object-contain sm:object-cover object-center bg-black",
                        isActive ? "opacity-100" : "opacity-85",
                        "transition-opacity duration-500"
                      )}
                      loading={isActive ? "eager" : "lazy"}
                      decoding="async"
                      style={{
                        transform: isTouch
                          ? "translate3d(0,0,0)"
                          : "translate3d(calc(var(--x,0)*-0.01), calc(var(--y,0)*-0.01), 0)",
                      }}
                    />
                  </div>

                  {/* Gradiente inferior y contenido */}
                  <div className="absolute inset-x-0 bottom-0 z-10">
                    <div className="pointer-events-none h-[36%] sm:h-[32%] lg:h-[30%] bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-6">
                      <figcaption className="max-w-prose">
                        <h3 className="text-base md:text-lg lg:text-xl font-semibold tracking-tight drop-shadow">
                          {s.title}
                        </h3>
                        {s.button && (
                          <div className="mt-2">
                            {s.href ? (
                              <a
                                href={s.href}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white text-black text-base sm:text-base shadow ring-1 ring-black/5 hover:shadow-lg transition"
                              >
                                {s.button}
                                <IconArrowNarrowRight />
                              </a>
                            ) : (
                              <button
                                type="button"
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white text-black text-base sm:text-base shadow ring-1 ring-black/5 hover:shadow-lg active:translate-y-px transition"
                                onClick={() => s.onClick?.()}
                              >
                                {s.button}
                                <IconArrowNarrowRight />
                              </button>
                            )}
                          </div>
                        )}
                      </figcaption>
                    </div>
                  </div>
                </figure>
              </li>
            );
          })}
        </ul>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-neutral-950/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-neutral-950/70 to-transparent" />

        {/* Controles (44px mínimo en mobile) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between p-2 sm:p-3">
          <button
            type="button"
            className="pointer-events-auto w-11 h-11 md:w-12 md:h-12 grid place-items-center rounded-full bg-neutral-200/85 dark:bg-neutral-800/85 backdrop-blur focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#6D64F7] hover:-translate-y-0.5 active:translate-y-0.5 shadow transition"
            aria-label="Anterior"
            onClick={prev}
          >
            <IconArrowNarrowRight className="rotate-180" />
          </button>
          <button
            type="button"
            className="pointer-events-auto w-11 h-11 md:w-12 md:h-12 grid place-items-center rounded-full bg-neutral-200/85 dark:bg-neutral-800/85 backdrop-blur focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#6D64F7] hover:-translate-y-0.5 active:translate-y-0.5 shadow transition"
            aria-label="Siguiente"
            onClick={next}
          >
            <IconArrowNarrowRight />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => {
          const realPos = i + 1;
          const active = currentReal === realPos;
          return (
            <button
              key={i}
              type="button"
              onClick={() => noAnimate(() => setIndex(realPos + clones - 1))}
              className={cn(
                "w-3 h-3 rounded-full transition ring-1 ring-black/10",
                active
                  ? "scale-110 bg-[#6D64F7] shadow"
                  : "bg-neutral-300/70 hover:bg-neutral-400"
              )}
              aria-label={`Ir al slide ${realPos}`}
              aria-current={active ? "true" : undefined}
            />
          );
        })}
      </div>

      {/* Fix iOS Safari: evitar zoom al tocar botones/inputs < 16px */}
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

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          ul {
            transition: none !important;
          }
          figure {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
