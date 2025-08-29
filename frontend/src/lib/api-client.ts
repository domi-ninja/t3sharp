import type { components, paths } from "../api-types";
import { env } from "../env.js";

type ApiPaths = paths;
type ApiComponents = components;

// Type-safe API client
export class TypedApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? env.BACKEND_API_URL;
  }

  async get<T extends keyof ApiPaths>(
    path: T,
    options?: RequestInit
  ): Promise<
    ApiPaths[T] extends { get: { responses: { 200: { content: { "application/json": infer R } } } } }
      ? R
      : never
  > {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`GET ${String(path)} failed: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T extends keyof ApiPaths>(
    path: T,
    body: ApiPaths[T] extends { 
      post: { 
        requestBody?: { 
          content: { "application/json": infer B } 
        } 
      } 
    }
      ? B
      : never,
    options?: Omit<RequestInit, "body" | "method">
  ): Promise<
    ApiPaths[T] extends { post: { responses: { 200: { content: { "application/json": infer R } } } } }
      ? R
      : ApiPaths[T] extends { post: { responses: { 200: any } } }
      ? void
      : never
  > {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      // Try to get validation errors
      try {
        const errorData = await response.json();
        if (Array.isArray(errorData)) {
          const validationErrors = errorData.map((err: any) => 
            `${err.Property}: ${err.Error}`
          ).join(", ");
          throw new Error(`Validation errors: ${validationErrors}`);
        }
      } catch (parseError) {
        // If we can't parse the error, use the status text
      }
      
      throw new Error(`POST ${String(path)} failed: ${response.statusText}`);
    }

    // Check if response has content
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    
    return undefined as any;
  }
}

// Default client instance
export const apiClient = new TypedApiClient();

// Convenience methods with full type safety
export const weatherApi = {
  getWeatherForecast: () => 
    apiClient.get("/WeatherForecast"),
    
  addWeatherForecast: (data: {
    date: string;
    temperatureC: number;
    summary?: string | null | undefined;
  }) =>
    apiClient.post("/WeatherForecast", data),
} as const;
