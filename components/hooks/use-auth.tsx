"use client";

import { useContext } from "react";
import { AuthContext, IAuthContext } from "../contexts/auth-context";

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  return context as IAuthContext;
};
