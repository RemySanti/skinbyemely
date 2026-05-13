"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [onDark, setOnDark] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 360, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 360, damping: 40, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 180, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Keep custom cursor desktop-only. On narrow layouts it can overlap UI.
    const mql = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const applyEnabled = () => {
      setEnabled(mql.matches);
      if (!mql.matches) {
        document.documentElement.classList.remove("custom-cursor");
      }
    };
    applyEnabled();
    if (!mql.matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const dark = !!(el && el.closest(".on-dark"));
      setOnDark(dark);
    };

    const interactiveSelector =
      "a, button, input, textarea, select, [data-cursor='hover']";
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(interactiveSelector)) setHovering(true);
    };
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(interactiveSelector)) setHovering(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    mql.addEventListener("change", applyEnabled);

    document.documentElement.classList.add("custom-cursor");

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      mql.removeEventListener("change", applyEnabled);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const dotColor = onDark ? "#efe5d4" : "#2a1f17";
  const ringColor = hovering
    ? onDark
      ? "rgba(200,168,119,0.85)"
      : "rgba(168,137,85,0.85)"
    : onDark
      ? "rgba(239,229,212,0.45)"
      : "rgba(42,31,23,0.35)";

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed z-30 w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          left: sx,
          top: sy,
          background: dotColor,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      <motion.div
        aria-hidden
        className="fixed z-30 rounded-full pointer-events-none border"
        style={{
          left: ringX,
          top: ringY,
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          borderColor: ringColor,
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 220ms ease, height 220ms ease, border-color 220ms ease"
        }}
      />
    </>
  );
}
