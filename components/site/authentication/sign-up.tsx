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
import SocialButtons from "./social-buttons";

export default function SignUp({
  open,
  onToggle,
  toggleSignIn,
}: {
  open: boolean;
  onToggle: () => void;
  toggleSignIn: () => void;
}) {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  if (!isBlogPage) return null;

  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogContent className="sm:max-w-sm md:max-w-md">
        <DialogTitle>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Cria sua conta</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Insira seu email para criar uma conta
            </p>
          </div>
        </DialogTitle>
        <div className={cn("flex flex-col gap-6")}>
          <form className="p-6 md:p-8">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="********"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      placeholder="********"
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  A senha deve ter pelo menos 8 caracteres.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Criar conta</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou continue com
              </FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <SocialButtons type="signup" />
              </Field>
              <FieldDescription className="text-center">
                Já possui uma conta?{" "}
                <a
                  onClick={() => {
                    onToggle();
                    toggleSignIn();
                  }}
                >
                  Faça login
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
