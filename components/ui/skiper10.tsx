"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skiper10Props {
  columns?: number;
  duration?: number;
  stagger?: number;
  wordmark?: string;
  onComplete?: () => void;
}

/**
 * Skiper10 — Double Stairs Preloader (White Variant)
 * Features dual-direction staggered staircase exit animation in pure white with ultra-smooth easing.
 */
export function Skiper10({
  columns = 5,
  duration = 1.35,
  stagger = 0.07,
  wordmark = "Rajesh",
  onComplete,
}: Skiper10Props) {
  const [loading, setLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const totalDuration = 1800; // 1.8 seconds smooth progress

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / totalDuration, 1);
      const easedProgress = Math.round(easeOutCubic(progressRatio) * 100);

      setDisplayProgress(easedProgress);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoading(false);
          onComplete?.();
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Ultra-smooth cubic bezier curve
  const animEase = [0.85, 0, 0.15, 1] as const;

  const topStairVariants = {
    initial: { y: "0%" },
    exit: (i: number) => ({
      y: "-100%",
      transition: {
        duration,
        ease: animEase,
        delay: i * stagger,
      },
    }),
  };

  const bottomStairVariants = {
    initial: { y: "0%" },
    exit: (i: number) => ({
      y: "100%",
      transition: {
        duration,
        ease: animEase,
        delay: (columns - 1 - i) * stagger,
      },
    }),
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="skiper10-preloader"
          className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-between overflow-hidden bg-transparent"
        >
          {/* Top Stairs Row (Pure White) */}
          <div className="relative flex h-1/2 w-full overflow-hidden">
            {Array.from({ length: columns }).map((_, i) => (
              <motion.div
                key={`top-stair-${i}`}
                custom={i}
                variants={topStairVariants}
                initial="initial"
                exit="exit"
                className="h-full flex-1 bg-white border-r border-neutral-200/60 last:border-r-0 shadow-sm"
              />
            ))}
          </div>

          {/* Center Brand Logo & Progress Overlay */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: "easeInOut" } }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl uppercase tracking-widest text-neutral-950 font-bold drop-shadow-sm flex items-center justify-center gap-3"
            >
              <svg
                aria-hidden="true"
                className="h-10 w-10 sm:h-14 sm:w-14 text-accent shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span>
                {wordmark}
                <span className="text-accent">.</span>
              </span>
            </motion.h1>

            <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-accent">
              <span className="tabular-nums font-bold text-sm text-neutral-900">
                {displayProgress}%
              </span>
              <div className="h-1 w-20 rounded-full bg-neutral-200 overflow-hidden relative">
                <div
                  className="absolute inset-y-0 left-0 bg-accent transition-all duration-75 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Bottom Stairs Row (Pure White) */}
          <div className="relative flex h-1/2 w-full overflow-hidden">
            {Array.from({ length: columns }).map((_, i) => (
              <motion.div
                key={`bottom-stair-${i}`}
                custom={i}
                variants={bottomStairVariants}
                initial="initial"
                exit="exit"
                className="h-full flex-1 bg-white border-r border-neutral-200/60 last:border-r-0 shadow-sm"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
