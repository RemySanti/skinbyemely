"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import React, { useRef } from "react";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline-light";
  className?: string;
  onClick?: () => void;
  strength?: number;
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  strength = 0.35
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-3 px-7 md:px-9 py-3.5 md:py-4 rounded-pill text-[11px] uppercase tracking-xl font-sans transition-colors duration-300 group select-none";

  const styles: Record<string, string> = {
    primary: "bg-ink text-ivory hover:bg-bark",
    ghost:
      "bg-white/55 border border-ink/10 text-ink backdrop-blur-md hover:bg-white/85 hover:border-ink/20",
    "outline-light":
      "border border-light/25 text-light hover:bg-light/10 hover:border-light/45"
  };

  const inner = (
    <>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-[-3px]">
        {children}
      </span>
      <span
        aria-hidden
        className="relative z-10 inline-flex w-5 h-5 rounded-full border border-current items-center justify-center text-[9px] transition-transform duration-300 group-hover:translate-x-1"
      >
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path
            d="M1 8 L8 1 M3 1 H8 V6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </>
  );

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {inner}
    </motion.div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="inline-block rounded-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        {content}
        {isExternal ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block bg-transparent border-0 p-0 rounded-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      {content}
    </button>
  );
}
