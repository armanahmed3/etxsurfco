import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  src: string;
  alt: string;
  caption: string;
};

const INTERVAL_MS = 5500;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const go = useCallback(
    (next: number) => {
      const len = slides.length;
      setIndex(((next % len) + len) % len);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused || reduceMotion.current || slides.length < 2) return;
    const id = window.setInterval(() => go(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, paused, go, slides.length]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured boats on the water"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (dx > 50) go(index - 1);
        else if (dx < -50) go(index + 1);
      }}
    >
      <div
        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={slide.src} className="relative h-full w-full shrink-0">
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 size-full object-cover"
              fetchPriority={i === 0 ? "high" : "low"}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/50 to-navy/20 pointer-events-none" />

      <div className="absolute bottom-6 right-4 sm:right-6 z-10 flex items-center gap-3">
        <p className="hidden sm:block text-[11px] uppercase tracking-[0.2em] text-foam mr-1">
          {slides[index]?.caption}
        </p>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}: ${slide.caption}`}
              className={cn(
                "h-2.5 rounded-full transition-all duration-200",
                i === index ? "w-7 bg-teal" : "w-2.5 bg-cream/40 hover:bg-cream/70",
              )}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 size-11 rounded-full border border-cream/25 bg-navy/40 text-cream backdrop-blur-sm hover:bg-navy/70 hidden sm:inline-flex items-center justify-center"
        onClick={() => go(index - 1)}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 size-11 rounded-full border border-cream/25 bg-navy/40 text-cream backdrop-blur-sm hover:bg-navy/70 hidden sm:inline-flex items-center justify-center"
        onClick={() => go(index + 1)}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
