"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          size="icon-sm"
          className="relative rounded-full border border-border/70 bg-background/70 backdrop-blur-sm transition-colors hover:bg-muted"
        >
          <Sun
            className={`size-3.5 transition-all ${
              currentTheme === "dark" ? "scale-75 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute size-3.5 transition-all ${
              currentTheme === "dark" ? "scale-100 opacity-100" : "scale-75 opacity-0"
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
            {theme === item.value ? <Check className="ml-auto size-3.5" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
