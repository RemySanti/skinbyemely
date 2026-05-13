"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  clips: string[];
  className?: string;
  intervalMs?: number;
};

export default function CinematicLoop({
  clips,
  className = "",
  intervalMs = 5200
}: Props) {
  const [idx, setIdx] = useState(0);
  const safeClips = clips.length ? clips : [];

  useEffect(() => {
    if (safeClips.length <= 1) return;
    const t = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % safeClips.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, safeClips.length]);

  if (!safeClips.length) return null;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.video
          key={safeClips[idx]}
          src={safeClips[idx]}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          initial={{ opacity: 0.2, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
