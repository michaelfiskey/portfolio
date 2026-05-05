namespace Portfolio.Api;

public class ResendSettings
{
    public string ResendKey { get; set; } = string.Empty;
    public string ResendEmailSender { get; set; } = string.Empty;
    public string ResendEmailReceiver { get; set; } = string.Empty;

}

public class AuthSettings
{
    public string CookieName { get; set; } = string.Empty;
    public string JwtSecret { get; set; } = string.Empty;
    public string JwtIssuer { get; set; } = "portfolio-api";
    public string JwtAudience { get; set; } = "portfolio-frontend";
    public int AccessTokenExpiryMinutes { get; set; } = 15;
    public int RefreshTokenExpiryDays { get; set; } = 7;
}