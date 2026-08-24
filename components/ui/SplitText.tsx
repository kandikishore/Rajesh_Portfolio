"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Splits a string into per-character spans and staggers them in on scroll.
 * Used for the wide-tracked display headlines.
 * Whole words stay together so text still wraps sensibly.
 */
export function SplitText({
  text,
  className,
  charClassName,
  stagger = 0.03,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  charClassName?: string;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    if (!chars.length) return;

    if (reducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      chars,
      { opacity: 0.001, y: "0.4em" },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, stagger, reducedMotion]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block" aria-hidden>
          {Array.from(word).map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              data-char
              className={`inline-block will-change-transform ${charClassName ?? ""}`}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 ? (
            <span className="inline-block">&nbsp;</span>
          ) : null}
        </span>
      ))}
    </Tag>
  );
}
