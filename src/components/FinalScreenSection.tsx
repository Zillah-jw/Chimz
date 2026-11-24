import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TulipOrnament } from "./TulipOrnament";

export function FinalScreenSection() {
  const [troubleAccepted, setTroubleAccepted] = useState(false);

  return (
    <section
      id="final"
      className="relative overflow-hidden border-t border-rosegold/12 bg-obsidian py-28 sm:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(91,11,27,0.38)_0%,rgba(7,4,6,1)_68%)]"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-serif text-2xl italic text-rosegold sm:text-3xl">
            Chi, darling...
          </p>

          <h2 className="headline-balance mt-5 font-serif text-4xl font-normal leading-tight text-champagne sm:text-5xl">
            I think I&apos;ve made my intentions painfully obvious.
          </h2>

          <p className="mt-6 font-serif text-2xl tracking-wide text-parchment sm:text-3xl">
            Your move.
          </p>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => setTroubleAccepted(true)}
              className="cursor-pointer border border-rosegold/55 bg-gradient-to-r from-burgundy via-blood to-burgundy px-9 py-4 text-sm font-medium tracking-[0.14em] text-champagne shadow-[0_0_45px_rgba(127,14,34,0.4)] transition-all duration-300 hover:border-rosegold hover:shadow-[0_0_60px_rgba(158,21,45,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosegold"
            >
              Let&apos;s make some trouble.
            </button>
          </div>

          <AnimatePresence>
            {troubleAccepted && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 border border-rosegold/25 bg-velvet/90 px-7 py-9 sm:px-10"
              >
                <p className="font-serif text-2xl leading-relaxed text-champagne sm:text-3xl">
                  Then perhaps we should stop imagining the evening and actually plan it. 🥀
                </p>

                <TulipOrnament className="my-7" />

                <p className="font-serif text-lg italic tracking-wide text-rosegold sm:text-xl">
                  Some things are better experienced than explained.
                </p>
                <p className="mt-3 font-serif text-sm italic text-parchment/70">
                  And yes—there will be fresh tulips waiting. 🌷
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quiet editorial colophon */}
        <footer className="mt-24 border-t border-rosegold/10 pt-8 text-xs tracking-[0.18em] text-parchment/45">
          <span>SOMEWHERE BETWEEN US</span>
          <span className="mx-3" aria-hidden="true">·</span>
          <span>WRITTEN FOR CHI</span>
        </footer>
      </div>
    </section>
  );
}
