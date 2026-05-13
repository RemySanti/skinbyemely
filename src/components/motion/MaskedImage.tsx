"use client";

import Image, { ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = Omit<ImageProps, "alt"> & {
  alt: string;
  className?: string;
  rounded?: string;
  delay?: number;
};

export default function MaskedImage({
  alt,
  className = "",
  rounded = "rounded-xl2",
  delay = 0,
  ...imageProps
}: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden ${rounded} ${className}`}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { clipPath: "inset(100% 0% 0% 0%)" },
        visible: {
          clipPath: "inset(0% 0% 0% 0%)",
          transition: {
            duration: 1.1,
            delay,
            ease: [0.76, 0, 0.24, 1]
          }
        }
      }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={reduced ? { scale: 1 } : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image alt={alt} {...imageProps} />
      </motion.div>
    </motion.div>
  );
}
