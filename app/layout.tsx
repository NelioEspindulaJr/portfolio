import FrameLayout from "@/components/frame-layout";
import Header from "@/components/header";
import { bebasNeue } from "@/app/fonts";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/providers/theme-provider";

import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
export const metadata: Metadata = {};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}>;

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  return (
    <ViewTransitions>
      <html lang={lang} suppressHydrationWarning>
        <body
          className={`${bebasNeue.variable} ${bebasNeue.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="light">
            <FrameLayout />
            <div className="pointer-events-none absolute inset-0 z-50">
              <div className="pointer-events-auto">
                <Header />
                <ModeToggle />
              </div>
            </div>
            <div
              className={cn([
                "z-20",
                "top-0",
                "left-0",
                "min-h-0",
                "right-0",
                "absolute",
                "bottom-0",
                "overflow-hidden",
                "pointer-events-auto",
                "px-[calc(max(20px,4vmin)*2)]",
                "py-[calc(max(20px,4vmin)+8px)]",
              ])}
            >
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
