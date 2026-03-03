import { useMutation } from "@tanstack/react-query";
import {
  ISignInRequestBody,
  ISignUpRequestBody,
  SocialAuthProviders,
} from "./auth.types";
import {
  fetchSignIn,
  fetchSignUp,
  fetchSocialAuth,
  fetchSocialAuthCallback,
} from "./auth.requests";

export const useSocialLogin = (provider: SocialAuthProviders) =>
  useMutation({
    mutationFn: () => fetchSocialAuth(provider),
  });

export const useSocialLoginCallback = () =>
  useMutation({
    mutationFn: ({ provider, code }: { provider: SocialAuthProviders; code: string }) =>
      fetchSocialAuthCallback(provider, code),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (body: ISignInRequestBody) => fetchSignIn(body),
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: (body: ISignUpRequestBody) => fetchSignUp(body),
  });
