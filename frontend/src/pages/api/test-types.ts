import type { NextApiRequest, NextApiResponse } from "next";
import { weatherApi } from "../../lib/api-client";
import { validateCreateWeatherForecast } from "../../schemas/weather";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // This demonstrates full type safety in both directions:
    
    // 1. Validate input using our Zod schema (frontend validation)
    const validatedInput = validateCreateWeatherForecast(req.body);
    
    // 2. Send to backend using type-safe API client
    await weatherApi.addWeatherForecast(validatedInput);
    
    // 3. Get updated data with type-safe response
    const weatherData = await weatherApi.getWeatherForecast();
    
    // TypeScript will enforce:
    // - validatedInput matches CreateWeatherForecastDto exactly
    // - weatherData is typed as WeatherForecast[]
    // - All API calls are type-checked
    
    res.status(200).json({ 
      success: true, 
      data: weatherData,
      message: "Weather forecast added successfully with full type safety!" 
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Unknown error" 
    });
  }
}
