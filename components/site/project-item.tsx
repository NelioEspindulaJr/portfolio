import Image from "next/image";

import { TrackedLink } from "@/components/analytics/tracked-link";
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
          <TrackedLink
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Abrir ${name}`}
            event="project_click"
            payload={{
              location: "project_logo",
              project_name: name,
              project_url: url,
            }}
          >
            <ItemMedia variant="image" className="bg-transparent">
              <Image
                width={32}
                height={32}
                src={iconDir ? `${url}${iconDir}` : `${url}favicon.ico`}
                alt={`Logo ${name}`}
                loading="lazy"
              />
            </ItemMedia>
          </TrackedLink>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-80 p-2">
          <TrackedLink
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="block overflow-hidden rounded-md"
            event="project_preview_click"
            payload={{
              location: "project_preview",
              project_name: name,
              project_url: url,
            }}
          >
            <Image
              src={`https://image.thum.io/get/width/900/noanimate/${url}`}
              alt={`Preview do site ${name}`}
              className="h-44 w-full object-cover"
              width={320}
              height={176}
              loading="lazy"
            />
          </TrackedLink>
        </HoverCardContent>
      </HoverCard>

      <ItemContent>
        <ItemTitle>
          <TrackedLink
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="underline-offset-4 hover:underline"
            event="project_click"
            payload={{
              location: "project_title",
              project_name: name,
              project_url: url,
            }}
          >
            {name}
          </TrackedLink>
        </ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
