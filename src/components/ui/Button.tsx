"use client";

import React from "react";

type Props = {
  variant?: "primary" | "ghost" | "outline-light";
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  variant = "primary",
  children,
  href,
  type = "button",
  onClick,
  className = ""
}: Props) {
  const base =
    "inline-flex items-center justify-center px-7 md:px-9 py-3 md:py-3.5 rounded-pill text-[11px] uppercase tracking-xl transition-all duration-300 font-sans";

  const styles: Record<string, string> = {
    primary: "bg-ink text-ivory hover:-translate-y-[2px] hover:bg-bark",
    ghost:
      "border border-ink/10 text-ink bg-white/55 backdrop-blur-md hover:bg-white/85 hover:border-ink/20",
    "outline-light":
      "border border-light/25 text-light hover:bg-light/10 hover:border-light/45"
  };

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={`${base} ${styles[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}
