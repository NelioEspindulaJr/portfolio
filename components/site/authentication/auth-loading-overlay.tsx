"use client";

import { useAuth } from "@/components/hooks/use-auth";
import { LoaderCircle } from "lucide-react";

export default function AuthLoadingOverlay() {
  const { isAuthenticating } = useAuth();

  if (!isAuthenticating) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-background/85 backdrop-blur-sm">
      <LoaderCircle className="size-4 animate-spin" />
    </div>
  );
}
