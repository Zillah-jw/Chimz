import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, RotateCcw } from "lucide-react";
import {
  QUIZ_PROFILES,
  QUIZ_QUESTIONS,
  type QuizOption
} from "../data/romanceContent";

interface SpicyQuizSectionProps {
  onContinue: () => void;
}

export function SpicyQuizSection({ onContinue }: SpicyQuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, QuizOption>>({});
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedForCurrent = selectedOptions[currentQuestion.id];

  const progressPercent = isFinished
    ? 100
    : ((currentIndex + (selectedForCurrent ? 1 : 0)) / totalQuestions) * 100;

  const totalScore = Object.values(selectedOptions).reduce(
    (sum, opt) => sum + opt.heatPoints,
    0
  );

  const matchedProfile =
    QUIZ_PROFILES.find(
      (profile) => totalScore >= profile.minPoints && totalScore <= profile.maxPoints
    ) || QUIZ_PROFILES[1];

  const handleSelectOption = (option: QuizOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetake = () => {
    setSelectedOptions({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  return (
    <section
      id="quiz"
      className="relative overflow-hidden border-t border-rosegold/10 bg-obsidian py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(61,9,23,0.3)_0%,rgba(7,4,6,1)_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-sans text-xs font-medium tracking-[0.26em] text-rosegold">
            CHAPTER III · THE INTERROGATION
          </p>
          <h2 className="headline-balance mt-4 font-serif text-4xl font-normal leading-tight text-champagne sm:text-5xl">
            Let&apos;s see how innocent YOU are.
          </h2>
          <p className="mt-4 font-serif text-lg italic text-parchment/80">
            Answer honestly, Chi. No safe answers allowed tonight.
          </p>
        </motion.div>

        {/* Interactive Quiz Card */}
        <div className="mt-12 border border-rosegold/20 bg-velvet/95 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:p-11">
          {/* Progress Header */}
          <div className="flex items-center justify-between gap-4 border-b border-rosegold/12 pb-5">
            <span className="font-sans text-xs tracking-[0.2em] text-rosegold">
              {isFinished ? "VERDICT READY" : "QUESTION"}
            </span>
            <span className="font-sans text-xs font-medium tabular-nums tracking-[0.2em] text-champagne">
              {isFinished
                ? `0${totalQuestions} / 0${totalQuestions}`
                : `0${currentIndex + 1} / 0${totalQuestions}`}
            </span>
          </div>

          {/* Progress Rail */}
          <div className="mt-4 h-px w-full bg-rosegold/15">
            <div
              className="h-full bg-gradient-to-r from-blood via-crimson to-rosegold transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <h3 className="headline-balance font-serif text-2xl font-normal leading-snug text-champagne sm:text-3xl">
                  {currentQuestion.prompt}
                </h3>

                <div className="mt-8 space-y-3.5">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedForCurrent?.id === option.id;
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectOption(option)}
                        className={`flex w-full cursor-pointer items-center gap-4 border px-5 py-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold ${
                          isSelected
                            ? "border-rosegold/70 bg-burgundy/65 text-champagne"
                            : "border-rosegold/15 bg-obsidian/55 text-parchment hover:border-rosegold/40 hover:bg-wine/30 hover:text-champagne"
                        }`}
                      >
                        <span
                          className={`font-sans text-xs font-medium tabular-nums tracking-widest ${
                            isSelected ? "text-rosegold" : "text-rosegold/55"
                          }`}
                        >
                          {letter}.
                        </span>
                        <span className="font-serif text-lg sm:text-xl">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Cheeky Immediate Response */}
                <AnimatePresence mode="wait">
                  {selectedForCurrent && (
                    <motion.div
                      key={selectedForCurrent.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 border border-rosegold/20 bg-wine/30 p-5 sm:p-6"
                    >
                      <p className="font-serif text-lg italic leading-relaxed text-champagne sm:text-xl">
                        &ldquo;{selectedForCurrent.reaction}&rdquo;
                      </p>

                      <div className="mt-5 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex cursor-pointer items-center gap-2.5 border border-rosegold/50 bg-blood/80 px-6 py-2.5 text-xs font-medium tracking-[0.14em] text-champagne transition-colors duration-200 hover:bg-crimson focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                        >
                          <span className="whitespace-nowrap">
                            {currentIndex < totalQuestions - 1
                              ? "Next Question"
                              : "Reveal Your Verdict"}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="quiz-result"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 text-center"
              >
                <p className="font-sans text-xs tracking-[0.22em] text-rosegold">
                  CHI&apos;S VERDICT · {matchedProfile.subtitle.toUpperCase()}
                </p>
                <h3 className="headline-balance mt-3 font-serif text-3xl font-normal text-champagne sm:text-4xl">
                  {matchedProfile.title}
                </h3>

                <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-parchment/90">
                  {matchedProfile.verdict}
                </p>

                <p className="mt-5 font-serif text-lg italic text-rosegold">
                  {matchedProfile.closingNote}
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="inline-flex cursor-pointer items-center gap-2 border border-rosegold/25 px-5 py-3 text-xs font-medium tracking-[0.14em] text-parchment transition-colors hover:border-rosegold/55 hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="whitespace-nowrap">Play Again</span>
                  </button>

                  <button
                    type="button"
                    onClick={onContinue}
                    className="inline-flex cursor-pointer items-center gap-2.5 border border-rosegold/55 bg-burgundy/80 px-6 py-3 text-xs font-medium tracking-[0.14em] text-champagne transition-colors hover:bg-blood focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                  >
                    <span className="whitespace-nowrap">Read What&apos;s Unsaid</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
