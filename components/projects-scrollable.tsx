"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef } from "react";
import { faker } from "@faker-js/faker";

export default function ProjectsScrollable() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative z-10 h-full min-h-0 px-[calc(max(20px,4vmin))] pointer-events-auto">
      <motion.div
        ref={ref}
        id="background-scroll"
        className={cn([
          "relative",
          "h-full",
          "min-h-0",
          "w-full",
          "overflow-y-auto",
          "overflow-x-hidden",
          "overscroll-auto",
          "pointer-events-auto",
          "touch-pan-y",
          "select-none",
          "motion-safe:scroll-smooth",
          "[scrollbar-width:none]",
          "[-ms-overflow-style:none]",
          "[&::-webkit-scrollbar]:hidden",
        ])}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex w-full flex-col items-end gap-y-10 text-right">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div
              key={index}
              className="w-full max-w-1/2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <a
                href={faker.internet.url()}
                className="block w-full wrap-break-word transition-opacity duration-[.4s] hover:opacity-25"
              >
                <motion.h2
                  className="text-5xl font-extralight uppercase"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {faker.word.words({ count: { min: 1, max: 6 } })}
                </motion.h2>
              </a>
              <motion.p className="text-xs font-bold">
                {faker.date.past().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
