import { BaseApiError } from "./exceptions/base-exception";

class ApiClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  async get<T>(route: string, params?: { [key: string]: string }): Promise<T> {
    return this.request(route, "get", undefined, params);
  }

  async post<T>(route: string, body: any): Promise<T> {
    return this.request(route, "post", body);
  }

  private async request<T>(
    route: string,
    method: string,
    body?: any,
    params?: { [key: string]: string }
  ): Promise<T> {
    const paramsUrl = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`${this.baseUrl}/${route}?${paramsUrl}`, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new BaseApiError(
          errorData.message || "Unexpected error",
          response.status
        );
      }
      return await response.json();
    } catch (error) {
      console.log(`Request ${route} with method: ${method} failed -> ${error}`);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
