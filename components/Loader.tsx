"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  onFinish: () => void;
};

type Step = {
  percent: number;
  text: string;
};

const STEPS: Step[] = [
  { percent: 15, text: "Initializing Core..." },
  { percent: 40, text: "Loading 3D Modules..." },
  { percent: 70, text: "Optimizing Shaders..." },
  { percent: 90, text: "Finalizing UI..." },
  { percent: 100, text: "System Ready." },
];

export function Loader({ onFinish }: Props) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Systems");
  const [isExiting, setIsExiting] = useState(false);
  const finishedRef = useRef(false);

  const prefersReducedMotion = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    []
  );

  useEffect(() => {
    if (finishedRef.current) return;
    const DURATION = 3500;
    let start: number | null = null;
    let rafId: number | null = null;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setIsExiting(true);
      document.body.style.overflow = "";
      setTimeout(() => {
        onFinish();
      }, 700);
    };

    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const runtime = timestamp - start;
      let relativeProgress = runtime / DURATION;
      if (relativeProgress > 1) relativeProgress = 1;
      const eased = easeOutCubic(relativeProgress);
      const percentage = Math.floor(eased * 100);

      setProgress(percentage);
      const step = STEPS.find((s) => percentage <= s.percent);
      if (step && percentage < 100) {
        setStatus(step.text);
      } else if (percentage === 100) {
        setStatus("System Ready.");
      }

      if (runtime < DURATION) {
        rafId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    document.body.style.overflow = "hidden";
    if (prefersReducedMotion) {
      setProgress(100);
      setStatus("System Ready.");
      setTimeout(finish, 500);
      return () => {
        document.body.style.overflow = "";
      };
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.style.overflow = "";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onFinish, prefersReducedMotion]);

  if (isExiting && progress === 0) return null;

  const progressColor = progress >= 100 ? "bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" : "bg-neon-primary shadow-[0_0_10px_rgba(0,247,255,0.6)]";
  const progressTextColor = progress >= 100 ? "text-emerald-400" : "text-neon-primary";

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-neon-dark transition-opacity duration-700 ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 tech-grid opacity-40" />
      <div className="absolute inset-0 scanlines opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 p-4">
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-neon-primary/20 border-t-neon-primary shadow-[0_0_15px_rgba(0,247,255,0.25)] animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-neon-primary/40 animate-spin-reverse opacity-70" />
          <div className="absolute inset-4 rounded-full border border-white/5" />
          <div className="absolute w-12 h-12 bg-neon-primary rounded-full blur-md opacity-80 animate-pulse-fast" />
          <div className="absolute w-8 h-8 bg-white rounded-full blur-sm opacity-90 animate-pulse-fast" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white glitch-wrapper" data-text="NEOSITE">
            NEOSITE
          </h1>
          <div className="flex items-center justify-center gap-2 text-neon-primary font-mono text-sm tracking-widest uppercase">
            <span id="loading-text">{status}</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>

        <div className="w-64 space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-400">
            <span>LOADING_ASSETS...</span>
            <span id="progress-count" className={`font-bold ${progressTextColor}`}>
              {progress}%
            </span>
          </div>
          <div className="h-1 w-full bg-white/10 overflow-hidden relative rounded">
            <div
              id="progress-bar"
              className={`absolute top-0 left-0 h-full transition-all duration-100 ease-out ${progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 text-xs text-gray-500 font-mono tracking-[0.2em] opacity-60">
        SECURE CONNECTION ESTABLISHED // V2.0.4
      </div>
    </div>
  );
}
