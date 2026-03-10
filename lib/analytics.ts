"use client";

import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  sendGTMEvent({
    event,
    ...payload,
  });

  sendGAEvent("event", event, payload);
}
