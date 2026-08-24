import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURED_TESTIMONIAL } from "@/lib/data";

export function TestimonialHighlight() {
  return (
    <section
      id="testimonial"
      data-name="Testimonial highlight"
      className="shell py-28 lg:py-40"
    >
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-xl border border-line bg-surface">
          <Image
            src={FEATURED_TESTIMONIAL.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />

          <div className="relative px-8 py-20 text-center lg:px-24 lg:py-32">
            <span
              aria-hidden
              className="font-display text-7xl leading-none text-accent"
            >
              &ldquo;
            </span>

            <blockquote className="mx-auto mt-6 max-w-4xl font-display text-3xl uppercase leading-tight tracking-display lg:text-5xl">
              {FEATURED_TESTIMONIAL.quote}
            </blockquote>

            <div className="mt-12 flex items-center justify-center gap-4">
              <span className="relative h-14 w-14 overflow-hidden rounded-full bg-line">
                <Image
                  src={FEATURED_TESTIMONIAL.avatar}
                  alt={FEATURED_TESTIMONIAL.author}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <div className="text-left">
                <p className="text-sm font-medium">
                  {FEATURED_TESTIMONIAL.author}
                </p>
                <p className="text-xs text-muted">{FEATURED_TESTIMONIAL.role}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
