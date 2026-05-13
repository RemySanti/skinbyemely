"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import SwipeRail from "@/components/ui/SwipeRail";
import ServiceCard from "@/components/booking/ServiceCard";
import {
  membershipPlans,
  squareServices
} from "@/lib/square-booking";

const starterServices = squareServices.slice(0, 5);

export default function MembershipsPage() {
  return (
    <>
      <section
        aria-labelledby="memberships-hero-heading"
        className="on-dark relative overflow-hidden bg-mocha"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-espresso-radial opacity-50"
          aria-hidden
        />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 pt-20 md:pt-32 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <Badge tone="dark">Membership architecture</Badge>
            <h1
              id="memberships-hero-heading"
              className="mt-6 font-serif text-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
            >
              Stay consistent.
              <span className="italic text-gold/95"> See better skin faster.</span>
            </h1>
            <p className="mt-6 text-light/75 text-base md:text-lg leading-relaxed max-w-2xl">
              Memberships are built around continuity. You get a guided cadence,
              priority booking, and treatment planning that removes guesswork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn-primary">
                Start membership booking
              </Link>
              <Link href="/services" className="btn-ghost on-dark border-light/30 text-light">
                Compare all services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="membership-tiers-heading"
        className="bg-ivory py-10 md:py-20"
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <h2
            id="membership-tiers-heading"
            className="font-serif text-ink text-3xl md:text-5xl leading-tight max-w-3xl"
          >
            Three membership pathways for different skin goals
          </h2>
          <p className="mt-4 text-ink/70 max-w-2xl">
            Each plan follows the same studio method: assess, treat, maintain,
            and evolve your protocol as your skin improves.
          </p>

          <div className="mt-8 md:mt-12">
            <SwipeRail cols={3} mobileWidth={85} ariaLabel="Membership tiers">
              {membershipPlans.map((plan) => (
                <article
                  key={plan.slug}
                  className="h-full rounded-[24px] border border-ink/10 bg-linen p-6 md:p-7 shadow-soft"
                >
                  <p className="text-[10px] tracking-xxl uppercase text-gold-deep">
                    {plan.name}
                  </p>
                  <p className="mt-3 font-serif text-4xl text-ink leading-none">
                    ${plan.monthlyPrice}
                    <span className="text-base text-ink/50">/mo</span>
                  </p>
                  <p className="mt-4 text-sm md:text-base text-ink/75 leading-relaxed">
                    {plan.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {plan.includes.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-ink/70 leading-relaxed flex items-start gap-2"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </SwipeRail>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="included-services-heading"
        className="bg-linen py-10 md:py-20 border-y border-ink/8"
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <h2
            id="included-services-heading"
            className="font-serif text-ink text-3xl md:text-4xl lg:text-5xl"
          >
            Core services used inside membership plans
          </h2>
          <p className="mt-4 text-ink/70 max-w-3xl">
            Service names, pricing, and descriptions align with your active
            Square booking configuration.
          </p>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 list-none p-0">
            {starterServices.map((service) => (
              <li key={service.id}>
                <ServiceCard service={service} compact />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/book" className="btn-primary">
              Build my membership schedule
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="membership-journey-heading" className="bg-ivory py-10 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <h2 id="membership-journey-heading" className="font-serif text-ink text-3xl md:text-5xl leading-tight max-w-3xl">
            A seamless member journey from first visit to long-term maintenance
          </h2>
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 list-none p-0 m-0">
            {[
              {
                title: "1. Discover",
                detail:
                  "Choose your membership based on your skin goals and treatment cadence."
              },
              {
                title: "2. Personalize",
                detail:
                  "Use the in-site booking flow to select a matching service and share your skin priorities."
              },
              {
                title: "3. Maintain",
                detail:
                  "Follow your monthly protocol with progress check-ins and plan adjustments."
              }
            ].map((step) => (
              <li key={step.title} className="rounded-[20px] border border-ink/10 bg-linen p-5 md:p-6">
                <h3 className="font-serif text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-ink/70 text-sm md:text-base leading-relaxed">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
