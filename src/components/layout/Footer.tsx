"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/services" },
      { label: "Best Sellers", href: "/services" },
      { label: "New Arrivals", href: "/services" },
      { label: "Build Your Routine", href: "/concerns" }
    ]
  },
  {
    title: "Learn",
    links: [
      { label: "Skin Guide", href: "/education" },
      { label: "Ingredients", href: "/education" },
      { label: "Journal", href: "/education" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partnership", href: "/about" },
      { label: "Contact", href: "/contact" }
    ]
  }
];

const socialLinks: { abbr: string; label: string; href: string }[] = [
  { abbr: "IG", label: "Instagram", href: "#" },
  { abbr: "X", label: "X (formerly Twitter)", href: "#" },
  { abbr: "TT", label: "TikTok", href: "#" },
  { abbr: "FB", label: "Facebook", href: "#" }
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = vh;
      const exit = -rect.height;
      const t = Math.max(0, Math.min(1, (rect.top - exit) / (enter - exit)));
      setProgress(1 - t);
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return (
    <footer
      ref={ref}
      role="contentinfo"
      aria-label="Site footer"
      className="on-dark relative bg-mocha text-light overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-espresso-radial opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-10">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-light-soft text-[10px] tracking-xxl uppercase italic font-serif mb-4">
            Your Skin Deserves Better
          </p>
          <h3 className="font-serif text-3xl md:text-5xl text-light leading-tight">
            Build a routine that works simple,
            <br />
            effective, and{" "}
            <span className="italic text-gold">made for real skin.</span>
          </h3>
          <Link
            href="/services"
            className="inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-pill border border-light/25 text-light text-[10.5px] uppercase tracking-xl hover:bg-light/10 hover:border-light/45 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-mocha"
          >
            Shop Now
            <span aria-hidden="true" className="inline-flex w-5 h-5 rounded-full border border-light/40 items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" focusable="false">
                <path
                  d="M1 8 L8 1 M3 1 H8 V6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mt-12 md:mt-20">
          <section className="col-span-2 md:col-span-3" aria-labelledby="footer-hq">
            <h2 id="footer-hq" className="text-[10px] tracking-xxl uppercase text-light-soft mb-3">
              Headquarter
            </h2>
            <address className="text-light text-sm leading-relaxed not-italic">
              1111 Oakfield Dr,
              <br />
              Brandon, FL 33511
              <br />
              United States
            </address>
            <ul className="flex items-center gap-3 mt-6" aria-label="Social media">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={`Follow Skin by Emely on ${s.label}`}
                    className="w-9 h-9 rounded-full border border-light/15 grid place-items-center text-[10px] tracking-xl hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-mocha"
                  >
                    <span aria-hidden="true">{s.abbr}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {cols.map((c) => (
            <nav
              key={c.title}
              aria-label={`${c.title} links`}
              className="col-span-1 md:col-span-3"
            >
              <h2 className="text-[10px] tracking-xxl uppercase text-gold mb-4">
                {c.title}
              </h2>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={`${c.title}-${l.label}`}>
                    <Link
                      href={l.href}
                      className="text-light/70 hover:text-light text-sm transition-colors focus-visible:outline-none focus-visible:text-light focus-visible:underline focus-visible:underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* GIANT animated wordmark — purely decorative */}
        <div
          aria-hidden="true"
          className="relative h-28 md:h-56 mt-8 md:mt-10 mb-5 md:mb-6 select-none pointer-events-none overflow-hidden"
        >
          <motion.div
            style={{
              y: `${(1 - progress) * 18}%`,
              opacity: 0.4 + progress * 0.6
            }}
            className="absolute inset-x-0 bottom-0 flex justify-center"
          >
            <span
              className="ghost-wordmark solid"
              style={{ fontSize: "clamp(120px, 18vw, 280px)" }}
            >
              skin
            </span>
          </motion.div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-light/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <small className="text-light/55 text-[11px] uppercase tracking-xl">
            &copy; {new Date().getFullYear()} Skin by Emely. All rights reserved.
          </small>
          <span className="text-light/55 text-[11px] uppercase tracking-xl italic font-serif">
            Made for real skin, everywhere.
          </span>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link
              href="#"
              className="text-light/55 hover:text-light text-[11px] uppercase tracking-xl focus-visible:outline-none focus-visible:text-light focus-visible:underline focus-visible:underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-light/55 hover:text-light text-[11px] uppercase tracking-xl focus-visible:outline-none focus-visible:text-light focus-visible:underline focus-visible:underline-offset-4"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
