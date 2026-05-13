import { Variants } from 'motion/react';

// 1. Global Motion Rules
// cubic-bezier(0.22, 1, 0.36, 1) (luxury standard)
export const EASE_LUXURY = [0.22, 1, 0.36, 1];

export const TRANSITION_MICRO = {
  duration: 0.3, // 300ms (within 200-400ms range)
  ease: EASE_LUXURY
};

export const TRANSITION_REVEAL = {
  duration: 0.7, // 700ms (within 500-700ms range)
  ease: EASE_LUXURY
};

// 2. Page Load Animation / 3. Section Reveal System
export const fadeUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16, // 8-16px range
    filter: 'blur(2px)' // Very subtle blur
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: TRANSITION_REVEAL
  }
};

export const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0,
    filter: 'blur(2px)'
  },
  visible: { 
    opacity: 1,
    filter: 'blur(0px)',
    transition: TRANSITION_REVEAL
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // 80-120ms range
      delayChildren: 0.1
    }
  }
};

// 6. Buttons & CTAs
export const buttonTap: Variants = {
  tap: { 
    scale: 0.97,
    transition: { duration: 0.1, ease: "easeOut" }
  }
};

// 5. Product Cards
export const productCardHover: Variants = {
  initial: { y: 0 },
  hover: { 
    y: -4, // 2-4px range
    transition: TRANSITION_MICRO
  }
};
