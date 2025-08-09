"use client";
import { useEffect, useId, useRef, useState } from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

/**
 * Carousel mejorado (v2)
 * - Loop infinito con virtual track (1 slide por vista)
 * - Soporte mouse, teclado y swipe (pointer events)
 * - Accesible: roles ARIA, focus ring, anuncio de slide actual, dots navegables
 * - Dots con aria-current
 * - Pausa autoplay en hover/focus y durante drag
 * - Parallax sutil sólo en el slide activo
 * - Respeta reduced motion
 * - API simple y tipada (+ onClick opcional por slide)
 */

export interface SlideData {
  title: string;
  button: string;
  src: string;
  href?: string;
  /** Acción opcional para el botón cuando no hay href */
  onClick?: () => void;
}

interface CarouselProps {
  slides: SlideData[];
  autoPlay?: boolean;
  autoPlayMs?: number; // default 6000
  className?: string;
  /** Ancho máximo del carrusel (aplica centrado). */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"; // default "xl"
  /** Altura predefinida de los slides. */
  height?: "compact" | "comfortable" | "tall"; // default "comfortable"
  /** Ocupa todo el ancho de la ventana, ignorando el contenedor. */
  fullBleed?: boolean; // default false
  /** Callback al cambiar el slide real (1..n). */
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
  const activeRef = useRef<HTMLLIElement>(null);

  // Duplicamos extremos para loop (virtual track)
  const virtualSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const [index, setIndex] = useState(1); // empezamos en el 1 (primer real)
  const [isAnimating, setIsAnimating] = useState(false);

  // Parallax
  const xyRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
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
  }, []);

  const goTo = (next: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(next);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Normalizamos al terminar transición (para loop)
  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (index === virtualSlides.length - 1) {
      noAnimate(() => setIndex(1));
    } else if (index === 0) {
      noAnimate(() => setIndex(virtualSlides.length - 2));
    }
  };
  const noAnimate = (fn: () => void) => {
    const track = trackRef.current;
    if (!track) return fn();
    const prev = track.style.transition;
    track.style.transition = "none";
    fn();
    // Forzar reflow
    void track.offsetHeight;
    track.style.transition = prev;
  };

  // AutoPlay con pausa inteligente
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (!autoPlay || pause) return;
    const t = setInterval(() => {
      next();
    }, autoPlayMs);
    return () => clearInterval(t);
  }, [autoPlay, autoPlayMs, pause, index]);

  // Teclado
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "Home") noAnimate(() => setIndex(1));
    if (e.key === "End") noAnimate(() => setIndex(virtualSlides.length - 2));
  };

  // Swipe (pointer)
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
    draggingRef.current = true;
    // Cancel autoplay momentáneamente
    setIsAnimating(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !trackRef.current || !startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    // traducimos el track durante el drag (sin animación)
    const track = trackRef.current;
    const width = track.getBoundingClientRect().width / virtualSlides.length;
    track.style.transition = "none";
    const base = -index * width;
    track.style.transform = `translate3d(${base + dx}px,0,0)`;
  };
  const onPointerUp = () => {
    if (!draggingRef.current || !trackRef.current || !startRef.current) return;
    const dx = (event as PointerEvent).clientX - startRef.current.x;
    const threshold = 40; // px
    draggingRef.current = false;
    trackRef.current.style.transition = ""; // vuelve a transition por CSS
    if (Math.abs(dx) > threshold) {
      dx < 0 ? next() : prev();
    } else {
      // volver a su sitio
      setIndex((i) => i);
      setIsAnimating(false);
    }
    startRef.current = null;
  };

  // Parallax handlers sólo en el slide activo
  const onMouseMoveActive = (e: React.MouseEvent) => {
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
  const currentReal = ((index - 1 + realCount) % realCount) + 1; // 1..realCount

  // Mapas de tamaño
  const maxWMap: Record<NonNullable<CarouselProps["maxWidth"]>, string> = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    "3xl": "max-w-[1600px]",
    full: "max-w-none",
  };
  const heightMap: Record<NonNullable<CarouselProps["height"]>, string> = {
    compact:
      "h-[32vw] min-h-[160px] sm:h-[220px] md:h-[260px] lg:h-[280px]",
    comfortable:
      "h-[42vw] min-h-[200px] sm:h-[280px] md:h-[320px] lg:h-[340px]",
    tall:
      "h-[52vw] min-h-[220px] sm:h-[340px] md:h-[380px] lg:h-[420px]",
  };

  const containerWidth = fullBleed ? "w-screen" : "w-full";
  const containerMax = fullBleed ? "max-w-none" : maxWMap[maxWidth];

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
        className={
          "relative overflow-hidden rounded-2xl shadow-lg bg-neutral-900/60"
        }
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
          className={
            "flex items-stretch transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform"
          }
          style={{
            width: `${virtualSlides.length * 100}%`,
            transform: `translate3d(-${index * (100 / virtualSlides.length)}%,0,0)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {virtualSlides.map((s, i) => {
            const isActive = i === index;
            return (
              <li
                key={`${s.title}-${i}`}
                ref={isActive ? activeRef : undefined}
                className={cn(
                  "relative w-full shrink-0 px-2 sm:px-3 md:px-4 [perspective:1200px]",
                  "[transform-style:preserve-3d]"
                )}
                style={{ width: `${100 / virtualSlides.length}%` }}
              >
                <figure
                  className={cn(
                    `${heightMap[height]} overflow-hidden`,
                    "rounded-2xl bg-[#151826] text-white grid shadow-lg ring-1 ring-white/5"
                  )}
                  onMouseMove={isActive ? onMouseMoveActive : undefined}
                  onMouseLeave={isActive ? onMouseLeaveActive : undefined}
                  // Efecto parallax sutil usando CSS vars --x/--y
                  style={{
                    transform: isActive
                      ? "translateZ(0) rotateX(0deg) scale(1.04)"
                      : "translateZ(0) rotateX(4deg) scale(.96)",
                    transformOrigin: "bottom",
                    transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
                  }}
                >
                  <img
                    src={s.src}
                    alt={s.title}
                    className={cn(
                      "absolute inset-0 w-[110%] h-[110%] object-cover",
                      isActive ? "opacity-100" : "opacity-70",
                      "transition-opacity duration-500"
                    )}
                    loading={isActive ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      transform:
                        "translate3d(calc(var(--x,0)*-0.02), calc(var(--y,0)*-0.02), 0)",
                    }}
                  />

                  {/* Overlay + contenido */}
                  <div className="relative z-10 place-self-end w-full p-4 sm:p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <figcaption className="max-w-prose">
                      <h3 className="text-xl md:text-3xl font-semibold tracking-tight drop-shadow">
                        {s.title}
                      </h3>
                      {s.button && (
                        <div className="mt-4">
                          {s.href ? (
                            <a
                              href={s.href}
                              className={
                                "inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-black text-xs sm:text-sm shadow ring-1 ring-black/5 hover:shadow-lg transition"
                              }
                            >
                              {s.button}
                              <IconArrowNarrowRight />
                            </a>
                          ) : (
                            <button
                              type="button"
                              className={
                                "inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-black text-xs sm:text-sm shadow ring-1 ring-black/5 hover:shadow-lg active:translate-y-px transition"
                              }
                              onClick={() => {
                                s.onClick?.();
                              }}
                            >
                              {s.button}
                              <IconArrowNarrowRight />
                            </button>
                          )}
                        </div>
                      )}
                    </figcaption>
                  </div>

                  {/* Sombra superior para contraste del texto */}
                  <div className="absolute inset-0 bg-black/0" aria-hidden />
                </figure>
              </li>
            );
          })}
        </ul>

        {/* Edge fades (gradientes laterales) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-neutral-950/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-neutral-950/70 to-transparent" />

        {/* Controles (más grandes) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between p-2 sm:p-3">
          <button
            type="button"
            className={cn(
              "pointer-events-auto w-12 h-12 grid place-items-center rounded-full",
              "bg-neutral-200/85 dark:bg-neutral-800/85 backdrop-blur",
              "focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#6D64F7]",
              "hover:-translate-y-0.5 active:translate-y-0.5 shadow transition"
            )}
            aria-label="Anterior"
            onClick={prev}
          >
            <IconArrowNarrowRight className="rotate-180" />
          </button>

          <button
            type="button"
            className={cn(
              "pointer-events-auto w-12 h-12 grid place-items-center rounded-full",
              "bg-neutral-200/85 dark:bg-neutral-800/85 backdrop-blur",
              "focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#6D64F7]",
              "hover:-translate-y-0.5 active:translate-y-0.5 shadow transition"
            )}
            aria-label="Siguiente"
            onClick={next}
          >
            <IconArrowNarrowRight />
          </button>
        </div>
      </div>

      {/* Dots accesibles */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => {
          const realPos = i + 1;
          const active = currentReal === realPos;
          return (
            <button
              key={i}
              type="button"
              onClick={() => noAnimate(() => setIndex(realPos))}
              className={cn(
                "w-3 h-3 rounded-full transition ring-1 ring-black/10",
                active ? "scale-110 bg-[#6D64F7] shadow" : "bg-neutral-300/70 hover:bg-neutral-400"
              )}
              aria-label={`Ir al slide ${realPos}`}
              aria-current={active ? "true" : undefined}
            />
          );
        })}
      </div>

      {/* Anuncio accesible del slide actual */}
      <p className="sr-only" aria-live="polite">
        Slide {currentReal} de {realCount}
      </p>

      {/* Styles helper: reduced motion */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          ul { transition: none !important; }
          figure { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
