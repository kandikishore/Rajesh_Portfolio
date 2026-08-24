import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { POSTS } from "@/lib/data";

export function Blog() {
  const [featuredPost, secondPost, thirdPost] = POSTS;

  return (
    <section id="blog" data-name="Blog" className="relative overflow-hidden py-24 lg:py-36">
      {/* Section Background Image with Opacity & Edge Blending */}
      <div className="absolute inset-0 -z-10 bg-ink">
        <Image
          src="/images/insights-bg.png"
          alt="Section Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45"
          priority
          unoptimized
        />
        {/* Seamless top and bottom blend gradient into page bg-ink */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent via-40% to-ink pointer-events-none" aria-hidden />
      </div>


      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SplitText
              as="h2"
              text="LATEST INSIGHTS"
              className="text-display-md tracking-wider text-white"
              stagger={0.02}
            />
          </div>

          <div className="flex items-center gap-4">
            <SectionLabel>(BLOG)</SectionLabel>
            <Link
              href="#blog"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-accent backdrop-blur-md transition-colors duration-300 hover:border-accent hover:bg-accent/10"
            >
              <span>SEE ALL</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* 3-Card Grid Floating Directly Over Section Background */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 1. TOP CARD (First Subsection - Heavy Frosted Glass & Text Blur, Unblurs on Hover) */}
          {featuredPost && (
            <div className="col-span-full">
              <Reveal variant="up" delay={0}>
                <Link
                  href={featuredPost.href}
                  className="group relative flex min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex-col justify-between overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-14 transition-all duration-500 hover:scale-[1.006]"
                >
                  {/* Frosted Glass Base Layer: Unblurs on hover */}
                  <div className="absolute inset-0 rounded-[32px] backdrop-blur-[16px] bg-black/55 group-hover:backdrop-blur-none group-hover:bg-black/20 shadow-[0_10px_40px_rgba(0,0,0,0.4)] pointer-events-none z-0 transition-all duration-500 ease-out" />
                  {/* Glass Sheen Gradient Layer */}
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/20 via-white/5 to-transparent group-hover:from-white/10 group-hover:via-transparent pointer-events-none z-1 transition-all duration-500 ease-out" />
                  {/* Specular Edge Highlights */}
                  <div className="absolute inset-0 rounded-[32px] shadow-[inset_2px_2px_4px_0_rgba(255,255,255,0.6),inset_-2px_-2px_4px_0_rgba(255,255,255,0.35),inset_0_0_0_1px_rgba(255,255,255,0.3)] pointer-events-none z-2" />

                  {/* Header Row: Category Badge & Date (Always crisp & visible) */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white font-sans backdrop-blur-md shadow-sm">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-white/90 font-sans">
                      {featuredPost.date}
                    </span>
                  </div>

                  {/* Body Content: Lightly blurred by default, Unblurs on Hover */}
                  <div className="relative z-10 blur-sm opacity-75 group-hover:blur-none group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="mt-8 sm:mt-12">
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-display text-white leading-tight transition-colors duration-300 group-hover:text-accent">
                        {featuredPost.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/85 font-sans">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    {/* Read Article Indicator */}
                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent font-sans">
                      <span>READ ARTICLE</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          )}

          {/* 2. LOWER LEFT CARD (Clear Liquid Water Glass Effect) */}
          {secondPost && (
            <div className="col-span-1 lg:col-span-5">
              <Reveal variant="up" delay={0.08} className="h-full">
                <Link
                  href={secondPost.href}
                  className="group relative flex h-full min-h-[270px] sm:min-h-[300px] flex-col justify-between overflow-hidden rounded-[32px] p-7 sm:p-8 transition-all duration-500 hover:scale-[1.006]"
                >
                  {/* Clear Glass Sheen Face */}
                  <div className="absolute inset-0 rounded-[32px] backdrop-blur-[3px] bg-gradient-to-br from-white/25 via-white/5 to-black/35 shadow-[0_10px_30px_rgba(0,0,0,0.35)] pointer-events-none z-0" />
                  {/* Specular Edge Highlights */}
                  <div className="absolute inset-0 rounded-[32px] shadow-[inset_2px_2px_4px_0_rgba(255,255,255,0.7),inset_-2px_-2px_4px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.5)] pointer-events-none z-1" />

                  {/* Category Badge & Date */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full border border-white/50 bg-white/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white font-sans backdrop-blur-md shadow-sm">
                      {secondPost.category}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-white/90 font-sans">
                      {secondPost.date}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="relative z-10 mt-6 sm:mt-8">
                    <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-display text-white leading-snug transition-colors duration-300 group-hover:text-accent">
                      {secondPost.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/90 font-sans line-clamp-3">
                      {secondPost.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </div>
          )}

          {/* 3. LOWER RIGHT CARD (Branding Subsection - Frosted Glass & Text Blur, Unblurs on Hover) */}
          {thirdPost && (
            <div className="col-span-1 lg:col-span-7">
              <Reveal variant="up" delay={0.14} className="h-full">
                <Link
                  href={thirdPost.href}
                  className="group relative flex h-full min-h-[270px] sm:min-h-[300px] flex-col justify-between overflow-hidden rounded-[32px] p-7 sm:p-8 transition-all duration-500 hover:scale-[1.006]"
                >
                  {/* Medium Frosted Glass Base Layer: Unblurs on hover */}
                  <div className="absolute inset-0 rounded-[32px] backdrop-blur-[24px] bg-black/60 group-hover:backdrop-blur-none group-hover:bg-black/20 shadow-[0_10px_40px_rgba(0,0,0,0.4)] pointer-events-none z-0 transition-all duration-500 ease-out" />
                  {/* Glass Sheen Gradient Layer */}
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/20 via-white/5 to-transparent group-hover:from-white/10 group-hover:via-transparent pointer-events-none z-1 transition-all duration-500 ease-out" />
                  {/* Specular Edge Highlights */}
                  <div className="absolute inset-0 rounded-[32px] shadow-[inset_2px_2px_4px_0_rgba(255,255,255,0.6),inset_-2px_-2px_4px_0_rgba(255,255,255,0.35),inset_0_0_0_1px_rgba(255,255,255,0.3)] pointer-events-none z-2" />

                  {/* Header Row: Category Badge & Date (Always crisp & visible) */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full border border-white/40 bg-white/20 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white font-sans backdrop-blur-md shadow-sm">
                      {thirdPost.category}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-white/90 font-sans">
                      {thirdPost.date}
                    </span>
                  </div>

                  {/* Title & Excerpt: Blurred by default, Unblurs on Hover */}
                  <div className="relative z-10 mt-6 sm:mt-8 blur-md opacity-50 group-hover:blur-none group-hover:opacity-100 transition-all duration-500 ease-out">
                    <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-display text-white leading-snug transition-colors duration-300 group-hover:text-accent">
                      {thirdPost.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/85 font-sans line-clamp-3">
                      {thirdPost.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
