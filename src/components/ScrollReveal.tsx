import { motion, useInView } from 'framer-motion';
import { useRef, type PropsWithChildren } from 'react';

interface ScrollRevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.18, margin: '0px 0px -8% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 24, filter: 'blur(4px)' }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
