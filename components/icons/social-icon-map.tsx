import type { ComponentType, SVGProps } from "react";

import type { SocialId } from "@/data/site-content";

import { GithubIcon } from "@/components/icons/github-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const socialIconMap: Record<SocialId, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};
