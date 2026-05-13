"use client";

import { motion } from "framer-motion";

type Props = {
  current: number;
  labels: string[];
};

export default function ProgressSteps({ current, labels }: Props) {
  return (
    <ol className="flex items-center gap-2 md:gap-3 mb-7" aria-label="Booking progress">
      {labels.map((label, index) => {
        const n = index + 1;
        const active = current === n;
        const done = current > n;
        return (
          <li key={label} className="flex items-center gap-2">
            <motion.span
              aria-label={`${label}${done ? " complete" : active ? " current" : ""}`}
              animate={{ scale: active ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs border ${
                active
                  ? "bg-gold text-ink border-gold"
                  : done
                    ? "bg-ink text-light border-ink"
                    : "text-ink/50 border-ink/20"
              }`}
            >
              {n}
            </motion.span>
            {n < labels.length ? <span className="w-6 md:w-10 h-px bg-ink/15" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
