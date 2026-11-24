import { Play, Pause, SkipForward, Disc3, ArrowUpRight } from "lucide-react";
import type { YouTubeSoundtrackController } from "../hooks/useYouTubeSoundtrack";

interface LateNightPlayerProps {
  soundtrack: YouTubeSoundtrackController;
  onJumpToSoundtrack: () => void;
}

export function LateNightPlayer({
  soundtrack,
  onJumpToSoundtrack
}: LateNightPlayerProps) {
  const { currentTrack, isReady, isPlaying, blockedTracks, togglePlay, nextTrack } =
    soundtrack;

  const isBlocked = Boolean(blockedTracks[currentTrack.id]);

  return (
    <aside
      aria-label="Chris Grey mini music controller"
      className="fixed right-4 bottom-4 z-40 max-w-[calc(100vw-2rem)] sm:right-6 sm:bottom-6"
    >
      <div className="flex h-11 items-center border border-rosegold/30 bg-obsidian/92 shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            if (isBlocked || !isReady) {
              onJumpToSoundtrack();
            } else {
              togglePlay();
            }
          }}
          aria-label={isPlaying ? "Pause Chris Grey" : "Play Chris Grey"}
          className="flex h-full cursor-pointer items-center gap-2 border-r border-rosegold/20 px-3.5 text-xs font-medium tracking-wider text-champagne transition-colors hover:bg-burgundy/55 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5 text-rosegold" aria-hidden="true" />
          ) : (
            <Play className="h-3.5 w-3.5 text-rosegold" aria-hidden="true" />
          )}
          <span className="max-w-[130px] truncate font-serif text-sm">
            {currentTrack.title}
          </span>
        </button>

        <button
          type="button"
          onClick={nextTrack}
          aria-label="Next Chris Grey track"
          className="flex h-full cursor-pointer items-center border-r border-rosegold/20 px-2.5 text-parchment/80 transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
        >
          <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onJumpToSoundtrack}
          aria-label="Jump to Our soundtrack after dark"
          className="flex h-full cursor-pointer items-center gap-1.5 px-3 text-xs text-rosegold transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
        >
          <Disc3
            className={`h-3.5 w-3.5 ${isPlaying ? "vinyl-spinning" : ""}`}
            aria-hidden="true"
          />
          <span className="hidden sm:inline whitespace-nowrap">Soundtrack</span>
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
