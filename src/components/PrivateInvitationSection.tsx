import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";
import { INVITATION_IMAGE } from "../data/romanceContent";
import { TulipOrnament } from "./TulipOrnament";

type InvitationChoice = "interested" | "curious" | null;

interface PrivateInvitationSectionProps {
  onProceedToFinal: () => void;
}

export function PrivateInvitationSection({
  onProceedToFinal
}: PrivateInvitationSectionProps) {
  const [choice, setChoice] = useState<InvitationChoice>(null);

  return (
    <section
      id="invitation"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-rosegold/15 bg-obsidian py-24 sm:py-32"
    >
      {/* Full-screen burgundy & black velvet backdrop with candlelight scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy/40 via-obsidian to-obsidian">
        <img
          src={INVITATION_IMAGE}
          alt="Deep burgundy and black crushed velvet curtains lit by distant candlelight"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-burgundy/35 to-obsidian/95"
        />
        <div
          aria-hidden="true"
          className="candlelight-radial absolute inset-0"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-xs font-medium tracking-[0.26em] text-rosegold">
            CHAPTER V · THE PRIVATE INVITATION
          </p>
          <h2 className="headline-balance mt-4 font-serif text-4xl font-normal leading-tight text-champagne sm:text-5xl lg:text-6xl">
            Enough talking about it.
          </h2>

          <TulipOrnament className="my-8" />

          <div className="mx-auto max-w-2xl space-y-6 font-serif text-xl leading-relaxed text-champagne/90 sm:text-2xl sm:leading-relaxed">
            <p>
              I could keep flirting with you from behind a screen, but honestly, I&apos;d much rather have you in front of me.
            </p>
            <p>
              I want an evening with you. No unnecessary distractions, no rushing, no pretending we don&apos;t feel the chemistry.
            </p>
            <p>
              Just you and me, a little privacy, good conversation, a few stolen kisses... and whatever happens naturally when we&apos;re both feeling it.
            </p>
            <p className="italic text-rosegold">
              I think I&apos;ve made my intentions pretty obvious by now.
            </p>
          </div>

          {/* Two Interactive Choices */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <button
              type="button"
              onClick={() => setChoice("interested")}
              className={`w-full cursor-pointer border px-7 py-4 text-sm font-medium tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosegold sm:w-auto ${
                choice === "interested"
                  ? "border-rosegold bg-blood text-champagne shadow-[0_0_35px_rgba(158,21,45,0.5)]"
                  : "border-rosegold/55 bg-burgundy/75 text-champagne hover:border-rosegold hover:bg-blood/90"
              }`}
            >
              I&apos;m definitely interested.
            </button>

            <button
              type="button"
              onClick={() => setChoice("curious")}
              className={`w-full cursor-pointer border px-7 py-4 text-sm font-medium tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosegold sm:w-auto ${
                choice === "curious"
                  ? "border-rosegold bg-wine text-champagne shadow-[0_0_35px_rgba(127,14,34,0.45)]"
                  : "border-rosegold/35 bg-obsidian/70 text-champagne hover:border-rosegold/70 hover:bg-wine/60"
              }`}
            >
              You&apos;re making me curious.
            </button>
          </div>

          <AnimatePresence mode="wait">
            {choice && (
              <motion.div
                key={choice}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-10 max-w-xl border border-rosegold/30 bg-obsidian/85 p-7 backdrop-blur-md sm:p-9"
              >
                {choice === "interested" ? (
                  <>
                    <p className="font-sans text-xs tracking-[0.22em] text-rosegold">
                      MUTUAL INTENTIONS
                    </p>
                    <p className="mt-4 font-serif text-2xl italic leading-relaxed text-champagne">
                      &ldquo;Now that&apos;s my favorite kind of honesty, Chi. When you&apos;re ready, tell me the night—I&apos;ll handle the mood, the music, and making sure you&apos;re glad you said yes.&rdquo;
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-sans text-xs tracking-[0.22em] text-rosegold">
                      SLOW BURN ACCEPTED
                    </p>
                    <p className="mt-4 font-serif text-2xl italic leading-relaxed text-champagne">
                      &ldquo;Curiosity is half the fun. Come see me with an open evening and zero expectations—we&apos;ll let the night decide how far we take it.&rdquo;
                    </p>
                  </>
                )}

                <div className="mt-7 flex justify-center">
                  <button
                    type="button"
                    onClick={onProceedToFinal}
                    className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium tracking-[0.16em] text-rosegold transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                  >
                    <span>One last thing</span>
                    <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
