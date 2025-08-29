import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { type CreateWeatherForecastDto, weatherApi } from "../lib/api-client";

export default function TypeSafetyDemo() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CreateWeatherForecastDto>({
    Date: "",
    TemperatureC: 0,
    Summary: "",
  });
  const [error, setError] = useState("");

  const forecasts = useQuery({
    queryKey: ['weather-forecasts'],
    queryFn: async () => {
      const { data } = await weatherApi.getWeatherForecast({});
      return data;
    },
  });

  const addForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Type-safe API call using openapi-typescript-fetch
      await weatherApi.addWeatherForecast(formData);
      
      // Refetch the data using React Query
      await queryClient.invalidateQueries({ queryKey: ['weather-forecasts'] });
      
      // Reset form
    //   setFormData({ Date: "", TemperatureC: 0, Summary: "" });
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add forecast");
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">🎯 Type Safety Demonstration</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">What makes this type-safe:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Backend:</strong> C# DTOs with FluentValidation -  Source of truth</li>
          <li><strong>OpenAPI:</strong> Auto-generated TypeScript types from C# backend</li>
          <li><strong>Frontend:</strong> No JS validation - relies on built-in HTML5 validation and backend</li>
          <li><strong>useQuery:</strong> For fetching data from the backend in a way that does not suck</li>
          <li><strong>note:</strong> I dont think we are using tRPC anymore</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Add Weather Forecast</h3>
          <form onSubmit={addForecast} className="space-y-4">
            <div>
              <label className="block">
                <span className="text-sm font-medium mb-2 block">Date (YYYY-MM-DD):</span>
                <input
                  type="date"
                  value={formData.Date}
                  onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
                  required
                  className="block w-full p-2 rounded border border-gray-300 text-white bg-gray-800"
                />
              </label>
            </div>
            
            <div>
              <label className="block">
                <span className="text-sm font-medium mb-2 block">Temperature (°C):</span>
                <input
                  type="number"
                  min="-100"
                  max="100"
                  value={formData.TemperatureC}
                  onChange={(e) => setFormData({ ...formData, TemperatureC: parseInt(e.target.value) || 0 })}
                  required
                  className="block w-full p-2 rounded border border-gray-300 text-white bg-gray-800"
                />
              </label>
            </div>
            
            <div>
              <label className="block">
                <span className="text-sm font-medium mb-2 block">Summary (optional):</span>
                <input
                  type="text"
                  maxLength={100}
                  value={formData.Summary || ""}
                  onChange={(e) => setFormData({ ...formData, Summary: e.target.value || null })}
                  className="block w-full p-2 rounded border border-gray-300 text-white bg-gray-800"
                />
              </label>
            </div>
            
            <button 
              type="submit" 
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
            >
              Add Forecast
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Current Forecasts</h3>
          <button 
            onClick={() => forecasts.refetch()} 
            disabled={forecasts.isLoading}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded font-medium transition-colors mb-4"
          >
            {forecasts.isLoading ? 'Loading...' : 'Refresh Forecasts'}
          </button>
          
          <div className="max-h-80 overflow-y-auto">
            {forecasts.isLoading ? (
              <div className="text-center py-4">Loading forecasts...</div>
            ) : (
              forecasts.data?.map((forecast, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-800 text-white">
                  <div><strong>Date:</strong> {forecast.Date}</div>
                  <div><strong>Temperature:</strong> {forecast.TemperatureC}°C ({forecast.temperatureF}°F)</div>
                  <div><strong>Summary:</strong> {forecast.Summary || "N/A"}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {(error || forecasts.error) && (
        <div className="text-red-700 bg-red-100 p-4 rounded-lg mt-8">
          <strong>Error:</strong> {error || (forecasts.error instanceof Error ? forecasts.error.message : "Failed to load forecasts")}
        </div>
      )}

    </div>
  );
}
