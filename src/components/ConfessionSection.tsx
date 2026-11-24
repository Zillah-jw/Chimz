import { motion } from "motion/react";
import { CONFESSION_NOTES } from "../data/romanceContent";
import { TulipOrnament } from "./TulipOrnament";

export function ConfessionSection() {
  return (
    <section
      id="confession"
      className="relative overflow-hidden border-t border-rosegold/10 bg-obsidian py-24 sm:py-32"
    >
      {/* Ambient wine glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-burgundy/20 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-sans text-xs font-medium tracking-[0.26em] text-rosegold">
            CHAPTER I · THE CONFESSION
          </p>
          <h2 className="headline-balance mt-4 font-serif text-4xl font-normal leading-tight text-champagne sm:text-5xl lg:text-6xl">
            Let&apos;s stop pretending I&apos;m innocent.
          </h2>
          <p className="mt-5 font-serif text-lg italic leading-relaxed text-parchment/80 sm:text-xl">
            Since subtlety clearly isn&apos;t working on either of us, here is the truth—unfiltered.
          </p>
          <TulipOrnament className="mt-8" />
        </motion.div>

        {/* Staggered editorial confession cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {CONFESSION_NOTES.map((note, idx) => {
            const isFinalCard = idx === CONFESSION_NOTES.length - 1;
            return (
              <motion.article
                key={note.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: (idx % 2) * 0.12,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`group relative border border-rosegold/15 bg-velvet/90 p-8 transition-colors duration-300 hover:border-rosegold/35 sm:p-10 ${
                  isFinalCard ? "md:col-span-2 md:mx-auto md:max-w-3xl md:w-full" : ""
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-burgundy/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-rosegold/10 pb-4">
                    <span className="font-serif text-sm tracking-[0.22em] text-rosegold/85">
                      Confession {note.roman}
                    </span>
                    <span className="font-serif text-xs italic text-parchment/50">
                      For Chi
                    </span>
                  </div>
                  <p className="mt-6 font-serif text-2xl font-normal leading-snug text-champagne sm:text-[1.7rem]">
                    &ldquo;{note.text}&rdquo;
                  </p>
                  <p className="mt-4 font-serif text-base italic leading-relaxed text-rosegold/80">
                    {note.subtext}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
