import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT } from "@/lib/data";

export function About() {
  return (
    <section
      id="about"
      data-name="About"
      className="relative overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
        aria-hidden
      />

      {/* Readability overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.40) 45%, rgba(10,10,10,0.50) 70%, rgba(10,10,10,0.90) 88%, rgba(10,10,10,1) 100%)",
        }}
        aria-hidden
      />

      {/* Bottom-blend — fades image fully into the ink background of the next section */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "45%",
          background:
            "linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)",
        }}
        aria-hidden
      />

      {/* Top-blend — very subtle fade in from the section above */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "18%",
          background:
            "linear-gradient(to top, transparent 0%, #0A0A0A 100%)",
        }}
        aria-hidden
      />

      {/* Content sits above the overlay */}
      <div className="shell relative z-10 py-28 lg:py-40">
        <Reveal variant="fade">
          <SectionLabel>{ABOUT.label}</SectionLabel>
        </Reveal>

        <Reveal variant="up" className="mt-10 block">
          <p className="max-w-5xl font-display text-display-sm uppercase leading-[1.05] tracking-display">
            <span className="text-paper">{ABOUT.statementStrong}</span>
            <span className="text-muted">{ABOUT.statementMuted}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
