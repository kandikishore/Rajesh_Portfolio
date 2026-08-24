"use client";

import { StaggeredMenu } from "@/components/ui/StaggeredMenu";
import { BRAND, NAV_LINKS, SOCIALS } from "@/lib/data";

/**
 * Site header. Wires the shared content layer into StaggeredMenu — the panel
 * replaces the old inline navbar at every breakpoint, so there is no separate
 * desktop link row.
 */
export function SiteMenu() {
  const items = NAV_LINKS.map((link) => ({
    label: link.label,
    ariaLabel: link.ariaLabel,
    link: link.href,
  }));

  const socialItems = SOCIALS.map((social) => ({
    label: social.label,
    link: social.href,
  }));

  return (
    <StaggeredMenu
      position="right"
      isFixed
      items={items}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      logoText={BRAND.name}
      logoHref="#hero"
      ctaLabel="LET'S WORK TOGETHER"
      ctaHref="#cta"
      /* Accent-tinted underlays sweep in ahead of the ink panel. */
      colors={["#220F0D", "#FF4925"]}
      accentColor="#FF4925"
      menuButtonColor="#FFFFFF"
      openMenuButtonColor="#FF4925"
      changeMenuColorOnOpen
    />
  );
}
