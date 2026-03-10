"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import SignIn from "./sign-in";
import { useDisclosure } from "@/components/hooks/use-disclosure";
import { useAuth } from "@/components/hooks/use-auth";
import DropdownMenuAvatar from "@/components/ui/dropdown-menu-avatar";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function Authentication() {
  const { open: signInOpen, onToggle: signInOnToggle } = useDisclosure();
  const { user } = useAuth();
  const pathname = usePathname();

  return !!user ? (
    <DropdownMenuAvatar avatar={user.avatarUrl} />
  ) : (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => {
          trackEvent("auth_dialog_open", {
            location: pathname,
          });
          signInOnToggle();
        }}
      >
        <Avatar>
          <AvatarImage alt="authentication" />
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </Button>
      <SignIn open={signInOpen} onToggle={signInOnToggle} />
    </>
  );
}
