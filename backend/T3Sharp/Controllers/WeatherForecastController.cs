using Microsoft.AspNetCore.Mvc;

namespace T3Sharp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;

            this.forecasts = new List<WeatherForecast>( Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            }));
        }
        

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly List<WeatherForecast> forecasts;


        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return forecasts;
        }

        [HttpPost(Name = "AddWeatherForecast")]
        public IActionResult AddWeatherForecast(WeatherForecast model)
        {
            this.forecasts.Add(model);
            return Ok(new { message = "Weather forecast added successfully" });
        }
    }
}
