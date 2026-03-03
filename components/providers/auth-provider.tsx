"use client";

import { User } from "@/components/types/user";
import { ReactNode, useMemo, useState } from "react";
import { AuthContext, IAuthContext } from "@/components/contexts/auth-context";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const values = useMemo<IAuthContext>(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
