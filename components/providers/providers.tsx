import { ThemeProvider } from "next-themes";
import QueryProvider from "./query-client-provider";
import AuthProvider from "./auth-provider";
import { TooltipProvider } from "../ui/tooltip";
import { NextIntlClientProvider } from "next-intl";

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
