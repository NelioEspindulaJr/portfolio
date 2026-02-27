import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {description ? <p className="text-base text-muted-foreground">{description}</p> : null}
    </div>
  );
}
