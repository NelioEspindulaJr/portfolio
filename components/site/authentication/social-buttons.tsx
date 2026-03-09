import { useSocialLogin } from "@/components/api/auth/auth.hooks";
import { useAuth } from "@/components/hooks/use-auth";
import { DiscordIcon } from "@/components/icons/discord-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";

export default function SocialButtons({
  type = "signin",
}: {
  type?: "signin" | "signup";
}) {
  const { setIsAuthenticating } = useAuth();
  const message = type === "signin" ? "Faça login" : "Cadastre-se";

  const githubMutation = useSocialLogin("github");
  const googleMutation = useSocialLogin("google");
  const discordMutation = useSocialLogin("discord");

  const handleRedirect = (redirectUrl: string) => {
    window.location.assign(redirectUrl);
  };

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          setIsAuthenticating(true);
          githubMutation.mutate(undefined, {
            onSuccess: ({ data }) => {
              handleRedirect(data);
            },
            onError: () => {
              setIsAuthenticating(false);
            },
          });
        }}
      >
        <GithubIcon />
        <span className="sr-only">{message} com Github</span>
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          setIsAuthenticating(true);
          googleMutation.mutate(undefined, {
            onSuccess: ({ data }) => {
              handleRedirect(data);
            },
            onError: () => {
              setIsAuthenticating(false);
            },
          });
        }}
      >
        <GoogleIcon />
        <span className="sr-only">{message} com Google</span>
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          setIsAuthenticating(true);
          discordMutation.mutate(undefined, {
            onSuccess: ({ data }) => {
              handleRedirect(data);
            },
            onError: () => {
              setIsAuthenticating(false);
            },
          });
        }}
      >
        <DiscordIcon />
        <span className="sr-only">{message} com Discord</span>
      </Button>
    </>
  );
}
