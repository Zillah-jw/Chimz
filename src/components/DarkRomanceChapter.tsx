import { useState } from "react";
import { motion } from "motion/react";
import { CHAPTER_IMAGE, DARK_ROMANCE_LINES } from "../data/romanceContent";
import { TulipOrnament } from "./TulipOrnament";

export function DarkRomanceChapter() {
  const [focusedLineId, setFocusedLineId] = useState<string>(DARK_ROMANCE_LINES[0].id);

  return (
    <section
      id="after-dark"
      className="relative overflow-hidden border-t border-rosegold/10 bg-gradient-to-b from-obsidian via-wine/25 to-obsidian py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-sans text-xs font-medium tracking-[0.26em] text-rosegold">
            CHAPTER II · AFTER DARK
          </p>
          <h2 className="headline-balance mt-4 font-serif text-4xl font-normal leading-tight text-champagne sm:text-5xl lg:text-6xl">
            A little obsession after dark.
          </h2>
          <p className="mt-4 font-serif text-lg italic leading-relaxed text-parchment/80 sm:text-xl">
            Read slowly. Select any line to linger on the thought.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial visual plate */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:col-span-5"
          >
            <div className="relative h-80 overflow-hidden border border-rosegold/20 bg-velvet sm:h-96 lg:h-full lg:min-h-[540px]">
              <img
                src={CHAPTER_IMAGE}
                alt="Tall burgundy beeswax candles glowing beside a crystal coupe glass on dark satin"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-sans text-xs tracking-[0.22em] text-rosegold/90">
                  PLATE NO. 02 · MIDNIGHT STUDY
                </p>
                <p className="mt-2 font-serif text-xl italic text-champagne">
                  &ldquo;Dim light, warm glass, and nowhere else to be.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progressive chapter lines */}
          <div className="flex flex-col justify-between divide-y divide-rosegold/12 border-y border-rosegold/12 lg:col-span-7">
            {DARK_ROMANCE_LINES.map((item, idx) => {
              const isFocused = focusedLineId === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setFocusedLineId(item.id)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`group w-full cursor-pointer px-4 py-6 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold sm:px-6 ${
                    isFocused ? "bg-burgundy/25" : "hover:bg-velvet/70"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-1 font-sans text-xs font-medium tabular-nums tracking-[0.2em] text-rosegold/70">
                      {item.index}
                    </span>
                    <div className="flex-1">
                      <p
                        className={`font-serif text-xl leading-snug transition-colors duration-200 sm:text-2xl ${
                          isFocused
                            ? "text-champagne"
                            : "text-champagne/80 group-hover:text-champagne"
                        }`}
                      >
                        {item.text}
                      </p>
                      {isFocused && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                          className="mt-2.5 font-serif text-base italic text-rosegold"
                        >
                          {item.whisper}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <TulipOrnament className="mt-16" />
      </div>
    </section>
  );
}
