import { ThemeProvider } from "next-themes";
import QueryProvider from "./query-client-provider";
import AuthProvider from "./auth-provider";
import { TooltipProvider } from "../ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
