"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpotlightReveal } from "@/components/ui/SpotlightReveal";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BRAND, HERO } from "@/lib/data";

/** Rendered height of the wordmark as a multiple of its font size. Matches
 *  `line-height` on .hero-mark; used to cap the measured size against the
 *  viewport and to reserve the headline's clearance. */
const MARK_LEADING = 0.78;

/** Fraction of the rail width the wordmark spans at rest. Below 1 so it reads
 *  as a headline rather than stretching edge to edge. */
const MARK_FILL = 0.72;

/**
 * Full-bleed hero with the scroll morph from the reference.
 *
 * Over one viewport of scroll, a single progress value (--hero-t, 1 → 0) drives
 * everything at once:
 *   - the giant wordmark shrinks and travels to the header rail, handing off to
 *     the menu logo that sits in that exact spot
 *   - the backdrop photo and the hero content fade out
 *   - the next section scrolls up over the pinned hero
 *
 * The wordmark's start size is measured, not hardcoded: we scale its rendered
 * width to fill the viewport between the rail gutters, so the handoff stays
 * exact at any width and even if Anton falls back to Impact.
 */
export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLAnchorElement>(null);
  const markInnerRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  /* Solve the giant font size from the wordmark's natural width. */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const mark = markRef.current;
    const inner = markInnerRef.current;
    if (!root || !mark || !inner) return;

    const measure = () => {
      /* Read the rail gutter off the mark itself. Querying the custom property
         on :root returns the unresolved `max(...)` expression, since custom
         properties aren't computed until they're used in a real declaration. */
      const padX = mark.getBoundingClientRect().left;

      // Measure at a known size, then scale linearly to fill the rail width.
      const available = window.innerWidth - padX * 2;
      inner.style.fontSize = "100px";
      const naturalWidth = inner.getBoundingClientRect().width;
      inner.style.fontSize = "";

      if (naturalWidth <= 0 || available <= 0) return;

      /* Fill the rail, but never let the wordmark take more than a fifth of the
         viewport — a long name on a short screen would otherwise leave no room
         for the headline below it. MARK_LEADING converts font size to the
         rendered block height (line-height is 0.78). */
      const widthFit = ((available * MARK_FILL) / naturalWidth) * 100;
      const heightCap = (window.innerHeight * 0.22) / MARK_LEADING;

      /* Set on the root, not the mark: .hero-content reads this too, to reserve
         the space the wordmark occupies so the two never overlap. */
      root.style.setProperty(
        "--mark-giant",
        `${Math.min(widthFit, heightCap)}px`,
      );
    };

    measure();

    // Anton loads async; re-measure once it's swapped in.
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const setT = (value: number) => {
      root.style.setProperty("--hero-t", String(value));
      // The menu logo only appears once the wordmark has nearly landed, so the
      // two are never both visible.
      document.documentElement.style.setProperty(
        "--sm-logo-opacity",
        String(gsap.utils.clamp(0, 1, 1 - value * 6)),
      );
    };

    if (reducedMotion) {
      // No morph — rest in the header state so the logos don't double up.
      setT(0);
      return () => {
        document.documentElement.style.removeProperty("--sm-logo-opacity");
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    setT(1);

    const trigger = ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => setT(1 - self.progress),
      onRefresh: (self) => setT(1 - self.progress),
    });

    return () => {
      trigger.kill();
      document.documentElement.style.removeProperty("--sm-logo-opacity");
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} id="hero" data-name="Hero" className="hero-root">
      {/* Scroll distance for the morph. The inner layer is sticky, so the next
          section rides up over it. */}
      <div ref={stageRef} className="hero-stage">
        <div className="hero-pin">
          <div className="hero-backdrop">
            {/* Cursor-spotlight reveal: the base image is always visible; the
                reveal image shows only inside the soft circle trailing the
                pointer. Fills the backdrop, so it still fades on scroll and the
                vignette feathers its edges. */}
            <SpotlightReveal
              base={HERO.base}
              reveal={HERO.reveal}
              interactive={!reducedMotion}
            />
            {/* Feathers the image into the page background on all four edges. */}
            <div className="hero-vignette" aria-hidden />
          </div>

          {/* Wordmark: viewport-wide at rest, header-sized once scrolled. */}
          <a
            ref={markRef}
            href="#hero"
            className="hero-mark"
            aria-label={BRAND.name}
          >
            <span ref={markInnerRef} className="hero-mark-inner">
              {BRAND.wordmark}
            </span>
          </a>

          <div className="hero-content">
            <div className="hero-identity text-sm uppercase tracking-wider mb-3 text-muted">
              {HERO.identity}
            </div>
            <h1 className="hero-headline">
              <span className="block">{BRAND.headlineTop}</span>
              <span className="block">{BRAND.headlineBottom}</span>
            </h1>

            <p className="hero-statement">
              <span className="hero-statement-strong">
                {HERO.statementStrong}
              </span>{" "}
              <span className="hero-statement-muted">
                {HERO.statementMuted}
              </span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ArrowButton href={HERO.primaryCtaHref}>{HERO.primaryCtaLabel}</ArrowButton>
              <ArrowButton href={HERO.secondaryCtaHref} variant="outline">
                {HERO.secondaryCtaLabel}
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
