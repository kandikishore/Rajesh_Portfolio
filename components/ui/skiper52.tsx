"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface Skiper52Item {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  body: string;
  subsections: string[];
  deliverables: string[];
  image: string;
}

interface Skiper52Props {
  items: Skiper52Item[];
}

/**
 * Skiper52 — ExpandOnHover / Interactive Process Cards (Transparent Variant)
 */
export function Skiper52({ items }: Skiper52Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  return (
    <div className="w-full">
      {/* Desktop & Tablet ExpandOnHover Flex Accordion */}
      <div className="hidden md:flex gap-4 min-h-[440px] w-full">
        {items.map((item, index) => {
          const isActive = activeId === item.id;

          return (
            <motion.div
              key={item.id}
              layout
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              transition={{
                layout: { type: "spring", stiffness: 240, damping: 26, mass: 0.8 },
                duration: 0.6,
              }}
              className={`relative cursor-pointer overflow-hidden rounded-none border flex flex-col justify-between transition-colors duration-500 ease-out ${
                isActive
                  ? "flex-[3.8] border-line-soft bg-surface/30 shadow-2xl p-7 lg:p-8"
                  : "flex-1 border-line bg-transparent hover:border-line-soft p-5 lg:p-6"
              }`}
            >
              {/* Card Header Top */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-display text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {item.step}
                </span>

                <span className="rounded-none border border-line px-3 py-1 text-[11px] font-sans uppercase tracking-wider text-muted-light">
                  0{index + 1}
                </span>
              </div>

              {/* Inactive Condensed Title */}
              {!isActive && (
                <div className="my-auto pt-6">
                  <h3 className="font-display text-xl lg:text-2xl uppercase tracking-display text-paper leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              )}

              {/* Active Expanded Content Section */}
              <AnimatePresence mode="sync">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 flex flex-col lg:flex-row justify-between gap-6 flex-1"
                  >
                    <div className="flex flex-col justify-between flex-1 h-full">
                      <div>
                        <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl uppercase tracking-display text-paper">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm uppercase tracking-wider text-accent font-semibold">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Subsections List (Shifted Down Left) */}
                      <div className="mt-auto pt-6 lg:pt-8">
                        <ul className="grid grid-cols-1 gap-2.5">
                          {item.subsections.map((sub) => (
                            <li
                              key={sub}
                              className="flex items-center gap-2.5 text-xs sm:text-sm lg:text-base text-paper font-medium font-sans"
                            >
                              <span className="h-2 w-2 rounded-none bg-accent flex-shrink-0" />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Image */}
                    {item.image && (
                      <div className="relative aspect-[16/10] lg:aspect-[4/3] w-full lg:w-[260px] xl:w-[320px] h-[180px] lg:h-[220px] flex-shrink-0 overflow-hidden rounded-none bg-ink">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 320px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Stacked Accordion */}
      <div className="flex md:hidden flex-col gap-4">
        {items.map((item, index) => {
          const isActive = activeId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActiveId(isActive ? "" : item.id)}
              className={`rounded-none border bg-transparent p-5 transition-colors duration-300 ${
                isActive ? "border-line-soft" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl font-bold text-accent">
                    {item.step}
                  </span>
                  <h3 className="font-display text-base uppercase tracking-display text-paper">
                    {item.title}
                  </h3>
                </div>

                <span className="text-xs text-muted">0{index + 1}</span>
              </div>

              {isActive && (
                <div className="mt-4 pt-4 border-t border-line space-y-3">
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold">
                    {item.subtitle}
                  </p>

                  <ul className="space-y-1.5">
                    {item.subsections.map((sub) => (
                      <li
                        key={sub}
                        className="flex items-center gap-2 text-xs text-muted-light"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
