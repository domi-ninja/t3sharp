import { Fetcher } from 'openapi-typescript-fetch';
import type { components, paths } from '../api-types';
import { env } from '../env.js';

// Initialize the fetcher with our OpenAPI types
const fetcher = Fetcher.for<paths>();

// Configure base URL and error handling
fetcher.configure({
  baseUrl: env.NEXT_PUBLIC_BACKEND_API_URL,
  init: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  use: [
    // // Debug middleware to log what we're sending
    // async (url, init, next) => {
    //   if (init?.method === 'POST') {
    //     console.log('🚀 Sending to backend:', {
    //       url: url.toString(),
    //       body: init.body
    //     });
    //   }
    //   const response = await next(url, init);
      
    //   if (!response.ok && response.status === 400) {
    //     // Try to parse backend validation errors
    //     try {
    //       const errorData = await response.clone().json();
    //       console.log('❌ Backend validation error:', errorData);
    //       if (errorData.errors) {
    //         // Format validation errors from backend
    //         const validationMessages = Object.entries(errorData.errors)
    //           .map(([field, messages]: [string, any]) => 
    //             `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
    //           )
    //           .join('; ');
    //         throw new Error(`Validation failed: ${validationMessages}`);
    //       }
    //     } catch (parseError) {
    //       // If we can't parse, fall through to default error
    //     }
    //   }
      
    //   return response;
    // }
  ]
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
