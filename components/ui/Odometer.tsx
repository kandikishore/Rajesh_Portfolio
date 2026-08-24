"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Digit-strip counter. Each digit column holds 0–9 stacked vertically and is
 * translated to land on its final value — the odometer roll on stats and pricing numbers.
 */
export function Odometer({
  value,
  suffix,
  className,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);
  const reducedMotion = useReducedMotion();
  const digits = String(value).split("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setPlay(true);
      return;
    }

    const checkAndPlay = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        setPlay(true);
      }
    };

    checkAndPlay();

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 95%",
      onEnter: () => setPlay(true),
      onEnterBack: () => setPlay(true),
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <span ref={ref} className={`inline-flex items-baseline leading-none ${className ?? ""}`}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>

      {digits.map((digit, index) => (
        <span
          key={`${index}-${digit}`}
          aria-hidden
          className="relative inline-flex h-[1em] overflow-hidden leading-none select-none tabular-nums items-center"
          style={{ width: "0.62em" }}
        >
          <span
            className="absolute left-0 top-0 flex flex-col will-change-transform leading-none"
            style={{
              transform: `translateY(-${play ? Number(digit) : 0}em)`,
              transition: reducedMotion
                ? "none"
                : `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
            }}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} className="flex h-[1em] leading-none items-center justify-center font-display">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}

      {suffix ? (
        <span aria-hidden className="text-accent leading-none">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
