namespace Portfolio.Api.Constants;
public static class AuthConstants
{
    public static class Roles
    {
        public const string Admin = "admin";
        public const string User = "user";
    }

    public static class Policies
    {
        public const string Admin = "admin";
    
    }

    public static class Claims
    {
        public const string Role = "role";
        public const string Jti = "jti";
    }
}