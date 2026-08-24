import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { Skiper52 } from "@/components/ui/skiper52";
import { PROCESS } from "@/lib/data";

export function Process() {
  return (
    <section
      id="process"
      data-name="How we work"
      className="bg-ink py-28 lg:py-40"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SplitText
            as="h2"
            text="How we work"
            className="text-display-md tracking-wider"
            stagger={0.02}
          />
          <SectionLabel>(PROCESS)</SectionLabel>
        </div>

        <div className="mt-16">
          <Reveal variant="up">
            <Skiper52 items={[...PROCESS]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
