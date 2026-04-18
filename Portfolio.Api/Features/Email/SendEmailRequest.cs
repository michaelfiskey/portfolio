namespace Portfolio.Api.Features.Email;

public class SendEmailRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FromEmail { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? Company { get; set; }
    public string Message { get; set; } = string.Empty;
}
