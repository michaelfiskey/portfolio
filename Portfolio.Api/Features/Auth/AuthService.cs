using Portfolio.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Portfolio.Api.Features.Auth;

public class AuthService : IAuthService
{
    private readonly AppDbContext _dbContext;
    private readonly PasswordHasher _passwordHasher;
    private readonly AuthSettings _authSettings;

    public AuthService(AppDbContext dbContext, PasswordHasher passwordHasher, IOptions<AuthSettings> authSettings)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _authSettings = authSettings.Value;
    }

    public async Task<User> LoginAsync(LoginRequest loginRequest)
    {
        var user = await _dbContext.Users
            .Where(u => u.Email == loginRequest.Email)
            .FirstOrDefaultAsync();

        if (user == null)
            throw new InvalidOperationException("User not found.");

        string passwordHash = _passwordHasher.HashPassword(loginRequest.Password, user.PasswordSalt);

        if (user.PasswordHash != passwordHash)
            throw new InvalidOperationException("Invalid password.");

        return user;
    }

    public async Task<User> SignupAsync(SignupRequest signupRequest)
    {
        byte[] salt;
        string passwordHash = _passwordHasher.HashPassword(signupRequest.Password, out salt);

        var user = new User
        {
            FirstName = signupRequest.FirstName,
            LastName = signupRequest.LastName,
            Email = signupRequest.Email,
            PasswordHash = passwordHash,
            PasswordSalt = salt,
            Role = "user"
        };

        User? checkUser = await _dbContext.Users
            .Where(u => u.Email == signupRequest.Email)
            .FirstOrDefaultAsync();

        if (checkUser != null)
            throw new InvalidOperationException("This user already exists!");

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
        return user;
    }

    public async Task<(string accessToken, string refreshToken)> IssueTokensAsync(User user)
    {
        var accessToken = GenerateAccessToken(user);
        var (rawRefreshToken, hashedRefreshToken) = GenerateRefreshToken();

        user.RefreshTokenHash = hashedRefreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(_authSettings.RefreshTokenExpiryDays);
        await _dbContext.SaveChangesAsync();

        return (accessToken, rawRefreshToken);
    }

    public async Task<(string accessToken, string refreshToken)> RefreshAsync(string refreshToken)
    {
        var hashedToken = HashToken(refreshToken);

        var user = await _dbContext.Users
            .Where(u => u.RefreshTokenHash == hashedToken && u.RefreshTokenExpiry > DateTime.UtcNow)
            .FirstOrDefaultAsync();

        if (user == null)
            throw new InvalidOperationException("Invalid or expired refresh token.");

        var (newRawToken, newHashedToken) = GenerateRefreshToken();
        user.RefreshTokenHash = newHashedToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(_authSettings.RefreshTokenExpiryDays);
        await _dbContext.SaveChangesAsync();

        return (GenerateAccessToken(user), newRawToken);
    }

    public async Task LogoutAsync(string refreshToken)
    {
        var hashedToken = HashToken(refreshToken);
        var user = await _dbContext.Users
            .Where(u => u.RefreshTokenHash == hashedToken)
            .FirstOrDefaultAsync();

        if (user != null)
        {
            user.RefreshTokenHash = null;
            user.RefreshTokenExpiry = null;
            await _dbContext.SaveChangesAsync();
        }
    }

    private string GenerateAccessToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.JwtSecret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("role", user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var token = new JwtSecurityToken(
            issuer: _authSettings.JwtIssuer,
            audience: _authSettings.JwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_authSettings.AccessTokenExpiryMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static (string raw, string hashed) GenerateRefreshToken()
    {
        var raw = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        return (raw, HashToken(raw));
    }

    private static string HashToken(string token)
    {
        return Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
    }
}
