"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useGsapScroll wires up scroll-driven GSAP animations:
 * - [data-parallax="<n>"] -> parallax translateY by n * scroll progress
 * - .gs-fade -> fade + translate as it enters the viewport
 * - .gs-scale -> scale-up as it crosses viewport
 * - [data-pin] -> pin element while parent section scrolls
 */
export function useGsapScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Parallax (data-parallax="-80" moves -80px through scroll range)
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const distance = parseFloat(el.dataset.parallax || "0");
        gsap.fromTo(
          el,
          { y: -distance / 2 },
          {
            y: distance / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6
            }
          }
        );
      });

      // Fade-in on enter
      gsap.utils.toArray<HTMLElement>(".gs-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Scale on enter
      gsap.utils.toArray<HTMLElement>(".gs-scale").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.94, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Horizontal slide
      gsap.utils.toArray<HTMLElement>(".gs-slide-x").forEach((el) => {
        const direction = el.dataset.dir === "right" ? 1 : -1;
        gsap.fromTo(
          el,
          { x: direction * 80, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Refresh once everything's mounted
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
}
