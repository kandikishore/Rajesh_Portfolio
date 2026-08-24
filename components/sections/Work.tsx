"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SplitText } from "@/components/ui/SplitText";
import { PROJECTS, Project } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ProjectCardItem({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const frame = frameRef.current;
    const card = cardRef.current;
    const img = imageInnerRef.current;
    if (!frame || !card || !img) return;

    const ctx = gsap.context(() => {
      const isSmallScreen = window.innerWidth < 640;
      // Surrounding container frame starts contracted so image is partially framed inside
      gsap.set(frame, {
        clipPath: isSmallScreen
          ? "inset(6% 4% 6% 4% round 12px)"
          : "inset(14% 9% 14% 9% round 20px)",
        scale: isSmallScreen ? 0.96 : 0.92,
      });

      // Slower, smooth scroll-triggered surrounding frame expansion
      gsap.to(frame, {
        clipPath: "inset(0% 0% 0% 0% round 16px)",
        scale: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          end: "center 30%",
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      });

      // Inner image counter-scaling for deep parallax
      gsap.fromTo(
        img,
        { scale: 1.18 },
        {
          scale: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "center 30%",
            scrub: 1.8,
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={cardRef} className="group block">
      <Link href={project.href} className="block">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
          {/* Surrounding Frame with ScrollTrigger Un-clip Mask Reveal */}
          <div
            ref={frameRef}
            className="relative aspect-[1604/1340] overflow-hidden rounded-2xl bg-surface transition-shadow duration-500 group-hover:shadow-2xl"
          >
            <div ref={imageInnerRef} className="relative h-full w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1200px) 65vw, 100vw"
                className="object-cover transition-transform duration-700 ease-framer group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Project Details */}
          <div>
            <span className="font-display text-5xl text-line-soft transition-colors duration-300 group-hover:text-accent">
              {project.index}
            </span>
            <h3 className="mt-4 text-4xl tracking-display lg:text-5xl uppercase font-display text-paper group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wider text-muted-light"
                >
                  {tag}
                </span>
              ))}
              <span className="ml-auto text-xs text-muted">{project.year}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" data-name="Latest work" className="shell py-28 lg:py-40">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SplitText
          as="h2"
          text="Selected work"
          className="text-display-md tracking-wide"
          stagger={0.025}
        />
        <span className="eyebrow">({String(PROJECTS.length).padStart(2, "0")})</span>
      </div>

      <div className="mt-16 flex flex-col gap-20 lg:gap-28">
        {PROJECTS.map((project) => (
          <ProjectCardItem key={project.title} project={project} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <ArrowButton href="#" variant="outline">
          More projects
        </ArrowButton>
      </div>
    </section>
  );
}
