"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const variants = {
    hidden: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
  };

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
}
