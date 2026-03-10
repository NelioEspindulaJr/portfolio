"use client";

import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> & {
    event: string;
    payload?: Record<string, string | number | boolean | undefined>;
  };

export function TrackedLink({
  event,
  payload,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (clickEvent: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, payload);
    onClick?.(clickEvent);
  };

  return <Link {...props} onClick={handleClick} />;
}
