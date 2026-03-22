"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function HeroImage({ alt }: { alt: string }) {
  return (
    <motion.div
      className="hidden md:flex absolute right-0 inset-y-0 items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
    >
      <motion.div
        transition={{ duration: 5, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
      >
        <Image
          src="/nelio.jpeg"
          alt={alt}
          width={230}
          height={520}
          priority
          className="rounded-md object-cover object-top shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
}
