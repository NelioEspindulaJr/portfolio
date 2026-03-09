import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import SocialButtons from "./social-buttons";

export default function ForgotPassword({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogContent className="sm:max-w-sm md:max-w-md">
        <DialogTitle>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Esqueceu sua senha</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Enviaremos um link seguro para o seu e-mail para redefinição de
              senha.
            </p>
          </div>
        </DialogTitle>
        <div className={cn("flex flex-col gap-6")}>
          <form>
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
                <Button type="submit">Recuperar minha conta</Button>
              </Field>
              <FieldSeparator>Ou faça login com</FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <SocialButtons />
              </Field>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
