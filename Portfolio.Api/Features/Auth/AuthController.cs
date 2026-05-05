using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Portfolio.Api.Features.Auth;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly AuthSettings _authSettings;

    public AuthController(IAuthService authService, IOptions<AuthSettings> authSettings)
    {
        _authService = authService;
        _authSettings = authSettings.Value;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        try
        {
            var user = await _authService.LoginAsync(loginRequest);
            var (accessToken, refreshToken) = await _authService.IssueTokensAsync(user);
            SetRefreshTokenCookie(refreshToken);
            return Ok(new { accessToken });
        }
        catch (InvalidOperationException)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }
        catch
        {
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupRequest signupRequest)
    {
        try
        {
            var user = await _authService.SignupAsync(signupRequest);
            var (accessToken, refreshToken) = await _authService.IssueTokensAsync(user);
            SetRefreshTokenCookie(refreshToken);
            return Ok(new { accessToken });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch
        {
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies[_authSettings.CookieName];
        if (refreshToken == null)
            return Unauthorized(new { message = "No refresh token." });

        try
        {
            var (accessToken, newRefreshToken) = await _authService.RefreshAsync(refreshToken);
            SetRefreshTokenCookie(newRefreshToken);
            return Ok(new { accessToken });
        }
        catch (InvalidOperationException)
        {
            return Unauthorized(new { message = "Invalid or expired refresh token." });
        }
        catch
        {
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var refreshToken = Request.Cookies[_authSettings.CookieName];
        if (refreshToken != null)
            await _authService.LogoutAsync(refreshToken);

        Response.Cookies.Delete(_authSettings.CookieName);
        return Ok();
    }

    private void SetRefreshTokenCookie(string token)
    {
        Response.Cookies.Append(_authSettings.CookieName, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTimeOffset.UtcNow.AddDays(_authSettings.RefreshTokenExpiryDays),
        });
    }
}
