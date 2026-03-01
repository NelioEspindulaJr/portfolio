import type { Metadata } from "next";

import { bebasNeue, inter, sora } from "@/app/fonts";
import { ViewTransitions } from "next-view-transitions";

import Providers from "@/components/providers/providers";
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
        <body
          className={`${inter.variable} ${sora.variable} ${bebasNeue.variable} antialiased`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
