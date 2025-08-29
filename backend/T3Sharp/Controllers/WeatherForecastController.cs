using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using T3Sharp.DTOs;

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

        private static List<WeatherForecast> forecasts;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IValidator<CreateWeatherForecastDto> validator)
        {
            _logger = logger;
            _validator = validator;

            if (forecasts==null)
            {
                CreateData();
            }
        }

        private static void CreateData()
        {
            forecasts = new List<WeatherForecast>(Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            }));
        }

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IValidator<CreateWeatherForecastDto> _validator;


        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return forecasts;
        }

        [HttpPost(Name = "AddWeatherForecast")]
        public async Task<IActionResult> AddWeatherForecast([FromBody] CreateWeatherForecastDto dto)
        {
            var validationResult = await _validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { 
                    Property = e.PropertyName, 
                    Error = e.ErrorMessage 
                }));
            }

            var weatherForecast = new WeatherForecast
            {
                Date = DateOnly.Parse(dto.Date),
                TemperatureC = dto.TemperatureC,
                Summary = dto.Summary
            };

            forecasts.Add(weatherForecast);
            return Ok(new { message = "Weather forecast added successfully" });
        }
    }
}
