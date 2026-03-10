import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Callback de autenticação",
  path: "/api/auth/callback",
  noIndex: true,
});

type CallbackLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function CallbackLayout({ children }: CallbackLayoutProps) {
  return children;
}
