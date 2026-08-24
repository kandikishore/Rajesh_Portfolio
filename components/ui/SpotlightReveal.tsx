"use client";

import { useEffect, useRef } from "react";

/** Radius of the soft reveal circle, in CSS pixels. */
const SPOTLIGHT_R = 260;

interface SpotlightRevealProps {
  /** Bottom layer — always fully visible. */
  base: string;
  /** Top layer — visible only inside the cursor spotlight. */
  reveal: string;
  /** False under reduced motion: show the base image, no reveal. */
  interactive?: boolean;
}

export function SpotlightReveal({
  base,
  reveal,
  interactive = true,
}: SpotlightRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const inView = useRef(true);

  // Pause everything when the hero isn't on screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!interactive) return;

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      if (inView.current && revealLayerRef.current) {
        const dx = mouse.current.x - smooth.current.x;
        const dy = mouse.current.y - smooth.current.y;
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          smooth.current.x += dx * 0.15;
          smooth.current.y += dy * 0.15;

          const maskStyle =
            smooth.current.x > -500
              ? `radial-gradient(circle ${SPOTLIGHT_R}px at ${smooth.current.x}px ${smooth.current.y}px, black 0%, black 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, transparent 100%)`
              : "radial-gradient(circle 0px at -999px -999px, transparent 0%, transparent 100%)";

          revealLayerRef.current.style.maskImage = maskStyle;
          revealLayerRef.current.style.webkitMaskImage = maskStyle;
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [interactive]);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none" aria-hidden>
      {/* Base — always visible. */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${base})` }}
      />
      {interactive && (
        <div
          ref={revealLayerRef}
          className="absolute inset-0 bg-center bg-cover bg-no-repeat will-change-[mask-image]"
          style={{
            backgroundImage: `url(${reveal})`,
            maskImage: "radial-gradient(circle 0px at -999px -999px, transparent 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle 0px at -999px -999px, transparent 0%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
}
