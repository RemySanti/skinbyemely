"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  ariaLabel?: string;
};

export default function RevealText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  as = "h2",
  id,
  ariaLabel
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const Tag = motion[as] as typeof motion.h2;
  const label = ariaLabel ?? text;

  if (reduced) {
    const PlainTag = as as React.ElementType;
    return (
      <PlainTag id={id} className={className} aria-label={ariaLabel}>
        {text}
      </PlainTag>
    );
  }

  return (
    <Tag
      id={id}
      aria-label={label}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
      }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-top"
          style={{ paddingBottom: "0.12em" }}
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.12
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced)
    return (
      <div className={className}>
        {lines.map((l, i) => (
          <div key={i} className={lineClassName}>
            {l}
          </div>
        ))}
      </div>
    );

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
      }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          className="overflow-hidden"
          style={{ paddingBottom: "0.12em" }}
        >
          <motion.div
            className={lineClassName}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            {l}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
