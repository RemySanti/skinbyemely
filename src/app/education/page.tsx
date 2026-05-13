"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { journalPosts } from "@/lib/journal-posts";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
};

export default function EducationPage() {
  return (
    <>
      <section
        aria-labelledby="journal-hero-heading"
        className="on-dark relative overflow-hidden bg-mocha"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-espresso-radial opacity-50"
          aria-hidden
        />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 pt-20 md:pt-32 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center rounded-pill border border-light/35 bg-black/28 px-3 py-1.5 text-light text-[10px] tracking-xxl uppercase backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.28)]">
              Journal · SEO Content Library
            </span>
            <h1
              id="journal-hero-heading"
              className="font-serif text-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]"
            >
              Learn your skin.
              <span className="italic text-gold/95"> Keep your results.</span>
            </h1>
            <p className="text-light/75 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
              Ten high-intent, SEO-focused mock articles designed to attract local
              search traffic, educate clients, and guide booking decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="journal-grid-heading"
        className="bg-ivory py-10 md:py-20 lg:py-24"
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <motion.div
            className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-12"
            {...fadeUp}
          >
            <div className="max-w-3xl">
              <h2
                id="journal-grid-heading"
                className="font-serif text-ink text-3xl md:text-5xl leading-tight"
              >
                Featured education articles
              </h2>
              <p className="text-ink/65 mt-3 max-w-2xl">
                Each card opens a dedicated blog page with SEO structure, key
                takeaways, and conversion-oriented educational copy.
              </p>
            </div>
            <span className="inline-flex items-center rounded-pill border border-ink/15 bg-linen px-3 py-1.5 text-[10px] tracking-xxl uppercase text-gold-deep">
              10 Articles
            </span>
          </motion.div>

          <motion.div
            className="mb-7 md:mb-10 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {["Acne", "Barrier", "Glow", "Anti-Aging", "Homecare"].map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center rounded-pill border border-ink/12 bg-linen px-3 py-1.5 text-[10px] tracking-xl uppercase text-ink/60"
              >
                {topic}
              </span>
            ))}
          </motion.div>

          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 list-none p-0 m-0">
            {journalPosts.map((post, i) => (
              <li key={post.slug}>
                <Link href={`/education/${post.slug}`} className="group block h-full">
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -6 }}
                    className="h-full overflow-hidden rounded-[24px] border border-ink/10 bg-linen shadow-soft hover:shadow-glass hover:border-ink/20 transition-all duration-500"
                  >
                    <div className="relative h-52 md:h-56 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/12 to-transparent"
                        aria-hidden
                      />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-pill border border-light/30 bg-black/35 px-3 py-1.5 backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
                        <span className="text-[10px] tracking-xl uppercase text-light/90">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 inline-flex items-center rounded-pill border border-light/25 bg-black/30 px-2.5 py-1 text-[10px] tracking-xl uppercase text-light/85 backdrop-blur-sm">
                        #{String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="font-serif text-2xl text-ink leading-tight">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-ink/70 text-sm leading-relaxed">
                        {post.description}
                      </p>
                      <div className="mt-5 pt-4 border-t border-ink/10 flex items-center justify-between">
                        <span className="inline-flex items-center rounded-pill border border-ink/12 bg-ivory px-2.5 py-1 text-[10px] tracking-xl uppercase text-ink/50">
                          {post.readTime}
                        </span>
                        <span className="text-[10px] tracking-xl uppercase text-gold-deep group-hover:text-ink transition-colors">
                          Read article
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

