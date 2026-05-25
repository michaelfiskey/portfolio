using System.ComponentModel.DataAnnotations;
using Portfolio.Api.Features.Email;

namespace Portfolio.Api.UnitTests.Email;

public class SendEmailRequestTests
{
    private static List<ValidationResult> Validate(SendEmailRequest request)
    {
        var context = new ValidationContext(request);
        var results = new List<ValidationResult>();
        Validator.TryValidateObject(request, context, results, validateAllProperties: true);
        return results;
    }

    [Fact]
    public void RequiredFields_Missing_FailsValidation()
    {

        var request = new SendEmailRequest
        {
            FirstName = string.Empty,
            LastName = string.Empty,
            FromEmail = string.Empty,
            Message = string.Empty
        };
        var errors = Validate(request);

        Assert.Equal(4, errors.Count);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.FirstName)));
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.LastName)));
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.FromEmail)));
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.Message)));
    }

    [Fact]
    public void AllFields_OverMaxLength_FailValidation()
    {
        string firstName = new string('a', 101);
        string lastName = new string('a', 101);
        string fromEmail = "test@example.com" + new string('a', 201);
        string phoneNumber = new string('1', 21);
        string company = new string('a', 101);
        string message = new string('a', 2001);

        var request = new SendEmailRequest
        {
            FirstName = firstName,
            LastName = lastName,
            FromEmail = fromEmail,
            PhoneNumber = phoneNumber,
            Company = company,
            Message = message
        };

        var errors = Validate(request);
        Assert.Equal(6, errors.Count);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.FirstName)));
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.LastName)));
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.FromEmail)));
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.PhoneNumber)));
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.Company)));
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.Message)));
    }

    [Fact]
    public void PhoneNumberField_IncorrectPhoneFormat_FailValidation()
    {
        string phoneNumber = "abc1234567";

        var request = new SendEmailRequest
        {
            FirstName = "Michael",
            LastName = "Fiskey",
            FromEmail = "test@example.com",
            PhoneNumber = phoneNumber,
            Message = "Hello!"
        };

        var errors = Validate(request);

        Assert.Single(errors);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.PhoneNumber)));
    }

    [Fact]
    public void FromEmailField_IncorrectEmailFormat_FailValidation()
    {
        string fromEmail = "wrongformat@@example.com";

        var request = new SendEmailRequest
        {
            FirstName = "Michael",
            LastName = "Fiskey",
            FromEmail = fromEmail,
            Message = "Hello!"
        };

        var errors = Validate(request);

        Assert.Single(errors);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SendEmailRequest.FromEmail)));
    }
}