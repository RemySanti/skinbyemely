"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "../motion/MagneticButton";
import CountUp from "../motion/CountUp";
import CinematicLoop from "../motion/CinematicLoop";
import { brandImages } from "@/lib/content";

export default function Hero() {
  const heroClips = [
    "https://cdn.coverr.co/videos/coverr-skincare-routine-1576/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-woman-smiling-1579/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-woman-on-the-beach-9717/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-young-woman-getting-ready-3766/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-woman-looking-confident-1578/1080p.mp4"
  ];

  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yWord = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="on-dark relative min-h-[100svh] flex flex-col bg-mocha overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-espresso-radial opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(168,144,116,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(31,22,15,0.6),transparent_50%)]" />
      </div>

      {/* Ghost wordmark — purely decorative typography, hidden from a11y tree */}
      <motion.div
        aria-hidden="true"
        style={{ y: yWord }}
        className="hidden md:flex absolute inset-x-0 top-[44%] -translate-y-1/2 justify-center pointer-events-none select-none z-[1]"
      >
        <span
          className="ghost-wordmark"
          style={{
            fontSize: "clamp(120px, 20vw, 320px)",
            WebkitTextStroke: "1px rgba(239,229,212,0.10)"
          }}
        >
          emely
        </span>
      </motion.div>

      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1400px] mx-auto px-5 md:px-12 pt-24 md:pt-28 pb-8 md:pb-10">
        <div className="grid grid-cols-12 gap-6 items-end w-full">
          {/* Left column */}
          <div className="col-span-12 md:col-span-3 order-2 md:order-1">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-serif text-3xl md:text-4xl text-light leading-none">
                <CountUp to={99.9} decimals={1} duration={2.2} />
                <span className="text-light/55 text-base align-top ml-1">%</span>
              </div>
              <div className="text-light/70 text-[10.5px] tracking-xl uppercase mt-2">
                Real client results
              </div>

              <div
                className="flex items-center gap-2 mt-5"
                role="group"
                aria-label="Trusted by 812 clients"
              >
                <div className="flex -space-x-2" aria-hidden="true">
                  {[brandImages.founder, brandImages.facial, brandImages.service2].map(
                    (src, i) => (
                      <div
                        key={i}
                        className="relative w-7 h-7 rounded-full overflow-hidden border border-light/30"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
                <span className="text-[10px] tracking-xl uppercase text-light/70">
                  +812 clients
                </span>
              </div>

              <p className="text-light/75 text-xs leading-relaxed mt-6 max-w-xs">
                Designed for real-life skin concerns &mdash; breakouts, texture,
                sensitivity, and barrier stress. Thoughtful plans. No overwhelm.
              </p>
            </motion.div>
          </div>

          {/* Center — model image with framed product overlay */}
          <div className="col-span-12 md:col-span-6 order-1 md:order-2">
            <motion.div style={{ y: yImage }} className="relative w-full">
              <motion.div
                initial={false}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="relative aspect-[4/5] md:aspect-[5/6] rounded-[2px] overflow-hidden"
              >
                <motion.div
                  initial={false}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full"
                >
                  <CinematicLoop clips={heroClips} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-black/8" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_78%,rgba(22,12,7,0.62),transparent_56%)]" />
                </motion.div>
              </motion.div>

              <div className="mt-4 md:mt-5 flex flex-wrap gap-2">
                <MagneticButton href="#systems" variant="primary">
                  Find your starting point
                </MagneticButton>
                <MagneticButton href="/book" variant="outline-light">
                  Book a consultation
                </MagneticButton>
              </div>

              {/* Headline overlay (desktop) / stacked card (mobile) */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="relative md:absolute left-0 md:left-8 mt-4 md:mt-0 md:bottom-8 max-w-full md:max-w-[80%]"
              >
                <div className="rounded-2xl border border-light/28 bg-black/34 backdrop-blur-md px-4 py-3 md:px-6 md:py-5 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
                  <p className="text-light/90 text-[10px] tracking-xxl uppercase italic font-serif mb-2">
                    Gentle, results-first care
                  </p>
                  <h1
                    id="hero-heading"
                    className="font-serif text-light text-3xl md:text-5xl leading-[1.05] [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
                  >
                    Feel at home in{" "}
                    <span className="italic">your skin again.</span>
                  </h1>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="col-span-12 md:col-span-3 order-3 md:order-3">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="md:text-right"
            >
              <figure>
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-light/30 mb-4 md:ml-auto">
                  <Image
                    src={brandImages.founder}
                    alt="Portrait of Anna Hathaway, beauty vlogger"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <blockquote>
                  <p className="text-light/85 text-xs leading-relaxed italic">
                    &ldquo;For the first time, I understood what my skin needed.
                    The plan felt simple, and the results felt real.&rdquo;
                  </p>
                </blockquote>
                <figcaption>
                  <div className="text-light text-[10px] tracking-xl uppercase mt-3">
                    Anna Hathaway
                  </div>
                  <div className="text-light/65 text-[10px] tracking-xl uppercase">
                    Client
                  </div>
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 border-t border-light/12 bg-mocha/60 backdrop-blur-md hidden md:block"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between flex-wrap gap-4">
          <p className="text-light text-[10.5px] tracking-xxl uppercase">
            <span className="text-gold">Brandon, FL</span>
            <span className="text-light/50 mx-3">·</span>
            By appointment
          </p>

          <div className="flex items-center gap-3">
            <MagneticButton href="#systems" variant="primary">
              Find your starting point
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline-light">
              Book a consultation
            </MagneticButton>
          </div>

          <Link
            href="#problem"
            aria-label="Scroll to next section"
            className="text-light/70 text-[10px] tracking-xl uppercase hover:text-light transition-colors flex items-center gap-2"
          >
            <span className="hidden md:inline" aria-hidden="true">Scroll</span>
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              &darr;
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
