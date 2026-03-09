"use client";

import { Check, Moon, Sun } from "lucide-react";
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
  const { setTheme, theme, resolvedTheme } = useTheme();

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const items = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full bg-background/70 backdrop-blur-sm transition-colors hover:bg-muted"
        >
          <Sun
            className={`transition-all ${
              currentTheme === "dark"
                ? "scale-75 opacity-0"
                : "scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute transition-all ${
              currentTheme === "dark"
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32 rounded-xl p-1">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => setTheme(item.value)}
            className="rounded-lg px-2 py-1.5 text-xs"
          >
            <span>{item.label}</span>
            {theme === item.value ? (
              <Check className="ml-auto size-3.5" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
