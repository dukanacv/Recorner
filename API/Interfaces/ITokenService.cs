using API.Models.Identity;

namespace API.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(User user);
    }
}