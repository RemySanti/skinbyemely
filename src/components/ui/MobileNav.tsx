"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef } from "react";

type LinkItem = { href: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  links: LinkItem[];
};

export default function MobileNav({ open, onClose, links }: Props) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-nav"
          className="fixed inset-0 z-[80] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
        >
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={onClose}
            className="absolute inset-0 bg-mocha/80 backdrop-blur-sm"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: reduced ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduced ? 0 : "100%" }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="on-dark absolute right-0 top-0 h-[100dvh] w-[88vw] max-w-sm bg-mocha border-l border-light/15 shadow-product flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-light/10">
              <span
                id={titleId}
                className="font-serif italic text-light text-lg tracking-wide"
              >
                Skin <span className="not-italic text-gold">·</span> Emely
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full grid place-items-center text-light/80 hover:text-light hover:bg-light/10 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M3 3 L15 15 M15 3 L3 15"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav
              aria-label="Mobile primary"
              className="flex-1 overflow-y-auto px-6 py-8"
            >
              <ul className="space-y-1">
                {links.map((l, i) => {
                  const active = pathname === l.href;
                  return (
                    <li key={l.href}>
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.1 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <Link
                          href={l.href}
                          aria-current={active ? "page" : undefined}
                          onClick={onClose}
                          className={`flex items-center justify-between py-4 border-b border-light/10 font-serif text-2xl ${
                            active ? "text-gold" : "text-light"
                          }`}
                        >
                          <span>{l.label}</span>
                          <span
                            aria-hidden="true"
                            className="text-light/40 text-sm tracking-xl uppercase"
                          >
                            0{i + 1}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10"
              >
                <p className="text-[10px] tracking-xxl uppercase text-gold mb-3">
                  Studio
                </p>
                <address className="not-italic text-light/80 text-sm leading-relaxed">
                  1111 Oakfield Dr,
                  <br />
                  Brandon, FL 33511
                </address>
                <a
                  href="tel:+19142997739"
                  className="mt-4 inline-block text-light text-sm border-b border-gold/40 hover:border-gold pb-1"
                >
                  (914) 299-7739
                </a>
              </motion.div>
            </nav>

            <div className="px-6 pb-[calc(20px+env(safe-area-inset-bottom))] pt-4 border-t border-light/10">
              <Link
                href="/contact"
                onClick={onClose}
                className="block text-center w-full bg-gold text-mocha font-medium uppercase tracking-xl text-[11px] py-4 rounded-pill hover:bg-gold-deep hover:text-light transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
