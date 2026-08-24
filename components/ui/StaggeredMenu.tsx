"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./StaggeredMenu.css";

export interface StaggeredMenuItem {
  label: string;
  /** Falls back to the label when omitted. */
  ariaLabel?: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

/** Vertical offset of each bar from centre at rest (px). Sets the gap between
 *  the two parallel bars; the bars converge to y:0 to form the X. */
const BAR_OFFSET = 3.5;

export interface StaggeredMenuProps {
  position?: "left" | "right";
  /** Underlay panels that slide in behind the menu, in order. Max 4. */
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  /** Path to a logo image. Ignored when `logoText` is set. */
  logoUrl?: string;
  /** Renders a text wordmark instead of an image. Takes precedence. */
  logoText?: string;
  /** Where the wordmark/logo links to. */
  logoHref?: string;
  /** Optional CTA rendered to the left of the toggle. Hidden when unset. */
  ctaLabel?: string;
  ctaHref?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  /** Pins the menu to the viewport as a fixed overlay header. */
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  /** Locks page scroll while the panel is open. */
  lockScroll?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

/**
 * StaggeredMenu — from React Bits, ported to TypeScript.
 *
 * Deviations from the upstream source, all additive:
 *  - `logoText` / `logoHref` render a wordmark, since this site has no logo file
 *  - honours `prefers-reduced-motion` by snapping instead of tweening
 *  - closes on Escape, and restores focus to the toggle
 *  - locks page scroll while open (`lockScroll`)
 *  - measures the toggle label so "Menu"/"Close" don't resize the button
 *  - `buildOpenTimeline` depends on `position` (upstream leaves it stale)
 */
export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#B497CF", "#5227FF"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  logoText,
  logoHref = "#hero",
  ctaLabel,
  ctaHref = "#cta",
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  accentColor = "#5227FF",
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  lockScroll = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  const panelRef = useRef<HTMLElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const barTopRef = useRef<HTMLSpanElement | null>(null);
  const barBottomRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  /* Park the panel and underlays offscreen before first paint. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const barTop = barTopRef.current;
      const barBottom = barBottomRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !barTop || !barBottom || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll<HTMLElement>(".sm-prelayer"),
        );
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      // Two parallel horizontal bars at rest (☰-style), converging to an X on open.
      gsap.set(barTop, { y: -BAR_OFFSET, rotate: 0 });
      gsap.set(barBottom, { y: BAR_OFFSET, rotate: 0 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  /* Pin the toggle to its widest label so cycling text doesn't resize it. */
  useLayoutEffect(() => {
    const wrap = textWrapRef.current;
    if (!wrap) return;

    const probe = document.createElement("span");
    probe.style.cssText =
      "position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none";
    probe.textContent = "Close";
    wrap.appendChild(probe);
    const closeW = probe.getBoundingClientRect().width;
    probe.textContent = "Menu";
    const menuW = probe.getBoundingClientRect().width;
    wrap.removeChild(probe);

    const widest = Math.ceil(Math.max(closeW, menuW));
    if (widest > 0) {
      wrap.style.setProperty("--sm-toggle-width", `${widest}px`);
    }
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"),
    );
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLElement>(
        ".sm-panel-list[data-numbering] .sm-panel-item",
      ),
    );
    const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
    const socialLinks = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-socials-link"),
    );

    const offscreen = position === "left" ? -100 : 100;

    // Reduced motion: place everything at its resting state, no travel.
    if (reducedMotionRef.current) {
      gsap.set([...layers, panel], { xPercent: 0 });
      if (itemEls.length) gsap.set(itemEls, { yPercent: 0, rotate: 0 });
      if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 1 });
      if (socialTitle) gsap.set(socialTitle, { opacity: 1 });
      if (socialLinks.length) gsap.set(socialLinks, { y: 0, opacity: 1 });
      return null;
    }

    const layerStates = layers.map((el) => ({ el, start: offscreen }));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: "opacity" });
            },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;

    const reset = () => {
      const itemEls = Array.from(
        panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"),
      );
      if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
      const numberEls = Array.from(
        panel.querySelectorAll<HTMLElement>(
          ".sm-panel-list[data-numbering] .sm-panel-item",
        ),
      );
      if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
      const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
      const socialLinks = Array.from(
        panel.querySelectorAll<HTMLElement>(".sm-socials-link"),
      );
      if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
      if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
      busyRef.current = false;
    };

    if (reducedMotionRef.current) {
      gsap.set(all, { xPercent: offscreen });
      reset();
      return;
    }

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: reset,
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const barTop = barTopRef.current;
    const barBottom = barBottomRef.current;
    if (!barTop || !barBottom) return;
    spinTweenRef.current?.kill();

    // Open: the two parallel bars converge to centre and rotate into an X.
    // Close: they part back to two horizontal bars.
    const topState = opening
      ? { y: 0, rotate: 45 }
      : { y: -BAR_OFFSET, rotate: 0 };
    const bottomState = opening
      ? { y: 0, rotate: -45 }
      : { y: BAR_OFFSET, rotate: 0 };

    if (reducedMotionRef.current) {
      gsap.set(barTop, topState);
      gsap.set(barBottom, bottomState);
      return;
    }

    const duration = opening ? 0.5 : 0.35;
    const ease = opening ? "power4.out" : "power3.inOut";
    gsap.to(barTop, { ...topState, duration, ease, overwrite: "auto" });
    spinTweenRef.current = gsap.to(barBottom, {
      ...bottomState,
      duration,
      ease,
      overwrite: "auto",
    });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();

      if (!changeMenuColorOnOpen) {
        gsap.set(btn, { color: menuButtonColor });
        return;
      }

      const targetColor = opening ? openMenuButtonColor : menuButtonColor;
      if (reducedMotionRef.current) {
        gsap.set(btn, { color: targetColor });
        return;
      }

      colorTweenRef.current = gsap.to(btn, {
        color: targetColor,
        delay: 0.18,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  useEffect(() => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    const targetColor = changeMenuColorOnOpen
      ? openRef.current
        ? openMenuButtonColor
        : menuButtonColor
      : menuButtonColor;
    gsap.set(btn, { color: targetColor });
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  /** Reels the label through Menu/Close a few times before landing. */
  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";

    if (reducedMotionRef.current) {
      setTextLines([targetLabel]);
      gsap.set(inner, { yPercent: 0 });
      return;
    }

    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  /* Freeze page scroll behind the panel.
     Applied imperatively rather than from an effect: clicking a panel link
     closes the menu and then relies on the global anchor handler to smooth
     scroll, which runs later in the same click. An effect cleanup would not
     have released the lock yet, so the scroll would start clamped. */
  const applyScrollLock = useCallback(
    (locked: boolean) => {
      if (!lockScroll) return;
      document.body.style.overflow = locked ? "hidden" : "";
    },
    [lockScroll],
  );

  /* Never leave the page locked if the menu unmounts while open. */
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    applyScrollLock(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    applyScrollLock,
    onMenuOpen,
    onMenuClose,
  ]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    applyScrollLock(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [
    playClose,
    animateIcon,
    animateColor,
    animateText,
    applyScrollLock,
    onMenuClose,
  ]);

  /* Click-away */
  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  /* Escape closes and returns focus to the toggle. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeMenu();
      toggleBtnRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  /* Underlays: upstream drops the middle colour when 3+ are supplied so the
     stagger stays legible. */
  const preLayerColors = (() => {
    const raw = colors && colors.length ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];
    const arr = [...raw];
    if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
    return arr;
  })();

  return (
    <div
      className={
        (className ? className + " " : "") +
        "staggered-menu-wrapper" +
        (isFixed ? " fixed-wrapper" : "")
      }
      style={
        accentColor
          ? ({ "--sm-accent": accentColor } as React.CSSProperties)
          : undefined
      }
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {preLayerColors.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation">
        <div className="sm-logo">
          {logoText ? (
            <a className="sm-logo-text" href={logoHref} aria-label={logoText}>
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-accent shrink-0"
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
              <span>{logoText}</span>
              <span className="sm-logo-dot" aria-hidden>
                .
              </span>
            </a>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={logoUrl}
              alt="Logo"
              className="sm-logo-img"
              draggable={false}
              width={110}
              height={24}
            />
          )}
        </div>

        <div className="sm-actions">
          {ctaLabel ? (
            <a className="sm-cta" href={ctaHref}>
              {ctaLabel}
            </a>
          ) : null}

          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
              <span ref={textInnerRef} className="sm-toggle-textInner">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={barTopRef} className="sm-icon-line" />
              <span ref={barBottomRef} className="sm-icon-line" />
            </span>
          </button>
        </div>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
        aria-label="Menu"
        data-lenis-prevent
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a
                    className="sm-panel-item"
                    href={it.link}
                    aria-label={it.ariaLabel ?? it.label}
                    data-index={idx + 1}
                    tabIndex={open ? 0 : -1}
                    onClick={closeMenu}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems.length > 0 ? (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                      tabIndex={open ? 0 : -1}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;


