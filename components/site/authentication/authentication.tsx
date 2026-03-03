import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import SignIn from "./sign-in";
import { useDisclosure } from "@/components/hooks/use-disclosure";

export default function Authentication() {
  const { open: signInOpen, onToggle: signInOnToggle } = useDisclosure();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={signInOnToggle}
      >
        <Avatar>
          <AvatarImage alt="login" />
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </Button>
      <SignIn open={signInOpen} onToggle={signInOnToggle} />
    </>
  );
}
