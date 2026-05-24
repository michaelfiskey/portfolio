using Microsoft.Extensions.Options;
using Moq;
using Portfolio.Api.Features.Email;
using Resend;

namespace Portfolio.Api.UnitTests.Email;
public class EmailServiceTests
{
    public Mock<IResend> _resend;
    public ResendSettings _resendSettings;

    public EmailServiceTests()
    {
        _resend = new Mock<IResend>();
        _resend.Setup(r => r.EmailSendAsync(It.IsAny<EmailMessage>()))
        .ReturnsAsync(new ResendResponse<Guid>(Guid.NewGuid(), null));

        _resendSettings = new ResendSettings
        {
            ResendEmailSender = "from@example.com",
            ResendEmailReceiver = "to@example.com"
        };
    }
    
    [Fact]
    public async Task SendEmailAsync_ValidInput_CallsResend()
    {
        string firstName = "Michael";
        string lastName = "Fiskey";
        string fromEmail = "examplename@example.com";
        string phoneNumber = "123456789";
        string company = "ExampleLLC";
        string message = "Hello! This is a test message!";

        var request = new SendEmailRequest
        { 
            FirstName = firstName,
            LastName = lastName,
            FromEmail = fromEmail,
            PhoneNumber = phoneNumber,
            Company = company,
            Message = message
        };
        
        var service = new EmailService(_resend.Object, Options.Create(_resendSettings));
        await service.SendEmailAsync(request);

        _resend.Verify(r => r.EmailSendAsync(It.IsAny<EmailMessage>()), Times.Once);
    }

    [Fact]
    public async Task SendEmailAsync_ValidInputAllFields_ContainsAllInputInEmail()
    {

        string firstName = "Michael";
        string lastName = "Fiskey";
        string fromEmail = "examplename@example.com";
        string phoneNumber = "123456789";
        string company = "ExampleLLC";
        string message = "Hello! This is a test message!";

        var request = new SendEmailRequest
        { 
            FirstName = firstName,
            LastName = lastName,
            FromEmail = fromEmail,
            PhoneNumber = phoneNumber,
            Company = company,
            Message = message
        };
        
        EmailMessage? captured = null;
        _resend.Setup(r => r.EmailSendAsync(It.IsAny<EmailMessage>()))
            .Callback<EmailMessage, CancellationToken>((msg, _) => captured = msg)
            .ReturnsAsync(new ResendResponse<Guid>(Guid.NewGuid(), null));

        var service = new EmailService(_resend.Object, Options.Create(_resendSettings));
        await service.SendEmailAsync(request);

        Assert.Contains("Michael", captured!.HtmlBody);
        Assert.Contains("Fiskey", captured!.HtmlBody);
        Assert.Contains("123456789", captured!.HtmlBody);
        Assert.Contains("ExampleLLC", captured!.HtmlBody);
        Assert.Contains("Hello! This is a test message!", captured!.HtmlBody);
    }

    [Fact]
    public async Task SendEmailAsync_XssInName_IsHtmlCoded()
    {
        EmailMessage? captured = null;
        _resend.Setup(r => r.EmailSendAsync(It.IsAny<EmailMessage>()))
                .Callback<EmailMessage, CancellationToken>((msg, _) => captured = msg)
                .ReturnsAsync(new ResendResponse<Guid>(Guid.NewGuid(), null));

        var request = new SendEmailRequest
        {
            FirstName = "<script>alert('xss')</script>",
            LastName = "<script>alert('xss')</script>",
            FromEmail = "<script>alert('xss')</script>",
            PhoneNumber = "<script>alert('xss')</script>",
            Company = "<script>alert('xss')</script>",
            Message = "<script>alert('xss')</script>"
        };

        var service = new EmailService(_resend.Object, Options.Create(_resendSettings));
        await service.SendEmailAsync(request);

        Assert.DoesNotContain("<script>", captured!.HtmlBody);
        Assert.Contains("&lt;script&gt;", captured.HtmlBody);
    }

    [Fact]
    public async Task SendEmailAsync_NullPhoneAndCompany_OmitsNullSections()
    {
        EmailMessage? captured = null;
        _resend.Setup(r => r.EmailSendAsync(It.IsAny<EmailMessage>()))
            .Callback<EmailMessage, CancellationToken>((msg, _) => captured = msg)
            .ReturnsAsync(new ResendResponse<Guid>(Guid.NewGuid(), null));

        var request = new SendEmailRequest
        {
            FirstName = "Michael",
            LastName = "Fiskey",
            FromEmail = "test@example.com",
            PhoneNumber = null,
            Company = null,
            Message = "Hello!"
        };

        var service = new EmailService(_resend.Object, Options.Create(_resendSettings));
        await service.SendEmailAsync(request);

        Assert.DoesNotContain("Phone", captured!.HtmlBody);
        Assert.DoesNotContain("Company", captured!.HtmlBody);
    }

    [Fact]
    public async Task SendEmailAsync_ValidInput_SetsCorrectRecipientAndSender()
    {
        EmailMessage? captured = null;
        _resend.Setup(r => r.EmailSendAsync(It.IsAny<EmailMessage>()))
            .Callback<EmailMessage, CancellationToken>((msg, _) => captured = msg)
            .ReturnsAsync(new ResendResponse<Guid>(Guid.NewGuid(), null));

        var request = new SendEmailRequest
        {
            FirstName = "Michael", 
            LastName = "Fiskey",
            FromEmail = "test@example.com", 
            Message = "Hello!"
        };

        var service = new EmailService(_resend.Object, Options.Create(_resendSettings));
        await service.SendEmailAsync(request);

        Assert.Contains("to@example.com", captured!.To);
        Assert.Equal("from@example.com", captured.From);
    }
}