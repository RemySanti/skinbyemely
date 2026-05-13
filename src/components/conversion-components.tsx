"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export function TrustStrip() {
  const items = [
    "Acne Correction Specialist",
    "Oncology-Informed Care",
    "Clinical + Luxury Blend",
    "Personalized Skin Plans"
  ];
  return (
    <section className="section trust-strip-wrap">
      <div className="trust-strip">
        {items.map((item, i) => (
          <motion.span key={item} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.3 }} viewport={{ once: true }}>
            {item}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

export function SkinJourneyTimeline() {
  const steps = [
    "Skin concern selection",
    "Education snippet",
    "Trust proof and results",
    "Treatment recommendation",
    "Booking conversion",
    "Membership upsell"
  ];
  return (
    <section className="section card-stack">
      <h2>High-conversion UX flow</h2>
      <div className="timeline">
        {steps.map((s, i) => (
          <div className="timeline-step card" key={s}>
            <p className="chip">Step {i + 1}</p>
            <p>{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function UserJourneyMap() {
  const stages = [
    {
      stage: "Discover",
      emotion: "Overwhelmed and searching for answers",
      need: "Clear direction",
      action: "Select skin concern"
    },
    {
      stage: "Understand",
      emotion: "Cautiously hopeful",
      need: "Clinical clarity and trust",
      action: "Review personalized treatment path"
    },
    {
      stage: "Commit",
      emotion: "Confident and ready",
      need: "Low-friction booking",
      action: "Book consultation in one flow"
    },
    {
      stage: "Transform",
      emotion: "Supported and empowered",
      need: "Consistency and guidance",
      action: "Follow post-booking plan and membership pathway"
    }
  ];

  return (
    <section className="section card-stack">
      <h2>User journey map</h2>
      <p className="journey-intro">Designed for one decision at a time: reduce cognitive load, increase confidence, and guide users from uncertainty to action.</p>
      <div className="journey-map">
        {stages.map((item, idx) => (
          <motion.article
            className="journey-stage glass-card"
            key={item.stage}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.35 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="chip">Stage {idx + 1}</p>
            <h3>{item.stage}</h3>
            <p><strong>Emotion:</strong> {item.emotion}</p>
            <p><strong>Need:</strong> {item.need}</p>
            <p><strong>Next action:</strong> {item.action}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function ConsultationFlowModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const steps = [
    "Step 1: Skin Selection - What brings you in today?",
    "Step 2: Skin Questionnaire - sensitivity, concerns, goals",
    "Step 3: AI-matched treatment recommendation",
    "Step 4: Booking calendar selection",
    "Step 5: Confirmation and prep guide"
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        className="consult-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-modal-heading"
        aria-describedby="consult-modal-description"
      >
        <h3 id="consult-modal-heading">Consultation Flow</h3>
        <p id="consult-modal-description">Guided conversion flow designed for low-friction booking.</p>
        <ul className="journey-list">
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <a className="btn-primary" href="https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services" target="_blank" rel="noopener noreferrer">
          Continue to Booking
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close consultation flow dialog"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
