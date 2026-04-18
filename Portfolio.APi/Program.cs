using Portfolio.Api;
using Portfolio.Api.Features.Email;
using Resend;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ResendSettings>(builder.Configuration.GetSection("ResendSecrets"));

builder.Services.AddOptions();
builder.Services.AddHttpClient<ResendClient>();
builder.Services.Configure<ResendClientOptions>(options =>
{
    options.ApiToken = builder.Configuration.GetValue<string>("ResendSecrets:ResendKey")
        ?? throw new InvalidOperationException("Resend API key is not configured.");
});
builder.Services.AddTransient<IResend, ResendClient>();

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
