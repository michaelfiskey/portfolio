using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Auth;

public interface IAuthService
{
    Task<User> LoginAsync(LoginRequest loginRequest);
    Task<User> SignupAsync(SignupRequest signupRequest);
}