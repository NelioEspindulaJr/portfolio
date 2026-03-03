import { DiscordIcon } from "@/components/icons/discord-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";

export default function SocialButtons({
  type = "signin",
}: {
  type?: "signin" | "signup";
}) {
  const message = type === "signin" ? "Faça login" : "Cadastre-se";
  return (
    <>
      <Button variant="outline" type="button">
        <GithubIcon />
        <span className="sr-only">{message} com Github</span>
      </Button>
      <Button variant="outline" type="button">
        <GoogleIcon />
        <span className="sr-only">{message} com Google</span>
      </Button>
      <Button variant="outline" type="button">
        <DiscordIcon />
        <span className="sr-only">{message} com Meta</span>
      </Button>
    </>
  );
}
