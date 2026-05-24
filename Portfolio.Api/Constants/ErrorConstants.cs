namespace Portfolio.Api.Constants;
public static class ErrorConstants
{
    public const string Unexpected = "An unexpected error occured.";
    public static class Auth
    {
            public const string InvalidEmailPassword = "Invalid email or password.";
            public const string InvalidPassword = "Invalid Password";
            public const string UserNotFound = "User was not found.";
            public const string UserExists = "User already exists.";
            public const string NoToken = "No refresh token.";
            public const string InvalidExpiredToken = "Token is invalid or expired.";
    }
    public static class Projects
    {
        public const string InvalidProjectQuery = "Query type must be one of: swe, ai-ml, cs.";
    }
}