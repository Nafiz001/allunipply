"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  scale?: boolean;
}

const directionMap: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 48 },
  down:  { y: -48 },
  left:  { x: 48 },
  right: { x: -48 },
  none:  {},
};

export const ScrollReveal = ({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.65,
  once = true,
  amount = 0.15,
  scale = false,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const hidden  = { opacity: 0, ...directionMap[direction], ...(scale ? { scale: 0.92 } : {}) };
  const visible = { opacity: 1, x: 0, y: 0, ...(scale ? { scale: 1 } : {}) };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Stagger children — wrap list items with this */
export const StaggerReveal = ({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  once = true,
  amount = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>
      }
    </motion.div>
  );
};

/** Hover-lift wrapping motion.div for any interactive element */
export const HoverCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
