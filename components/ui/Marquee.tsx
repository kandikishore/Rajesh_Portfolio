"use client";

import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee. Children are rendered twice and the track is
 * translated -50%, so the loop is seamless. Edges fade out via mask.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
  fade = true,
}: {
  children: ReactNode;
  /** Seconds for one full cycle. Larger = slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={`group relative w-full overflow-hidden ${fade ? "mask-fade-x" : ""} ${className ?? ""}`}
    >
      <div
        className="flex w-max will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animationName: reverse ? "marquee-reverse" : "marquee",
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
