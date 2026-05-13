"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SkinIntent } from "@/lib/content";
import {
  brandImages,
  marketTrends,
  memberships,
  personas,
  recommendations,
  seoKeywords,
  strategicAdvantages
} from "@/lib/content";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
  viewport: { once: true, amount: 0.2 }
};

export function HeroResearchDriven({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  return (
    <section className="hero">
      <Image className="hero-image" src={brandImages.hero} alt="Skin by Emely treatment experience" fill priority sizes="100vw" />
      <div className="hero-overlay" />
      <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <p className="eyebrow">Boutique Clinical Luxury | Brandon, FL</p>
        <h1>Skin that feels calm, clear, and confidently yours.</h1>
        <p className="hero-copy">Personalized clinical skincare designed for real transformation-not temporary fixes.</p>
        <div className="hero-cta-row">
          <button className="btn-primary btn-as-button" type="button" onClick={onOpenConsultation}>Book a Skin Consultation</button>
          <a className="btn-secondary" href="/services">Explore Treatments</a>
        </div>
      </motion.div>
    </section>
  );
}

export function PersonalizedRecommendation({ intent }: { intent: SkinIntent }) {
  const rec = recommendations[intent];
  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>What is your skin currently asking for?</h2>
      <article className="card personalized">
        <p className="chip">Primary Treatment</p>
        <h3>{rec.primary}</h3>
        <p>{rec.outcome}</p>
        <p><strong>Downtime:</strong> {rec.downtime}</p>
        <p><strong>Why this works:</strong> {rec.why}</p>
      </article>
      <article className="card">
        <p className="chip">Secondary Add-ons</p>
        <ul>{rec.secondary.map((s) => <li key={s}>{s}</li>)}</ul>
      </article>
      {rec.atHome ? <article className="card"><p className="chip">At-home Product</p><p>{rec.atHome}</p></article> : null}
    </motion.section>
  );
}

export function EmelyMethodSection() {
  const methodSteps = [
    {
      name: "Analyze",
      description:
        "We assess your skin condition, routine habits, and lifestyle triggers to identify the real starting point."
    },
    {
      name: "Correct",
      description:
        "Targeted treatments address active concerns like breakouts, texture, and irritation without overwhelming your barrier."
    },
    {
      name: "Strengthen",
      description:
        "We rebuild resilience with hydration, barrier support, and recovery-focused care so skin stays stable between visits."
    },
    {
      name: "Maintain",
      description:
        "A consistent cadence protects progress, minimizes setbacks, and keeps your skin balanced through seasonal changes."
    },
    {
      name: "Transform",
      description:
        "As results compound, your plan evolves into long-term maintenance designed for confidence, clarity, and healthy skin momentum."
    }
  ];

  return (
    <motion.section className="section" {...fadeUp}>
      <h2>The Emely Skin Method</h2>
      <div className="method-grid">
        {methodSteps.map((step, i) => (
          <div className="card" key={step.name}>
            <p className="chip">Step {i + 1}</p>
            <h3>{step.name}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export function VisualStorySection() {
  const cards = [
    { title: "Founder Trust", text: "Caregiver + Sage positioning with deep client relationships.", image: brandImages.founder },
    { title: "Clinical Precision", text: "Result-driven protocols with barrier-safe customization.", image: brandImages.science },
    { title: "Transformation Focus", text: "Acne, texture, and confidence recovery journeys.", image: brandImages.service2 }
  ];

  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>Clinical luxury, visually expressed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
        {cards.map((card) => (
          <motion.article
            className="card !p-0 overflow-hidden"
            key={card.title}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={card.image}
              alt={card.title}
              width={700}
              height={480}
              className="w-full h-[220px] md:h-[240px] object-cover"
            />
            <div className="p-5 md:p-6">
              <h3 className="mb-2">{card.title}</h3>
              <p className="m-0">{card.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export function MarketInsightsSection() {
  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>2026 market alignment</h2>
      <article className="card">
        <p>
          Skin by Emely is positioned in a high-opportunity middle: luxury enough for premium perception,
          clinical enough for measurable outcomes, and intimate enough to retain trust.
        </p>
      </article>
      <article className="card">
        <p className="chip">Industry trends</p>
        <ul className="journey-list">
          {marketTrends.map((trend) => <li key={trend}>{trend}</li>)}
        </ul>
      </article>
      <article className="card">
        <p className="chip">Competitive advantage</p>
        <ul className="journey-list">
          {strategicAdvantages.map((adv) => <li key={adv}>{adv}</li>)}
        </ul>
      </article>
    </motion.section>
  );
}

export function MembershipSection() {
  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>Membership Ecosystem</h2>
      {memberships.map((m) => (
        <article className="card" key={m.name}>
          <h3>{m.name}</h3>
          <p>{m.description}</p>
          <p><strong>Ideal for:</strong> {m.idealFor}</p>
        </article>
      ))}
    </motion.section>
  );
}

export function PersonasSection() {
  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>Who this experience serves</h2>
      {personas.map((p) => (
        <article className="card" key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.profile}</p>
          <p><strong>Core need:</strong> {p.needs}</p>
        </article>
      ))}
    </motion.section>
  );
}

export function SeoSection() {
  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>SEO Growth Targets</h2>
      <ul className="journey-list">
        {seoKeywords.map((k) => <li key={k}>{k}</li>)}
      </ul>
    </motion.section>
  );
}

export function ServiceVisualGrid() {
  const services = [
    { title: "Customized Facial", image: brandImages.service1 },
    { title: "Texture & glow", image: brandImages.service2 },
    { title: "Barrier calming", image: brandImages.service3 },
    { title: "Elevated maintenance", image: brandImages.service4 }
  ];

  return (
    <motion.section
      className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 py-14 md:py-20 lg:py-24"
      {...fadeUp}
      aria-labelledby="signature-visuals-heading"
    >
      <h2
        id="signature-visuals-heading"
        className="font-serif text-ink text-3xl md:text-4xl leading-tight"
      >
        Signature treatment visuals
      </h2>
      <p className="text-ink/65 text-sm md:text-base max-w-xl mt-3 leading-relaxed">
        Full-bleed imagery with the same editorial rhythm as the rest of the
        site — readable overlays, rounded frames, generous gutters.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-10 md:mt-12">
        {services.map((item) => (
          <motion.article
            key={item.title}
            className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[24px] ring-1 ring-ink/[0.08] shadow-soft bg-mocha"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={item.image}
              alt={`${item.title} — Skin by Emely studio treatment`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mocha/92 via-mocha/40 to-mocha/10"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
              <h3 className="font-serif text-xl md:text-2xl text-light leading-snug">
                <span className="inline-flex items-center rounded-pill border border-light/45 bg-black/38 px-3.5 py-1.5 md:px-4 md:py-2 backdrop-blur-sm shadow-[0_8px_22px_rgba(0,0,0,0.3)]">
                  {item.title}
                </span>
              </h3>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export function EducationPillarsSection() {
  const pillars = [
    {
      title: "Skin Science",
      points: ["Barrier repair", "Acne causes", "Exfoliation education"]
    },
    {
      title: "Routine Building",
      points: ["AM/PM routines", "Product layering", "Ingredient breakdowns"]
    },
    {
      title: "Transformation Stories",
      points: ["Client journeys", "Emotional recovery", "Before/after breakdowns"]
    }
  ];

  return (
    <section className="section card-stack">
      <h2>Understand your skin. Transform your results.</h2>
      {pillars.map((pillar) => (
        <article key={pillar.title} className="card">
          <h3>{pillar.title}</h3>
          <ul className="journey-list">
            {pillar.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </article>
      ))}
    </section>
  );
}
