import { ISignInResponseBody } from "@/components/api/auth/auth.types";
import { User } from "@/components/types/user";

export const AUTH_TOKEN_COOKIE_KEY = "portfolio_auth_token";
export const AUTH_USER_COOKIE_KEY = "portfolio_auth_user";
const COOKIE_MAX_AGE_DAYS = 7;

const isBrowser = typeof window !== "undefined";

const resolveExpires = (days: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  return expirationDate.toUTCString();
};

export const setCookie = (name: string, value: string, days = COOKIE_MAX_AGE_DAYS) => {
  if (!isBrowser) return;

  const secureAttribute =
    window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${resolveExpires(days)}; Path=/; SameSite=Lax${secureAttribute}`;
};

export const getCookie = (name: string) => {
  if (!isBrowser) return null;

  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!cookie) return null;

  const cookieValue = cookie.slice(prefix.length);
  return decodeURIComponent(cookieValue);
};

export const deleteCookie = (name: string) => {
  if (!isBrowser) return;

  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`;
};

export const persistAuthSession = ({ user, token }: ISignInResponseBody) => {
  setCookie(AUTH_TOKEN_COOKIE_KEY, token);
  setCookie(AUTH_USER_COOKIE_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  deleteCookie(AUTH_TOKEN_COOKIE_KEY);
  deleteCookie(AUTH_USER_COOKIE_KEY);
};

export const getStoredToken = () => getCookie(AUTH_TOKEN_COOKIE_KEY);

export const getStoredUser = (): User | null => {
  const serializedUser = getCookie(AUTH_USER_COOKIE_KEY);

  if (!serializedUser) return null;

  try {
    return JSON.parse(serializedUser) as User;
  } catch {
    return null;
  }
};
