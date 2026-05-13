"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Item = {
  href: string;
  label: string;
  icon: ReactNode;
  match?: (pathname: string) => boolean;
};

const items: Item[] = [
  {
    href: "/",
    label: "Home",
    match: (p) => p === "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path
          d="M4 11 L12 4 L20 11 V20 A1 1 0 0 1 19 21 H15 V14 H9 V21 H5 A1 1 0 0 1 4 20 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    href: "/services",
    label: "Treatments",
    match: (p) => p.startsWith("/services") || p.startsWith("/concerns"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 4 L12 6.5 M12 17.5 L12 20 M4 12 L6.5 12 M17.5 12 L20 12 M6.3 6.3 L8 8 M16 16 L17.7 17.7 M6.3 17.7 L8 16 M16 8 L17.7 6.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    href: "/book",
    label: "Book",
    match: (p) => p.startsWith("/book") || p.startsWith("/contact"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <rect
          x="3.5"
          y="5.5"
          width="17"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 3 V7 M16 3 V7 M3.5 10 H20.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="15" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    href: "/memberships",
    label: "Members",
    match: (p) => p.startsWith("/memberships"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path
          d="M12 4 L14.5 9 L20 9.8 L16 13.6 L17 19 L12 16.5 L7 19 L8 13.6 L4 9.8 L9.5 9 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    href: "/about",
    label: "Studio",
    match: (p) =>
      p.startsWith("/about") ||
      p.startsWith("/results") ||
      p.startsWith("/education"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 20 C5 16.6 8.1 14 12 14 C15.9 14 19 16.6 19 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile primary"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3 sm:px-4 md:px-6 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
    >
      <motion.ul
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto relative isolate overflow-hidden mx-auto w-full max-w-md md:max-w-2xl flex items-stretch justify-between gap-1.5 md:gap-2 rounded-pill border-2 border-white/85 bg-[linear-gradient(135deg,rgba(35,22,14,0.86),rgba(52,34,23,0.82))] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_22px_50px_rgba(8,4,2,0.62)] px-2.5 md:px-3.5 py-2 before:pointer-events-none before:absolute before:inset-[1px] before:rounded-pill before:border before:border-white/55 before:bg-white/[0.08]"
      >
        {items.map((it) => {
          const active = it.match
            ? it.match(pathname)
            : pathname === it.href;
          return (
            <li key={it.href} className="flex-1 relative z-10">
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                aria-label={it.label}
                className={`relative w-full min-h-[58px] md:min-h-[60px] flex flex-col items-center justify-center gap-1 px-1.5 md:px-2 py-2 rounded-[20px] transition-colors ${
                  active
                    ? "text-gold"
                    : "text-light hover:text-gold/95"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="bottom-nav-active"
                    aria-hidden="true"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                    className="absolute inset-[4px] rounded-[18px] border border-[#d8b783] bg-[linear-gradient(145deg,rgba(216,183,131,0.2),rgba(255,255,255,0.06))] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_6px_18px_rgba(18,10,6,0.35)]"
                  />
                ) : null}
                <span className="relative w-6 h-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">{it.icon}</span>
                <span className="relative text-[9px] sm:text-[10px] font-medium tracking-[0.14em] sm:tracking-[0.16em] uppercase whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
