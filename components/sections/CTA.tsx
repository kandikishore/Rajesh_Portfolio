import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CTA as CTA_CONTENT } from "@/lib/data";

export function CTA() {
  return (
    <section
      id="cta"
      data-name="CTA Wrapper"
      className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden bg-ink py-24 lg:py-36"
    >
      {/* Sized & Framed Statue Image on the Right */}
      <div className="absolute right-0 top-0 bottom-0 z-0 pointer-events-none w-full sm:w-[60%] lg:w-[48%] xl:w-[42%] overflow-hidden">
        <Image
          src={CTA_CONTENT.image}
          alt="CTA Background Statue"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Soft Vignette Edge Fades */}
        <div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.5) 30%, transparent 70%), linear-gradient(to top, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)",
          }}
        />
      </div>

      <div className="shell relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Giant Display Headline */}
        <div className="lg:col-span-7 xl:col-span-8">
          <Reveal variant="up">
            <h2 className="font-display text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[8.25rem] uppercase leading-[0.92] tracking-display text-paper">
              <div className="mb-2 lg:mb-3">{CTA_CONTENT.headingLine1}</div>
              <div>{CTA_CONTENT.headingLine2}</div>
            </h2>
          </Reveal>
        </div>

        {/* Right Column: Paragraph Blurb & Red Accent Pill Button */}
        <div className="flex flex-col items-start space-y-8 lg:col-span-4 lg:pl-6">
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-sm font-sans text-sm sm:text-base lg:text-lg leading-relaxed text-muted-light">
              {CTA_CONTENT.blurb}
            </p>
          </Reveal>

          <Reveal variant="fade" delay={0.2}>
            <Link
              href={CTA_CONTENT.buttonHref}
              className="group inline-flex items-center justify-center rounded-full border border-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-paper shadow-glow"
            >
              {CTA_CONTENT.buttonLabel}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
