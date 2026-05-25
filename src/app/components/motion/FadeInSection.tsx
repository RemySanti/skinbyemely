import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { fadeUpVariants } from '../../utils/motion';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInSection({ children, className = "", delay = 0 }: FadeInSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: fadeUpVariants.hidden,
        visible: {
          ...fadeUpVariants.visible,
          transition: {
            ...fadeUpVariants.visible.transition,
            delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
