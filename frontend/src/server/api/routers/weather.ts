import { env } from "../../../env.js";
import { createWeatherForecastSchema, type WeatherForecast } from "../../../schemas/weather";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const weatherRouter = createTRPCRouter({
  getWeatherForecast: publicProcedure.query(async () => {
    try {
      const response = await fetch(`${env.BACKEND_API_URL}/WeatherForecast`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json() as WeatherForecast[];
       
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Failed to fetch weather forecast");
    }
  }),

  addWeatherForecast: publicProcedure
    .input(createWeatherForecastSchema)
    .mutation(async ({ input }) => {
    const response = await fetch(`${env.BACKEND_API_URL}/WeatherForecast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      let errorMessage = `Failed to add weather data: ${response.statusText}`;
      
      // Try to get validation errors from backend
      try {
        const errorData = await response.json();
        if (Array.isArray(errorData)) {
          const validationErrors = errorData.map((err: any) => 
            `${err.Property}: ${err.Error}`
          ).join(", ");
          errorMessage = `Validation errors: ${validationErrors}`;
        }
      } catch {
        // If we can't parse the error, use the status text
      }
      
      throw new Error(errorMessage);
    }

    return { message: "Weather forecast added successfully" };
  }),
});
