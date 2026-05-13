"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site-shell";
import { brandImages } from "@/lib/content";

const results = [
  {
    title: "Acne journey timeline",
    quote: "My acne finally stabilized after years of trying everything.",
    path: "Consultation -> corrective facial series -> homecare optimization",
    image: brandImages.service1
  },
  {
    title: "Texture improvement",
    quote: "My skin texture feels smoother and makeup sits better.",
    path: "Assessment -> resurfacing protocol -> maintenance cadence",
    image: brandImages.service2
  },
  {
    title: "Barrier restoration",
    quote: "My skin stopped reacting and finally felt calm.",
    path: "Barrier diagnosis -> soothing clinical plan -> repair routine",
    image: brandImages.service3
  },
  {
    title: "Glow transformation",
    quote: "Every visit brings back my confidence and radiance.",
    path: "Hydration and exfoliation balance -> seasonal glow upkeep",
    image: brandImages.service4
  }
];

export default function ResultsPage() {
  return (
    <SiteShell>
      <section className="section card-stack" aria-labelledby="results-heading">
        <p className="eyebrow">Results</p>
        <h1 id="results-heading">Proof of transformation.</h1>
        <p>Real skin. Real results. Real confidence.</p>
      </section>
      <section className="section service-grid" aria-label="Client transformation case studies">
        {results.map((item) => (
          <motion.article key={item.title} className="card image-card" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -4 }}>
            <Image src={item.image} alt={`${item.title} — before and after results`} width={800} height={520} />
            <h2>{item.title}</h2>
            <p><strong>3-step path:</strong> {item.path}</p>
            <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
          </motion.article>
        ))}
      </section>
    </SiteShell>
  );
}

