import { User } from "@/components/types/user";

export interface ISignUpRequestBody {
  fullName: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ISignInRequestBody {
  email: string;
  password: string;
}

export interface ISignInResponseBody {
  user: User;
  token: string;
}

export type SocialAuthProviders = "github" | "discord" | "google";
