"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { FAQ as FAQ_ITEMS } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      data-name="FAQ"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/faq-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
      </div>

      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SplitText
            as="h2"
            text="FAQ"
            className="text-display-md tracking-wider"
            stagger={0.03}
          />
          <SectionLabel>(ANSWERS)</SectionLabel>
        </div>

        <div className="mt-16 border-t border-line">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = open === index;

            return (
              <Reveal key={item.question} variant="up" delay={index * 0.04}>
                <div
                  className="group border-b border-line"
                  onMouseEnter={() => setOpen(index)}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      onMouseEnter={() => setOpen(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-300 hover:text-accent group-hover:text-accent"
                    >
                      <span className="font-display text-xl uppercase tracking-display lg:text-2xl">
                        {item.question}
                      </span>
                      <span
                        aria-hidden
                        className={`shrink-0 text-2xl text-accent transition-transform duration-300 ease-framer ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${index}`}
                    aria-hidden={!isOpen}
                    className="grid transition-all duration-500 ease-framer"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-8 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
