"use client";

import { ISignInResponseBody } from "@/components/api/auth/auth.types";
import { User } from "@/components/types/user";
import { createContext, Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  user: User | null;
  token: string | null;
  isHydratingAuth: boolean;
  isAuthenticating: boolean;
  setIsAuthenticating: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  signIn: (session: ISignInResponseBody) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
