import { Fetcher } from 'openapi-typescript-fetch';
import type { components, paths } from '../api-types';
import { env } from '../env.js';

// Initialize the fetcher with our OpenAPI types
const fetcher = Fetcher.for<paths>();

// Configure base URL
fetcher.configure({
  baseUrl: env.NEXT_PUBLIC_BACKEND_API_URL,
  init: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

// Create typed API methods - directly from OpenAPI spec!
export const weatherApi = {
  // GET /WeatherForecast
  getWeatherForecast: fetcher.path('/WeatherForecast').method('get').create(),
  
  // POST /WeatherForecast  
  addWeatherForecast: fetcher.path('/WeatherForecast').method('post').create(),
} as const;

// Export types for convenience
export type WeatherForecast = components['schemas']['WeatherForecast'];
export type CreateWeatherForecastDto = components['schemas']['CreateWeatherForecastDto'];
