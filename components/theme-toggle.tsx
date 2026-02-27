"use client";

import { Moon, Sun } from "lucide-react";
import * as motion from "motion/react-client";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SwitchProps = {
  checked: boolean;
  onToggle: () => void;
  leftContent: ReactNode;
  rightContent: ReactNode;
  srLabel: string;
};

function MotionSwitch({
  checked,
  onToggle,
  leftContent,
  rightContent,
  srLabel,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={srLabel}
      onClick={onToggle}
      style={{ justifyContent: checked ? "flex-end" : "flex-start" }}
      className={cn(
        "relative inline-flex h-7 w-15 items-center rounded-full border border-border bg-background/70 p-1",
        "shadow-[0_2px_12px_-8px_rgba(0,0,0,0.35)] backdrop-blur-sm",
      )}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
        className="h-full w-[calc(50%-0.25rem)] rounded-full bg-foreground"
      />
      <span className="pointer-events-none absolute inset-0 z-10 grid grid-cols-2 items-center text-[10px] font-semibold uppercase tracking-[0.09em]">
        <span
          className={cn(
            "grid place-items-center motion-safe:transition-colors motion-safe:duration-300",
            !checked ? "text-background" : "text-foreground/60",
          )}
        >
          {leftContent}
        </span>
        <span
          className={cn(
            "grid place-items-center motion-safe:transition-colors motion-safe:duration-300",
            checked ? "text-background" : "text-foreground/60",
          )}
        >
          {rightContent}
        </span>
      </span>
    </button>
  );
}

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="absolute bottom-[calc(max(0.25rem,0.5vmin))] px-[max(20px,4vmin)] w-dvw z-50 flex items-center flex-row justify-center gap-2">
      <MotionSwitch
        checked={isDark}
        onToggle={toggleTheme}
        leftContent={<Sun className="size-3" />}
        rightContent={<Moon className="size-3" />}
        srLabel="Alternar tema entre claro e escuro"
      />
    </div>
  );
}
