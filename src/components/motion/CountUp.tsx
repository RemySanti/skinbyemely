"use client";

import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
};

export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = ""
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(from);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v)
    });
    return () => controls.stop();
  }, [inView, to, from, duration, reduced]);

  const displayValue = `${prefix}${val.toFixed(decimals)}${suffix}`;
  const finalValue = `${prefix}${to.toFixed(decimals)}${suffix}`;

  return (
    <motion.span
      ref={ref}
      className={className}
      aria-label={finalValue}
    >
      <span aria-hidden="true">{displayValue}</span>
    </motion.span>
  );
}
