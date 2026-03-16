import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "../ui/tooltip";

import AuthProvider from "./auth-provider";
import QueryProvider from "./query-client-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryProvider>
        <NextIntlClientProvider>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
