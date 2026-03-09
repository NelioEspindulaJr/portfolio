"use client";

import { useSocialLoginCallback } from "@/components/api/auth/auth.hooks";
import { SocialAuthProviders } from "@/components/api/auth/auth.types";
import { useAuth } from "@/components/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

const SUPPORTED_PROVIDERS: SocialAuthProviders[] = [
  "github",
  "google",
  "discord",
];

const isSupportedProvider = (
  provider: string | undefined,
): provider is SocialAuthProviders =>
  !!provider && SUPPORTED_PROVIDERS.includes(provider as SocialAuthProviders);

export default function CallbackPage() {
  const { signIn, setIsAuthenticating } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { provider } = useParams<{ provider: string }>();

  const code = searchParams.get("code");
  const oauthError = searchParams.get("error");
  const oauthErrorDescription = searchParams.get("error_description");

  const { mutate, isError } = useSocialLoginCallback();
  const hasTriggeredRef = useRef(false);

  const normalizedError = useMemo(() => {
    if (!oauthError) return null;

    if (oauthErrorDescription) {
      try {
        return decodeURIComponent(oauthErrorDescription);
      } catch {
        return oauthErrorDescription;
      }
    }

    return "A autenticação foi recusada pelo provedor.";
  }, [oauthError, oauthErrorDescription]);

  const callbackValidationError = useMemo(() => {
    if (!isSupportedProvider(provider)) {
      return "Provedor OAuth inválido.";
    }

    if (normalizedError) return normalizedError;

    if (!code) return "Código de autenticação ausente.";

    return null;
  }, [code, normalizedError, provider]);

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    if (callbackValidationError || !isSupportedProvider(provider) || !code) {
      return;
    }

    setIsAuthenticating(true);

    mutate(
      { provider, code },
      {
        onSuccess: ({ data }) => {
          signIn(data);
          router.replace("/blog", { scroll: false });
        },
        onSettled: () => {
          setIsAuthenticating(false);
        },
      },
    );
  }, [
    callbackValidationError,
    code,
    mutate,
    provider,
    router,
    setIsAuthenticating,
    signIn,
  ]);

  const errorMessage = callbackValidationError
    ? callbackValidationError
    : isError
      ? "Falha ao concluir autenticação. Tente novamente."
      : null;

  if (!errorMessage) return null;

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4 rounded-lg border border-border bg-card p-6 text-center shadow-sm">
        <h1 className="text-xl font-semibold">Não foi possível autenticar</h1>
        <p className="text-sm text-muted-foreground">{errorMessage}</p>
        <Button
          type="button"
          className="w-full"
          onClick={() => router.replace("/blog", { scroll: false })}
        >
          Voltar para o blog
        </Button>
      </div>
    </main>
  );
}
