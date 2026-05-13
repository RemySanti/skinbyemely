"use client";

import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import { motion } from "framer-motion";
import { EmelyMethodSection, VisualStorySection } from "@/components/marketing-sections";
import { brandImages } from "@/lib/content";

export default function AboutPage() {
  return (
    <SiteShell>
      <motion.section
        className="section card-stack"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-labelledby="about-heading"
      >
        <p className="eyebrow">About Skin by Emely</p>
        <h1 id="about-heading">Where science, trust, and real care meet.</h1>
        <Image
          className="section-image"
          src={brandImages.founder}
          alt="Emely in studio preparing personalized skincare treatment"
          width={1200}
          height={900}
        />
        <article className="card">
          <p>
            Skin by Emely started with a simple belief: skincare should make
            people feel safe, seen, and supported, not confused or judged.
          </p>
          <p>
            What began as a passion for treating skin concerns became a mission
            to guide people through the emotional side of skin healing too.
            Every visit is designed to bring clarity, confidence, and steady
            progress.
          </p>
        </article>
        <article className="card">
          <p className="chip">The purpose</p>
          <h2>Care that works in real life.</h2>
          <p>
            The goal is not perfection. The goal is healthy, resilient skin and
            a routine you can actually keep. Treatments are chosen with
            intention, explained clearly, and adjusted as your skin evolves.
          </p>
          <p>
            Clients leave with more than a service, they leave with direction:
            what their skin needs now, what can wait, and what to focus on next.
          </p>
        </article>
        <article className="card">
          <p className="chip">What you feel here</p>
          <h2>High standards. Zero intimidation.</h2>
          <ul className="journey-list">
            <li>A calm environment where questions are always welcome.</li>
            <li>Corrective treatment pathways built for long-term results.</li>
            <li>Respect for your time, your budget, and your comfort level.</li>
            <li>Honest guidance that prioritizes outcomes over upselling.</li>
          </ul>
        </article>
        <article className="card">
          <p className="chip">Why this industry</p>
          <h2>Because skin changes how people show up in life.</h2>
          <p>
            When someone feels better in their skin, it affects everything:
            relationships, confidence at work, and how they move through the
            world. That transformation is what drives this practice every day.
          </p>
          <p>
            Skin by Emely exists to deliver that transformation with integrity,
            precision, and heart.
          </p>
        </article>
      </motion.section>
      <VisualStorySection />
      <EmelyMethodSection />
    </SiteShell>
  );
}

