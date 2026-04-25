using Portfolio.Api.Data;
using Microsoft.EntityFrameworkCore;
namespace Portfolio.Api.Features.Auth;

public class AuthService : IAuthService
{
    private readonly AppDbContext _dbContext;
    private readonly PasswordHasher _passwordHasher;

    public AuthService(AppDbContext dbContext, PasswordHasher passwordHasher)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
    }
    public async Task<User> LoginAsync(LoginRequest loginRequest)
    {
        // Find user by email
        var user = await _dbContext.Users
            .Where(u => u.Email == loginRequest.Email)
            .FirstOrDefaultAsync();

        if (user == null)
            throw new InvalidOperationException("User not found.");

        // Hash the input password with the stored salt
        string passwordHash = _passwordHasher.HashPassword(loginRequest.Password, user.PasswordSalt);

        // Compare hashes
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
}