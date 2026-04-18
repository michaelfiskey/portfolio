using Microsoft.AspNetCore.Mvc;
namespace Portfolio.Api.Features.Email;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly IEmailService _emailService;
    public EmailController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("send-email")]
    public async Task<IActionResult> SendEmail([FromBody] SendEmailRequest request)
    {
        await _emailService.SendEmailAsync(request);
        return Ok(new { message = "Email sent successfully." });
    }
}