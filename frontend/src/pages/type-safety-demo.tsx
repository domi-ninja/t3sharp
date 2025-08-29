import { useState } from "react";
import { weatherApi } from "../lib/api-client";
import { createWeatherForecastSchema, type CreateWeatherForecastInput, type WeatherForecast } from "../schemas/weather";

export default function TypeSafetyDemo() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [formData, setFormData] = useState<CreateWeatherForecastInput>({
    date: "",
    temperatureC: 0,
    summary: "",
  });
  const [error, setError] = useState("");

  const loadForecasts = async () => {
    try {
      // Type-safe API call - TypeScript knows this returns WeatherForecast[]
      const data = await weatherApi.getWeatherForecast();
      setForecasts(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load forecasts");
    }
  };

  const addForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Runtime validation using Zod
      const validatedData = createWeatherForecastSchema.parse(formData);
      
      // Type-safe API call - TypeScript ensures we're sending the right type
      await weatherApi.addWeatherForecast(validatedData);
      
      // Reload the data
      await loadForecasts();
      
      // Reset form
      setFormData({ date: "", temperatureC: 0, summary: "" });
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add forecast");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🎯 Type Safety Demonstration</h1>
      
      <div style={{ marginBottom: "30px" }}>
        <h2>What makes this type-safe:</h2>
        <ul>
          <li><strong>Backend:</strong> C# DTOs with FluentValidation ensure data integrity</li>
          <li><strong>OpenAPI:</strong> Auto-generated TypeScript types from C# backend</li>
          <li><strong>Frontend:</strong> Zod schemas provide runtime validation matching backend</li>
          <li><strong>API Client:</strong> Fully typed API calls with proper error handling</li>
        </ul>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <h3>Add Weather Forecast</h3>
          <form onSubmit={addForecast}>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Date (YYYY-MM-DD):
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  style={{ display: "block", width: "100%", padding: "5px" }}
                />
              </label>
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <label>
                Temperature (°C):
                <input
                  type="number"
                  min="-100"
                  max="100"
                  value={formData.temperatureC}
                  onChange={(e) => setFormData({ ...formData, temperatureC: parseInt(e.target.value) || 0 })}
                  required
                  style={{ display: "block", width: "100%", padding: "5px" }}
                />
              </label>
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <label>
                Summary (optional):
                <input
                  type="text"
                  maxLength={100}
                  value={formData.summary || ""}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value || null })}
                  style={{ display: "block", width: "100%", padding: "5px" }}
                />
              </label>
            </div>
            
            <button type="submit" style={{ padding: "10px 20px" }}>
              Add Forecast
            </button>
          </form>
        </div>

        <div>
          <h3>Current Forecasts</h3>
          <button onClick={loadForecasts} style={{ padding: "10px 20px", marginBottom: "10px" }}>
            Load Forecasts
          </button>
          
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {forecasts.map((forecast, index) => (
              <div key={index} style={{ 
                border: "1px solid #ddd", 
                padding: "10px", 
                marginBottom: "10px",
                borderRadius: "5px"
              }}>
                <div><strong>Date:</strong> {forecast.date}</div>
                <div><strong>Temperature:</strong> {forecast.temperatureC}°C ({forecast.temperatureF}°F)</div>
                <div><strong>Summary:</strong> {forecast.summary || "N/A"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div style={{ 
          color: "red", 
          backgroundColor: "#ffe6e6", 
          padding: "10px", 
          borderRadius: "5px",
          marginTop: "20px"
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
        <h3>🔥 Type Safety Features Demonstrated:</h3>
        <ul>
          <li><strong>Compile-time type checking:</strong> TypeScript catches type mismatches at build time</li>
          <li><strong>Runtime validation:</strong> Zod validates data structure and values at runtime</li>
          <li><strong>API error handling:</strong> Backend validation errors are properly typed and displayed</li>
          <li><strong>Auto-completion:</strong> IDE provides full auto-completion for API types</li>
          <li><strong>Refactoring safety:</strong> Changes to backend types automatically flow to frontend</li>
        </ul>
      </div>
    </div>
  );
}
