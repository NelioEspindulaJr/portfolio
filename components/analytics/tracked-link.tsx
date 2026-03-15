"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentPropsWithoutRef<typeof Link> & {
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
