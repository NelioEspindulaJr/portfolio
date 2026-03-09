"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import SignIn from "./sign-in";
import { useDisclosure } from "@/components/hooks/use-disclosure";
import { useAuth } from "@/components/hooks/use-auth";
import DropdownMenuAvatar from "@/components/ui/dropdown-menu-avatar";

export default function Authentication() {
  const { open: signInOpen, onToggle: signInOnToggle } = useDisclosure();
  const { user } = useAuth();

  return !!user ? (
    <DropdownMenuAvatar avatar={user.avatarUrl} />
  ) : (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={signInOnToggle}
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
