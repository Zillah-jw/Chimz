import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { HERO_IMAGE } from "../data/romanceContent";
import { TulipOrnament } from "./TulipOrnament";

interface OpeningHeroProps {
  hasEntered: boolean;
  onEnter: () => void;
}

export function OpeningHero({ hasEntered, onEnter }: OpeningHeroProps) {
  return (
    <section
      id="opening"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-obsidian px-6 pt-20 pb-16"
    >
      {/* Background photography with resilient fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-wine/40 via-obsidian to-obsidian">
        <img
          src={HERO_IMAGE}
          alt="Deep crimson and black velvet roses lit by warm candlelight on obsidian silk"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-50 transition-transform duration-1000"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/55 to-obsidian"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(127,14,34,0.22)_0%,rgba(7,4,6,0.9)_75%)]"
        />
      </div>

      {/* Candlelight center halo */}
      <div
        aria-hidden="true"
        className="candlelight-radial pointer-events-none absolute inset-0"
      />

      <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs font-medium tracking-[0.28em] text-rosegold"
        >
          SOMEWHERE BETWEEN US
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="headline-balance mt-6 font-serif text-5xl font-normal tracking-[0.14em] text-champagne sm:text-7xl md:text-8xl"
        >
          CHI...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="headline-balance mt-6 font-serif text-2xl font-normal leading-snug text-champagne/95 sm:text-3xl md:text-4xl"
        >
          There&apos;s something I&apos;ve been meaning to tell you.
        </motion.p>

        <TulipOrnament className="my-8" />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl font-serif text-xl italic leading-relaxed text-parchment/90 sm:text-2xl"
        >
          I could just text you, but where&apos;s the fun in that?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11"
        >
          <button
            type="button"
            onClick={onEnter}
            className="group relative inline-flex cursor-pointer items-center gap-3 border border-rosegold/45 bg-burgundy/65 px-8 py-4 text-sm font-medium tracking-[0.12em] text-champagne shadow-[0_0_40px_rgba(127,14,34,0.35)] transition-all duration-300 hover:border-rosegold hover:bg-blood/85 hover:shadow-[0_0_55px_rgba(158,21,45,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosegold"
          >
            <span className="whitespace-nowrap">Come a little closer.</span>
            <ArrowDown
              aria-hidden="true"
              className="h-4 w-4 text-rosegold transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </button>
        </motion.div>

        {hasEntered && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 font-serif text-sm italic text-rosegold/75"
          >
            Continue scrolling below.
          </motion.p>
        )}
      </div>
    </section>
  );
}
