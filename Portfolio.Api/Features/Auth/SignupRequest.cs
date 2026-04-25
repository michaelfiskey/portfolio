using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;

namespace Portfolio.Api.Features.Auth;
public class SignupRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}