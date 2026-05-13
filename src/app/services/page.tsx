"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import MagneticButton from "@/components/motion/MagneticButton";
import { ServiceVisualGrid } from "@/components/marketing-sections";
import { brandImages } from "@/lib/content";

const treatments = [
  {
    title: "Customized Facial",
    role: "A personalized starting treatment based on what your skin needs right now.",
    value: "Best for first-time clients who want a clear, supportive plan.",
    image: brandImages.service1
  },
  {
    title: "Acne Correction Facial",
    role: "Corrective care focused on active breakouts, congestion, and inflammation.",
    value: "Ideal when you want calmer skin and a step-by-step acne strategy.",
    image: brandImages.facial
  },
  {
    title: "Dermaplaning Glow Facial",
    role: "Gently refines surface texture and reveals a brighter, smoother finish.",
    value: "Great before events or as part of a regular glow-maintenance rhythm.",
    image: brandImages.service2
  },
  {
    title: "Barrier Repair Treatment",
    role: "Soothing support for sensitive, over-processed, or reactive skin.",
    value: "Helps reduce redness, stinging, and tightness while rebuilding comfort.",
    image: brandImages.service3
  },
  {
    title: "Oncology-Informed Facial",
    role: "Ultra-gentle restorative care adapted for delicate, changing skin.",
    value: "Created for safety, dignity, and comfort with specialized attention.",
    image: brandImages.service4
  }
] as const;

const squareBooking =
  "https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="treatments-hero-heading"
        className="on-dark relative bg-mocha overflow-hidden border-b border-light/10"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-espresso-radial opacity-50"
          aria-hidden
        />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 pt-20 md:pt-32 pb-10 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <Badge tone="dark">Brandon studio · By appointment</Badge>
              <h1
                id="treatments-hero-heading"
                className="font-serif text-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.05] max-w-4xl"
              >
                Treatments designed like{" "}
                <span className="italic text-gold/95">skin architecture.</span>
              </h1>
              <p className="text-light/75 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
                Every service fits into a bigger plan: calm inflammation, refine
                texture, and protect long-term glow. No random booking guesswork.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
                <MagneticButton href="/book" variant="primary">
                  Start custom booking
                </MagneticButton>
                <MagneticButton href="/contact" variant="outline-light">
                  Ask a question
                </MagneticButton>
              </div>
              <p className="mt-6 text-light/55 text-[10px] tracking-xl uppercase">
                Not sure what to book?{" "}
                <Link
                  href="/concerns"
                  className="text-gold border-b border-gold/40 hover:border-gold transition-colors"
                >
                  Start with your concern
                </Link>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[24px] overflow-hidden border border-light/15 shadow-product">
                <Image
                  src={brandImages.facial}
                  alt="Client receiving a premium facial treatment in studio"
                  width={900}
                  height={1200}
                  className="w-full h-[320px] md:h-[420px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 rounded-2xl border border-light/20 bg-black/35 backdrop-blur-sm px-4 py-3">
                  <p className="text-[10px] tracking-xxl uppercase text-gold">Signature standard</p>
                  <p className="mt-1 text-light/90 text-sm leading-relaxed">
                    Consultation-led protocols with measurable, skin-safe progression.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* editorial metrics */}
      <section aria-label="Treatment proof points" className="bg-linen border-b border-ink/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 py-7 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { n: "50-90", label: "Minute protocols" },
            { n: "1:1", label: "Personalized planning" },
            { n: "3", label: "Skin systems" },
            { n: "100%", label: "Barrier-conscious care" }
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-ink/10 bg-ivory px-4 py-4 text-center">
              <p className="font-serif text-3xl text-ink leading-none">{stat.n}</p>
              <p className="mt-2 text-[10px] tracking-xl uppercase text-ink/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Treatment menu */}
      <section
        aria-labelledby="treatment-menu-heading"
        className="bg-ivory py-12 md:py-20 lg:py-24"
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-[10px] tracking-xxl uppercase text-gold-deep mb-3">
              Treatment architecture
            </p>
            <h2
              id="treatment-menu-heading"
              className="font-serif text-ink text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              Signature services, each with a clear role
            </h2>
            <p className="text-ink/70 mt-4 text-base leading-relaxed">
              Your first session is selected for your current skin condition,
              then sequenced into a plan that keeps improving over time.
            </p>
          </div>

          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 list-none p-0 m-0">
            {treatments.map((t, i) => (
              <li key={t.title}>
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="group h-full flex flex-col overflow-hidden rounded-[24px] border border-ink/10 bg-linen shadow-soft hover:shadow-glass hover:border-ink/15 transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] sm:aspect-[2/1] w-full shrink-0 overflow-hidden">
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-mocha/75 via-mocha/20 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute bottom-4 left-5 right-5 md:bottom-5 md:left-6 md:right-6 flex items-end justify-between gap-3">
                      <h3 className="font-serif text-2xl md:text-3xl text-light leading-tight max-w-[85%]">
                        {t.title}
                      </h3>
                      <span className="text-gold text-[10px] tracking-xxl uppercase shrink-0 pb-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <p className="text-[10px] tracking-xl uppercase text-gold-deep mb-2">
                      Strategic role
                    </p>
                    <p className="text-ink/85 text-sm md:text-base leading-relaxed">
                      {t.role}
                    </p>
                    <p className="text-[10px] tracking-xl uppercase text-ink/45 mt-6 mb-2">
                      Why clients love it
                    </p>
                    <p className="text-ink/75 text-sm md:text-base leading-relaxed">
                      {t.value}
                    </p>
                  </div>
                </motion.article>
              </li>
            ))}
          </ul>

          <div className="mt-10 md:mt-12 flex flex-wrap gap-3">
            <a
              className="btn-primary inline-flex items-center justify-center"
              href={squareBooking}
              target="_blank"
              rel="noopener noreferrer"
            >
              View full schedule in Square
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link
              href="/memberships"
              className="btn-ghost inline-flex items-center justify-center"
            >
              Compare memberships
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-cream/40 border-y border-ink/8">
        <ServiceVisualGrid />
      </div>

      <section className="on-dark relative bg-mocha overflow-hidden py-16 md:py-20 border-t border-light/10">
        <div
          className="pointer-events-none absolute inset-0 bg-espresso-radial opacity-40"
          aria-hidden
        />
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-6 md:px-12 text-center">
          <p className="text-[10px] tracking-xxl uppercase text-gold">Treatment planning support</p>
          <h2 className="mt-4 font-serif text-light text-4xl md:text-5xl leading-tight">
            Need help choosing your first service?
          </h2>
          <p className="mt-4 text-light/75 max-w-2xl mx-auto">
            Use the guided booking flow and we will match your concern to the
            best starting treatment in under a minute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/book" variant="primary">
              Start guided booking
            </MagneticButton>
            <MagneticButton href="/education" variant="outline-light">
              Read treatment education
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
