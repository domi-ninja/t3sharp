import type { components } from "~/api-types";
import { env } from "~/env.js";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

      const data = await response.json() as components["schemas"]["WeatherForecast"][];
      
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Failed to fetch weather forecast");
    }
  }),
});
