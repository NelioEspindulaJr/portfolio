import { getStoredToken } from "@/lib/auth-session";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class ApiClient {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public request = async <T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: unknown,
    authorization?: string,
  ): Promise<AxiosResponse<T>> => {
    const token = authorization ?? getStoredToken();

    const response = await this.apiClient({
      method,
      url,
      data,
      ...(token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}),
    });

    return response;
  };
}
