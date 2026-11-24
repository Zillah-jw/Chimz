import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { CHI_PORTRAITS } from "../data/romanceContent";
import { TulipOrnament, TulipSilhouette } from "./TulipOrnament";

export function ChiPortraitTriptych() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % CHI_PORTRAITS.length
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + CHI_PORTRAITS.length) % CHI_PORTRAITS.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const activePortrait =
    activeIndex !== null ? CHI_PORTRAITS[activeIndex] : null;

  return (
    <section
      id="portraits"
      className="relative overflow-hidden border-t border-rosegold/10 bg-velvet/70 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-wine/30 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-sans text-xs font-medium tracking-[0.26em] text-rosegold">
            EXHIBIT · THE DISTRACTION IN QUESTION
          </p>
          <h2 className="headline-balance mt-4 font-serif text-4xl font-normal leading-tight text-champagne sm:text-5xl">
            Every reason I can&apos;t seem to behave.
          </h2>
          <p className="mt-4 font-serif text-lg italic leading-relaxed text-parchment/80 sm:text-xl">
            Dark tulips for my favorite distraction. Tap any frame to view it in full.
          </p>
          <TulipOrnament className="mt-8" />
        </motion.div>

        {/* Three-plate curated portrait triptych */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {CHI_PORTRAITS.map((portrait, idx) => (
            <motion.figure
              key={portrait.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`group flex flex-col ${
                idx === 1 ? "md:-translate-y-4" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View portrait: ${portrait.figureLabel}`}
                className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden border border-rosegold/20 bg-obsidian text-left transition-colors duration-300 hover:border-rosegold/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosegold"
              >
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  referrerPolicy="no-referrer"
                  className={`h-full w-full object-cover ${portrait.focalPosition} contrast-[1.06] brightness-[0.88] saturate-[0.82] transition-all duration-700 group-hover:scale-[1.03] group-hover:brightness-95 group-hover:saturate-95`}
                />

                {/* Editorial warm burgundy/obsidian scrim for seamless palette integration */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-burgundy/15 to-obsidian/30 transition-opacity duration-500 group-hover:opacity-80"
                />

                {/* Top corner tulip emblem & expand affordance */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="font-sans text-[11px] tracking-[0.22em] text-champagne/80">
                    {portrait.figureLabel}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center border border-rosegold/25 bg-obsidian/65 text-rosegold/85 backdrop-blur-sm transition-colors group-hover:border-rosegold/60 group-hover:text-champagne">
                    <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>

                {/* Bottom quote overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="mb-2 flex items-center gap-2 text-rosegold/80">
                    <TulipSilhouette className="h-4 w-4" />
                    <span className="h-px flex-1 bg-rosegold/25" />
                  </div>
                  <p className="font-serif text-lg italic leading-snug text-champagne sm:text-xl">
                    &ldquo;{portrait.caption}&rdquo;
                  </p>
                </div>
              </button>

              <figcaption className="mt-3.5 flex items-center justify-between text-xs text-parchment/65">
                <span className="font-serif italic">{portrait.note}</span>
                <span className="font-sans tabular-nums tracking-[0.18em] text-rosegold/70">
                  0{idx + 1} / 03
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Fullscreen Editorial Lightbox */}
      <AnimatePresence>
        {activePortrait && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePortrait.figureLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col border border-rosegold/25 bg-velvet p-4 sm:p-6"
            >
              <div className="flex items-center justify-between border-b border-rosegold/12 pb-3">
                <div className="flex items-center gap-2.5 text-rosegold">
                  <TulipSilhouette className="h-5 w-5" />
                  <span className="font-sans text-xs tracking-[0.2em]">
                    {activePortrait.figureLabel} · CHI
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close portrait"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center border border-rosegold/25 text-champagne transition-colors hover:border-rosegold hover:bg-burgundy/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="relative mt-4 flex max-h-[65vh] items-center justify-center overflow-hidden bg-obsidian">
                <img
                  src={activePortrait.src}
                  alt={activePortrait.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-rosegold/12 pt-4 sm:flex-row">
                <p className="font-serif text-lg italic text-champagne sm:text-xl">
                  &ldquo;{activePortrait.caption}&rdquo;
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex - 1 + CHI_PORTRAITS.length) %
                          CHI_PORTRAITS.length
                      )
                    }
                    aria-label="Previous portrait"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center border border-rosegold/25 text-parchment transition-colors hover:border-rosegold hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((activeIndex + 1) % CHI_PORTRAITS.length)
                    }
                    aria-label="Next portrait"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center border border-rosegold/25 text-parchment transition-colors hover:border-rosegold hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
