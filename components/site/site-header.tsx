"use client";

import Link from "next/link";
import SignInAndOut from "./sign-in-and-out";

import { siteContent } from "@/data/site-content";
import { ModeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/85">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-base font-medium tracking-tight text-foreground"
        >
          {siteContent.name}
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-5 md:flex">
            {siteContent.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <ModeToggle />
          </nav>
          <SignInAndOut />
        </div>
      </div>
    </header>
  );
}
