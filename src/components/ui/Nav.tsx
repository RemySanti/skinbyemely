"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import MagneticButton from "../motion/MagneticButton";
import MobileNav from "./MobileNav";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Treatments" },
  { href: "/results", label: "Results" },
  { href: "/memberships", label: "Memberships" },
  { href: "/education", label: "Journal" },
  { href: "/contact", label: "Contact" }
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 32);
  });

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-xl border-b border-ink/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Skin by Emely — home"
          className={`font-serif italic text-xl tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm ${
            scrolled ? "text-ink focus-visible:ring-offset-ivory" : "text-light focus-visible:ring-offset-mocha"
          }`}
        >
          Skin <span aria-hidden="true" className="not-italic text-gold">·</span> Emely
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative uppercase text-[10.5px] tracking-xl transition-colors duration-300 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 ${
                  scrolled ? "focus-visible:ring-offset-ivory" : "focus-visible:ring-offset-mocha"
                } ${
                  active
                    ? scrolled
                      ? "text-gold-deep"
                      : "text-gold"
                    : scrolled
                      ? "text-ink/65 hover:text-ink"
                      : "text-light/65 hover:text-light"
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-500 ${
                    active ? "w-full bg-gold" : "w-0 bg-current group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:block">
            <MagneticButton
              href="/book"
              variant={scrolled ? "primary" : "outline-light"}
            >
              Book
            </MagneticButton>
          </div>

          {/* Hamburger — visible on screens without primary nav */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden inline-flex w-11 h-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              scrolled
                ? "text-ink hover:bg-ink/5 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                : "text-light hover:bg-light/10 focus-visible:ring-offset-2 focus-visible:ring-offset-mocha"
            }`}
          >
            <svg
              width="22"
              height="14"
              viewBox="0 0 22 14"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M1 1 H21 M1 7 H15 M1 13 H21"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-nav-panel">
        <MobileNav
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          links={links}
        />
      </div>
    </motion.header>
  );
}
