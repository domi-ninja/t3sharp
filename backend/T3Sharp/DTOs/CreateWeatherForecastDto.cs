using System.ComponentModel.DataAnnotations;
using FluentValidation;

namespace T3Sharp.DTOs
{
    public class CreateWeatherForecastDto
    {
        [Required]
        public string Date { get; set; } = "";

        [Required]
        [Range(-100, 100)]
        public int TemperatureC { get; set; }

        public string? Summary { get; set; }
    }

    public class CreateWeatherForecastValidator : AbstractValidator<CreateWeatherForecastDto>
    {
        public CreateWeatherForecastValidator()
        {
            RuleFor(x => x.Date)
                .NotEmpty()
                .Must(BeValidDate)
                .WithMessage("Date must be a valid ISO 8601 date string (YYYY-MM-DD)");

            RuleFor(x => x.TemperatureC)
                .InclusiveBetween(-100, 100)
                .WithMessage("Temperature must be between -100 and 100 degrees Celsius");

            RuleFor(x => x.Summary)
                .MaximumLength(100)
                .When(x => !string.IsNullOrEmpty(x.Summary))
                .WithMessage("Summary must not exceed 100 characters");
        }

        private static bool BeValidDate(string dateString)
        {
            return DateOnly.TryParse(dateString, out _);
        }
    }
}
