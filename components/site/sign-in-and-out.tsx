import DropdownMenuAvatar from "@/components/ui/dropdown-menu-avatar";
import { usePathname } from "next/navigation";
import { LogOutIcon, User2 } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { useSession, signOut, signIn } from "next-auth/react";
import { GithubIcon } from "../icons/github-icon";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { GoogleIcon } from "../icons/google-icon";

export default function SignInAndOut() {
  const pathname = usePathname();
  const { data, status } = useSession();
  const isBlogPage = pathname.startsWith("/blog");

  if (!isBlogPage) return null;

  return (
    <div>
      <Separator orientation="vertical" style={{ height: "stretch" }} />
      {isBlogPage && status === "authenticated" ? (
        <DropdownMenuAvatar avatar={data.user?.image ?? undefined}>
          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuAvatar>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage alt="login" />
                <AvatarFallback>
                  <User2 />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm md:max-w-md flex flex-col items-center space-y-5">
            <DialogHeader className="flex items-center text-center">
              <DialogTitle>Bem vindo</DialogTitle>
              <DialogDescription>
                Faça login com sua conta do Github ou Google.
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <div className="flex flex-col w-full items-center gap-5">
              <Button
                className="cursor-pointer py-2 px-4 w-[75%]"
                variant="outline"
                type="button"
                onClick={() => signIn("github")}
              >
                <GithubIcon />
                Login com Github
              </Button>

              <Button
                className="cursor-pointer py-2 px-4 w-[75%] bg-[#DB4437]/95! hover:bg-[#DB4437]! border-none!"
                variant="outline"
                type="button"
              >
                <GoogleIcon />
                Login com Google
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
