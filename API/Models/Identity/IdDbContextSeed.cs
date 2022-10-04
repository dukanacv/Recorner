using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Identity
{
    public class IdDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    Name = "Vladimir",
                    Email = "test@test.com",
                    UserName = "test@test.com",
                    Address = new Address
                    {
                        FirstName = "Vladimir",
                        LastName = "Dukanac",
                        Street = "Ulica 1",
                        City = "Cacak",
                        ZipCode = "32000"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}