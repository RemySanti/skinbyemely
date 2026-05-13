"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import ProgressSteps from "@/components/booking/ProgressSteps";
import ServiceCard from "@/components/booking/ServiceCard";
import {
  formatUsdFromCents,
  squareBookingUrl,
  squareServices
} from "@/lib/square-booking";

type Step = 1 | 2 | 3;
type Intent = "acne" | "glow" | "texture" | "sensitive";
type Window = "Morning" | "Afternoon" | "Evening" | "Flexible";

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [intent, setIntent] = useState<Intent>("acne");
  const [selectedServiceId, setSelectedServiceId] = useState(squareServices[0].id);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [preferredDay, setPreferredDay] = useState("Weekdays");
  const [preferredWindow, setPreferredWindow] = useState<Window>("Morning");
  const [submitted, setSubmitted] = useState(false);

  const selectedService = useMemo(
    () => squareServices.find((s) => s.id === selectedServiceId) ?? squareServices[0],
    [selectedServiceId]
  );

  const canContinue = Boolean(clientName.trim() && email.trim() && goal.trim());
  const stepLabels = ["Concern", "Details", "Confirm"];

  const servicesByIntent = useMemo(() => {
    return (selectedIntent: Intent) =>
      squareServices.filter((service) => {
      const text = `${service.name} ${service.description}`.toLowerCase();
      if (selectedIntent === "acne") return text.includes("acne") || text.includes("congestion");
      if (selectedIntent === "glow") return text.includes("glow") || text.includes("bright");
      if (selectedIntent === "texture") return text.includes("texture") || text.includes("dermaplane");
      if (selectedIntent === "sensitive") return text.includes("calm") || text.includes("oxygen");
      return true;
    });
  }, []);

  const filteredServices = useMemo(() => servicesByIntent(intent), [servicesByIntent, intent]);
  const recommendedService = filteredServices[0] ?? squareServices[0];

  const selectIntent = (nextIntent: Intent) => {
    setIntent(nextIntent);
    const nextServices = servicesByIntent(nextIntent);
    if (nextServices.length) {
      setSelectedServiceId(nextServices[0].id);
    }
  };

  return (
    <>
      <section className="on-dark relative bg-mocha overflow-hidden" aria-labelledby="book-heading">
        <div className="pointer-events-none absolute inset-0 bg-espresso-radial opacity-55" aria-hidden />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 pt-20 md:pt-32 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <Badge tone="dark">Custom booking journey</Badge>
            <h1 id="book-heading" className="mt-6 font-serif text-light text-4xl md:text-6xl leading-[1.05]">
              Book inside the Skin by Emely experience.
            </h1>
            <p className="mt-6 text-light/75 max-w-2xl">
              This is your branded booking flow UI. It maps to Square services and
              pricing while keeping clients inside your site experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-ivory py-10 md:py-20" aria-label="Booking flow">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.35fr_.85fr] gap-6 md:gap-8">
          <article className="rounded-[24px] border border-ink/10 bg-linen p-5 md:p-7 shadow-soft">
            <ProgressSteps current={step} labels={stepLabels} />

            <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-serif text-ink text-3xl leading-tight">What are you focused on?</h2>
                <p className="mt-2 text-ink/65 text-sm">
                  Pick one concern and we will recommend the best starting service.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    { id: "acne", label: "Acne + congestion" },
                    { id: "glow", label: "Glow + hydration" },
                    { id: "texture", label: "Texture + smoothness" },
                    { id: "sensitive", label: "Sensitive support" }
                  ].map((chip) => (
                    <motion.button
                      key={chip.id}
                      type="button"
                      onClick={() => selectIntent(chip.id as Intent)}
                      aria-pressed={intent === chip.id}
                      whileTap={{ scale: 0.97 }}
                      className={`rounded-pill border px-3 py-2 text-xs tracking-wide uppercase transition-colors ${
                        intent === chip.id
                          ? "border-gold bg-gold/10 text-ink"
                          : "border-ink/15 bg-ivory text-ink/70 hover:border-ink/30"
                      }`}
                    >
                      {chip.label}
                    </motion.button>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-[10px] tracking-xl uppercase text-ink/50 mb-3">
                    Recommended starting service
                  </p>
                  <ServiceCard
                    service={recommendedService}
                    selected={selectedServiceId === recommendedService.id}
                    onSelect={setSelectedServiceId}
                    compact
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="text-[10px] tracking-xl uppercase text-gold-deep border-b border-gold-deep/40 hover:border-gold-deep"
                    onClick={() => setSelectedServiceId(squareServices[0].id)}
                  >
                    Reset to default recommendation
                  </button>
                </div>
                <button type="button" className="btn-primary mt-7" onClick={() => setStep(2)}>
                  Continue
                </button>
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-serif text-ink text-3xl leading-tight">Your skin details</h2>
                <p className="mt-2 text-ink/65 text-sm">
                  Tell us enough to personalize your first session.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="text-sm text-ink/80">
                    Full name
                    <input
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    />
                  </label>
                  <label className="text-sm text-ink/80">
                    Email
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    />
                  </label>
                  <label className="text-sm text-ink/80">
                    Phone
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    />
                  </label>
                  <label className="text-sm text-ink/80">
                    Main skin goal
                    <input
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="Acne control, brightening, texture..."
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    />
                  </label>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="text-sm text-ink/80">
                    Preferred day
                    <select
                      value={preferredDay}
                      onChange={(e) => setPreferredDay(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <option>Weekdays</option>
                      <option>Weekends</option>
                      <option>First available</option>
                    </select>
                  </label>
                  <label className="text-sm text-ink/80">
                    Preferred time window
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(["Morning", "Afternoon", "Evening", "Flexible"] as Window[]).map((window) => (
                        <motion.button
                          key={window}
                          type="button"
                          onClick={() => setPreferredWindow(window)}
                          aria-pressed={preferredWindow === window}
                          whileTap={{ scale: 0.97 }}
                          className={`rounded-pill border px-3 py-2 text-xs tracking-wide uppercase transition-colors ${
                            preferredWindow === window
                              ? "border-gold bg-gold/10 text-ink"
                              : "border-ink/15 bg-ivory text-ink/70 hover:border-ink/30"
                          }`}
                        >
                          {window}
                        </motion.button>
                      ))}
                    </div>
                  </label>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button type="button" className="btn-ghost" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-primary disabled:opacity-50"
                    disabled={!canContinue}
                    onClick={() => setStep(3)}
                  >
                    Review booking
                  </button>
                </div>
              </motion.div>
            ) : null}

            {step === 3 ? (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-serif text-ink text-3xl leading-tight">Review and confirm</h2>
                <p className="mt-2 text-ink/65 text-sm">
                  Final UI step before connecting submit to Square API/webhook.
                </p>
                <div className="mt-6 rounded-2xl border border-ink/10 bg-ivory p-5">
                  <p className="text-[10px] tracking-xl uppercase text-ink/45">Selected service</p>
                  <h3 className="font-serif text-2xl mt-2 text-ink">{selectedService.name}</h3>
                  <p className="mt-3 text-sm text-ink/70">{selectedService.description}</p>
                  <div className="mt-4 flex gap-5 text-sm text-ink/65">
                    <span>{selectedService.durationMinutes} min</span>
                    <span>{formatUsdFromCents(selectedService.priceCents)}</span>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-ink/10 bg-ivory p-5">
                  <p className="text-[10px] tracking-xl uppercase text-ink/45">Client info</p>
                  <p className="mt-2 text-sm text-ink/75">{clientName || "Name pending"}</p>
                  <p className="text-sm text-ink/75">{email || "Email pending"}</p>
                  <p className="text-sm text-ink/75">{phone || "Phone optional"}</p>
                  <p className="text-sm text-ink/75">{goal || "Goal not provided yet"}</p>
                  <p className="mt-3 text-sm text-ink/75">
                    Preferred slot: {preferredDay} · {preferredWindow}
                  </p>
                </div>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-5"
                  >
                    <p className="text-[10px] tracking-xl uppercase text-gold-deep">
                      Request saved
                    </p>
                    <p className="mt-2 text-ink/80 text-sm leading-relaxed">
                      Your booking request UI has been submitted successfully. Next integration step:
                      send this payload directly to Square and return live availability.
                    </p>
                  </motion.div>
                ) : null}
                <div className="mt-7 flex flex-wrap gap-3">
                  <button type="button" className="btn-ghost" onClick={() => setStep(2)}>
                    Edit details
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setSubmitted(true)}
                  >
                    Submit booking request
                  </button>
                  {submitted ? (
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => {
                        setStep(1);
                        setSubmitted(false);
                      }}
                    >
                      Start new request
                    </button>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
            </AnimatePresence>
          </article>

          <motion.aside
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[24px] border border-ink/10 bg-cream p-5 md:p-7 shadow-soft h-fit"
          >
            <h2 className="font-serif text-2xl text-ink">Booking summary</h2>
            <p className="mt-3 text-sm text-ink/70">
              This flow keeps the experience on-brand and in-site. Integration step
              can submit selected `serviceId`, client details, and preferred slot to Square.
            </p>
            <div className="mt-5 rounded-xl border border-ink/10 bg-ivory p-4">
              <p className="text-[10px] tracking-xl uppercase text-ink/45">Selected service</p>
              <p className="mt-2 text-sm text-ink/85">{selectedService.name}</p>
              <p className="mt-1 text-sm text-gold-deep">
                {selectedService.durationMinutes} min · {formatUsdFromCents(selectedService.priceCents)}
              </p>
              <p className="mt-2 text-xs text-ink/60">
                Preferred: {preferredDay} · {preferredWindow}
              </p>
            </div>
            <dl className="mt-5 space-y-3">
              <div>
                <dt className="text-[10px] tracking-xl uppercase text-ink/45">Service id</dt>
                <dd className="text-sm text-ink/80 break-all">{selectedService.id}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-xl uppercase text-ink/45">Catalog link</dt>
                <dd className="text-sm">
                  <a
                    href={squareBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-deep border-b border-gold/40 hover:border-gold"
                  >
                    Square source data
                  </a>
                </dd>
              </div>
            </dl>
          </motion.aside>
        </div>
      </section>
    </>
  );
}
