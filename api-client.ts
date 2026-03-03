import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class ApiClient {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.API_URL,
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
    return this.apiClient({
      method,
      url,
      data,
      ...(authorization
        ? {
            headers: {
              Authorization: `Bearer ${authorization}`,
            },
          }
        : {}),
    });
  };
}
