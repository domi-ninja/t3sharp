using FluentValidation;
using T3Sharp.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Use PascalCase for JSON property names to match C# DTOs
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// Add FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<CreateWeatherForecastValidator>();

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Next.js default port
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Remove HTTPS redirection for development
// app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
