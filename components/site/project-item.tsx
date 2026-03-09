import Link from "next/link";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function ProjectItem({
  url,
  name,
  description,
  iconDir = undefined,
}: {
  url: string;
  name: string;
  description: string;
  iconDir?: string;
}) {
  return (
    <Item variant="outline">
      <HoverCard openDelay={150} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Link
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Abrir ${name}`}
          >
            <ItemMedia variant="image" className="rounded-md">
              <Image
                width={16}
                height={16}
                src={iconDir ? `${url}${iconDir}` : `${url}favicon.ico`}
                alt={`Logo ${name}`}
                loading="lazy"
              />
            </ItemMedia>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-80 p-2">
          <Link
            href="${url}"
            target="_blank"
            rel="noreferrer noopener"
            className="block overflow-hidden rounded-md"
          >
            <Image
              src={`https://image.thum.io/get/width/900/noanimate/${url}`}
              alt={`Preview do site ${name}`}
              className="h-44 w-full object-cover"
              width={900}
              height={176}
              loading="lazy"
            />
          </Link>
        </HoverCardContent>
      </HoverCard>

      <ItemContent>
        <ItemTitle>
          <Link
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="underline-offset-4 hover:underline"
          >
            {name}
          </Link>
        </ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
