import { useState } from "react";
import { MotionConfig } from "motion/react";
import { AmbientParticles } from "./components/AmbientParticles";
import { EditorialHeader } from "./components/EditorialHeader";
import { OpeningHero } from "./components/OpeningHero";
import { ConfessionSection } from "./components/ConfessionSection";
import { ChiPortraitTriptych } from "./components/ChiPortraitTriptych";
import { DarkRomanceChapter } from "./components/DarkRomanceChapter";
import { SoundtrackSection } from "./components/SoundtrackSection";
import { SpicyQuizSection } from "./components/SpicyQuizSection";
import { UnsaidLettersSection } from "./components/UnsaidLettersSection";
import { PrivateInvitationSection } from "./components/PrivateInvitationSection";
import { FinalScreenSection } from "./components/FinalScreenSection";
import { LateNightPlayer } from "./components/LateNightPlayer";
import { useYouTubeSoundtrack } from "./hooks/useYouTubeSoundtrack";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const soundtrack = useYouTubeSoundtrack();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleEnterExperience = () => {
    setHasEntered(true);
    scrollToSection("confession");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-obsidian text-champagne">
        <AmbientParticles />
        <EditorialHeader onNavigate={scrollToSection} />

        <main>
          <OpeningHero
            hasEntered={hasEntered}
            onEnter={handleEnterExperience}
          />
          <ConfessionSection />
          <ChiPortraitTriptych />
          <DarkRomanceChapter />
          <SoundtrackSection soundtrack={soundtrack} />
          <SpicyQuizSection onContinue={() => scrollToSection("unsaid")} />
          <UnsaidLettersSection />
          <PrivateInvitationSection
            onProceedToFinal={() => scrollToSection("final")}
          />
          <FinalScreenSection />
        </main>

        <LateNightPlayer
          soundtrack={soundtrack}
          onJumpToSoundtrack={() => scrollToSection("soundtrack")}
        />
      </div>
    </MotionConfig>
  );
}
