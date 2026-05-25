using Portfolio.Api;
using Portfolio.Api.Features.Email;
using Portfolio.Api.Features.Projects;
using Portfolio.Api.Data;
using Resend;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Features.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.RateLimiting;
using Npgsql;

// define constants
const int PermitLimit = 20;
const int QueueLimit = 0;
const int PermitMinutes = 1;

// define the builder
var builder = WebApplication.CreateBuilder(args);

// setup builder services
// CORS policy to allow frontend to communicate with API
var allowedOrigins = builder.Configuration.GetValue<string>("AllowedOrigins")?.Split(',')
    ?? ["http://localhost:5173"];

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// define secrets
builder.Services.Configure<ResendSettings>(builder.Configuration.GetSection("ResendSecrets"));
builder.Services.Configure<AuthSettings>(builder.Configuration.GetSection("AuthSecrets"));
builder.Services.AddOptions();

// setup resend client according to https://resend.com/docs/send-with-dotnet
builder.Services.AddHttpClient<ResendClient>();
builder.Services.Configure<ResendClientOptions>(options =>
{
    options.ApiToken = builder.Configuration.GetValue<string>("ResendSecrets:ResendKey")
        ?? throw new InvalidOperationException("Resend API key is not configured.");
});
builder.Services.AddTransient<IResend, ResendClient>();

// add active services to scope 
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<PasswordHasher>();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// configure secrets & add to services
var jwtSecret = builder.Configuration.GetValue<string>("AuthSecrets:JwtSecret")
    ?? throw new InvalidOperationException("JWT secret is not configured.");
var jwtIssuer = builder.Configuration.GetValue<string>("AuthSecrets:JwtIssuer") ?? "portfolio-api";
var jwtAudience = builder.Configuration.GetValue<string>("AuthSecrets:JwtAudience") ?? "portfolio-frontend";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = true,
            ValidAudience = jwtAudience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("admin", policy => policy.RequireClaim("role", "admin"));

// add database to services
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


// add middleware to services
// global (default) limiter of 10 requests per user per minute. admins are exempt.
builder.Services.AddRateLimiter(options =>
                {
                    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
                    {
                        if (httpContext.User.HasClaim("role", "admin"))
                            return RateLimitPartition.GetNoLimiter("admin");

                        return RateLimitPartition.GetFixedWindowLimiter(
                            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
                            factory: partition => new FixedWindowRateLimiterOptions
                            {
                                AutoReplenishment = true,
                                PermitLimit = PermitLimit,
                                QueueLimit = QueueLimit,
                                Window = TimeSpan.FromMinutes(PermitMinutes),
                            });
                    });

                    options.OnRejected = async (context, cancellationToken) =>
                    {
                        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;

                        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
                            context.HttpContext.Response.Headers.RetryAfter = retryAfter.TotalSeconds.ToString();

                        await context.HttpContext.Response.WriteAsJsonAsync(
                            new { message = "Too many requests. Please slow down and try again." },
                            cancellationToken);
                    };
                });

// build image
var app = builder.Build();

// any development environment specific app settings.
if (app.Environment.IsDevelopment())
{
    // used for debugging
    app.MapOpenApi();
}

// global exception handler
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var error = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>()?.Error;

        // check for db error
        static bool HasDbError(Exception? ex)
        {
            while (ex != null)
            {
                if (ex is NpgsqlException) return true;
                ex = ex.InnerException;
            }
            return false;
        }

        (int status, string message) = HasDbError(error)
            ? (503, "Unable to connect to the database.")
            : (500, "An unexpected error occurred.");

        context.Response.StatusCode = status;
        await context.Response.WriteAsJsonAsync(new { message });
    });
});

// add features to app
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
else
{
    app.UseHsts();
}

// add extra protection middleware to headers
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("Referrer-Policy", "no-referrer");
    await next();
});

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();
app.MapControllers();

// run
app.Run();
