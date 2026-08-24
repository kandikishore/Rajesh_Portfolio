import { Odometer } from "@/components/ui/Odometer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { STATS, WHY_US } from "@/lib/data";

export function WhyUs() {
  return (
    <section
      id="why-us"
      data-name="Why us"
      className="relative overflow-hidden bg-ink py-28 lg:py-40"
    >
      <div className="shell relative z-10">
        <Reveal variant="fade">
          <SectionLabel>{WHY_US.label}</SectionLabel>
        </Reveal>

        <SplitText
          as="h2"
          text={WHY_US.heading}
          className="mt-8 text-display-md tracking-wider text-white"
          stagger={0.02}
        />

        <div className="mt-20 grid gap-12 border-t border-line/40 pt-16 md:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} variant="up" delay={index * 0.08}>
              <div>
                <Odometer
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-display-sm leading-none tracking-display text-white"
                />
                <p className="mt-5 max-w-[15rem] text-sm leading-relaxed text-muted">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
