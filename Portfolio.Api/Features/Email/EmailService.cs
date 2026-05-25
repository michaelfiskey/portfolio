using Microsoft.Extensions.Options;
using Resend;
using System.Net;

namespace Portfolio.Api.Features.Email;

public class EmailService : IEmailService
{
    private readonly IResend _resend;
    private readonly ResendSettings _settings;
    
    public EmailService(IResend resend, IOptions<ResendSettings> options)
    {
        _resend = resend;
        _settings = options.Value;
    }

    public async Task SendEmailAsync(SendEmailRequest request)
    {
        var fullName = $"{request.FirstName} {request.LastName}".Trim();

        var emailMessage = new EmailMessage
        {
            From = _settings.ResendEmailSender,
            Subject = $"NEW PROFILE CONTACT SUBMISSION: {fullName}",
            HtmlBody = BuildHtmlBody(request)
        };

        emailMessage.To.Add(_settings.ResendEmailReceiver);

        await _resend.EmailSendAsync(emailMessage);
    }

    private static string BuildHtmlBody(SendEmailRequest request)
    {
        var firstName = WebUtility.HtmlEncode(request.FirstName.Trim());
        var lastName = WebUtility.HtmlEncode(request.LastName.Trim());
        var fromEmail = WebUtility.HtmlEncode(request.FromEmail.Trim());
        var phoneNumber = WebUtility.HtmlEncode(request.PhoneNumber?.Trim() ?? null);
        var company = WebUtility.HtmlEncode(request.Company?.Trim() ?? string.Empty);
        var message = WebUtility.HtmlEncode(request.Message.Trim());

        return $@"
            <p><strong>Name:</strong> {firstName} {lastName}</p>
            <p><strong>Email:</strong> {fromEmail}</p>
            {(string.IsNullOrWhiteSpace(request.PhoneNumber) ? string.Empty : $"<p><strong>Phone:</strong> {phoneNumber}</p>")}
            {(string.IsNullOrWhiteSpace(request.Company) ? string.Empty : $"<p><strong>Company:</strong> {company}</p>")}
            <p><strong>Message:</strong></p>
            <p>{message}</p>
        ";
    }
}