using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace T3Sharp
{
    public class WeatherForecast
    {
        [Required]
        public DateOnly Date { get; set; }

        [Required]
        [Range(-100, 100)]
        public int TemperatureC { get; set; }

        [JsonPropertyName("temperatureF")]
        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
}
