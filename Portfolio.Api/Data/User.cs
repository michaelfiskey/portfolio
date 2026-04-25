using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace Portfolio.Api.Data
{
    public class User : BaseEntity
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        public byte[] PasswordSalt { get; set; } = [];
        [Required]
        public string Role { get; set; } = "user";
    }
}