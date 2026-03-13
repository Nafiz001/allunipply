"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface StaggerRevealProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
}

const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  direction = "up",
  className = "",
  once = true,
}) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const item: Variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    show: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      }
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerReveal;
