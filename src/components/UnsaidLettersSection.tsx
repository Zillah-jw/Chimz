import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MailOpen, Lock } from "lucide-react";
import { UNSAID_IMAGE, UNSAID_LETTERS } from "../data/romanceContent";
import { TulipOrnament, TulipSilhouette } from "./TulipOrnament";

export function UnsaidLettersSection() {
  const [openedIds, setOpenedIds] = useState<Record<string, boolean>>({});

  const openedCount = Object.values(openedIds).filter(Boolean).length;
  const allOpened = openedCount === UNSAID_LETTERS.length;

  const toggleLetter = (id: string) => {
    setOpenedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleAll = () => {
    if (allOpened) {
      setOpenedIds({});
    } else {
      const next: Record<string, boolean> = {};
      UNSAID_LETTERS.forEach((l) => {
        next[l.id] = true;
      });
      setOpenedIds(next);
    }
  };

  return (
    <section
      id="unsaid"
      className="relative overflow-hidden border-t border-rosegold/10 bg-gradient-to-b from-obsidian via-velvet to-obsidian py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Header with editorial flat-lay still life */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="font-sans text-xs font-medium tracking-[0.26em] text-rosegold">
              CHAPTER IV · PRIVATE CORRESPONDENCE
            </p>
            <h2 className="headline-balance mt-4 font-serif text-4xl font-normal leading-tight text-champagne sm:text-5xl">
              Things I probably shouldn&apos;t say out loud.
            </h2>
            <p className="mt-5 font-serif text-lg italic leading-relaxed text-parchment/80 sm:text-xl">
              Break the wax seal on each envelope to read what stays off my text thread.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={handleToggleAll}
                className="cursor-pointer border border-rosegold/35 bg-wine/40 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-champagne transition-colors hover:border-rosegold/65 hover:bg-burgundy/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
              >
                {allOpened ? "Seal All Letters" : "Unseal All Letters"}
              </button>
              <span className="font-sans text-xs tabular-nums tracking-[0.18em] text-parchment/60">
                {openedCount} OF {UNSAID_LETTERS.length} UNSEALED
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-rosegold/20 bg-velvet">
              <img
                src={UNSAID_IMAGE}
                alt="Matte black cotton envelopes sealed with blood-red wax seals and dark rose petals"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/20"
              />
            </div>
          </motion.div>
        </div>

        {/* Sealed Envelopes Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {UNSAID_LETTERS.map((letter, idx) => {
            const isOpen = Boolean(openedIds[letter.id]);
            const isLast = idx === UNSAID_LETTERS.length - 1;
            return (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={isLast ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <button
                  type="button"
                  onClick={() => toggleLetter(letter.id)}
                  aria-expanded={isOpen}
                  className={`group relative flex h-full min-h-[260px] w-full cursor-pointer flex-col justify-between border p-7 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold sm:p-8 ${
                    isOpen
                      ? "border-rosegold/45 bg-gradient-to-b from-wine/50 to-velvet"
                      : "border-rosegold/15 bg-velvet/95 hover:border-rosegold/40 hover:bg-wine/25"
                  }`}
                >
                  {/* Envelope Top Bar */}
                  <div className="flex w-full items-center justify-between border-b border-rosegold/12 pb-3.5">
                    <span className="font-sans text-xs tracking-[0.2em] text-rosegold/80">
                      {letter.label.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-sans text-xs text-parchment/60">
                      {isOpen ? (
                        <>
                          <MailOpen className="h-3.5 w-3.5 text-rosegold" aria-hidden="true" />
                          <span>Opened</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-3.5 w-3.5 text-rosegold/70" aria-hidden="true" />
                          <span>Sealed</span>
                        </>
                      )}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isOpen ? (
                      <motion.div
                        key="sealed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="my-auto flex flex-col items-center py-6 text-center"
                      >
                        {/* Crimson Wax Seal Emblem */}
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-rosegold/40 bg-gradient-to-br from-crimson via-blood to-burgundy shadow-[0_0_25px_rgba(127,14,34,0.5)] transition-transform duration-300 group-hover:scale-105">
                          <span className="font-serif text-lg italic text-champagne">
                            {letter.sealMark}
                          </span>
                        </div>
                        <p className="mt-5 font-serif text-lg italic text-parchment/80">
                          Tap to break the seal
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unsealed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="my-auto py-4"
                      >
                        <p className="font-serif text-2xl italic leading-snug text-champagne">
                          &ldquo;{letter.message}&rdquo;
                        </p>
                        <p className="mt-4 font-serif text-sm italic text-rosegold/85">
                          — {letter.postscript}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex w-full items-center justify-between pt-3 text-xs text-parchment/45">
                    <span className="inline-flex items-center gap-1.5 font-serif italic">
                      <TulipSilhouette className="h-3.5 w-3.5 text-rosegold/60" />
                      <span>Private · For Chi</span>
                    </span>
                    <span className="font-sans tracking-wider text-rosegold/70">
                      {isOpen ? "Tap to fold" : "Open note"}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        <TulipOrnament className="mt-16" />
      </div>
    </section>
  );
}
