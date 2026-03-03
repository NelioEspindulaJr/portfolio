import ApiClient from "@/api-client";

const apiClient = new ApiClient();

export const fetchSocialAuthWithGithub = () =>
  apiClient.request("/auth/github/redirect", "GET");

export const fetchSocialAuthWithGoogle = () =>
  apiClient.request("/auth/google/redirect", "GET");

export const fetchSocialAuthWithDiscord = () =>
  apiClient.request("/auth/discord/redirect", "GET");
