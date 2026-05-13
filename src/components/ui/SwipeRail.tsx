"use client";

import { useEffect, useId, useRef, useState } from "react";

type Cols = 2 | 3 | 4;

type Props = {
  children: React.ReactNode[];
  /** desktop columns (md and up) */
  cols?: Cols;
  /** % of viewport each card takes on mobile (default 85) */
  mobileWidth?: 70 | 80 | 85 | 90;
  className?: string;
  /** show pagination dots on mobile (default true) */
  showDots?: boolean;
  /** accessible label, becomes the rail's aria-label on mobile */
  ariaLabel?: string;
  /**
   * When true on mobile, vertical wheel/touch input is converted into
   * horizontal rail movement until the rail reaches start/end.
   */
  lockVerticalScroll?: boolean;
};

const colClasses: Record<Cols, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4 lg:grid-cols-4"
};

const mobileWidthClass: Record<NonNullable<Props["mobileWidth"]>, string> = {
  70: "w-[70vw] max-w-[300px]",
  80: "w-[80vw] max-w-[340px]",
  85: "w-[85vw] max-w-[360px]",
  90: "w-[90vw] max-w-[380px]"
};

/**
 * On mobile: horizontal swipeable rail with scroll-snap and pagination dots.
 * On md+: regular CSS grid with the requested column count.
 *
 * Children must be valid grid/flex items (each is wrapped automatically).
 */
export default function SwipeRail({
  children,
  cols = 3,
  mobileWidth = 85,
  className = "",
  showDots = true,
  ariaLabel,
  lockVerticalScroll = false
}: Props) {
  const items = Array.isArray(children) ? children : [children];
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canSwipe, setCanSwipe] = useState(false);
  const labelId = useId();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setCanSwipe(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!canSwipe) return;
    const el = railRef.current;
    if (!el) return;
    let raf = 0;
    const handle = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const childs = Array.from(el.children) as HTMLElement[];
        if (!childs.length) return;
        const railRect = el.getBoundingClientRect();
        const center = railRect.left + railRect.width / 2;
        let nearest = 0;
        let nearestDist = Infinity;
        childs.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - center);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = i;
          }
        });
        setActive(nearest);
      });
    };
    el.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", handle);
    };
  }, [canSwipe, items.length]);

  useEffect(() => {
    if (!canSwipe || !lockVerticalScroll) return;
    const el = railRef.current;
    if (!el) return;

    const atStart = () => el.scrollLeft <= 1;
    const atEnd = () => el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const down = e.deltaY > 0;
      const canMove = down ? !atEnd() : !atStart();
      if (!canMove) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY * 1.15;
    };

    let lastX = 0;
    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - lastX;
      const dy = y - lastY;

      // Only capture mostly vertical gestures and convert them to horizontal.
      if (Math.abs(dy) > Math.abs(dx)) {
        const intendedHorizontal = -dy;
        const canMoveForward = intendedHorizontal > 0 && !atEnd();
        const canMoveBackward = intendedHorizontal < 0 && !atStart();
        if (canMoveForward || canMoveBackward) {
          e.preventDefault();
          el.scrollLeft += intendedHorizontal;
        }
      }

      lastX = x;
      lastY = y;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [canSwipe, lockVerticalScroll]);

  const goTo = (i: number) => {
    const el = railRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
      behavior: "smooth"
    });
  };

  return (
    <div className={className}>
      <div
        ref={railRef}
        role={canSwipe ? "region" : undefined}
        aria-roledescription={canSwipe ? "carousel" : undefined}
        aria-label={canSwipe ? ariaLabel : undefined}
        aria-labelledby={!ariaLabel && canSwipe ? labelId : undefined}
        style={{
          touchAction: canSwipe && lockVerticalScroll ? "none" : undefined
        }}
        className={[
          // mobile: horizontal scroll snap
          "flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 swipe-rail",
          "-mx-5 px-5 sm:-mx-6 sm:px-6 scroll-smooth",
          // hide scrollbar
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // desktop: grid layout
          "md:grid md:gap-6 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0",
          colClasses[cols]
        ].join(" ")}
      >
        {items.map((child, i) => (
          <div
            key={i}
            role={canSwipe ? "group" : undefined}
            aria-roledescription={canSwipe ? "slide" : undefined}
            aria-label={
              canSwipe ? `Slide ${i + 1} of ${items.length}` : undefined
            }
            className={[
              // mobile: snap card
              "snap-center shrink-0 first:ml-0",
              mobileWidthClass[mobileWidth],
              // desktop: reset to grid item behaviour
              "md:w-auto md:max-w-none md:shrink md:snap-align-none"
            ].join(" ")}
          >
            {child}
          </div>
        ))}
      </div>

      {showDots && items.length > 1 ? (
        <div
          className="md:hidden flex items-center justify-center gap-2.5 mt-2 mb-1"
          role="tablist"
          aria-label="Slide pagination"
        >
          {items.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-gold"
                    : "w-1.5 bg-current opacity-30 hover:opacity-60"
                }`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
