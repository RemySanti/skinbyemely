"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

const buildVariants = (y: number, duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.9,
  className = "",
  once = true
}: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      animate={reduced ? "visible" : undefined}
      viewport={{ once, amount: 0.2 }}
      variants={buildVariants(y, duration, delay)}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className = "",
  stagger = 0.08,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      animate={reduced ? "visible" : undefined}
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = ({
  children,
  className = "",
  y = 24
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      }
    }}
  >
    {children}
  </motion.div>
);
