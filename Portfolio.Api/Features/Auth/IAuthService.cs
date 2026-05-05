using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Auth;

public interface IAuthService
{
    Task<User> LoginAsync(LoginRequest loginRequest);
    Task<User> SignupAsync(SignupRequest signupRequest);
    Task<(string accessToken, string refreshToken)> IssueTokensAsync(User user);
    Task<(string accessToken, string refreshToken)> RefreshAsync(string refreshToken);
    Task LogoutAsync(string refreshToken);
}
