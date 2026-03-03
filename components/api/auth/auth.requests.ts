import ApiClient from "@/api-client";
import {
  ISignInRequestBody,
  ISignInResponseBody,
  ISignUpRequestBody,
  SocialAuthProviders,
} from "./auth.types";

const apiClient = new ApiClient();

export const fetchSocialAuth = async (provider: SocialAuthProviders) =>
  await apiClient.request<string>(`/auth/${provider}/redirect`, "GET");

export const fetchSocialAuthCallback = async (
  provider: SocialAuthProviders,
  code: string,
) =>
  await apiClient.request<ISignInResponseBody>(
    `/auth/${provider}/callback?code=${encodeURIComponent(code)}`,
    "GET",
  );

export const fetchSignUp = async (payload: ISignUpRequestBody) =>
  await apiClient.request("auth/signup", "POST", payload);

export const fetchSignIn = async (payload: ISignInRequestBody) =>
  await apiClient.request<ISignInResponseBody>("auth/signin", "POST", payload);
