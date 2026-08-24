"use client";

import { useState } from "react";
import { Odometer } from "@/components/ui/Odometer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ANNUAL_DISCOUNT, PRICING } from "@/lib/data";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" data-name="Pricing" className="shell py-28 lg:py-40">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SplitText
          as="h2"
          text="Pricing"
          className="text-display-md tracking-wider"
          stagger={0.02}
        />
        <SectionLabel>(PLANS)</SectionLabel>
      </div>

      {/* Monthly / annual toggle */}
      <div className="mt-12 flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex items-center rounded-full border border-line bg-surface p-1"
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={`rounded-full px-6 py-2.5 text-xs uppercase tracking-wider transition-colors duration-300 ${
              annual ? "text-muted hover:text-paper" : "bg-accent text-paper"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs uppercase tracking-wider transition-colors duration-300 ${
              annual ? "bg-accent text-paper" : "text-muted hover:text-paper"
            }`}
          >
            Annual
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                annual ? "bg-ink/30 text-paper" : "bg-accent-ring text-accent"
              }`}
            >
              &minus;{ANNUAL_DISCOUNT}%
            </span>
          </button>
        </div>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PRICING.map((tier, index) => {
          const price = annual ? tier.annual : tier.monthly;

          return (
            <Reveal key={tier.name} variant="up" delay={index * 0.06}>
              <article
                className={`flex h-full flex-col rounded-xl border p-8 transition-colors duration-300 lg:p-10 ${
                  tier.featured
                    ? "border-accent bg-accent-tint shadow-glow"
                    : "border-line bg-surface hover:border-line-soft"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl tracking-display">{tier.name}</h3>
                  {tier.featured ? (
                    <span className="rounded-full bg-accent px-3 py-1 text-[10px] uppercase tracking-wider">
                      Popular
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {tier.blurb}
                </p>

                <div className="mt-8 flex items-baseline gap-1">
                  {price === null ? (
                    <span className="font-display text-5xl tracking-display">
                      Let&rsquo;s talk
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-3xl text-muted">$</span>
                      <Odometer
                        value={price}
                        className="font-display text-5xl leading-none tracking-display"
                      />
                      <span className="ml-1 text-sm text-muted">/mo</span>
                    </>
                  )}
                </div>

                <ul className="mt-8 flex flex-1 flex-col gap-3 border-t border-line pt-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-muted-light"
                    >
                      <span className="mt-1.5 text-accent" aria-hidden>
                        +
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <ArrowButton
                  href="#cta"
                  variant={tier.featured ? "solid" : "outline"}
                  className="mt-10 justify-center"
                >
                  {tier.cta}
                </ArrowButton>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
