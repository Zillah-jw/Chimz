import { useCallback, useEffect, useRef, useState } from "react";
import { CHRIS_GREY_PLAYLIST, type ChrisGreyTrack } from "../data/romanceContent";

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  loadVideoById: (videoId: string) => void;
  cueVideoById: (videoId: string) => void;
  destroy: () => void;
}

interface YTPlayerEvent {
  data: number;
}

interface YTGlobal {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: YTPlayerEvent) => void;
        onError?: (event: YTPlayerEvent) => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface YouTubeSoundtrackController {
  tracks: ChrisGreyTrack[];
  currentIndex: number;
  currentTrack: ChrisGreyTrack;
  isReady: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  blockedTracks: Record<string, boolean>;
  playerMountRef: (node: HTMLDivElement | null) => void;
  selectTrack: (index: number, autoStart?: boolean) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (seconds: number) => void;
  changeVolume: (nextVol: number) => void;
  toggleMute: () => void;
}

let apiScriptPromise: Promise<void> | null = null;

function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (apiScriptPromise) return apiScriptPromise;

  apiScriptPromise = new Promise((resolve) => {
    const existingCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (existingCallback) existingCallback();
      resolve();
    };

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (!existingScript) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
    }
  });

  return apiScriptPromise;
}

export function useYouTubeSoundtrack(): YouTubeSoundtrackController {
  const tracks = CHRIS_GREY_PLAYLIST;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [blockedTracks, setBlockedTracks] = useState<Record<string, boolean>>({});

  const mountNodeRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const currentTrack = tracks[currentIndex];

  const initPlayer = useCallback(async (container: HTMLDivElement) => {
    await loadYouTubeIframeAPI();
    if (!window.YT || !window.YT.Player || playerRef.current) return;

    const initialTrack = tracks[currentIndexRef.current];
    playerRef.current = new window.YT.Player(container, {
      videoId: initialTrack.youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: () => {
          setIsReady(true);
          if (playerRef.current) {
            playerRef.current.setVolume(75);
            const dur = playerRef.current.getDuration();
            if (dur > 0) setDuration(dur);
          }
        },
        onStateChange: (event) => {
          if (!window.YT) return;
          const state = event.data;
          if (state === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            const dur = playerRef.current?.getDuration() ?? 0;
            if (dur > 0) setDuration(dur);
          } else if (state === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (state === window.YT.PlayerState.ENDED) {
            const nextIdx = (currentIndexRef.current + 1) % tracks.length;
            setCurrentIndex(nextIdx);
            setCurrentTime(0);
            setDuration(0);
            const nextTrackItem = tracks[nextIdx];
            playerRef.current?.loadVideoById(nextTrackItem.youtubeId);
          } else if (state === window.YT.PlayerState.CUED) {
            setIsPlaying(false);
            const dur = playerRef.current?.getDuration() ?? 0;
            setDuration(dur > 0 ? dur : 0);
          }
        },
        onError: () => {
          const failedTrack = tracks[currentIndexRef.current];
          setIsPlaying(false);
          setBlockedTracks((prev) => ({
            ...prev,
            [failedTrack.id]: true
          }));
        }
      }
    });
  }, [tracks]);

  const playerMountRef = useCallback(
    (node: HTMLDivElement | null) => {
      mountNodeRef.current = node;
      if (node && !playerRef.current) {
        void initPlayer(node);
      }
    },
    [initPlayer]
  );

  // Sync progress ticker while playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      if (!playerRef.current) return;
      const cur = playerRef.current.getCurrentTime();
      const dur = playerRef.current.getDuration();
      if (Number.isFinite(cur)) setCurrentTime(cur);
      if (Number.isFinite(dur) && dur > 0) setDuration(dur);
    }, 500);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const selectTrack = useCallback(
    (index: number, autoStart = true) => {
      const normalized = ((index % tracks.length) + tracks.length) % tracks.length;
      const target = tracks[normalized];
      setCurrentIndex(normalized);
      setCurrentTime(0);
      setDuration(0);

      if (playerRef.current && isReady) {
        if (autoStart) {
          playerRef.current.loadVideoById(target.youtubeId);
        } else {
          playerRef.current.cueVideoById(target.youtubeId);
        }
      }
    },
    [isReady, tracks]
  );

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !isReady) return;
    if (isPlayingRef.current) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isReady]);

  const nextTrack = useCallback(() => {
    selectTrack(currentIndexRef.current + 1, isPlayingRef.current);
  }, [selectTrack]);

  const prevTrack = useCallback(() => {
    selectTrack(currentIndexRef.current - 1, isPlayingRef.current);
  }, [selectTrack]);

  const seekTo = useCallback(
    (seconds: number) => {
      if (!playerRef.current || !isReady) return;
      playerRef.current.seekTo(seconds, true);
      setCurrentTime(seconds);
    },
    [isReady]
  );

  const changeVolume = useCallback(
    (nextVol: number) => {
      const clamped = Math.max(0, Math.min(100, nextVol));
      setVolume(clamped);
      if (!playerRef.current || !isReady) return;
      if (clamped === 0) {
        playerRef.current.mute();
        setIsMuted(true);
      } else {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        }
        playerRef.current.setVolume(clamped);
      }
    },
    [isMuted, isReady]
  );

  const toggleMute = useCallback(() => {
    if (!playerRef.current || !isReady) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume > 0 ? volume : 75);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  }, [isMuted, isReady, volume]);

  return {
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
  };
}
