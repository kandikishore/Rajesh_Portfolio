"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { BRAND, NAV_LINKS } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-framer ${
        scrolled ? "border-b border-line bg-ink/85 backdrop-blur-md" : ""
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-shell items-center justify-between px-6 py-5 lg:px-10"
      >
        <Link
          href="#hero"
          className="font-display text-2xl uppercase tracking-display flex items-center gap-2"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6 text-accent shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>{BRAND.name}</span>
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs uppercase tracking-wider text-muted-light transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <ArrowButton href="#cta" className="!px-5 !py-3">
            LET&apos;S WORK TOGETHER
          </ArrowButton>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`overflow-hidden border-t border-line bg-ink transition-[max-height] duration-500 ease-framer lg:hidden ${
          menuOpen ? "max-h-svh" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-line last:border-0">
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 font-display text-2xl uppercase tracking-display"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-8">
          <ArrowButton href="#cta" className="w-full justify-center">
            Get in touch
          </ArrowButton>
        </div>
      </div>
    </header>
  );
}
