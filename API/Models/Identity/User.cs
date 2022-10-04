using Microsoft.AspNetCore.Identity;

namespace API.Models.Identity
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public Address Address { get; set; }
    }
}