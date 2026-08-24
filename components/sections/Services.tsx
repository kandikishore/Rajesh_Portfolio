"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { SERVICES } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;

    if (reducedMotion || !section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const extraOffset = viewportWidth < 768 ? 60 : 160;
        return Math.max(0, trackWidth - viewportWidth + extraOffset);
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.25}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * SERVICES.length),
              SERVICES.length - 1
            );
            setActiveIndex(index);
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-name="How we can help"
      className="relative bg-ink overflow-hidden"
    >
      {/* Pinned Viewport Container */}
      <div className="flex h-screen flex-col justify-between py-6 sm:py-8 lg:py-10 shell">
        {/* Top Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SplitText
              as="h2"
              text="How we can help"
              className="text-display-md tracking-wider"
              stagger={0.02}
            />
          </div>

          <div className="flex items-center gap-6">
            {/* Step Counter Indicator */}
            <div className="flex items-center gap-2 font-display text-base uppercase tracking-wider text-muted">
              <span className="text-accent font-bold">
                0{activeIndex + 1}
              </span>
              <span>/</span>
              <span>0{SERVICES.length}</span>
            </div>

            <SectionLabel>(SERVICES)</SectionLabel>
          </div>
        </div>

        {/* Horizontal Scroll Track Cards */}
        <div className="my-auto overflow-hidden py-4 lg:py-6">
          <div
            ref={trackRef}
            className={`flex gap-6 lg:gap-10 pr-8 lg:pr-24 ${
              reducedMotion ? "flex-col w-full" : "w-max will-change-transform"
            }`}
          >
            {SERVICES.map((service, index) => (
              <article
                key={service.title}
                className={`group flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-12 rounded-none border border-line bg-surface p-6 sm:p-8 lg:p-10 shadow-2xl transition-colors duration-300 hover:border-line-soft ${
                  reducedMotion
                    ? "w-full"
                    : "w-[90vw] max-w-[1180px] xl:max-w-[1280px] flex-shrink-0"
                }`}
              >
                {/* Left Content */}
                <div className="flex flex-1 flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-accent font-bold">
                        {service.index}.
                      </span>
                      <span className="rounded-none border border-line bg-ink/50 px-4 py-1.5 text-xs sm:text-sm uppercase tracking-wider text-muted-light font-sans">
                        Service 0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display uppercase tracking-display text-paper group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted">
                      {service.blurb}
                    </p>
                  </div>
                </div>

                {/* Right Image (Enlarged, Sharp Corners) */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto w-full lg:w-[460px] xl:w-[540px] 2xl:w-[580px] h-[240px] sm:h-[300px] lg:h-[340px] xl:h-[380px] flex-shrink-0 overflow-hidden rounded-none bg-ink">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1280px) 580px, (min-width: 1024px) 460px, 100vw"
                    className="object-cover transition-transform duration-700 ease-framer group-hover:scale-105"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
