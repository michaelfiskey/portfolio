using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Portfolio.Api.Constants;

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
        catch (InvalidOperationException err)
        {
            return Unauthorized(new { message = err.Message ?? ErrorConstants.Auth.InvalidEmailPassword });
        }
        catch
        {
            return StatusCode(500, ErrorConstants.Unexpected);
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
            return BadRequest(new { message = ex.Message});
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch
        {
            return StatusCode(500, ErrorConstants.Unexpected);
        }
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies[_authSettings.CookieName];
        if (refreshToken == null)
            return Unauthorized(new { message = ErrorConstants.Auth.NoToken});

        try
        {
            var (accessToken, newRefreshToken) = await _authService.RefreshAsync(refreshToken);
            SetRefreshTokenCookie(newRefreshToken);
            return Ok(new { accessToken });
        }
        catch (InvalidOperationException)
        {
            return Unauthorized(new { message = ErrorConstants.Auth.InvalidExpiredToken});
        }
        catch
        {
            return StatusCode(500, ErrorConstants.Unexpected);
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
