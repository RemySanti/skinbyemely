"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { brandImages } from "@/lib/content";

export type BentoGridItem = {
  index: string;
  label: string;
  title: string;
  description: string;
  span?: 3 | 4 | 5 | 6 | 7 | 8;
  /** Full-bleed card background — image is decorative layer behind text */
  image: string;
  imageAlt: string;
  /** Larger spans can use taller minimum height */
  minHeight?: "md" | "lg" | "xl";
};

type Props = {
  items?: BentoGridItem[];
  tone?: "light" | "dark";
};

const minHeightClass: Record<NonNullable<BentoGridItem["minHeight"]>, string> = {
  md: "min-h-[220px] sm:min-h-[240px]",
  lg: "min-h-[260px] sm:min-h-[280px] md:min-h-[300px]",
  xl: "min-h-[280px] sm:min-h-[320px] md:min-h-[380px]"
};

export const defaultBentoItems: BentoGridItem[] = [
  {
    index: "01",
    label: "Treatment System",
    title: "Custom facial architecture",
    description:
      "Every treatment is engineered around your skin's lifecycle: clarify, restore, sculpt.",
    span: 5,
    image: brandImages.facial,
    imageAlt: "Client receiving a customized facial treatment",
    minHeight: "lg"
  },
  {
    index: "02",
    label: "Diagnostic layer",
    title: "Skin intelligence",
    description:
      "Tactile and visual analysis, lifestyle mapping, and 90-day protocol planning.",
    span: 4,
    image: brandImages.science,
    imageAlt: "Clinical skincare analysis and formulation in studio",
    minHeight: "md"
  },
  {
    index: "03",
    label: "Results",
    title: "Long-term skin health",
    description:
      "Memberships designed to compound results across seasons, not spike-and-fade fixes.",
    span: 3,
    image: brandImages.service1,
    imageAlt: "Skincare routine and sustainable results focus",
    minHeight: "md"
  },
  {
    index: "04",
    label: "Method",
    title: "The Emely method",
    description:
      "A signature methodology balancing clinical structure with editorial, calm pacing.",
    span: 7,
    image: brandImages.hero,
    imageAlt: "Warm studio treatment atmosphere",
    minHeight: "xl"
  },
  {
    index: "05",
    label: "Brand",
    title: "Editorial identity",
    description:
      "Considered, slow, intentional — skin care that feels like architecture, not noise.",
    span: 5,
    image: brandImages.service3,
    imageAlt: "Premium skin care packaging and ritual",
    minHeight: "lg"
  }
];

const colSpan: Record<number, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8"
};

export default function BentoGrid({ items = defaultBentoItems, tone = "light" }: Props) {
  const reduced = useReducedMotion();
  const dark = tone === "dark";

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 lg:gap-7 auto-rows-fr"
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      animate={reduced ? "visible" : undefined}
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } }
      }}
    >
      {items.map((it) => (
        <motion.div
          key={it.index}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
            }
          }}
          whileHover={reduced ? undefined : { y: -4 }}
          whileTap={reduced ? undefined : { scale: 0.995 }}
          className={`${colSpan[it.span ?? 4]} col-span-1 h-full`}
        >
          <div
            className={[
              "group relative h-full overflow-hidden rounded-[28px]",
              /* consistent outer frame */
              dark
                ? "ring-1 ring-inset ring-light/15 shadow-none"
                : "ring-1 ring-inset ring-ink/[0.06] shadow-soft"
            ].join(" ")}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 z-[1] pointer-events-none"
              animate={
                reduced
                  ? undefined
                  : {
                      opacity: [0.18, 0.28, 0.18],
                      scale: [1, 1.02, 1]
                    }
              }
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 6.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
              }
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_26%,rgba(255,255,255,0.15),transparent_45%)]" />
            </motion.div>

            <Image
              src={it.image}
              alt={it.imageAlt}
              fill
              sizes={
                it.span === 7
                  ? "(max-width: 768px) 100vw, 58vw"
                  : it.span === 5
                    ? "(max-width: 768px) 100vw, 42vw"
                    : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              priority={it.index === "01"}
            />
            {/* Readability overlays — layered like editorial beauty sites */}
            <div
              className={
                dark
                  ? "absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/35"
                  : "absolute inset-0 bg-gradient-to-t from-mocha/95 via-mocha/72 to-mocha/35"
              }
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45"
              aria-hidden="true"
            />

            <div
              className={[
                "relative z-10 flex flex-col justify-end",
                minHeightClass[it.minHeight ?? "md"],
                "p-6 sm:p-7 md:p-8 lg:p-9"
              ].join(" ")}
            >
              {/* Dedicated readability panel so text remains visible on all media */}
              <motion.div
                className="rounded-2xl bg-black/45 border border-white/10 backdrop-blur-[1px] px-5 py-4 md:px-6 md:py-5"
                animate={reduced ? undefined : { y: [0, -1.5, 0] }}
                transition={
                  reduced
                    ? undefined
                    : {
                        duration: 5.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                }
              >
                <div className="flex items-center justify-between gap-4 mb-3 md:mb-4">
                  <motion.span
                    className="text-[10px] tracking-xxl uppercase shrink-0"
                    style={{ color: "#c8a877", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                    animate={reduced ? undefined : { opacity: [0.72, 1, 0.72] }}
                    transition={reduced ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {it.index}
                  </motion.span>
                  <span
                    className="text-[10px] tracking-xl uppercase text-right line-clamp-2"
                    style={{ color: "rgba(245,239,229,0.92)", textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                  >
                    {it.label}
                  </span>
                </div>

                <h3
                  className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.1] max-w-xl"
                  style={{ color: "#f5efe5", textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
                >
                  {it.title}
                </h3>
                <p
                  className="text-sm md:text-base mt-3 max-w-lg leading-relaxed"
                  style={{ color: "rgba(245,239,229,0.96)", textShadow: "0 1px 6px rgba(0,0,0,0.75)" }}
                >
                  {it.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
