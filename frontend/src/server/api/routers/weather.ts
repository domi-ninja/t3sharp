import { z } from "zod";
import { weatherApi } from "../../../lib/api-client";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const weatherRouter = createTRPCRouter({
  getWeatherForecast: publicProcedure.query(async () => {
    try {
      const { data } = await weatherApi.getWeatherForecast({});
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Failed to fetch weather forecast");
    }
  }),

  addWeatherForecast: publicProcedure
    .input(z.object({
      date: z.string(),
      temperatureC: z.number(),
      summary: z.string().optional().nullable(),
    }))
    .mutation(async ({ input }) => {
      try {
        const result = await weatherApi.addWeatherForecast({
          body: input
        } as any); // Type assertion needed due to openapi-typescript-fetch typing complexity
        return { message: "Weather forecast added successfully" };
      } catch (error: any) {
        // openapi-typescript-fetch provides better error handling
        console.error("Error adding weather data:", error);
        throw new Error(error.message || "Failed to add weather forecast");
      }
    }),
});
