"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "@/components/layout/Hero";
import Badge from "@/components/ui/Badge";
import Reveal, { RevealStagger, StaggerItem } from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";
import MaskedImage from "@/components/motion/MaskedImage";
import MagneticButton from "@/components/motion/MagneticButton";
import CountUp from "@/components/motion/CountUp";
import Marquee from "@/components/motion/Marquee";
import SwipeRail from "@/components/ui/SwipeRail";
import BentoGrid from "@/components/layout/BentoGrid";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import {
  brandImages,
  skinSystems,
  userJourney
} from "@/lib/content";

const principles = [
  {
    k: "Diagnose",
    v: "We listen first, then assess your skin in detail so your plan starts from reality."
  },
  {
    k: "Architect",
    v: "Your protocol is mapped over months, so each visit builds on the one before."
  },
  {
    k: "Refine",
    v: "As your skin changes, we adapt your treatment rhythm and homecare with you."
  }
];

const memberships = [
  {
    name: "Atelier",
    price: "$165",
    cadence: "monthly",
    points: ["1 signature facial", "Priority booking", "10% on retail"]
  },
  {
    name: "Studio",
    price: "$285",
    cadence: "monthly",
    points: ["1 facial + 1 treatment", "Quarterly skin map", "15% on retail"]
  },
  {
    name: "Architect",
    price: "$525",
    cadence: "monthly",
    points: [
      "Unlimited maintenance facials",
      "Custom protocol builds",
      "20% on retail + add-ons"
    ]
  }
];

const reviews = [
  {
    quote:
      "I stopped guessing. My skin is calmer, clearer, and my routine finally feels doable.",
    name: "Anna Hathaway",
    role: "Beauty Vlogger",
    image: brandImages.facial
  },
  {
    quote: "I saw texture and redness improve within a month, without feeling pushed to buy everything.",
    name: "Maya Roberts",
    role: "Studio Member",
    image: brandImages.founder
  },
  {
    quote: "They treat acne with care and consistency, not trends. I felt supported at every step.",
    name: "Lila Chen",
    role: "Founding Client",
    image: brandImages.service2
  }
];

export default function Home() {
  useGsapScroll();

  return (
    <>
      <Hero />

      {/* MARQUEE STRIP — decorative, hidden from a11y tree */}
      <div
        aria-hidden="true"
        className="bg-ivory border-y border-ink/10 py-5 md:py-6 overflow-hidden"
      >
        <Marquee speed={48}>
          {[
            "Custom Protocols",
            "Clinical Luxury",
            "Real Results",
            "Brandon FL · By Appointment",
            "Built for Real Skin",
            "Slow Skincare",
            "Editorial Care"
          ].map((t, i) => (
            <span
              key={i}
              className="font-serif italic text-[clamp(1.9rem,5.6vw,2.15rem)] md:text-3xl text-ink/70 inline-flex items-center gap-8 md:gap-12 whitespace-nowrap"
            >
              {t}
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* PROBLEM / PROMISE — sets up the story */}
      <section id="problem" aria-labelledby="problem-heading" className="bg-ivory">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 py-14 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Badge>The honest part</Badge>
              </Reveal>
              <RevealText
                as="h2"
                id="problem-heading"
                text="You do not need a complicated routine."
                className="font-serif text-ink text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]"
                stagger={0.05}
              />
              <Reveal delay={0.4} y={20}>
                <p className="font-serif italic text-ink/85 text-2xl md:text-4xl leading-tight mt-3">
                  You need care that fits your life.
                </p>
              </Reveal>
              <Reveal delay={0.6} className="mt-8">
                <p className="text-ink/75 text-base md:text-lg leading-relaxed max-w-xl">
                  If your skin has felt confusing, you are not alone. We guide
                  you from uncertainty to clarity with a plan that explains what
                  is happening, what to do next, and what results to expect.
                </p>
              </Reveal>
              <Reveal delay={0.8} className="mt-8">
                <ul className="space-y-3 text-ink/80 text-sm md:text-base">
                  {[
                    "No trend chasing.",
                    "No 20-product overwhelm.",
                    "No guessing what comes next."
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-baseline gap-3 border-t border-ink/10 pt-3"
                    >
                      <span className="text-gold-deep text-[10px] tracking-xl uppercase">
                        ·
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="hidden md:block md:col-span-5">
              <MaskedImage
                src={brandImages.science}
                alt="Considered skincare in studio"
                width={800}
                height={1000}
                className="w-full aspect-[4/5]"
                rounded="rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENTO — full-bleed media cards */}
      <section
        aria-labelledby="bento-heading"
        className="bg-linen py-12 md:py-24 lg:py-28"
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-7 md:mb-12 lg:mb-14">
            <Reveal>
              <Badge>Studio at a glance</Badge>
            </Reveal>
            <RevealText
              as="h2"
              id="bento-heading"
              text="What your care journey looks like."
              className="font-serif text-ink text-3xl md:text-5xl lg:text-6xl mt-6 leading-tight"
              stagger={0.05}
            />
            <Reveal delay={0.35}>
              <p className="text-ink/70 text-base md:text-lg leading-relaxed mt-5 max-w-2xl">
                From assessment to maintenance, every part of your experience is
                designed to feel calm, clear, and genuinely supportive.
              </p>
            </Reveal>
          </div>
          <BentoGrid />
        </div>
      </section>

      {/* THE 3 SKIN SYSTEMS — the heart of the page */}
      <section
        id="systems"
        aria-labelledby="systems-heading"
        className="on-dark relative bg-mocha overflow-hidden py-14 md:py-32"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-espresso-radial opacity-50 pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
            <Reveal>
              <Badge tone="dark">The Three Skin Systems</Badge>
            </Reveal>
            <RevealText
              as="h2"
              id="systems-heading"
              text="One clear path. Three treatment phases."
              className="font-serif text-light text-4xl md:text-6xl mt-6 leading-tight inline-block"
              stagger={0.05}
            />
            <Reveal delay={0.4}>
              <p className="text-light/80 text-base md:text-lg leading-relaxed mt-6">
                We start where your skin is today, then guide you through the
                right phase at the right time.
              </p>
            </Reveal>
          </div>

          <SwipeRail
            cols={3}
            mobileWidth={85}
            ariaLabel="Skin systems carousel"
            lockVerticalScroll
            className="text-light"
          >
            {skinSystems.map((s) => (
              <motion.article
                key={s.slug}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full flex flex-col rounded-xl2 overflow-hidden bg-bark/45 border border-light/12 backdrop-blur-xl hover:bg-bark/65 hover:border-light/20 transition-all duration-500"
              >
                  <div className="relative h-56 md:h-64 w-full overflow-hidden shrink-0">
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={s.image}
                        alt={`${s.name} system`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-bark/95 via-bark/30 to-transparent" />
                    <div className="absolute top-6 left-7 flex items-center gap-3">
                      <span className="text-gold text-[10px] tracking-xxl uppercase">
                        {s.number}
                      </span>
                      <span className="h-px w-8 bg-gold/45" />
                      <span className="text-light/70 text-[10px] tracking-xl uppercase">
                        System
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-7 right-7">
                      <h3 className="font-serif text-4xl md:text-5xl text-light leading-none">
                        {s.name}
                      </h3>
                      <p className="mt-3">
                        <span className="inline-block max-w-full rounded-[999px] border border-light/22 bg-black/28 px-4 py-2 md:px-5 md:py-2.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                          <span className="font-serif italic text-light text-base md:text-lg leading-snug [text-wrap:balance]">
                            {s.promise}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-7 md:p-8">
                    <div>
                      <p className="text-[10px] tracking-xxl uppercase text-gold mb-3">
                        For
                      </p>
                      <p className="text-light text-sm md:text-base leading-relaxed">
                        {s.forWho}
                      </p>
                    </div>

                    <div className="mt-7">
                      <p className="text-[10px] tracking-xxl uppercase text-gold mb-3">
                        Outcomes
                      </p>
                      <ul className="space-y-0">
                        {s.outcomes.map((o) => (
                          <li
                            key={o}
                            className="flex gap-3 text-light/85 text-sm leading-relaxed border-t border-light/10 py-2.5"
                          >
                            <span className="text-gold mt-0.5 shrink-0">·</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7">
                      <p className="text-[10px] tracking-xxl uppercase text-gold mb-3">
                        Includes
                      </p>
                      <ul className="space-y-2">
                        {s.treatments.map((t) => (
                          <li key={t} className="text-light/75 text-sm leading-relaxed">
                            &mdash; {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pinned footer */}
                    <div className="mt-auto pt-8">
                      <div className="flex items-end justify-between pt-5 border-t border-light/10">
                        <div>
                          <div className="text-[10px] tracking-xl uppercase text-light/55">
                            From
                          </div>
                          <div className="font-serif text-light text-2xl mt-1">
                            {s.startingAt}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] tracking-xl uppercase text-light/55">
                            Time
                          </div>
                          <div className="font-serif text-light text-lg mt-1">
                            {s.duration}
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/services"
                        className="inline-flex items-center gap-2 mt-6 text-gold uppercase text-[10px] tracking-xl group/link"
                      >
                        <span className="border-b border-gold/40 pb-1 group-hover/link:border-gold transition-colors">
                          Explore the {s.name} system
                        </span>
                        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
              </motion.article>
            ))}
          </SwipeRail>

          <Reveal delay={0.4} className="mt-12 text-center">
            <p className="text-light/70 text-sm">
              Not sure where you fit?{" "}
              <Link
                href="/contact"
                className="text-gold border-b border-gold/40 hover:border-gold transition-colors uppercase tracking-xl text-[10.5px] ml-2"
              >
                Start with a consultation
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* "BABYSIT YOU" SPLIT PANEL — brand voice */}
      <section aria-labelledby="babysit-heading" className="bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 rounded-xl2 overflow-hidden">
            {/* LEFT image panel */}
            <div className="on-dark md:col-span-7 relative bg-bark min-h-[360px] md:min-h-[640px] overflow-hidden">
              <div data-parallax="40" className="absolute inset-0">
                <Image
                  src={brandImages.science}
                  alt="Hands holding a clinical skincare product, illustrating the studio's minimalist routine philosophy"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-mocha/85 via-mocha/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-mocha/70 via-transparent to-transparent" />

              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
                <p className="inline-flex w-fit max-w-max whitespace-nowrap items-center rounded-pill border border-light/35 bg-black/35 px-2.5 py-1.5 text-light text-[10px] tracking-xxl uppercase italic font-serif backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.28)]">
                  The Beauty
                </p>

                <div>
                  <div aria-hidden="true">
                    <RevealStagger className="flex gap-3 mb-6" stagger={0.08}>
                      {[
                        brandImages.service1,
                        brandImages.service2,
                        brandImages.service3
                      ].map((src, i) => (
                        <StaggerItem key={i}>
                          <motion.div
                            whileHover={{ y: -4, scale: 1.05 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border border-light/20"
                          >
                            <Image
                              src={src}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </motion.div>
                        </StaggerItem>
                      ))}
                    </RevealStagger>
                  </div>
                  <Reveal delay={0.3}>
                    <div className="inline-block max-w-sm rounded-2xl border border-light/35 bg-black/45 px-4 py-3 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
                      <p className="text-light text-[10px] tracking-xl uppercase mb-2">
                        Get Real About Your Skin
                      </p>
                      <p className="text-light/95 text-sm md:text-[15px] leading-relaxed">
                        We keep routines simple and intentional, so your skin can
                        recover, strengthen, and stay balanced long term.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* RIGHT clay panel */}
            <div className="on-dark md:col-span-5 relative bg-clay min-h-[320px] md:min-h-[640px] p-8 md:p-14 flex flex-col justify-start gap-8 md:gap-0 md:justify-between overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -right-24 -bottom-32 opacity-[0.18] pointer-events-none select-none"
              >
                <span
                  className="font-serif italic text-light leading-none"
                  style={{ fontSize: "26rem" }}
                >
                  e
                </span>
              </div>

              <div className="relative">
                <RevealText
                  as="h2"
                  id="babysit-heading"
                  text="Skincare That Doesn't &mdash;"
                  ariaLabel="Skincare that doesn't babysit you."
                  className="font-serif text-light text-4xl md:text-6xl leading-[1.05]"
                  stagger={0.05}
                />
                <Reveal delay={0.4} y={20}>
                  <p
                    aria-hidden="true"
                    className="font-serif italic text-light text-4xl md:text-6xl leading-[1.05] block mt-1"
                  >
                    Babysit <span className="not-italic font-serif">You</span>
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.8} className="relative mt-auto md:mt-0">
                <p className="text-light/90 text-xs md:text-sm max-w-xs leading-relaxed">
                  We are not here to sell noise. We are here to help you feel
                  confident in your skin again.
                  <span className="block mt-2 italic text-light">
                    Calm care. Real progress.
                  </span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* THE METHOD — how Emely works */}
      <section id="method" aria-labelledby="method-heading" className="bg-cream/50 py-14 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="hidden md:block md:col-span-5 order-2 md:order-1">
              <MaskedImage
                src={brandImages.founder}
                alt="Emely, founder of Skin by Emely, working in her Brandon studio"
                width={800}
                height={1000}
                className="w-full aspect-[4/5]"
                rounded="rounded-xl2"
              />
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <Reveal>
                <Badge>The Method</Badge>
              </Reveal>
              <RevealText
                as="h2"
                id="method-heading"
                text="Three layers. One system."
                className="font-serif text-ink text-4xl md:text-6xl mt-6 leading-tight"
                stagger={0.05}
              />
              <Reveal delay={0.4}>
                <p className="text-ink/75 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
                  The Emely Method is engineered around how your skin
                  actually behaves &mdash; not how the industry wants to sell
                  to it.
                </p>
              </Reveal>

              <RevealStagger className="mt-10 space-y-4" stagger={0.1}>
                {principles.map((p, i) => (
                  <StaggerItem key={p.k}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-6 border-t border-ink/15 pt-5 cursor-default"
                    >
                      <span className="text-gold-deep text-[10px] tracking-xxl uppercase min-w-[40px]">
                        0{i + 1}
                      </span>
                      <div>
                        <h4 className="font-serif text-2xl md:text-3xl text-ink">
                          {p.k}
                        </h4>
                        <p className="text-ink/70 text-sm md:text-base mt-1 leading-relaxed">
                          {p.v}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT — the 4-step user journey */}
      <section id="journey" aria-labelledby="journey-heading" className="bg-ivory py-14 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
              <Reveal>
                <Badge>What to Expect</Badge>
              </Reveal>
              <RevealText
                as="h2"
                id="journey-heading"
                text="From first consult to long-term skin confidence."
                className="font-serif text-ink text-4xl md:text-5xl lg:text-6xl mt-6 leading-tight max-w-3xl"
                stagger={0.05}
              />
            </div>
            <Reveal delay={0.3}>
              <MagneticButton href="/contact" variant="primary">
                Start your journey
              </MagneticButton>
            </Reveal>
          </div>

          <SwipeRail
            cols={4}
            mobileWidth={80}
            ariaLabel="Client journey carousel"
          >
            {userJourney.map((step) => (
              <motion.div
                key={step.number}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full flex flex-col p-7 md:p-8 rounded-xl2 bg-linen border border-ink/10 hover:bg-white hover:border-ink/20 hover:shadow-glass transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-7">
                  <span className="font-serif text-3xl text-gold-deep">
                    {step.number}
                  </span>
                  <span className="h-px w-12 bg-ink/20 group-hover:w-16 group-hover:bg-gold-deep transition-all duration-500" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-ink leading-tight">
                  {step.title}
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed mt-3">
                  {step.detail}
                </p>
                <p className="text-[10px] tracking-xl uppercase text-ink/55 mt-auto pt-6 border-t border-ink/10">
                  {step.meta}
                </p>
              </motion.div>
            ))}
          </SwipeRail>
        </div>
      </section>

      {/* PROOF — testimonial Sincère style */}
      <section aria-label="Client testimonials" className="bg-cream/30 py-14 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <figure className="grid grid-cols-12 gap-6 items-center">
            <p className="col-span-2 md:col-span-1 text-ink/65 text-[10px] tracking-xxl uppercase italic font-serif">
              Testimonials
            </p>

            <div
              aria-hidden="true"
              className="hidden md:flex md:col-span-1 flex-col items-center text-ink/40 text-[10px] tracking-xl gap-2"
            >
              {[1, 2, 3].map((n) => (
                <span key={n} className={n === 3 ? "text-gold-deep" : ""}>
                  0{n}
                </span>
              ))}
            </div>

            <div className="col-span-10 md:col-span-5">
              <MaskedImage
                src={reviews[0].image}
                alt={`Portrait of ${reviews[0].name}, ${reviews[0].role}`}
                width={700}
                height={520}
                className="w-full aspect-[4/3]"
                rounded="rounded-md"
              />
            </div>

            <div className="col-span-12 md:col-span-5">
              <Reveal>
                <span aria-hidden="true" className="font-serif italic text-7xl md:text-8xl text-ink/20 leading-none block">
                  &ldquo;
                </span>
              </Reveal>
              <Reveal delay={0.2}>
                <blockquote className="font-serif text-ink text-2xl md:text-3xl leading-snug mt-2 max-w-md">
                  <p>{reviews[0].quote}</p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.4} className="mt-6">
                <figcaption>
                  <span className="text-ink text-[11px] tracking-xl uppercase block">
                    {reviews[0].name}
                  </span>
                  <span className="text-ink/65 text-[10px] tracking-xl uppercase block">
                    {reviews[0].role}
                  </span>
                </figcaption>
              </Reveal>
            </div>
          </figure>

          <div aria-hidden="true">
            <RevealStagger
              className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-md mt-10 ml-auto"
              stagger={0.06}
            >
              {[...Array(6)].map((_, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-square rounded-md overflow-hidden border border-ink/10"
                  >
                    <Image
                      src={reviews[i % 3].image}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </motion.div>
                </StaggerItem>
              ))}
            </RevealStagger>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 md:mt-20 pt-10 md:pt-12 border-t border-ink/12">
            {[
              { n: 99.9, suffix: "%", l: "Proven success rate", dec: 1 },
              { n: 1200, suffix: "+", l: "Treatments delivered", dec: 0 },
              { n: 4.9, suffix: "★", l: "Studio rating", dec: 1 },
              { n: 10, suffix: "+ yrs", l: "Clinical practice", dec: 0 }
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08}>
                <div className="font-serif text-3xl md:text-4xl text-ink">
                  <CountUp to={s.n} suffix={s.suffix} decimals={s.dec} />
                </div>
                <div className="text-ink/65 text-[10.5px] tracking-xl uppercase mt-1">
                  {s.l}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIPS — sustaining the result */}
      <section id="memberships" aria-labelledby="memberships-heading" className="bg-ivory py-14 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-10 md:mb-14">
            <Reveal>
              <Badge>Memberships</Badge>
            </Reveal>
            <RevealText
              as="h2"
              id="memberships-heading"
              text="Memberships that keep progress steady."
              className="font-serif text-ink text-4xl md:text-6xl mt-6 leading-tight inline-block"
              stagger={0.05}
            />
            <Reveal delay={0.4}>
              <p className="text-ink/75 text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
                Great skin is built through consistency. These plans make it
                easier to stay on track through every season.
              </p>
            </Reveal>
          </div>

          <SwipeRail
            cols={3}
            mobileWidth={85}
            ariaLabel="Membership tiers carousel"
          >
            {memberships.map((m, i) => (
              <motion.div
                key={m.name}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`relative h-full flex flex-col p-8 md:p-10 rounded-xl2 backdrop-blur-xl transition-all duration-500 ${
                  i === 1
                    ? "bg-mocha border border-light/15 on-dark text-light shadow-product"
                    : "bg-linen border border-ink/10 shadow-soft hover:shadow-glass"
                }`}
              >
                  <div className="flex items-center justify-between mb-6 min-h-[28px]">
                    <span
                      className={`text-[10px] tracking-xxl uppercase ${
                        i === 1 ? "text-gold" : "text-gold-deep"
                      }`}
                    >
                      Tier 0{i + 1}
                    </span>
                    {i === 1 && (
                      <span className="text-[10px] tracking-xl uppercase text-gold border border-gold/40 px-3 py-1 rounded-pill">
                        Most chosen
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-serif text-3xl md:text-4xl ${
                      i === 1 ? "text-light" : "text-ink"
                    }`}
                  >
                    {m.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span
                      className={`font-serif text-4xl ${
                        i === 1 ? "text-light" : "text-ink"
                      }`}
                    >
                      {m.price}
                    </span>
                    <span
                      className={`text-xs uppercase tracking-xl ${
                        i === 1 ? "text-light/65" : "text-ink/55"
                      }`}
                    >
                      / {m.cadence}
                    </span>
                  </div>
                  <ul className="mt-8 space-y-0">
                    {m.points.map((pt) => (
                      <li
                        key={pt}
                        className={`flex gap-3 text-sm leading-relaxed border-t py-3 ${
                          i === 1
                            ? "text-light/85 border-light/12"
                            : "text-ink/80 border-ink/10"
                        }`}
                      >
                        <span className="text-gold shrink-0">·</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <MagneticButton
                      href="/memberships"
                      variant={i === 1 ? "outline-light" : "ghost"}
                      className="w-full"
                    >
                      Begin {m.name}
                    </MagneticButton>
                  </div>
              </motion.div>
            ))}
          </SwipeRail>
        </div>
      </section>

      {/* STUDIO STORY — founder + brand */}
      <section aria-labelledby="studio-story-heading" className="bg-cream/30 py-14 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-10 items-end">
            <div className="md:col-span-4 flex md:block">
              <p className="text-ink/70 text-[10px] tracking-xxl uppercase italic font-serif mb-6 md:mb-0">
                About Skin by Emely
              </p>
              <div className="hidden md:block mt-8">
                <MaskedImage
                  src={brandImages.service3}
                  alt="Close-up of Skin by Emely's signature treatment serum"
                  width={300}
                  height={380}
                  className="w-full"
                  rounded="rounded-md"
                />
              </div>
            </div>

            <div className="md:col-span-8">
              <RevealText
                as="h2"
                id="studio-story-heading"
                text="Simple routines. Meaningful results."
                className="font-serif text-ink text-4xl md:text-6xl leading-tight"
                stagger={0.06}
              />

              <Reveal delay={0.5} className="mt-10">
                <p className="font-serif text-ink text-2xl md:text-3xl leading-snug max-w-2xl">
                  No gimmicks. No pressure. Just{" "}
                  <span className="italic">
                    thoughtful, science-backed care
                  </span>{" "}
                  that supports your skin over time.
                </p>
              </Reveal>

              <Reveal delay={0.7} className="mt-6">
                <p className="text-ink/75 text-base md:text-lg leading-relaxed max-w-xl">
                  Because healthy skin should feel clear, calm, and sustainable.
                </p>
              </Reveal>

              <Reveal delay={0.9} className="mt-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-gold-deep uppercase text-[10.5px] tracking-xl border-b border-gold-deep/40 hover:border-gold-deep transition-colors pb-1"
                >
                  Read the studio story
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — final invitation */}
      <section
        aria-labelledby="final-cta-heading"
        className="on-dark relative bg-mocha overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-espresso-radial opacity-40 pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-40">
          <div className="text-center relative z-10">
            <Reveal>
              <Badge tone="dark">Begin</Badge>
            </Reveal>
            <RevealText
              as="h2"
              id="final-cta-heading"
              text="Ready for skin care that feels clear?"
              className="font-serif text-light text-5xl md:text-7xl mt-8 leading-tight max-w-3xl mx-auto"
              stagger={0.05}
            />
            <Reveal delay={0.5}>
              <p className="text-light/80 text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
                Begin with a personalized consultation and leave with a plan you
                can actually follow.
              </p>
            </Reveal>
            <Reveal delay={0.7} className="mt-10">
              <div className="flex flex-wrap justify-center gap-3">
                <MagneticButton href="/contact" variant="primary">
                  Book your consultation
                </MagneticButton>
                <MagneticButton href="#systems" variant="outline-light">
                  Explore the 3 phases
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none translate-y-[20%]"
          >
            <span
              className="ghost-wordmark"
              style={{ fontSize: "clamp(140px, 22vw, 360px)" }}
            >
              emely
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
