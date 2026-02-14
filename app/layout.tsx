import Landing from "@/components/landing";
import { bebasNeue } from "@/app/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";

import type { Metadata } from "next";

import "./globals.css";
export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${bebasNeue.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Landing />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
