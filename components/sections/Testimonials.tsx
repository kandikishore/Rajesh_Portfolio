import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TESTIMONIALS, TESTIMONIALS_INTRO } from "@/lib/data";

export function Testimonials() {
  return (
    <section data-name="Testimonials" className="py-28 lg:py-40">
      <div className="shell">
        <Reveal variant="fade">
          <SectionLabel>{TESTIMONIALS_INTRO.label}</SectionLabel>
        </Reveal>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal variant="up">
            <h3 className="max-w-2xl font-display text-3xl uppercase leading-tight tracking-display lg:text-4xl">
              {TESTIMONIALS_INTRO.heading}
            </h3>
          </Reveal>

          <Reveal variant="fade">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-6xl leading-none text-accent">
                {TESTIMONIALS_INTRO.rating}
              </span>
              <span className="text-sm text-muted">/5</span>
              <span className="ml-3 max-w-[10rem] text-xs leading-snug text-muted">
                {TESTIMONIALS_INTRO.ratingNote}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-16">
        <Marquee speed={55}>
          {TESTIMONIALS.map((testimonial, index) => (
            <figure
              key={`${testimonial.author}-${index}`}
              className="mx-3 flex w-[340px] shrink-0 flex-col justify-between rounded-xl border border-line bg-surface p-8 lg:w-[420px]"
            >
              <blockquote className="text-sm leading-relaxed text-muted-light">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full bg-line">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block text-sm font-medium">
                    {testimonial.author}
                  </span>
                  <span className="block text-xs text-muted">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
