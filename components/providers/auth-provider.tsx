"use client";

import { ISignInResponseBody } from "@/components/api/auth/auth.types";
import { AuthContext, IAuthContext } from "@/components/contexts/auth-context";
import { User } from "@/components/types/user";
import {
  clearAuthSession,
  getStoredToken,
  getStoredUser,
  persistAuthSession,
} from "@/lib/auth-session";
import { ReactNode, useCallback, useMemo, useState } from "react";
import AuthLoadingOverlay from "@/components/site/authentication/auth-loading-overlay";

const getInitialAuthState = () => {
  const storedUser = getStoredUser();
  const storedToken = getStoredToken();

  if (!storedUser || !storedToken) {
    clearAuthSession();
    return { user: null, token: null };
  }

  return { user: storedUser, token: storedToken };
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [initialAuthState] = useState(getInitialAuthState);
  const [user, setUser] = useState<User | null>(initialAuthState.user);
  const [token, setToken] = useState<string | null>(initialAuthState.token);
  const [isHydratingAuth] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signIn = useCallback(({ user, token }: ISignInResponseBody) => {
    persistAuthSession({ user, token });
    setUser(user);
    setToken(token);
  }, []);

  const signOut = useCallback(() => {
    clearAuthSession();
    setUser(null);
    setToken(null);
  }, []);

  const values = useMemo<IAuthContext>(
    () => ({
      user,
      token,
      isHydratingAuth,
      isAuthenticating,
      setIsAuthenticating,
      setUser,
      signIn,
      signOut,
    }),
    [
      user,
      token,
      isHydratingAuth,
      isAuthenticating,
      setIsAuthenticating,
      setUser,
      signIn,
      signOut,
    ],
  );

  return (
    <AuthContext.Provider value={values}>
      {children}
      <AuthLoadingOverlay />
    </AuthContext.Provider>
  );
}
