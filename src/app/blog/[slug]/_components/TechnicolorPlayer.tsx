// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from "lucide-react";

export default function TechnicolorPlayer({ url }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsLoading(true);
    setError(false);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    if (audio.readyState >= 1) {
      setDuration(audio.duration);
      setIsLoading(false);
    }
  }, [url]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else {
      audio.play().catch((err) => { console.error("Playback failed:", err); setError(true); });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      audioRef.current.muted = v === 0;
      setIsMuted(v === 0);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration)) {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) { setDuration(audio.duration); setIsLoading(false); }
  };

  const handleCanPlay = () => setIsLoading(false);
  const handleError = () => { setIsLoading(false); setError(true); };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setProgress(e.target.value);
  };

  const handleEnded = () => { setIsPlaying(false); setProgress(0); setCurrentTime(0); };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full relative py-3 rounded-2xl flex items-center justify-center shadow-xl group"
      style={{ border: "1px solid color-mix(in srgb, var(--accent, #B87333) 30%, transparent)" }}
    >
      {/* Living UI Gradient — slow morphing blobs, no dark colors */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0" style={{ background: `var(--accent, #B87333)` }} />
        <div
          className="absolute inset-0 blob-a"
          style={{ background: `radial-gradient(ellipse 80% 60% at 30% 50%, var(--accent-hover, #c48a44), transparent)` }}
        />
        <div
          className="absolute inset-0 blob-b"
          style={{ background: `radial-gradient(ellipse 60% 80% at 70% 50%, color-mix(in srgb, var(--accent, #B87333) 80%, white), transparent)` }}
        />
        <div className="absolute inset-0 bg-white/10 opacity-20 mix-blend-overlay" />
      </div>

      <audio
        ref={audioRef} src={url} preload="metadata"
        onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay} onEnded={handleEnded} onError={handleError}
      />

      <div className="relative z-10 w-[96%] bg-white/30 backdrop-blur-md border border-white/50 shadow-2xl rounded-xl p-3 flex items-center gap-3">
        <button
          onClick={togglePlay} disabled={isLoading || error}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ color: "color-mix(in srgb, var(--accent, #B87333) 70%, black)" }}
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin text-slate-400" />
          ) : error ? (
            <AlertCircle size={18} className="text-red-500" />
          ) : isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" className="ml-0.5" />
          )}
        </button>

        <div className="flex-1 flex flex-col gap-1 justify-center">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-90 px-0.5"
            style={{ color: "color-mix(in srgb, var(--accent, #B87333) 50%, black)" }}
          >
            <span>{formatTime(currentTime)}</span>
            <span>{error ? "Error" : formatTime(duration)}</span>
          </div>
          {/* Progress bar with playhead dot */}
          <div className="relative w-full h-2 rounded-full bg-black/15 group/track">
            <div className="absolute top-0 left-0 h-full rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%`, background: "color-mix(in srgb, var(--accent, #B87333) 60%, black)" }} />
            {/* Playhead circle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full shadow-md transition-[left] duration-100 pointer-events-none"
              style={{ left: `calc(${progress}% - 7px)`, background: "color-mix(in srgb, var(--accent, #B87333) 50%, black)", border: "2px solid rgba(255,255,255,0.6)" }}
            />
            <input type="range" min="0" max="100" value={progress} onChange={handleSeek} disabled={isLoading || error}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed" />
          </div>
        </div>

        {/* Volume control — vertical popup */}
        <div className="flex-shrink-0 relative">
          <button onClick={() => setShowVolume(!showVolume)} className="hover:scale-110 active:scale-95 transition-transform"
            style={{ color: "color-mix(in srgb, var(--accent, #B87333) 50%, black)" }}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={16} className="opacity-50" />
            ) : (
              <Volume2 size={16} className="opacity-70" />
            )}
          </button>
          {showVolume && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowVolume(false)} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-40 bg-white/80 backdrop-blur-xl border border-white/60 rounded-xl shadow-2xl px-2.5 py-3 flex flex-col items-center gap-1.5"
                style={{ height: "100px" }}
              >
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="vol-slider appearance-none cursor-pointer"
                  style={{ writingMode: "vertical-lr", direction: "rtl", width: "6px", height: "72px" }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob-drift-a {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25% { transform: translate(10%, -8%) scale(1.1); }
          50% { transform: translate(-5%, 10%) scale(0.95); }
          75% { transform: translate(8%, 5%) scale(1.05); }
        }
        @keyframes blob-drift-b {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25% { transform: translate(-8%, 6%) scale(1.08); }
          50% { transform: translate(6%, -10%) scale(0.92); }
          75% { transform: translate(-10%, 3%) scale(1.04); }
        }
        .blob-a { animation: blob-drift-a 25s ease-in-out infinite; }
        .blob-b { animation: blob-drift-b 30s ease-in-out infinite; }
        .vol-slider { background: rgba(0,0,0,0.15); border-radius: 3px; }
        .vol-slider::-webkit-slider-runnable-track { background: rgba(0,0,0,0.15); border-radius: 3px; height: 6px; }
        .vol-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--accent, #B87333) 50%, black);
          border: 1.5px solid rgba(255,255,255,0.6);
          cursor: pointer;
        }
        .vol-slider::-moz-range-thumb {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--accent, #B87333) 50%, black);
          border: 1.5px solid rgba(255,255,255,0.6);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
