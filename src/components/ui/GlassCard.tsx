"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
  interactive?: boolean;
};

export default function GlassCard({
  children,
  className = "",
  tone = "light",
  interactive = true
}: Props) {
  const reduced = useReducedMotion();
  const baseLight =
    "bg-linen/85 border border-ink/10 shadow-soft hover:bg-white hover:shadow-glass hover:border-ink/15";
  const baseDark =
    "bg-bark/40 border border-light/8 backdrop-blur-xl hover:bg-bark/55 hover:border-light/15";

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={interactive && !reduced ? { y: -4 } : undefined}
      className={[
        "relative p-8 md:p-10 rounded-xl2",
        "backdrop-blur-xl transition-all duration-500",
        tone === "dark" ? baseDark : baseLight,
        className
      ].join(" ")}
    >
      {children}
    </motion.div>
  );
}
