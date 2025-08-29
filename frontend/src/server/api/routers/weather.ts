import z from "zod";
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

  addWeatherForecast: publicProcedure.input(z.object({
    date: z.string(),
    temperatureC: z.number(),
    summary: z.string(),
  })).mutation(async ({ input }) => {
    const response = await fetch(`${env.BACKEND_API_URL}/WeatherForecast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Failed to add weather data: ${response.statusText}`);
    }

    return { message: "Weather forecast added successfully" };
  }),
});
