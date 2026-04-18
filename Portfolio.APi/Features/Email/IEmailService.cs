namespace Portfolio.Api.Features.Email;
public interface IEmailService
{
    Task SendEmailAsync(SendEmailRequest request);
}