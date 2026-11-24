import { useState } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ExternalLink,
  Disc3
} from "lucide-react";
import type { YouTubeSoundtrackController } from "../hooks/useYouTubeSoundtrack";
import { TulipOrnament, TulipSilhouette } from "./TulipOrnament";

interface SoundtrackSectionProps {
  soundtrack: YouTubeSoundtrackController;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function TrackArtwork({
  src,
  alt,
  className = ""
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-burgundy via-wine to-obsidian text-rosegold/70 ${className}`}
      >
        <TulipSilhouette className="h-6 w-6" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

export function SoundtrackSection({ soundtrack }: SoundtrackSectionProps) {
  const {
    tracks,
    currentIndex,
    currentTrack,
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    blockedTracks,
    playerMountRef,
    selectTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    changeVolume,
    toggleMute
  } = soundtrack;

  const isCurrentBlocked = Boolean(blockedTracks[currentTrack.id]);

  return (
    <section
      id="soundtrack"
      className="relative overflow-hidden border-t border-rosegold/12 bg-gradient-to-b from-obsidian via-wine/20 to-obsidian py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy/25 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-sans text-xs font-medium tracking-[0.26em] text-rosegold">
            CHRIS GREY · LATE-NIGHT EDITION
          </p>
          <h2 className="headline-balance mt-4 font-serif text-4xl font-normal leading-tight text-champagne sm:text-5xl lg:text-6xl">
            Our soundtrack after dark.
          </h2>
          <p className="mt-5 font-serif text-lg italic leading-relaxed text-parchment/85 sm:text-xl">
            Some songs say the things I&apos;m not brave enough to say out loud.
          </p>
          <TulipOrnament className="mt-8" />
        </motion.div>

        {/* Main Luxury Player Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Vinyl Showcase + Custom Controls + Embedded YouTube Player */}
          <div className="flex flex-col border border-rosegold/20 bg-velvet/95 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.7)] sm:p-8 lg:col-span-7">
            {/* Vinyl + Now Playing Header */}
            <div className="flex flex-col items-center gap-6 border-b border-rosegold/12 pb-7 sm:flex-row sm:items-center">
              {/* Animated Vinyl Disc & Album Sleeve */}
              <div className="relative flex h-36 w-44 shrink-0 items-center justify-start sm:h-40 sm:w-48">
                {/* Spinning Grooved Vinyl Record */}
                <div
                  aria-hidden="true"
                  className={`absolute right-0 flex h-32 w-32 items-center justify-center rounded-full border border-rosegold/25 bg-[radial-gradient(circle,#1e0b10_0%,#080506_45%,#1a080d_62%,#070406_78%,#16070b_100%)] shadow-[0_0_30px_rgba(0,0,0,0.9)] sm:h-36 sm:w-36 ${
                    isPlaying ? "vinyl-spinning" : "vinyl-paused"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rosegold/50 bg-gradient-to-br from-crimson to-burgundy">
                    <div className="h-2.5 w-2.5 rounded-full bg-obsidian ring-1 ring-rosegold/60" />
                  </div>
                </div>

                {/* Square Album Sleeve Cover */}
                <div className="relative z-10 h-32 w-32 overflow-hidden border border-rosegold/30 bg-obsidian shadow-[0_12px_30px_rgba(0,0,0,0.8)] sm:h-36 sm:w-36">
                  <TrackArtwork
                    key={currentTrack.id}
                    src={currentTrack.artworkUrl}
                    alt={`${currentTrack.title} by ${currentTrack.artist} artwork`}
                    className="h-full w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-obsidian/55 via-transparent to-transparent"
                  />
                </div>
              </div>

              {/* Song Metadata & Lyric Whisper */}
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs tracking-[0.18em] text-rosegold/85 sm:justify-start">
                  <span>{currentTrack.album}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentTrack.mood}</span>
                </div>

                <h3 className="headline-balance mt-2.5 font-serif text-3xl font-normal tracking-wide text-champagne sm:text-4xl">
                  {currentTrack.title}
                </h3>

                <p className="mt-1 font-sans text-xs font-medium tracking-[0.2em] text-parchment/75">
                  {currentTrack.artist.toUpperCase()}
                </p>

                <p className="mt-3.5 font-serif text-lg italic text-rosegold">
                  &ldquo;{currentTrack.whisper}&rdquo;
                </p>
              </div>
            </div>

            {/* Playback Controls: Progress, Play/Pause, Next/Prev, Volume */}
            <div className="mt-6 space-y-5">
              {/* Scrubber Bar */}
              <div>
                <input
                  type="range"
                  min={0}
                  max={duration > 0 ? Math.floor(duration) : 100}
                  value={Math.min(currentTime, duration > 0 ? duration : 100)}
                  disabled={!isReady || duration <= 0 || isCurrentBlocked}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  aria-label="Track progress"
                  className="h-1.5 w-full cursor-pointer appearance-none bg-rosegold/20 accent-crimson disabled:cursor-not-allowed disabled:opacity-45"
                />
                <div className="mt-2 flex items-center justify-between font-sans text-xs tabular-nums text-parchment/65">
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration > 0 ? formatTime(duration) : currentTrack.releaseTag}</span>
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
                {/* Transport Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prevTrack}
                    aria-label="Previous song"
                    className="flex h-11 w-11 cursor-pointer items-center justify-center border border-rosegold/25 bg-obsidian/70 text-parchment transition-colors hover:border-rosegold/60 hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                  >
                    <SkipBack className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    disabled={!isReady || isCurrentBlocked}
                    aria-label={isPlaying ? "Pause song" : "Play song"}
                    className="flex h-12 min-w-[120px] cursor-pointer items-center justify-center gap-2.5 border border-rosegold/55 bg-gradient-to-r from-burgundy via-blood to-burgundy px-6 text-xs font-medium tracking-[0.16em] text-champagne shadow-[0_0_25px_rgba(127,14,34,0.4)] transition-all hover:border-rosegold hover:shadow-[0_0_35px_rgba(158,21,45,0.55)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosegold"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" aria-hidden="true" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" aria-hidden="true" />
                        <span>PLAY</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={nextTrack}
                    aria-label="Next song"
                    className="flex h-11 w-11 cursor-pointer items-center justify-center border border-rosegold/25 bg-obsidian/70 text-parchment transition-colors hover:border-rosegold/60 hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                  >
                    <SkipForward className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Volume & Listen on YouTube */}
                <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      className="cursor-pointer p-1.5 text-parchment/75 transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Volume2 className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => changeVolume(Number(e.target.value))}
                      aria-label="Volume"
                      className="h-1 w-20 cursor-pointer appearance-none bg-rosegold/25 accent-rosegold sm:w-24"
                    />
                  </div>

                  <a
                    href={currentTrack.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 border border-rosegold/35 bg-obsidian/80 px-4 py-2.5 text-xs font-medium tracking-[0.12em] text-champagne whitespace-nowrap transition-colors hover:border-rosegold hover:bg-wine/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                  >
                    <span>Listen on YouTube</span>
                    <ExternalLink className="h-3.5 w-3.5 text-rosegold" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded YouTube Player Frame (visible & responsive, with fallback if embedding disabled) */}
            <div className="mt-7 border border-rosegold/15 bg-obsidian">
              <div className="flex items-center justify-between border-b border-rosegold/10 px-4 py-2.5 text-[11px] tracking-[0.18em] text-parchment/60">
                <span className="inline-flex items-center gap-2">
                  <Disc3
                    className={`h-3.5 w-3.5 text-rosegold ${
                      isPlaying ? "vinyl-spinning" : ""
                    }`}
                    aria-hidden="true"
                  />
                  <span>YOUTUBE PLAYER</span>
                </span>
                <span>{currentTrack.releaseTag}</span>
              </div>

              <div className="relative aspect-video w-full overflow-hidden bg-obsidian">
                <div
                  ref={playerMountRef}
                  className={`h-full w-full ${isCurrentBlocked ? "hidden" : "block"}`}
                />

                {isCurrentBlocked && (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-wine/40 to-obsidian p-6 text-center">
                    <TulipSilhouette className="h-9 w-9 text-rosegold/75" />
                    <p className="mt-4 font-serif text-2xl text-champagne">
                      {currentTrack.title}
                    </p>
                    <p className="mt-2 max-w-md font-serif text-base italic text-parchment/80">
                      Embedded playback is restricted for this track on this host. Open it directly on YouTube below.
                    </p>
                    <a
                      href={currentTrack.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 border border-rosegold/55 bg-burgundy/80 px-6 py-3 text-xs font-medium tracking-[0.14em] text-champagne transition-colors hover:bg-blood"
                    >
                      <span>Listen on YouTube</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Curated Chris Grey Playlist */}
          <div className="flex flex-col border border-rosegold/20 bg-velvet/95 p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-rosegold/12 pb-4">
              <div>
                <p className="font-sans text-xs tracking-[0.22em] text-rosegold">
                  THE PLAYLIST
                </p>
                <p className="mt-1 font-serif text-2xl text-champagne">
                  Chris Grey
                </p>
              </div>
              <span className="font-sans text-xs tabular-nums tracking-[0.18em] text-parchment/60">
                0{currentIndex + 1} / 0{tracks.length}
              </span>
            </div>

            <div className="mt-4 flex-1 divide-y divide-rosegold/10">
              {tracks.map((track, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={track.id}
                    className={`flex items-center justify-between gap-3 py-3.5 transition-colors ${
                      isActive ? "bg-burgundy/25 px-3 -mx-3" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => selectTrack(idx, true)}
                      className="group flex min-w-0 flex-1 cursor-pointer items-center gap-3.5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                    >
                      <span
                        className={`w-5 shrink-0 font-sans text-xs tabular-nums ${
                          isActive ? "text-rosegold font-semibold" : "text-parchment/50"
                        }`}
                      >
                        0{idx + 1}
                      </span>

                      <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-rosegold/20 bg-obsidian">
                        <TrackArtwork
                          src={track.artworkUrl}
                          alt={track.title}
                          className="h-full w-full"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate font-serif text-lg transition-colors ${
                            isActive
                              ? "text-champagne"
                              : "text-champagne/85 group-hover:text-champagne"
                          }`}
                        >
                          {track.title}
                        </p>
                        <p className="truncate font-sans text-xs text-parchment/60">
                          {track.artist} · {track.mood}
                        </p>
                      </div>
                    </button>

                    <a
                      href={track.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Listen to ${track.title} on YouTube`}
                      title="Listen on YouTube"
                      className="inline-flex shrink-0 items-center gap-1.5 border border-rosegold/25 px-2.5 py-1.5 text-[11px] tracking-wider text-parchment/80 whitespace-nowrap transition-colors hover:border-rosegold/60 hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
                    >
                      <span className="hidden sm:inline">YouTube</span>
                      <ExternalLink className="h-3 w-3 text-rosegold" aria-hidden="true" />
                    </a>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 border-t border-rosegold/12 pt-4 font-serif text-sm italic text-parchment/65">
              Tap any track to load it into the deck, or open it directly on YouTube.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
