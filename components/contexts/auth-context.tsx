"use client";
import { createContext, SetStateAction, Dispatch } from "react";
import { User } from "../types/user";

export interface IAuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
