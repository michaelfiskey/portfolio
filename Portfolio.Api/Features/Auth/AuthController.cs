using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Auth;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        try
        {
            var user = await _authService.LoginAsync(loginRequest);
            return Ok(user);
        }
        catch (InvalidOperationException)
        {
            return NotFound(new {message = "User not found!"});
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

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupRequest signupRequest)
    {
        try
        {
            var user = await _authService.SignupAsync(signupRequest);
            return Ok(user);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new {message = ex.Message});
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
}