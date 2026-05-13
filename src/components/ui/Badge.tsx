import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export default function Badge({ children, className = "", tone = "light" }: Props) {
  const styles =
    tone === "dark"
      ? "border-light/15 bg-light/5 text-gold"
      : "border-ink/10 bg-white/60 text-gold-deep";

  return (
    <span
      className={[
        "inline-flex items-center gap-2 px-4 py-2 rounded-pill",
        "border backdrop-blur-md",
        "uppercase tracking-xl text-[10px]",
        styles,
        className
      ].join(" ")}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}
