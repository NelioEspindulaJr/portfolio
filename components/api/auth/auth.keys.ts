import { SocialAuthProviders } from "./auth.types";

export const SOCIAL_AUTH_KEYS = (provider: SocialAuthProviders) => [
  "social_auth",
  provider,
];
