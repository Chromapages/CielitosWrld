'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, X, SkipForward, SkipBack } from 'lucide-react';
import { useMusic } from './MusicContext';

interface SonicAuraProps {
  tags?: string[];
  className?: string;
}

export default function SonicAura({ className }: SonicAuraProps) {
  const {
    isPlaying,
    currentTrack,
    togglePlay,
    isPlayerVisible,
    setIsPlayerVisible,
    nextTrack,
    prevTrack
  } = useMusic();

  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle Audio Playback Sync with Context
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]); // Re-run when track changes too

  // Handle volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      nextTrack(); // Auto-play next track
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, nextTrack]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isPlayerVisible || !currentTrack) return null;

  return (
    <div className={className}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="auto"
      />

      {/* Floating Player */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isExpanded ? 'w-80' : 'w-auto'
          }`}
      >
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-orange-500/10 border border-white/50 dark:border-stone-700/50 overflow-hidden">

          {/* Compact View */}
          {!isExpanded ? (
            <div className="flex items-center gap-3 p-3">
              {/* Album Art / Icon */}
              <button
                onClick={() => setIsExpanded(true)}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 hover:scale-105 transition-transform"
              >
                <Music className="w-6 h-6" />
              </button>

              {/* Mini Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-xs text-stone-500 dark:text-stone-400 hover:text-orange-600 transition-colors px-2 max-w-[100px] truncate"
                >
                  {currentTrack.title}
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsPlayerVisible(false)}
                className="ml-2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Expanded View */
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                    <Music className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-200">Sonic Aura</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mood Badge */}
              <div className="mb-4">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 capitalize">
                  {currentTrack.mood || 'Vibes'}
                </span>
              </div>

              {/* Track Info */}
              <div className="mb-4">
                <h4 className="font-bold text-stone-900 dark:text-white truncate">{currentTrack.title}</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400">{currentTrack.artist}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={progress}
                  onChange={(e) => {
                    const newTime = parseFloat(e.target.value);
                    setProgress(newTime);
                    if (audioRef.current) {
                      audioRef.current.currentTime = newTime;
                    }
                  }}
                  className="w-full h-1 bg-stone-200 dark:bg-stone-700 rounded-full appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-stone-400 mt-1">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevTrack}
                  className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/25 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>

                <button
                  onClick={nextTrack}
                  className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={toggleMute}
                  className="p-2 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-stone-200 dark:bg-stone-700 rounded-full appearance-none cursor-pointer accent-orange-500"
                />
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
