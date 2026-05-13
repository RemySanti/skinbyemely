"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number; // seconds for one loop
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
};

export default function Marquee({
  children,
  speed = 36,
  className = "",
  pauseOnHover = true,
  reverse = false
}: Props) {
  const edgeMask =
    "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)";

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        maskImage: edgeMask,
        WebkitMaskImage: edgeMask
      }}
    >
      <div
        className={`marquee-track ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal"
        }}
      >
        <div className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12">{children}</div>
        <div className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
