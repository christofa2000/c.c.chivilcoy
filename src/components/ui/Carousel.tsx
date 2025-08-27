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
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"; // default "lg"
  height?: "compact" | "comfortable" | "tall"; // default "compact"
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
  maxWidth = "lg", // 👈 más angosto por defecto
  height = "compact", // 👈 más bajo por defecto
  fullBleed = false,
  onSlideChange,
}: CarouselProps) {
  const id = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);

  // Detect touch para desactivar parallax
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  // items por vista (1 / 2 / 3)
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqSm = window.matchMedia("(min-width: 640px)");
    const update = () => setPerView(mqLg.matches ? 3 : mqSm.matches ? 2 : 1);
    update();
    mqLg.addEventListener("change", update);
    mqSm.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqSm.removeEventListener("change", update);
    };
  }, []);

  // medir viewport
  const [viewportW, setViewportW] = useState(0);
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (viewportRef.current) setViewportW(viewportRef.current.clientWidth);
    });
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);
  const cardW = Math.max(1, viewportW / Math.max(perView, 1));

  // virtual track
  const clones = Math.max(perView, 1);
  const virtualSlides = [
    ...slides.slice(-clones),
    ...slides,
    ...slides.slice(0, clones),
  ];
  const [index, setIndex] = useState(clones);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIndex(clones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clones, slides.length]);

  // parallax (no touch)
  const xyRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (isTouch) return;
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
    if (index >= lastVirtual) noAnimate(() => setIndex(clones));
    else if (index < clones)
      noAnimate(() => setIndex(slides.length + clones - 1));
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

  // autoplay
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (!autoPlay || pause) return;
    const t = setInterval(() => next(), autoPlayMs);
    return () => clearInterval(t);
  }, [autoPlay, autoPlayMs, pause, index]);

  // teclado
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "Home") noAnimate(() => setIndex(clones));
    if (e.key === "End") noAnimate(() => setIndex(slides.length + clones - 1));
  };

  // drag/swipe
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
    trackRef.current.style.transition = "none";
    trackRef.current.style.transform = `translate3d(${base + dx}px,0,0)`;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current || !trackRef.current || !startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const threshold = Math.max(40, cardW * 0.2);
    draggingRef.current = false;
    trackRef.current.style.transition = "";
    if (Math.abs(dx) > threshold) dx < 0 ? next() : prev();
    else {
      setIndex((i) => i);
      setIsAnimating(false);
    }
    startRef.current = null;
  };

  // mouse parallax (no touch)
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
  const onMouseLeaveActive = () => (xyRef.current = { x: 0, y: 0 });

  const realCount = slides.length;
  const currentReal = ((index - clones + realCount) % realCount) + 1;

  // alturas (achicadas)
  const heightMap: Record<NonNullable<CarouselProps["height"]>, string> = {
    compact: "h-[38vw] min-h-[150px] sm:h-[200px] md:h-[240px] lg:h-[260px]", // 👈 más bajo
    comfortable:
      "h-[46vw] min-h-[180px] sm:h-[240px] md:h-[280px] lg:h-[300px]",
    tall: "h-[56vw] min-h-[200px] sm:h-[300px] md:h-[340px] lg:h-[380px]",
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
        className="relative overflow-hidden rounded-xl shadow-md bg-neutral-900/60" // 👈 bordes y sombra más discretos
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
                className="relative shrink-0 px-1.5 sm:px-2.5 md:px-3" // 👈 menos padding lateral
                style={{ width: `${100 / Math.max(perView, 1)}%` }}
              >
                <figure
                  className={cn(
                    `${heightMap[height]} overflow-hidden`,
                    "rounded-xl bg-black text-white grid ring-1 ring-white/5"
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
                    <div className="pointer-events-none h-[34%] sm:h-[30%] lg:h-[28%] bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5 lg:p-5">
                      <figcaption className="max-w-prose">
                        {/* 👇 tipografía unificada */}
                        <h3
                          className="text-[15px] sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight drop-shadow"
                          style={{
                            fontFamily:
                              "var(--font-raleway), system-ui, sans-serif",
                          }}
                        >
                          {s.title}
                        </h3>

                        {s.button && (
                          <div className="mt-1.5 sm:mt-2">
                            {s.href ? (
                              <a
                                href={s.href}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-black text-[15px] sm:text-base shadow ring-1 ring-black/5 hover:shadow-lg transition"
                                style={{
                                  fontFamily:
                                    "var(--font-raleway), system-ui, sans-serif",
                                }}
                              >
                                {s.button}
                                <IconArrowNarrowRight />
                              </a>
                            ) : (
                              <button
                                type="button"
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-black text-[15px] sm:text-base shadow ring-1 ring-black/5 hover:shadow-lg active:translate-y-px transition"
                                style={{
                                  fontFamily:
                                    "var(--font-raleway), system-ui, sans-serif",
                                }}
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

        {/* Edge fades más sutiles */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-neutral-950/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-10 bg-gradient-to-l from-neutral-950/60 to-transparent" />

        {/* Controles (44px mínimo) */}
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
      <div className="mt-3 flex items-center justify-center gap-2">
        {slides.map((_, i) => {
          const realPos = i + 1;
          const active = currentReal === realPos;
          return (
            <button
              key={i}
              type="button"
              onClick={() => noAnimate(() => setIndex(realPos + clones - 1))}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition ring-1 ring-black/10",
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
