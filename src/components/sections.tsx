"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SkinIntent } from "@/lib/content";
import { brandImages, recommendations } from "@/lib/content";

type SelectorProps = {
  value: SkinIntent;
  onChange: (intent: SkinIntent) => void;
};

const intents: { key: SkinIntent; label: string }[] = [
  { key: "acne", label: "Acne / Breakouts" },
  { key: "texture", label: "Texture / Congestion" },
  { key: "aging", label: "Aging / Fine Lines" },
  { key: "glow", label: "Glow / Maintenance" },
  { key: "sensitivity", label: "Sensitivity / Barrier Repair" }
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.25 }
};

export function HeroSplit() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <p className="eyebrow">Skin By Emily</p>
        <h1>Your Skin, Rebuilt with Precision</h1>
        <a className="btn-primary" href="#analysis">Start Skin Analysis</a>
        <p className="scroll-hint">Scroll to personalize your journey</p>
      </motion.div>
    </section>
  );
}

export function SkinIntentSelector({ value, onChange }: SelectorProps) {
  return (
    <motion.section id="analysis" className="section" aria-labelledby="intent-heading" {...fadeUp}>
      <h2 id="intent-heading">Choose your skin concern</h2>
      <div className="intent-grid" role="group" aria-label="Skin concern selector">
        {intents.map((intent) => {
          const selected = value === intent.key;
          return (
            <button
              key={intent.key}
              type="button"
              aria-pressed={selected}
              className={`intent-btn ${selected ? "active" : ""}`}
              onClick={() => onChange(intent.key)}
            >
              {intent.label}
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}

export function ServiceRecommendationCard({ intent }: { intent: SkinIntent }) {
  const rec = recommendations[intent];

  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>Recommended for you</h2>
      <article className="card personalized">
        <p className="chip">Primary Treatment</p>
        <h3>{rec.primary}</h3>
        <p>{rec.outcome}</p>
        <p><strong>Downtime:</strong> {rec.downtime}</p>
        <p><strong>Why this works:</strong> {rec.why}</p>
      </article>
      <article className="card">
        <p className="chip">Secondary Add-ons</p>
        <ul>
          {rec.secondary.map((item) => (<li key={item}>{item}</li>))}
        </ul>
      </article>
      {rec.atHome && (
        <article className="card">
          <p className="chip">At-home product suggestion</p>
          <p>{rec.atHome}</p>
        </article>
      )}
    </motion.section>
  );
}

export function BeforeAfterSlider() {
  return (
    <motion.section className="section" {...fadeUp}>
      <h2>Proof that compounds over time</h2>
      <div className="before-after">
        <motion.div className="proof-tile" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Image src={brandImages.facial} alt="Before treatment skin profile" width={800} height={520} />
          <p className="chip">Before</p>
          <p>Inflamed, congested texture with uneven tone.</p>
        </motion.div>
        <motion.div className="proof-tile" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Image src={brandImages.science} alt="After treatment glowing skin result" width={800} height={520} />
          <p className="chip">After</p>
          <p>Calmer skin, reduced congestion, visibly brighter finish.</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export function TestimonialCarousel({ intent }: { intent: SkinIntent }) {
  const rec = recommendations[intent];
  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>Client trust layer</h2>
      <motion.div
        className="founder-image-wrap"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Image src={brandImages.founder} alt="Founder Emely in studio" className="founder-image" width={900} height={1200} />
      </motion.div>
      <article className="card"><p>&ldquo;I finally have a skin plan that makes sense for my routine.&rdquo;</p></article>
      <article className="card"><p>&ldquo;Results started showing after one treatment cycle.&rdquo;</p></article>
      <article className="card"><p>&ldquo;Emily explained the science and made the process effortless.&rdquo;</p></article>
      <div className="badge-strip">
        <span>Licensed Esthetician</span><span>Clinical Protocols</span><span>Result-Driven Care</span>
      </div>
      <p className="trust-note">{rec.socialProof}</p>
    </motion.section>
  );
}

export function BookingCTA({ intent }: { intent: SkinIntent }) {
  const rec = recommendations[intent];
  return (
    <motion.section className="section booking" aria-labelledby="booking-cta-heading" {...fadeUp}>
      <h2 id="booking-cta-heading">Reserve Your Skin Appointment</h2>
      <p>Pre-filled for: <strong>{rec.primary}</strong> (new client)</p>
      <a className="btn-primary" href="https://squareup.com/us/en/appointments" target="_blank" rel="noopener noreferrer">
        Book in Square Checkout
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </motion.section>
  );
}

export function PostBookingFlow() {
  return (
    <motion.section className="section card-stack" {...fadeUp}>
      <h2>After booking, your next steps</h2>
      <article className="card"><h3>Skin prep guide</h3><p>Avoid active exfoliants 48 hours before your appointment.</p></article>
      <article className="card"><h3>What to expect timeline</h3><p>Consultation, treatment, post-care handoff, and follow-up sequence.</p></article>
      <article className="card"><h3>Add-on upsells</h3><ul><li>Dermaplane upgrade</li><li>LED therapy</li><li>Skincare kit bundle</li></ul></article>
      <article className="card">
        <h3>Automation touchpoints</h3>
        <ul>
          <li>T+0 confirmation with prep guide</li>
          <li>T+1 education reminder</li>
          <li>T+3 add-on recommendation</li>
          <li>T+7 product recommendation</li>
          <li>T+21 rebooking prompt</li>
        </ul>
      </article>
    </motion.section>
  );
}

export function ProductBundleCard() {
  return (
    <article className="card locked">
      <p className="chip">Product Bundle</p>
      <p>Unlock targeted skincare bundles after first appointment completion.</p>
    </article>
  );
}

export function AddOnUpsellCard() {
  return (
    <article className="card locked">
      <p className="chip">Smart Upsell</p>
      <p>Eligibility is triggered by skin concern and appointment history.</p>
    </article>
  );
}
