using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Auth;

public interface IAuthService
{
    Task<UserEntity> LoginAsync(LoginRequest loginRequest);
    Task<UserEntity> SignupAsync(SignupRequest signupRequest);
    Task<(string accessToken, string refreshToken)> IssueTokensAsync(UserEntity user);
    Task<(string accessToken, string refreshToken)> RefreshAsync(string refreshToken);
    Task LogoutAsync(string refreshToken);
}
