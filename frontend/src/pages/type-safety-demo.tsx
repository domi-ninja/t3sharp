import { useState } from "react";
import { weatherApi, type CreateWeatherForecastDto, type WeatherForecast } from "../lib/api-client";

export default function TypeSafetyDemo() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [formData, setFormData] = useState<CreateWeatherForecastDto>({
    date: "",
    temperatureC: 0,
    summary: "",
  });
  const [error, setError] = useState("");

  const loadForecasts = async () => {
    try {
      // Type-safe API call using openapi-typescript-fetch
      const { data } = await weatherApi.getWeatherForecast({});
      setForecasts(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load forecasts");
    }
  };

  const addForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // NO frontend validation - let the backend handle ALL validation
      // Type-safe API call using openapi-typescript-fetch
      await weatherApi.addWeatherForecast({ body: formData } as any);
      
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
    <div className="text-white">
      <h1>🎯 Type Safety Demonstration</h1>
      
      <div style={{ marginBottom: "30px" }}>
                 <h2>What makes this type-safe:</h2>
         <ul>
           <li><strong>Backend:</strong> C# DTOs with FluentValidation - SINGLE SOURCE OF TRUTH</li>
           <li><strong>OpenAPI:</strong> Auto-generated TypeScript types from C# backend</li>
           <li><strong>Frontend:</strong> NO validation - relies completely on backend</li>
           <li><strong>API Client:</strong> Fully typed API calls that show backend validation errors</li>
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

    </div>
  );
}
