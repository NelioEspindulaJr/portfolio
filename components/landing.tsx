"use client";

import { cn } from "@/lib/utils";
import { BubbleBackground } from "./animate-ui/components/backgrounds/bubble";
import ProjectsScrollable from "./projects-scrollable";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";

export default function Landing() {
  const handleScrollToBottom = () => {
    const nextSection = document.getElementById("site-sections");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      id="page"
      className={cn([
        "relative",
        "w-full",
        "min-h-screen",
        "bg-background",
        "duration-[.9s]",
        "overflow-hidden",
        "text-foreground",
        "whitespace-normal",
        "transition-colors",
      ])}
    >
      <div
        id="background"
        className={cn([
          "absolute",
          "z-1",
          "left-[max(20px,4vmin)]",
          "right-[max(20px,4vmin)]",
          "top-[max(20px,4vmin)]",
          "bottom-[max(20px,4vmin)]",
          "pointer-events-none",
          "overflow-hidden",
          "bg-background",
        ])}
      >
        <BubbleBackground className="absolute bg-background" />
        <ProjectsScrollable />
      </div>
      <div
        id="mask"
        className={cn([
          "absolute",
          "z-3",
          "left-0",
          "top-0",
          "w-full",
          "h-full",
          "overflow-hidden",
          "pointer-events-none",
        ])}
      >
        <div
          id="mask-top"
          className={cn([
            "absolute",
            "left-0",
            "top-0",
            "w-full",
            "h-[max(20px,4vmin)]",
            "bg-background",
            "transition-colors",
            "duration-[.9s]",
            "opacity-90",
          ])}
        />
        <div
          id="mask-bottom"
          className={cn([
            "absolute",
            "left-0",
            "bottom-0",
            "w-full",
            "h-[max(20px,4vmin)]",
            "bg-background",
            "transition-colors",
            "duration-[.9s]",
            "opacity-90",
          ])}
        />
      </div>
      <div
        id="frame"
        className={cn([
          "z-10",
          "absolute",
          "pointer-events-none",
          "[&>div]:absolute",
          "mix-blend-difference",
          "[&>div]:bg-foreground",
          "[&>div]:opacity-75",
          "top-[max(20px,4vmin)]",
          "left-[max(20px,4vmin)]",
          "right-[max(20px,4vmin)]",
          "bottom-[max(20px,4vmin)]",
        ])}
      >
        <div className="left-0 top-0 h-full w-px" />
        <div className="right-0 top-0 h-full w-px" />
        <div className="top-0 left-0 w-full h-px" />
        <div className="bottom-0 right-0 w-full h-px" />
      </div>
      <header className="absolute top-[calc(max(20px,4vmin)*2)] left-[calc(max(20px,4vmin)*2)] z-10 flex flex-col gap-y-2 max-w-5/12">
        <h1
          className={`text-5xl font-extralight uppercase select-none self-stretch`}
        >
          NÉLIO ESPÍNDULA JUNIOR
        </h1>
        <p className="text-sm font-extralight">Full Stack Developer</p>

        <Separator className="my-4 w-full" />

        <div className="flex flex-col items-center gap-y-2 w-full">
          <motion.button
            type="button"
            onClick={handleScrollToBottom}
            aria-label="Descer para as próximas seções"
            className="group relative cursor-pointer grid size-14 place-items-center rounded-full border border-foreground/40 bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            initial={{ y: 0, scale: 1 }}
            animate={{ y: [0, 6, 0], scale: [1, 1.02, 1] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95, y: 2 }}
          >
            <motion.span
              className="text-lg leading-none"
              animate={{ y: [0, 3, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↓
            </motion.span>
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full border border-foreground/20"
              animate={{ scale: [1, 1.12], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.button>
        </div>
      </header>
    </div>
  );
}
