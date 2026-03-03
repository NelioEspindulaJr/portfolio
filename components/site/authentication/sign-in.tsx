import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@/components/hooks/use-disclosure";
import SignUp from "./sign-up";
import SocialButtons from "./social-buttons";
import ForgotPassword from "./forgot-password";

export default function SignIn({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");
  const { open: signUpOpen, onToggle: signUpOnToggle } = useDisclosure();
  const { open: forgotPasswordOpen, onToggle: forgotPasswordOnToggle } =
    useDisclosure();

  if (!isBlogPage) return null;

  return (
    <div>
      <Dialog open={open} onOpenChange={onToggle}>
        <DialogContent className="sm:max-w-sm md:max-w-md">
          <DialogTitle>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Acesse sua conta</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Insira seu email abaixo para acessar sua conta
              </p>
            </div>
          </DialogTitle>
          <form className={cn("flex flex-col gap-6")}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@dev.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer"
                    onClick={() => {
                      onToggle();
                      forgotPasswordOnToggle();
                    }}
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              <FieldSeparator>Ou continue com</FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <SocialButtons type="signin" />
              </Field>
              <FieldDescription className="text-center">
                Não tem uma conta?{" "}
                <a
                  className="underline underline-offset-4 cursor-pointer"
                  onClick={() => {
                    onToggle();
                    signUpOnToggle();
                  }}
                >
                  Cadastre-se
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
      <SignUp
        open={signUpOpen}
        onToggle={signUpOnToggle}
        toggleSignIn={onToggle}
      />
      <ForgotPassword
        open={forgotPasswordOpen}
        onToggle={forgotPasswordOnToggle}
      />
    </div>
  );
}
