"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { PersonalizedRecommendation } from "@/components/marketing-sections";
import { SkinIntentSelector } from "@/components/sections";
import { SiteShell } from "@/components/site-shell";
import { brandImages, type SkinIntent } from "@/lib/content";

export default function ConcernsPage() {
  const [intent, setIntent] = useState<SkinIntent>("acne");

  return (
    <SiteShell>
      <motion.section className="section card-stack" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} aria-labelledby="concerns-heading">
        <p className="eyebrow">Concern-Led Navigation</p>
        <h1 id="concerns-heading">Choose your skin concern. We&apos;ll guide the rest.</h1>
        <Image className="section-image" src={brandImages.service1} alt="Esthetician guiding a client through a concern-led skincare consultation" width={1200} height={900} />
        <article className="card"><h2>Acne &amp; Breakouts</h2><p>Active acne treatment, hormonal breakouts, congestion clearing.</p></article>
        <article className="card"><h2>Sensitivity &amp; Barrier Damage</h2><p>Redness repair, hydration restoration, reactive skin calming.</p></article>
        <article className="card"><h2>Texture &amp; Glow</h2><p>Dermaplaning, exfoliation treatments, glow facials.</p></article>
        <article className="card"><h2>Aging &amp; Firmness</h2><p>Collagen stimulation, fine line smoothing, hydration lift.</p></article>
      </motion.section>
      <SkinIntentSelector value={intent} onChange={setIntent} />
      <PersonalizedRecommendation intent={intent} />
    </SiteShell>
  );
}

