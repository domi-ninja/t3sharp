import { z } from "zod";
import type { components } from "../api-types";

// Zod schema that matches the CreateWeatherForecastDto from backend exactly
export const createWeatherForecastSchema = z.object({
  date: z.string().refine((date) => {
    // Validate ISO date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    // Check if it's a valid date
    const parsedDate = new Date(date + 'T00:00:00.000Z');
    return !isNaN(parsedDate.getTime());
  }, {
    message: "Date must be a valid ISO 8601 date string (YYYY-MM-DD)"
  }),
  temperatureC: z.number().int().min(-100).max(100),
  summary: z.string().max(100).nullish(), // nullish = optional AND nullable
});

// Type that matches the backend DTO exactly
export type CreateWeatherForecastInput = z.infer<typeof createWeatherForecastSchema>;

// Note: Our Zod schema provides runtime validation while maintaining 
// compatibility with the OpenAPI types

// Type for weather forecast responses
export type WeatherForecast = components["schemas"]["WeatherForecast"];

// Helper to validate that we're sending the right data structure
export function validateCreateWeatherForecast(
  data: unknown
): CreateWeatherForecastInput {
  return createWeatherForecastSchema.parse(data);
}
