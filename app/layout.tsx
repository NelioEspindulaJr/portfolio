import type { Metadata } from "next";

import { bebasNeue, sora } from "@/app/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ViewTransitions } from "next-view-transitions";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nelio Espindula Junior",
  description: "Meu portfólio e espaço pessoal para expressão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${sora.variable} ${bebasNeue.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
