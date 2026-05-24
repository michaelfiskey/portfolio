using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.Features.Email;

public class SendEmailRequest
{
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    [EmailAddress]
    public string FromEmail { get; set; } = string.Empty;
    
    [Phone]
    [MaxLength(20)]
    public string? PhoneNumber { get; set; }
    
    [MaxLength(100)]
    public string? Company { get; set; }
    
    [Required]
    [MaxLength(2000)]
    public string Message { get; set; } = string.Empty;
}
